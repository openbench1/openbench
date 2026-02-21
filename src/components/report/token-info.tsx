"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TokenInfo as TokenInfoType, LiquidityInfo } from "@/lib/types";
import { getChainById } from "@/lib/chains";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

interface TokenInfoProps {
  token: TokenInfoType;
  buyTax: string;
  sellTax: string;
  liquidity?: LiquidityInfo;
}

export function TokenInfoCard({ token, buyTax, sellTax, liquidity }: TokenInfoProps) {
  const t = useTranslations("report.token");
  const chain = getChainById(token.chainId);
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-cyber-card border-cyber-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <span className="text-2xl">{chain?.icon}</span>
            <div>
              <div className="text-xl font-bold">{token.name}</div>
              <div className="text-sm text-muted-foreground">${token.symbol}</div>
            </div>
          </CardTitle>
          <div className="flex gap-2">
            {token.isOpenSource && (
              <Badge className="bg-neon-green/15 text-neon-green border-neon-green/30">
                {t("verified")}
              </Badge>
            )}
            {!token.isOpenSource && (
              <Badge className="bg-severity-medium/15 text-severity-medium border-severity-medium/30">
                {t("unverified")}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {/* Address */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t("address")}</span>
          <div className="flex items-center gap-2">
            <code className="font-mono text-xs text-neon-blue">
              {token.address.slice(0, 8)}...{token.address.slice(-6)}
            </code>
            <button onClick={copyAddress} className="text-muted-foreground hover:text-neon-green">
              {copied ? <Check className="h-3.5 w-3.5 text-neon-green" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <a
              href={`${chain?.explorerUrl}/address/${token.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neon-green"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Chain */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t("chain")}</span>
          <span>{chain?.name}</span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t("buyTax")}</span>
          <span className={parseFloat(buyTax) > 5 ? "text-severity-critical" : "text-neon-green"}>
            {buyTax}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t("sellTax")}</span>
          <span className={parseFloat(sellTax) > 5 ? "text-severity-critical" : "text-neon-green"}>
            {sellTax}
          </span>
        </div>

        {/* Liquidity */}
        {liquidity?.dexName && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("dex")}</span>
            <span>{liquidity.dexName}</span>
          </div>
        )}
        {liquidity?.liquidity && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("liquidity")}</span>
            <span>${parseFloat(liquidity.liquidity).toLocaleString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
