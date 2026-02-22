"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Coins,
  Layers,
  Brain,
  Zap,
  Target,
  BarChart3,
  Lock,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      {children}
    </section>
  );
}

function SectionTitle({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
      <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
        {number}
      </span>
      {children}
    </h2>
  );
}

export function WhitepaperContent() {
  const t = useTranslations("whitepaper");

  const tocItems = [
    { id: "abstract", label: t("toc.abstract") },
    { id: "problem", label: t("toc.problem") },
    { id: "solution", label: t("toc.solution") },
    { id: "modules", label: t("toc.modules") },
    { id: "tech", label: t("toc.tech") },
    { id: "token", label: t("toc.token") },
    { id: "roadmap", label: t("toc.roadmap") },
    { id: "security", label: t("toc.security") },
  ];

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-mono text-muted-foreground mb-3">
          {t("version")}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Table of Contents */}
      <nav className="mb-16 p-6 rounded-2xl bg-muted/50 border border-gray-200">
        <h3 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wide">
          {t("tocTitle")}
        </h3>
        <ol className="space-y-2">
          {tocItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm hover:text-foreground text-muted-foreground transition-colors flex items-center gap-2"
              >
                <span className="font-mono text-xs w-5">{i + 1}.</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Content */}
      <div className="space-y-16 leading-relaxed">
        {/* 1. Abstract */}
        <Section id="abstract">
          <SectionTitle number="01">{t("toc.abstract")}</SectionTitle>
          <p className="text-muted-foreground">{t("abstract.p1")}</p>
          <p className="text-muted-foreground mt-4">{t("abstract.p2")}</p>
        </Section>

        {/* 2. Problem */}
        <Section id="problem">
          <SectionTitle number="02">{t("toc.problem")}</SectionTitle>
          <p className="text-muted-foreground">{t("problem.p1")}</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {(["scam", "tax", "rug", "mev"] as const).map((key) => (
              <div
                key={key}
                className="p-4 rounded-xl border border-gray-200 bg-white"
              >
                <h4 className="font-semibold text-sm mb-1">
                  {t(`problem.${key}Title`)}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t(`problem.${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 3. Solution */}
        <Section id="solution">
          <SectionTitle number="03">{t("toc.solution")}</SectionTitle>
          <p className="text-muted-foreground">{t("solution.p1")}</p>
          <div className="mt-6 space-y-3">
            {(["detect", "audit", "realtime", "multichain"] as const).map(
              (key) => (
                <div key={key} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">
                      {t(`solution.${key}Title`)}
                    </span>
                    <span className="text-muted-foreground">
                      {" — "}
                      {t(`solution.${key}Desc`)}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </Section>

        {/* 4. Product Modules */}
        <Section id="modules">
          <SectionTitle number="04">{t("toc.modules")}</SectionTitle>
          <p className="text-muted-foreground mb-6">{t("modules.p1")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(
              [
                { key: "token", icon: Coins, active: true },
                { key: "nft", icon: Layers, active: false },
                { key: "nfa", icon: Target, active: false },
                { key: "mev", icon: Zap, active: false },
                { key: "flashLoan", icon: BarChart3, active: false },
                { key: "audit", icon: Brain, active: true },
              ] as const
            ).map(({ key, icon: Icon, active }) => (
              <div
                key={key}
                className={`p-4 rounded-xl border ${active ? "border-neon-green/30 bg-neon-green/5" : "border-gray-200 bg-white"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-semibold text-sm">
                    {t(`modules.${key}Title`)}
                  </h4>
                  {active ? (
                    <span className="text-[10px] bg-neon-green/10 text-neon-green px-1.5 py-0.5 rounded font-medium">
                      LIVE
                    </span>
                  ) : (
                    <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-medium">
                      SOON
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(`modules.${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Technology */}
        <Section id="tech">
          <SectionTitle number="05">{t("toc.tech")}</SectionTitle>
          <p className="text-muted-foreground">{t("tech.p1")}</p>
          <div className="mt-6 space-y-4">
            {(["evmbench", "ai", "goplus", "chain"] as const).map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white"
              >
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  {key === "evmbench" && (
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  )}
                  {key === "ai" && (
                    <Brain className="h-4 w-4 text-muted-foreground" />
                  )}
                  {key === "goplus" && (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                  {key === "chain" && (
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">
                    {t(`tech.${key}Title`)}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(`tech.${key}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. Token Economics */}
        <Section id="token">
          <SectionTitle number="06">{t("toc.token")}</SectionTitle>
          <p className="text-muted-foreground">{t("token.p1")}</p>

          {/* Token Info Table */}
          <div className="mt-6 p-6 rounded-2xl border border-gray-200 bg-white">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Coins className="h-4 w-4" />
              {t("token.infoTitle")}
            </h3>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-muted-foreground">
                {t("token.name")}
              </span>
              <span className="font-medium">OpenBench Token (OBT)</span>
              <span className="text-muted-foreground">
                {t("token.standard")}
              </span>
              <span className="font-medium">ERC-20 (BEP-20)</span>
              <span className="text-muted-foreground">
                {t("token.chain")}
              </span>
              <span className="font-medium">BNB Smart Chain (BSC)</span>
              <span className="text-muted-foreground">
                {t("token.decimals")}
              </span>
              <span className="font-medium">18</span>
            </div>
          </div>

          {/* Utility */}
          <h3 className="font-semibold mt-8 mb-4">{t("token.utilityTitle")}</h3>
          <div className="space-y-3">
            {(["auditPay", "apiAccess", "premium", "governance"] as const).map(
              (key) => (
                <div key={key} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">
                      {t(`token.${key}Title`)}
                    </span>
                    <span className="text-muted-foreground">
                      {" — "}
                      {t(`token.${key}Desc`)}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Pricing */}
          <h3 className="font-semibold mt-8 mb-4">{t("token.pricingTitle")}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="text-sm text-muted-foreground">
                {t("token.auditPrice")}
              </p>
              <p className="text-2xl font-bold mt-1">100 OBT</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="text-sm text-muted-foreground">
                {t("token.apiPrice")}
              </p>
              <p className="text-2xl font-bold mt-1">1 OBT</p>
            </div>
          </div>

          {/* Distribution */}
          <h3 className="font-semibold mt-8 mb-4">
            {t("token.distributionTitle")}
          </h3>
          <div className="space-y-2">
            {(
              [
                { key: "community", pct: "40%" },
                { key: "ecosystem", pct: "25%" },
                { key: "team", pct: "15%" },
                { key: "liquidity", pct: "10%" },
                { key: "reserve", pct: "10%" },
              ] as const
            ).map(({ key, pct }) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="text-sm">
                  {t(`token.dist.${key}`)}
                </span>
                <span className="font-mono font-medium text-sm">{pct}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 7. Roadmap */}
        <Section id="roadmap">
          <SectionTitle number="07">{t("toc.roadmap")}</SectionTitle>
          <div className="space-y-6">
            {(["q1", "q2", "q3", "q4"] as const).map((q) => (
              <div
                key={q}
                className="relative pl-8 border-l-2 border-gray-200 pb-2"
              >
                <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-foreground" />
                <h4 className="font-semibold text-sm">
                  {t(`roadmap.${q}Title`)}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(`roadmap.${q}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Security */}
        <Section id="security">
          <SectionTitle number="08">{t("toc.security")}</SectionTitle>
          <p className="text-muted-foreground">{t("security.p1")}</p>
          <p className="text-muted-foreground mt-4">{t("security.p2")}</p>
        </Section>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-muted-foreground mb-6">{t("cta")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background rounded-full px-8"
            >
              <Link href="/scan">
                {t("ctaScan")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              <Link href="/audit">{t("ctaAudit")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
