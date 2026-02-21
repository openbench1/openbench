"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAudit } from "@/hooks/use-audit";
import { CodeEditor } from "./code-editor";
import { FileUpload } from "./file-upload";
import { EngineSelector } from "./engine-selector";
import { AuditLoading } from "./audit-loading";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Shield, AlertCircle } from "lucide-react";
import type { AIEngine } from "@/lib/types";

export function AuditForm() {
  const t = useTranslations("audit");
  const router = useRouter();
  const { isLoading, error, submitAudit } = useAudit();
  const [sourceCode, setSourceCode] = useState("");
  const [engine, setEngine] = useState<AIEngine>("claude");

  const handleFileContent = (content: string) => {
    setSourceCode(content);
  };

  const handleSubmit = async () => {
    if (!sourceCode.trim()) return;

    try {
      const result = await submitAudit(sourceCode, engine);
      router.push(`/report/${result.id}`);
    } catch {
      // Error is captured in useAudit state
    }
  };

  if (isLoading) {
    return <AuditLoading />;
  }

  return (
    <div className="space-y-8">
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
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          {t("editor.label")}
        </label>
        <CodeEditor value={sourceCode} onChange={setSourceCode} />
      </div>

      <FileUpload onFileContent={handleFileContent} />

      <Separator className="bg-cyber-border" />

      <EngineSelector value={engine} onChange={setEngine} />

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
