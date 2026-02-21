import { Badge } from "@/components/ui/badge";
import { SEVERITY_CONFIG } from "@/lib/constants";
import type { Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: Severity;
  label?: string;
  className?: string;
}

export function SeverityBadge({ severity, label, className }: SeverityBadgeProps) {
  const config = SEVERITY_CONFIG[severity];

  return (
    <Badge
      variant="outline"
      className={cn(
        config.bgColor,
        config.borderColor,
        config.color,
        "font-semibold",
        className
      )}
    >
      {label || config.label}
    </Badge>
  );
}
