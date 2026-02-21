"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAudit } from "@/hooks/use-audit";
import { CodeEditor } from "./code-editor";
import { FileUpload } from "./file-upload";
import { AuditLoading } from "./audit-loading";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Shield, AlertCircle, FileCode2 } from "lucide-react";

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

export function AuditForm() {
  const t = useTranslations("audit");
  const router = useRouter();
  const { isLoading, error, submitAudit } = useAudit();
  const [sourceCode, setSourceCode] = useState("");

  const handleFileContent = (content: string) => {
    setSourceCode(content);
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

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-muted-foreground">
            {t("editor.label")}
          </label>
          <button
            onClick={() => setSourceCode(EXAMPLE_CODE)}
            className="inline-flex items-center gap-1.5 text-xs text-neon-blue hover:text-neon-green transition-colors"
          >
            <FileCode2 className="h-3.5 w-3.5" />
            {t("editor.loadExample")}
          </button>
        </div>
        <CodeEditor value={sourceCode} onChange={setSourceCode} />
      </div>

      <FileUpload onFileContent={handleFileContent} />

      <Separator className="bg-cyber-border" />

      <Button
        onClick={handleSubmit}
        disabled={!sourceCode.trim() || isLoading}
        size="lg"
        className="w-full bg-neon-green text-black font-bold text-lg py-6 hover:shadow-neon-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Shield className="mr-2 h-5 w-5" />
        {isLoading ? t("submitting") : t("submit")}
      </Button>
    </div>
  );
}
