import { NextRequest, NextResponse } from "next/server";
import { getChainById } from "@/lib/chains";
import { getContractSource } from "@/lib/etherscan/client";
import { createEngine } from "@/lib/ai/engine";
import { checkRateLimit } from "@/lib/rate-limit/check";
import type { AIEngine } from "@/lib/types";

// Run in US region to avoid OpenAI geo-blocking
export const preferredRegion = "iad1";

export async function POST(request: NextRequest) {
  const rateLimited = await checkRateLimit(request);
  if (rateLimited) return rateLimited;

  try {
    const body = await request.json();
    const { address, chainId } = body;

    if (
      !address ||
      typeof address !== "string" ||
      !/^0x[a-fA-F0-9]{40}$/.test(address)
    ) {
      return NextResponse.json(
        { error: "Invalid contract address" },
        { status: 400 }
      );
    }

    const chain = getChainById(chainId);
    if (!chain) {
      return NextResponse.json(
        { error: "Unsupported chain" },
        { status: 400 }
      );
    }

    // Fetch verified source code from Etherscan/BSCScan
    const source = await getContractSource(address, chain.goplusChainId);

    if (!source || !source.isVerified || !source.sourceCode) {
      return NextResponse.json(
        { error: "Contract source code is not verified. EVMBench analysis requires open-source contracts." },
        { status: 422 }
      );
    }

    // Analyze directly with AI engine (no external EVMBench server needed)
    const engineName = (process.env.AI_ENGINE || "openai") as AIEngine;
    const engine = createEngine(engineName);
    const report = await engine.analyze({
      code: source.sourceCode,
      locale: "en",
    });

    if (source.contractName) {
      report.contractName = source.contractName;
    }
    report.linesOfCode = source.sourceCode.split("\n").length;

    return NextResponse.json(
      { status: "completed", report },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("EVMBench analysis error:", message);
    return NextResponse.json(
      { error: "Analysis failed", message },
      { status: 500 }
    );
  }
}
