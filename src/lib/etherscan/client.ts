// Etherscan API V2 — single endpoint, chainid param, one key for all chains
const ETHERSCAN_V2_BASE = "https://api.etherscan.io/v2/api";

// Our internal chainId → Etherscan numeric chainid
const CHAIN_IDS: Record<string, string> = {
  "1": "1",   // Ethereum Mainnet
  "56": "56", // BSC Mainnet
};

interface EtherscanSourceResponse {
  status: string;
  message: string;
  result: EtherscanSourceResult[] | string;
}

interface EtherscanSourceResult {
  SourceCode: string;
  ABI: string;
  ContractName: string;
  CompilerVersion: string;
  OptimizationUsed: string;
  Runs: string;
  ConstructorArguments: string;
  EVMVersion: string;
  Library: string;
  LicenseType: string;
  Proxy: string;
  Implementation: string;
  SwarmSource: string;
}

export interface ContractSource {
  sourceCode: string;
  contractName: string;
  compilerVersion: string;
  isVerified: boolean;
}

export async function getContractSource(
  address: string,
  chainId: string
): Promise<ContractSource | null> {
  const etherscanChainId = CHAIN_IDS[chainId];
  if (!etherscanChainId) return null;

  const apiKey = process.env.ETHERSCAN_API_KEY;
  if (!apiKey) {
    console.error("ETHERSCAN_API_KEY is not set — required for Etherscan V2 API");
    return null;
  }

  const params = new URLSearchParams({
    chainid: etherscanChainId,
    module: "contract",
    action: "getsourcecode",
    address: address.toLowerCase(),
    apikey: apiKey,
  });

  const response = await fetch(`${ETHERSCAN_V2_BASE}?${params}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Etherscan API error: ${response.status}`);
  }

  const data: EtherscanSourceResponse = await response.json();

  if (data.status !== "1" || !Array.isArray(data.result) || !data.result[0]) {
    return null;
  }

  const result = data.result[0];

  // Empty SourceCode means contract is not verified
  if (!result.SourceCode || result.SourceCode === "") {
    return { sourceCode: "", contractName: "", compilerVersion: "", isVerified: false };
  }

  // Handle multi-file contracts (JSON format wrapped in extra braces)
  let sourceCode = result.SourceCode;
  if (sourceCode.startsWith("{{")) {
    try {
      const parsed = JSON.parse(sourceCode.slice(1, -1));
      const sources = parsed.sources as Record<string, { content: string }>;
      sourceCode = Object.values(sources)
        .map((s) => s.content)
        .join("\n\n");
    } catch {
      // Use raw source if parsing fails
    }
  }

  return {
    sourceCode,
    contractName: result.ContractName,
    compilerVersion: result.CompilerVersion,
    isVerified: true,
  };
}
