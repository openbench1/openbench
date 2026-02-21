import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ComingSoon } from "@/components/layout/coming-soon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comingSoon" });
  return { title: t("flashLoanTitle") };
}

export default function FlashLoanPage() {
  return <ComingSoon titleKey="flashLoanTitle" descKey="flashLoanDesc" />;
}
