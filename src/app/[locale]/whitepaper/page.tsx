import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WhitepaperContent } from "@/components/whitepaper/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whitepaper" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default function WhitepaperPage() {
  return <WhitepaperContent />;
}
