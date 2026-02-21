"use client";

import { useState } from "react";
import type { StoredAudit } from "@/lib/types";
import { useLocale } from "next-intl";

export function useAudit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  const submitAudit = async (
    code: string
  ): Promise<StoredAudit> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, locale }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.error || "Audit failed");
      }

      const result: StoredAudit = await response.json();
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitAudit };
}
