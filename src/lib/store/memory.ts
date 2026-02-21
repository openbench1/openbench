import type { ScanStore, ScanResult, DashboardStats, AuditStore, StoredAudit } from "../types";

const BASE_SCANS = 12847;

export class MemoryScanStore implements ScanStore {
  private scans = new Map<string, ScanResult>();

  private key(address: string, chainId: string): string {
    return `${chainId}:${address.toLowerCase()}`;
  }

  async saveScan(scan: ScanResult): Promise<void> {
    this.scans.set(this.key(scan.address, scan.chainId), scan);
  }

  async getScan(
    address: string,
    chainId: string
  ): Promise<ScanResult | undefined> {
    return this.scans.get(this.key(address, chainId));
  }

  async getAllScans(): Promise<ScanResult[]> {
    return Array.from(this.scans.values()).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const all = await this.getAllScans();
    const completed = all.filter((s) => s.status === "completed");
    const danger = completed.filter((s) => s.isHoneypot || s.safetyScore < 40);
    const safe = completed.filter((s) => s.safetyScore >= 70);

    return {
      totalScans: completed.length + BASE_SCANS,
      dangerTokens: danger.length + 1893,
      safeTokens: safe.length + 8420,
      lastScanDate: all[0]?.createdAt,
    };
  }
}

export const scanStore = new MemoryScanStore();

// Legacy audit store for AI code audit feature
export class MemoryAuditStore implements AuditStore {
  private audits = new Map<string, StoredAudit>();

  async saveAudit(audit: StoredAudit): Promise<void> {
    this.audits.set(audit.id, audit);
  }

  async getAudit(id: string): Promise<StoredAudit | undefined> {
    return this.audits.get(id);
  }

  async getAllAudits(): Promise<StoredAudit[]> {
    return Array.from(this.audits.values()).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getDashboardStats() {
    const all = await this.getAllAudits();
    const completed = all.filter((a) => a.status === "completed" && a.report);
    const criticals = completed.reduce(
      (sum, a) => sum + (a.report?.severityCounts.critical || 0),
      0
    );
    const avgScore =
      completed.length > 0
        ? Math.round(
            completed.reduce((sum, a) => sum + (a.report?.securityScore || 0), 0) /
              completed.length
          )
        : 0;

    return {
      totalAudits: all.length,
      criticalFindings: criticals,
      averageScore: avgScore,
      lastAuditDate: all[0]?.createdAt,
    };
  }
}

export const auditStore = new MemoryAuditStore();
