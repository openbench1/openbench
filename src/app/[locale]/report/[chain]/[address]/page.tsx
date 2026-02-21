import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChainById } from "@/lib/chains";
import { getCachedScan } from "@/lib/goplus/cached-client";
import { SafetyScore } from "@/components/report/safety-score";
import { TokenInfoCard } from "@/components/report/token-info";
import { RiskChecklist } from "@/components/report/risk-checklist";
import { HolderAnalysis } from "@/components/report/holder-analysis";
import { LiquidityInfoCard } from "@/components/report/liquidity-info";
import { EVMBenchAudit } from "@/components/report/evmbench-audit";
import { ShareButtons } from "@/components/report/share-buttons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

interface ReportPageProps {
  params: Promise<{ locale: string; chain: string; address: string }>;
}

export async function generateMetadata({
  params,
}: ReportPageProps): Promise<Metadata> {
  const { locale, chain: chainId, address } = await params;
  const chain = getChainById(chainId);

  if (!chain || !/^0x[a-fA-F0-9]{40}$/i.test(address)) {
    return { title: "Not Found" };
  }

  const scan = await getCachedScan(chainId, address);
  if (!scan) return { title: "Token Report" };

  const { name, symbol } = scan.tokenInfo;
  const statusText = scan.isHoneypot
    ? "HONEYPOT"
    : scan.safetyScore >= 80
      ? "SAFE"
      : scan.safetyScore >= 50
        ? "CAUTION"
        : "DANGER";

  const title =
    locale === "zh"
      ? `${name} ($${symbol}) - ${statusText} | 评分: ${scan.safetyScore}/100`
      : `${name} ($${symbol}) - ${statusText} | Score: ${scan.safetyScore}/100`;

  const description =
    locale === "zh"
      ? `${chain.name}上${name}的安全检测报告。安全评分: ${scan.safetyScore}/100。${scan.isHoneypot ? "警告: 检测到貔貅币!" : ""}`
      : `Security scan for ${name} on ${chain.name}. Safety score: ${scan.safetyScore}/100. ${scan.isHoneypot ? "WARNING: Honeypot detected!" : ""}`;

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `/en/report/${chainId}/${address}`,
        zh: `/zh/report/${chainId}/${address}`,
      },
    },
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { chain: chainId, address } = await params;
  const t = await getTranslations("report");
  const chain = getChainById(chainId);

  if (!chain || !/^0x[a-fA-F0-9]{40}$/i.test(address)) {
    notFound();
  }

  const scan = await getCachedScan(chainId, address);
  if (!scan) notFound();

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl space-y-8">
      {/* Back + Title */}
      <div className="flex items-center gap-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-neon-green"
        >
          <Link href="/scan">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t("backToScan")}
          </Link>
        </Button>
      </div>

      {/* Safety Score */}
      <div className="flex justify-center">
        <SafetyScore score={scan.safetyScore} isHoneypot={scan.isHoneypot} />
      </div>

      {/* Share Buttons */}
      <div className="flex justify-center">
        <ShareButtons
          tokenName={scan.tokenInfo.name}
          tokenSymbol={scan.tokenInfo.symbol}
          safetyScore={scan.safetyScore}
          isHoneypot={scan.isHoneypot}
        />
      </div>

      {/* Honeypot Warning */}
      {scan.isHoneypot && (
        <div className="bg-severity-critical/10 border border-severity-critical/30 rounded-xl p-6 text-center">
          <p className="text-severity-critical font-bold text-xl mb-2">
            {t("honeypotWarning")}
          </p>
          <p className="text-muted-foreground text-sm">
            {t("honeypotDesc")}
          </p>
        </div>
      )}

      <Separator className="bg-cyber-border" />

      {/* Token Info */}
      <TokenInfoCard
        token={scan.tokenInfo}
        buyTax={scan.buyTax}
        sellTax={scan.sellTax}
        liquidity={scan.liquidity}
      />

      {/* Risk Checklist */}
      <RiskChecklist items={scan.riskItems} />

      {/* Holder Analysis */}
      <HolderAnalysis holders={scan.holders} />

      {/* Liquidity Info */}
      <LiquidityInfoCard liquidity={scan.liquidity} />

      <Separator className="bg-cyber-border" />

      {/* EVMBench Deep Analysis */}
      <EVMBenchAudit
        address={scan.address}
        chainId={scan.chainId}
      />

      {/* Scan another */}
      <div className="text-center pt-4">
        <Button
          asChild
          className="bg-neon-green text-black font-bold hover:shadow-neon-green"
        >
          <Link href="/scan">{t("scanAnother")}</Link>
        </Button>
      </div>
    </div>
  );
}
