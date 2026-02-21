import type {
  EVMBenchJobRequest,
  EVMBenchJobResponse,
  EVMBenchHistoryResponse,
  EVMBenchMode,
} from "./types";

const EVMBENCH_BASE =
  process.env.EVMBENCH_API_URL || "http://localhost:1337";

export async function submitJob(
  contractSource: string,
  mode: EVMBenchMode = "detect"
): Promise<EVMBenchJobResponse> {
  const body: EVMBenchJobRequest = {
    contract_source: contractSource,
    mode,
    language: "solidity",
  };

  const response = await fetch(`${EVMBENCH_BASE}/v1/jobs/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`EVMBench API error: ${response.status}`);
  }

  return response.json();
}

export async function getJobStatus(
  jobId: string
): Promise<EVMBenchJobResponse> {
  const response = await fetch(`${EVMBENCH_BASE}/v1/jobs/${jobId}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`EVMBench API error: ${response.status}`);
  }

  return response.json();
}

export async function getJobHistory(): Promise<EVMBenchHistoryResponse> {
  const response = await fetch(`${EVMBENCH_BASE}/v1/jobs/history`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`EVMBench API error: ${response.status}`);
  }

  return response.json();
}
