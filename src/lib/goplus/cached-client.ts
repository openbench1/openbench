import { cache } from "react";
import { scanStore } from "@/lib/store/store";
import { getTokenSecurity } from "@/lib/goplus/client";
import { parseScanResult } from "@/lib/goplus/parser";
import { getChainById } from "@/lib/chains";
import type { ScanResult } from "@/lib/types";

export const getCachedScan = cache(
  async (chainId: string, address: string): Promise<ScanResult | null> => {
    const chain = getChainById(chainId);
    if (!chain) return null;

    const cached = await scanStore.getScan(address, chainId);
    if (cached) return cached;

    try {
      const goplusResult = await getTokenSecurity(
        chain.goplusChainId,
        address
      );
      const tokenData = goplusResult.result?.[address.toLowerCase()];
      if (!tokenData) return null;
      const scan = parseScanResult(address, chainId, tokenData);
      await scanStore.saveScan(scan);
      return scan;
    } catch {
      return null;
    }
  }
);
