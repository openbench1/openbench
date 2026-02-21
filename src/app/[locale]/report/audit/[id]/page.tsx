import { notFound } from "next/navigation";
import { auditStore } from "@/lib/store/store";
import { ReportHeader } from "@/components/report/report-header";
import { ReportSummary } from "@/components/report/report-summary";
import { VulnerabilityList } from "@/components/report/vulnerability-list";
import { GasOptimizationSection } from "@/components/report/gas-optimization";
import { Separator } from "@/components/ui/separator";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const audit = await auditStore.getAudit(id);

  if (!audit || !audit.report) {
    notFound();
  }

  const report = audit.report;

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl space-y-8">
      <ReportHeader contractName={report.contractName} />
      <Separator className="bg-cyber-border" />
      <ReportSummary
        report={report}
        engine={audit.engine}
        createdAt={audit.createdAt}
      />
      <VulnerabilityList
        vulnerabilities={report.vulnerabilities}
        severityCounts={report.severityCounts}
      />
      <GasOptimizationSection optimizations={report.gasOptimizations} />
    </div>
  );
}
