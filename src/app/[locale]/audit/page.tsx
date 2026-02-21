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
    <div className="min-h-screen pt-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="orb orb-green w-[300px] h-[300px] top-[5%] right-[10%]" style={{ opacity: 0.06 }} />
      <div className="orb orb-blue w-[250px] h-[250px] bottom-[20%] left-[5%]" style={{ opacity: 0.06 }} />

      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-6">
            <span className="text-sm text-neon-green font-medium">
              {t("badge")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient-green-blue">{t("titleHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Audit Form - main content */}
        <div className="max-w-3xl mx-auto mb-16">
          <AuditForm />
        </div>

        {/* Capabilities - below form */}
        <AuditCapabilities />
      </div>
    </div>
  );
}
