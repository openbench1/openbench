import type { ScanStore } from "../types";

// Re-export the interface for convenience
export type { ScanStore };

// Factory function - swap implementation here for database migration
export { MemoryScanStore as DefaultScanStore } from "./memory";
