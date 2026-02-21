import { NextRequest, NextResponse } from "next/server";
import { getChainById } from "@/lib/chains";
import { getContractSource } from "@/lib/etherscan/client";
import { submitJob } from "@/lib/evmbench/client";

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

    // Fetch verified source code from Etherscan/BSCScan
    const source = await getContractSource(address, chain.goplusChainId);

    if (!source || !source.isVerified || !source.sourceCode) {
      return NextResponse.json(
        { error: "Contract source code is not verified. EVMBench analysis requires open-source contracts." },
        { status: 422 }
      );
    }

    // Submit to EVMBench for analysis
    const { job } = await submitJob(source.sourceCode, "detect");

    return NextResponse.json(
      {
        jobId: job.id,
        status: job.status,
        contractName: source.contractName,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("EVMBench submit error:", message);
    return NextResponse.json(
      { error: "EVMBench analysis failed to start", message },
      { status: 500 }
    );
  }
}
