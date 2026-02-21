import { prisma } from "./prisma";
import { Prisma } from "@/generated/prisma/client";
import type { AuditStore, StoredAudit } from "../types";

export class PrismaAuditStore implements AuditStore {
  async saveAudit(audit: StoredAudit): Promise<void> {
    const reportValue = audit.report
      ? (audit.report as unknown as Prisma.InputJsonValue)
      : Prisma.JsonNull;

    await prisma.audit.upsert({
      where: { id: audit.id },
      update: {
        status: audit.status,
        report: reportValue,
        error: audit.error ?? null,
        completedAt: audit.completedAt ? new Date(audit.completedAt) : null,
      },
      create: {
        id: audit.id,
        engine: audit.engine,
        sourceCode: audit.sourceCode,
        status: audit.status,
        report: reportValue,
        error: audit.error ?? null,
        userId: audit.userId ?? null,
        createdAt: new Date(audit.createdAt),
        completedAt: audit.completedAt ? new Date(audit.completedAt) : null,
      },
    });
  }

  async getAudit(id: string): Promise<StoredAudit | undefined> {
    const row = await prisma.audit.findUnique({ where: { id } });
    if (!row) return undefined;
    return this.toStoredAudit(row);
  }

  async getAllAudits(): Promise<StoredAudit[]> {
    const rows = await prisma.audit.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return rows.map((r) => this.toStoredAudit(r));
  }

  async getUserAudits(userId: string): Promise<StoredAudit[]> {
    const rows = await prisma.audit.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return rows.map((r) => this.toStoredAudit(r));
  }

  async getDashboardStats() {
    const [total, completed, latest] = await Promise.all([
      prisma.audit.count(),
      prisma.audit.findMany({
        where: { status: "completed" },
        select: { report: true },
      }),
      prisma.audit.findFirst({ orderBy: { createdAt: "desc" } }),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const criticals = completed.reduce(
      (sum, a) => sum + ((a.report as any)?.severityCounts?.critical || 0),
      0
    );
    const avgScore =
      completed.length > 0
        ? Math.round(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            completed.reduce(
              (sum, a) => sum + ((a.report as any)?.securityScore || 0),
              0
            ) / completed.length
          )
        : 0;

    return {
      totalAudits: total,
      criticalFindings: criticals,
      averageScore: avgScore,
      lastAuditDate: latest?.createdAt.toISOString(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toStoredAudit(row: any): StoredAudit {
    return {
      id: row.id,
      engine: row.engine,
      sourceCode: row.sourceCode,
      status: row.status,
      report: row.report ?? undefined,
      error: row.error ?? undefined,
      userId: row.userId ?? undefined,
      createdAt: row.createdAt.toISOString(),
      completedAt: row.completedAt?.toISOString(),
    };
  }
}
