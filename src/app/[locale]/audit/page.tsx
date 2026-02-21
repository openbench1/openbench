import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AuditForm } from "@/components/audit/audit-form";
import { AuditCapabilities } from "@/components/audit/audit-capabilities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function AuditPage() {
  const t = useTranslations("audit");

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/5 mb-4">
          <span className="text-sm text-neon-green font-medium">
            {t("badge")}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t("title")}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Capabilities Overview */}
      <AuditCapabilities />

      {/* Audit Form */}
      <AuditForm />
    </div>
  );
}
