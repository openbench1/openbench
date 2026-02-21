import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  iconSize?: number;
}

export function Logo({ className, showText = true, iconSize = 28 }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="6" fill="#171717" />
        {/* C bracket — left side with 3D angle */}
        <path
          d="M16 4 L5 10 L5 22 L16 28"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* B spine — center vertical */}
        <path
          d="M16 4 V28"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* B top bump — rectangular */}
        <path
          d="M16 4 H25 V16 H16"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* B bottom bump — slightly wider */}
        <path
          d="M16 16 H27 V28 H16"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {showText && (
        <span className="text-lg tracking-tight text-foreground">
          <span className="font-normal">Open</span>
          <span className="font-bold">Bench</span>
        </span>
      )}
    </span>
  );
}
