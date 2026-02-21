import type { EVMBenchResult, EVMBenchVulnerability } from "./types";
import type {
  AuditReport,
  Vulnerability,
  GasOptimization,
  Severity,
  SeverityCounts,
} from "../types";

const VALID_SEVERITIES: Severity[] = [
  "critical",
  "high",
  "medium",
  "low",
  "info",
];

function validateSeverity(s: string): Severity {
  const lower = s.toLowerCase() as Severity;
  return VALID_SEVERITIES.includes(lower) ? lower : "info";
}

function parseVulnerability(
  v: EVMBenchVulnerability,
  index: number
): Vulnerability {
  return {
    id: `V-${String(index + 1).padStart(3, "0")}`,
    title: v.title || "Unknown Vulnerability",
    severity: validateSeverity(v.severity || "info"),
    category: v.category || "General",
    description: v.description || "",
    impact: v.impact || "",
    location: v.location || "Unknown",
    functionName: v.function_name,
    swcId: v.swc_id,
    codeSnippet: v.code_snippet,
    recommendation: v.recommendation || "",
    fixedCode: v.fixed_code,
  };
}

function parseGasOptimization(
  g: { title: string; description: string; location: string; estimated_savings?: string; recommendation: string },
  index: number
): GasOptimization {
  return {
    id: `G-${String(index + 1).padStart(3, "0")}`,
    title: g.title || "Gas Optimization",
    description: g.description || "",
    location: g.location || "Unknown",
    estimatedSavings: g.estimated_savings,
    recommendation: g.recommendation || "",
  };
}

function calculateScore(counts: SeverityCounts): number {
  let score = 100;
  score -= counts.critical * 25;
  score -= counts.high * 15;
  score -= counts.medium * 8;
  score -= counts.low * 3;
  score -= counts.info * 1;
  return Math.max(0, Math.min(100, score));
}

export function parseEVMBenchResult(result: EVMBenchResult): AuditReport {
  const vulnerabilities = (result.vulnerabilities || []).map(parseVulnerability);
  const gasOptimizations = (result.gas_optimizations || []).map(parseGasOptimization);

  const severityCounts: SeverityCounts = {
    critical: vulnerabilities.filter((v) => v.severity === "critical").length,
    high: vulnerabilities.filter((v) => v.severity === "high").length,
    medium: vulnerabilities.filter((v) => v.severity === "medium").length,
    low: vulnerabilities.filter((v) => v.severity === "low").length,
    info: vulnerabilities.filter((v) => v.severity === "info").length,
    gas: gasOptimizations.length,
  };

  const securityScore =
    typeof result.security_score === "number"
      ? Math.max(0, Math.min(100, result.security_score))
      : calculateScore(severityCounts);

  return {
    contractName: result.contract_name || "Unknown Contract",
    solidityVersion: result.solidity_version,
    securityScore,
    summary: result.summary || "",
    vulnerabilities,
    gasOptimizations,
    severityCounts,
    linesOfCode: 0, // Will be set by caller with actual source line count
  };
}
