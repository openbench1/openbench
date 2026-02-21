import type { Chain } from "./types";

export const CHAINS: Record<string, Chain> = {
  eth: {
    id: "eth",
    name: "Ethereum",
    shortName: "ETH",
    goplusChainId: "1",
    explorerUrl: "https://etherscan.io",
    icon: "⟠",
  },
  bsc: {
    id: "bsc",
    name: "BNB Chain",
    shortName: "BSC",
    goplusChainId: "56",
    explorerUrl: "https://bscscan.com",
    icon: "◆",
  },
};

export const CHAIN_LIST = Object.values(CHAINS);
export const DEFAULT_CHAIN = CHAINS.eth;

export function getChainById(id: string): Chain | undefined {
  return CHAINS[id];
}

export function getChainByGoplusId(goplusId: string): Chain | undefined {
  return CHAIN_LIST.find((c) => c.goplusChainId === goplusId);
}
