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
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
            <span className="text-sm text-muted-foreground">
              {t("badge")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-foreground">
            {t("titleHighlight")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Audit Form */}
        <div className="max-w-3xl mx-auto mb-16">
          <AuditForm />
        </div>

        {/* Capabilities */}
        <AuditCapabilities />
      </div>
    </div>
  );
}
