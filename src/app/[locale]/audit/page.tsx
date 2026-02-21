import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AuditForm } from "@/components/audit/audit-form";

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
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t("title")}</h1>
        <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
      </div>
      <AuditForm />
    </div>
  );
}
