import type { Severity } from "./types";

export const SEVERITY_ORDER: Severity[] = [
  "critical",
  "high",
  "medium",
  "low",
  "info",
  "gas",
];

export const SEVERITY_CONFIG: Record<
  Severity,
  {
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
  }
> = {
  critical: {
    color: "text-severity-critical",
    bgColor: "bg-severity-critical/15",
    borderColor: "border-severity-critical/30",
    label: "Critical",
  },
  high: {
    color: "text-severity-high",
    bgColor: "bg-severity-high/15",
    borderColor: "border-severity-high/30",
    label: "High",
  },
  medium: {
    color: "text-severity-medium",
    bgColor: "bg-severity-medium/15",
    borderColor: "border-severity-medium/30",
    label: "Medium",
  },
  low: {
    color: "text-severity-low",
    bgColor: "bg-severity-low/15",
    borderColor: "border-severity-low/30",
    label: "Low",
  },
  info: {
    color: "text-severity-info",
    bgColor: "bg-severity-info/15",
    borderColor: "border-severity-info/30",
    label: "Info",
  },
  gas: {
    color: "text-severity-gas",
    bgColor: "bg-severity-gas/15",
    borderColor: "border-severity-gas/30",
    label: "Gas",
  },
};
