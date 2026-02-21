"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAudit } from "@/hooks/use-audit";
import { CodeEditor } from "./code-editor";
import { FileUpload } from "./file-upload";
import { AuditLoading } from "./audit-loading";
import { ChainSelector } from "@/components/scan/chain-selector";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  AlertCircle,
  FileCode2,
  Code,
  Search,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    uint256 public buyTax = 5;
    uint256 public sellTax = 5;
    mapping(address => bool) public blacklisted;

    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function setTax(uint256 _buyTax, uint256 _sellTax) external onlyOwner {
        buyTax = _buyTax;
        sellTax = _sellTax;
    }

    function blacklist(address account) external onlyOwner {
        blacklisted[account] = true;
    }

    function _update(address from, address to, uint256 amount) internal override {
        require(!blacklisted[from] && !blacklisted[to], "Blacklisted");
        super._update(from, to, amount);
    }
}`;

type InputMode = "address" | "code";

export function AuditForm() {
  const t = useTranslations("audit");
  const router = useRouter();
  const { isLoading, error, submitAudit } = useAudit();
  const [sourceCode, setSourceCode] = useState("");
  const [inputMode, setInputMode] = useState<InputMode>("address");
  const [addressInput, setAddressInput] = useState("");
  const [chainId, setChainId] = useState("bsc");
  const [fetchingSource, setFetchingSource] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchedContract, setFetchedContract] = useState<string | null>(null);

  const handleFileContent = (content: string) => {
    setSourceCode(content);
    setInputMode("code");
  };

  const handleFetchSource = async () => {
    if (!addressInput.trim()) return;

    setFetchingSource(true);
    setFetchError(null);
    setFetchedContract(null);

    try {
      const response = await fetch("/api/source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: addressInput.trim(), chainId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFetchError(data.error || "Failed to fetch source code");
        return;
      }

      setSourceCode(data.sourceCode);
      setFetchedContract(data.contractName);
      setInputMode("code");
    } catch {
      setFetchError("Network error. Please try again.");
    } finally {
      setFetchingSource(false);
    }
  };

  const handleSubmit = async () => {
    if (!sourceCode.trim()) return;

    try {
      const result = await submitAudit(sourceCode);
      router.push(`/report/audit/${result.id}`);
    } catch {
      // Error is captured in useAudit state
    }
  };

  if (isLoading) {
    return <AuditLoading />;
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
      {(error || fetchError) && (
        <Alert
          variant="destructive"
          className="border-severity-critical/30 bg-severity-critical/5"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || fetchError}</AlertDescription>
        </Alert>
      )}

      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 rounded-xl bg-cyber-bg/50">
        <button
          onClick={() => setInputMode("address")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200",
            inputMode === "address"
              ? "glass text-neon-green shadow-[0_0_15px_rgba(0,255,65,0.1)]"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Search className="h-4 w-4" />
          {t("tabs.address")}
        </button>
        <button
          onClick={() => setInputMode("code")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200",
            inputMode === "code"
              ? "glass text-neon-green shadow-[0_0_15px_rgba(0,255,65,0.1)]"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Code className="h-4 w-4" />
          {t("tabs.code")}
        </button>
      </div>

      {/* Address Input Mode */}
      {inputMode === "address" && (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground text-center">
            {t("address.description")}
          </p>

          <div className="flex justify-center">
            <ChainSelector value={chainId} onChange={setChainId} />
          </div>

          <div className="relative">
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder={t("address.placeholder")}
              className="w-full bg-cyber-bg/80 border border-cyber-border rounded-xl px-4 py-4 text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_15px_rgba(0,255,65,0.05)] transition-all"
            />
          </div>

          {fetchedContract && (
            <div className="flex items-center gap-2 text-sm text-neon-green glass rounded-lg px-4 py-3">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {t("address.found", { name: fetchedContract })}
            </div>
          )}

          <Button
            onClick={handleFetchSource}
            disabled={!addressInput.trim() || fetchingSource}
            size="lg"
            className="w-full bg-gradient-to-r from-neon-blue to-neon-blue/80 text-white font-bold text-base py-6 hover:shadow-neon-blue transition-all duration-300 disabled:opacity-50 rounded-xl group"
          >
            {fetchingSource ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("address.fetching")}
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                {t("address.fetchButton")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground/60 text-center">
            {t("address.hint")}
          </p>
        </div>
      )}

      {/* Code Input Mode */}
      {inputMode === "code" && (
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-muted-foreground">
                {t("editor.label")}
              </label>
              <button
                onClick={() => setSourceCode(EXAMPLE_CODE)}
                className="inline-flex items-center gap-1.5 text-xs text-neon-blue hover:text-neon-green transition-colors glass rounded-full px-3 py-1"
              >
                <FileCode2 className="h-3.5 w-3.5" />
                {t("editor.loadExample")}
              </button>
            </div>
            <CodeEditor value={sourceCode} onChange={setSourceCode} />
          </div>

          <FileUpload onFileContent={handleFileContent} />

          <Button
            onClick={handleSubmit}
            disabled={!sourceCode.trim() || isLoading}
            size="lg"
            className="w-full bg-gradient-to-r from-neon-green to-neon-green/80 text-black font-bold text-base py-6 hover:shadow-neon-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl group"
          >
            <Shield className="mr-2 h-5 w-5" />
            {isLoading ? t("submitting") : t("submit")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}
    </div>
  );
}
