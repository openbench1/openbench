const API_URLS: Record<string, string> = {
  "1": "https://api.etherscan.io/api",
  "56": "https://api.bscscan.com/api",
};

const API_KEYS: Record<string, string | undefined> = {
  "1": process.env.ETHERSCAN_API_KEY,
  "56": process.env.BSCSCAN_API_KEY,
};

interface EtherscanSourceResponse {
  status: string;
  message: string;
  result: EtherscanSourceResult[];
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
  const baseUrl = API_URLS[chainId];
  if (!baseUrl) return null;

  const apiKey = API_KEYS[chainId];
  const params = new URLSearchParams({
    module: "contract",
    action: "getsourcecode",
    address: address.toLowerCase(),
    ...(apiKey ? { apikey: apiKey } : {}),
  });

  const response = await fetch(`${baseUrl}?${params}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 }, // cache 1 hour
  });

  if (!response.ok) {
    throw new Error(`Etherscan API error: ${response.status}`);
  }

  const data: EtherscanSourceResponse = await response.json();

  if (data.status !== "1" || !data.result?.[0]) {
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
