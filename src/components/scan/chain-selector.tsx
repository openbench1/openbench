"use client";

import { CHAIN_LIST } from "@/lib/chains";
import type { Chain } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChainSelectorProps {
  value: string;
  onChange: (chainId: string) => void;
}

export function ChainSelector({ value, onChange }: ChainSelectorProps) {
  return (
    <div className="flex gap-2">
      {CHAIN_LIST.map((chain: Chain) => (
        <button
          key={chain.id}
          onClick={() => onChange(chain.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200",
            value === chain.id
              ? "border-neon-green bg-neon-green/10 text-neon-green shadow-neon-green"
              : "border-cyber-border bg-cyber-card text-muted-foreground hover:border-cyber-border-hover"
          )}
        >
          <span className="text-lg">{chain.icon}</span>
          <span>{chain.shortName}</span>
        </button>
      ))}
    </div>
  );
}
