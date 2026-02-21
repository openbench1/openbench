// ===== Scan Types (Core) =====

export type RiskLevel = "safe" | "warning" | "danger";

export interface Chain {
  id: string;
  name: string;
  shortName: string;
  goplusChainId: string;
  explorerUrl: string;
  icon: string;
}

export interface RiskItem {
  key: string;
  nameEn: string;
  nameZh: string;
  status: RiskLevel;
  descriptionEn: string;
  descriptionZh: string;
  value?: string;
}

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: number;
  chainId: string;
  isOpenSource: boolean;
  isProxy: boolean;
  creatorAddress?: string;
  ownerAddress?: string;
}

export interface HolderInfo {
  address: string;
  balance: string;
  percent: string;
  isContract: boolean;
  isLocked: boolean;
  tag?: string;
}

export interface LiquidityInfo {
  dexName?: string;
  pairAddress?: string;
  liquidity?: string;
  isLpLocked: boolean;
  lpLockPercent?: string;
  lpLockEndTime?: string;
  lpHolders?: HolderInfo[];
}

export interface ScanResult {
  id: string;
  address: string;
  chainId: string;
  status: "scanning" | "completed" | "error";
  createdAt: string;
  safetyScore: number;
  tokenInfo: TokenInfo;
  riskItems: RiskItem[];
  holders: HolderInfo[];
  liquidity: LiquidityInfo;
  buyTax: string;
  sellTax: string;
  isHoneypot: boolean;
  honeypotReason?: string;
  error?: string;
}

export interface ScanStore {
  saveScan(scan: ScanResult): Promise<void>;
  getScan(address: string, chainId: string): Promise<ScanResult | undefined>;
  getAllScans(): Promise<ScanResult[]>;
  getDashboardStats(): Promise<DashboardStats>;
}

export interface DashboardStats {
  totalScans: number;
  dangerTokens: number;
  safeTokens: number;
  lastScanDate?: string;
}

// ===== AI Audit Types (Advanced Feature) =====

export type Severity = "critical" | "high" | "medium" | "low" | "info" | "gas";
export type AIEngine = "claude" | "openai";

export interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
  gas: number;
}

export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  category: string;
  description: string;
  impact: string;
  location: string;
  functionName?: string;
  swcId?: string;
  codeSnippet?: string;
  recommendation: string;
  fixedCode?: string;
}

export interface GasOptimization {
  id: string;
  title: string;
  description: string;
  location: string;
  estimatedSavings?: string;
  recommendation: string;
}

export interface AuditReport {
  contractName: string;
  solidityVersion?: string;
  securityScore: number;
  summary: string;
  vulnerabilities: Vulnerability[];
  gasOptimizations: GasOptimization[];
  severityCounts: SeverityCounts;
  linesOfCode: number;
}

export interface EngineInput {
  code: string;
  locale: string;
}

export interface AuditEngineInterface {
  name: string;
  analyze(input: EngineInput): Promise<AuditReport>;
}

export interface StoredAudit {
  id: string;
  engine: AIEngine;
  sourceCode: string;
  status: "analyzing" | "completed" | "error";
  report?: AuditReport;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

export interface AuditStore {
  saveAudit(audit: StoredAudit): Promise<void>;
  getAudit(id: string): Promise<StoredAudit | undefined>;
  getAllAudits(): Promise<StoredAudit[]>;
  getDashboardStats(): Promise<{
    totalAudits: number;
    criticalFindings: number;
    averageScore: number;
    lastAuditDate?: string;
  }>;
}
