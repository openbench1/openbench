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
        {/* Left "C" bracket — forms half of hexagonal shape */}
        <path
          d="M16 5 L6 10.5 L6 21.5 L16 27"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* B top bump */}
        <path
          d="M16 5 C22.5 5, 26 7.5, 26 10.5 C26 13.5, 22.5 16, 16 16"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* B bottom bump (slightly wider) */}
        <path
          d="M16 16 C23 16, 27 18.5, 27 21.5 C27 24.5, 23 27, 16 27"
          stroke="#ffffff"
          strokeWidth="2.4"
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
