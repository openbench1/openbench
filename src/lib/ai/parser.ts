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

function countLines(code: string): number {
  return code.split("\n").length;
}

export function parseAuditResponse(
  rawText: string,
  sourceCode: string
): AuditReport {
  try {
    // Extract JSON from potential markdown code blocks
    const jsonMatch =
      rawText.match(/```json\s*([\s\S]*?)```/) ||
      rawText.match(/```\s*([\s\S]*?)```/) ||
      rawText.match(/(\{[\s\S]*\})/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : rawText;
    const data = JSON.parse(jsonStr.trim());

    const vulnerabilities: Vulnerability[] = (data.vulnerabilities || []).map(
      (v: Record<string, unknown>, index: number) => ({
        id: `V-${String(index + 1).padStart(3, "0")}`,
        title: (v.title as string) || "Unknown Vulnerability",
        severity: validateSeverity((v.severity as string) || "info"),
        category: (v.category as string) || "General",
        description: (v.description as string) || "",
        impact: (v.impact as string) || "",
        location: (v.location as string) || "Unknown",
        functionName: (v.functionName as string) || undefined,
        swcId: (v.swcId as string) || undefined,
        codeSnippet: (v.codeSnippet as string) || undefined,
        recommendation: (v.recommendation as string) || "",
        fixedCode: (v.fixedCode as string) || undefined,
      })
    );

    const gasOptimizations: GasOptimization[] = (
      data.gasOptimizations || []
    ).map((g: Record<string, unknown>, index: number) => ({
      id: `G-${String(index + 1).padStart(3, "0")}`,
      title: (g.title as string) || "Gas Optimization",
      description: (g.description as string) || "",
      location: (g.location as string) || "Unknown",
      estimatedSavings: (g.estimatedSavings as string) || undefined,
      recommendation: (g.recommendation as string) || "",
    }));

    const severityCounts: SeverityCounts = {
      critical: vulnerabilities.filter((v) => v.severity === "critical").length,
      high: vulnerabilities.filter((v) => v.severity === "high").length,
      medium: vulnerabilities.filter((v) => v.severity === "medium").length,
      low: vulnerabilities.filter((v) => v.severity === "low").length,
      info: vulnerabilities.filter((v) => v.severity === "info").length,
      gas: gasOptimizations.length,
    };

    const securityScore =
      typeof data.securityScore === "number"
        ? Math.max(0, Math.min(100, data.securityScore))
        : calculateScore(severityCounts);

    return {
      contractName: (data.contractName as string) || "Unknown Contract",
      solidityVersion: (data.solidityVersion as string) || undefined,
      securityScore,
      summary: (data.summary as string) || "",
      vulnerabilities,
      gasOptimizations,
      severityCounts,
      linesOfCode: countLines(sourceCode),
    };
  } catch {
    // Fallback for parse failures
    return {
      contractName: "Parse Error",
      securityScore: 0,
      summary: "Failed to parse AI response. Please try again.",
      vulnerabilities: [],
      gasOptimizations: [],
      severityCounts: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        info: 0,
        gas: 0,
      },
      linesOfCode: countLines(sourceCode),
    };
  }
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
