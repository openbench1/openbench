// ===========================================
// Token Payment Configuration
// ===========================================
// After deploying your ERC-20 token, update:
//   1. PAYMENT_TOKEN.address — your token contract
//   2. TREASURY_ADDRESS     — your receiving wallet
//   3. PRICES               — adjust as needed
// ===========================================

export const PAYMENT_TOKEN = {
  address: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  symbol: "OBT",
  decimals: 18,
  chainId: 56, // BSC
};

export const TREASURY_ADDRESS =
  "0x0000000000000000000000000000000000000000" as `0x${string}`;

export const PRICES = {
  /** 100 OBT per AI audit */
  audit: BigInt("100000000000000000000"),
  /** 1 OBT per API call (future) */
  apiCall: BigInt("1000000000000000000"),
};
