import type {
  GoPlusResponse,
  GoPlusTokenSecurityResult,
} from "./types";

const GOPLUS_BASE = "https://api.gopluslabs.io/api/v1";

export async function getTokenSecurity(
  chainId: string,
  address: string
): Promise<GoPlusResponse<GoPlusTokenSecurityResult>> {
  const url = `${GOPLUS_BASE}/token_security/${chainId}?contract_addresses=${address.toLowerCase()}`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 }, // cache 5 minutes
  });

  if (!response.ok) {
    throw new Error(`GoPlus API error: ${response.status}`);
  }

  return response.json();
}
