import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ScanForm } from "@/components/scan/scan-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "scan" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ScanPage() {
  const t = await getTranslations("scan");

  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t("title")}</h1>
        <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
      </div>
      <ScanForm />
    </div>
  );
}
