"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { AddressInput } from "./address-input";
import { ChainSelector } from "./chain-selector";
import { ScanLoading } from "./scan-loading";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle } from "lucide-react";

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function ScanForm() {
  const t = useTranslations("scan");
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState("eth");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidAddress = ADDRESS_REGEX.test(address);

  const handleScan = async () => {
    if (!isValidAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, chainId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.error || "Scan failed");
      }

      router.push(`/report/${chainId}/${address.toLowerCase()}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ScanLoading />;
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert
          variant="destructive"
          className="border-severity-critical/30 bg-severity-critical/5"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Chain selector */}
      <div className="flex justify-center">
        <ChainSelector value={chainId} onChange={setChainId} />
      </div>

      {/* Address input */}
      <AddressInput
        value={address}
        onChange={setAddress}
        isValid={address.length === 0 || isValidAddress}
      />

      {/* Scan button */}
      <Button
        onClick={handleScan}
        disabled={!isValidAddress || isLoading}
        size="lg"
        className="w-full bg-neon-green text-black font-bold text-lg py-6 hover:shadow-neon-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Shield className="mr-2 h-5 w-5" />
        {t("scanButton")}
      </Button>

      {/* Example addresses */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>{t("tryExample")}</p>
        <button
          onClick={() => {
            setAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7");
            setChainId("eth");
          }}
          className="text-neon-blue hover:text-neon-green transition-colors font-mono"
        >
          USDT (ETH)
        </button>
        <span className="mx-2">·</span>
        <button
          onClick={() => {
            setAddress("0x55d398326f99059fF775485246999027B3197955");
            setChainId("bsc");
          }}
          className="text-neon-blue hover:text-neon-green transition-colors font-mono"
        >
          USDT (BSC)
        </button>
      </div>
    </div>
  );
}
