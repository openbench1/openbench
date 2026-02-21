import { NextRequest, NextResponse } from "next/server";
import { getChainById } from "@/lib/chains";
import { getContractSource } from "@/lib/etherscan/client";

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const TX_HASH_REGEX = /^0x[a-fA-F0-9]{64}$/;

const ETHERSCAN_API: Record<string, string> = {
  "1": "https://api.etherscan.io/api",
  "56": "https://api.bscscan.com/api",
};

const ETHERSCAN_KEYS: Record<string, string | undefined> = {
  "1": process.env.ETHERSCAN_API_KEY,
  "56": process.env.BSCSCAN_API_KEY,
};

async function getContractFromTxHash(
  txHash: string,
  goplusChainId: string
): Promise<string | null> {
  const baseUrl = ETHERSCAN_API[goplusChainId];
  if (!baseUrl) return null;

  const apiKey = ETHERSCAN_KEYS[goplusChainId];
  const params = new URLSearchParams({
    module: "proxy",
    action: "eth_getTransactionReceipt",
    txhash: txHash,
    ...(apiKey ? { apikey: apiKey } : {}),
  });

  const response = await fetch(`${baseUrl}?${params}`);
  if (!response.ok) return null;

  const data = await response.json();
  const receipt = data.result;
  if (!receipt) return null;

  // If it's a contract creation tx, use contractAddress
  if (receipt.contractAddress) {
    return receipt.contractAddress;
  }

  // Otherwise use the "to" address (the contract being called)
  return receipt.to || null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, chainId } = body;

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Missing input" },
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

    const trimmed = input.trim();
    let contractAddress: string;

    if (ADDRESS_REGEX.test(trimmed)) {
      contractAddress = trimmed;
    } else if (TX_HASH_REGEX.test(trimmed)) {
      const resolved = await getContractFromTxHash(
        trimmed,
        chain.goplusChainId
      );
      if (!resolved) {
        return NextResponse.json(
          { error: "Could not resolve contract address from transaction hash" },
          { status: 422 }
        );
      }
      contractAddress = resolved;
    } else {
      return NextResponse.json(
        { error: "Invalid input. Please enter a contract address (0x...40 hex) or transaction hash (0x...64 hex)" },
        { status: 400 }
      );
    }

    const source = await getContractSource(
      contractAddress,
      chain.goplusChainId
    );

    if (!source || !source.isVerified || !source.sourceCode) {
      return NextResponse.json(
        {
          error: "Contract source code is not verified on-chain. Only open-source (verified) contracts can be audited.",
          address: contractAddress,
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      address: contractAddress,
      contractName: source.contractName,
      compilerVersion: source.compilerVersion,
      sourceCode: source.sourceCode,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch source code", message },
      { status: 500 }
    );
  }
}
