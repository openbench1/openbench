import { NextRequest, NextResponse } from "next/server";
import { getTokenSecurity } from "@/lib/goplus/client";
import { parseScanResult } from "@/lib/goplus/parser";
import { scanStore } from "@/lib/store/memory";
import { getChainById } from "@/lib/chains";

export async function POST(request: NextRequest) {
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

    // Check cache first
    const cached = await scanStore.getScan(address, chainId);
    if (cached) {
      return NextResponse.json(cached, { status: 200 });
    }

    // Call GoPlus API
    const goplusResult = await getTokenSecurity(
      chain.goplusChainId,
      address
    );

    const tokenData = goplusResult.result?.[address.toLowerCase()];
    if (!tokenData) {
      return NextResponse.json(
        { error: "Token not found on this chain. Please check the address and chain." },
        { status: 404 }
      );
    }

    const scanResult = parseScanResult(address, chainId, tokenData);
    await scanStore.saveScan(scanResult);

    return NextResponse.json(scanResult, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Scan API error:", message);
    return NextResponse.json(
      { error: "Scan failed", message },
      { status: 500 }
    );
  }
}
