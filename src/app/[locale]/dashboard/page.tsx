import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";
import { scanStore, auditStore } from "@/lib/store/store";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentScans } from "@/components/dashboard/recent-scans";
import { RecentAudits } from "@/components/dashboard/recent-audits";

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
  const session = await auth();
  const userId = session?.user?.id;

  const [stats, scans, audits] = await Promise.all([
    scanStore.getDashboardStats(),
    userId ? scanStore.getUserScans(userId) : scanStore.getAllScans(),
    userId ? auditStore.getUserAudits(userId) : auditStore.getAllAudits(),
  ]);

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>
      <StatsCards stats={stats} />
      <RecentScans scans={scans} />
      <RecentAudits audits={audits} />
    </div>
  );
}
