// EVMBench API types (mirrors REST API from github.com/paradigmxyz/evmbench)

export type EVMBenchJobStatus = "queued" | "running" | "completed" | "failed";
export type EVMBenchMode = "detect" | "patch" | "exploit";

export interface EVMBenchJobRequest {
  contract_source: string;
  mode: EVMBenchMode;
  language?: string; // defaults to "solidity"
}

export interface EVMBenchVulnerability {
  id: string;
  title: string;
  severity: string; // "critical" | "high" | "medium" | "low" | "info"
  category: string;
  description: string;
  impact: string;
  location: string;
  function_name?: string;
  swc_id?: string;
  code_snippet?: string;
  recommendation: string;
  fixed_code?: string;
}

export interface EVMBenchResult {
  vulnerabilities: EVMBenchVulnerability[];
  gas_optimizations?: EVMBenchGasOptimization[];
  summary?: string;
  security_score?: number;
  contract_name?: string;
  solidity_version?: string;
}

export interface EVMBenchGasOptimization {
  title: string;
  description: string;
  location: string;
  estimated_savings?: string;
  recommendation: string;
}

export interface EVMBenchJob {
  id: string;
  status: EVMBenchJobStatus;
  mode: EVMBenchMode;
  created_at: string;
  updated_at?: string;
  result?: EVMBenchResult;
  error?: string;
}

export interface EVMBenchJobResponse {
  job: EVMBenchJob;
}

export interface EVMBenchHistoryResponse {
  jobs: EVMBenchJob[];
  total: number;
}
