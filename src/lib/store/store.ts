import { PrismaScanStore } from "../db/scan-store";
import { PrismaAuditStore } from "../db/audit-store";

export const scanStore = new PrismaScanStore();
export const auditStore = new PrismaAuditStore();
