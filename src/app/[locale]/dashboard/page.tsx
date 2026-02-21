import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { scanStore } from "@/lib/store/memory";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentScans } from "@/components/dashboard/recent-scans";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  const [stats, scans] = await Promise.all([
    scanStore.getDashboardStats(),
    scanStore.getAllScans(),
  ]);

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>
      <StatsCards stats={stats} />
      <RecentScans scans={scans} />
    </div>
  );
}
