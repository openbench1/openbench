import { NextRequest, NextResponse } from "next/server";
import { createEngine } from "@/lib/ai/engine";
import { auditStore } from "@/lib/store/store";
import type { AIEngine, StoredAudit } from "@/lib/types";
import { nanoid } from "nanoid";
import { getOptionalUserId } from "@/lib/auth/helpers";
import { checkRateLimit } from "@/lib/rate-limit/check";

// Run in US region to avoid OpenAI geo-blocking (Vercel default is hkg1)
export const preferredRegion = "iad1";

export async function POST(request: NextRequest) {
  const rateLimited = await checkRateLimit(request);
  if (rateLimited) return rateLimited;

  try {
    const body = await request.json();
    const { code, locale } = body;
    const engineName = (process.env.AI_ENGINE || "openai") as AIEngine;

    if (!code || typeof code !== "string" || code.trim().length < 10) {
      return NextResponse.json(
        { error: "Invalid Solidity code provided" },
        { status: 400 }
      );
    }

    const id = nanoid(12);
    const userId = await getOptionalUserId();
    const audit: StoredAudit = {
      id,
      engine: engineName,
      sourceCode: code,
      status: "analyzing",
      createdAt: new Date().toISOString(),
      userId: userId ?? undefined,
    };

    await auditStore.saveAudit(audit);

    const engine = createEngine(engineName);
    const report = await engine.analyze({
      code,
      locale: locale || "en",
    });

    const completedAudit: StoredAudit = {
      ...audit,
      status: "completed",
      report,
      completedAt: new Date().toISOString(),
    };

    await auditStore.saveAudit(completedAudit);

    return NextResponse.json(completedAudit, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Audit API error:", message);
    return NextResponse.json(
      { error: "Audit failed", message },
      { status: 500 }
    );
  }
}
