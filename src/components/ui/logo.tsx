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
        <path
          d="M8 11C8 11 8 8 16 5.5C24 8 24 11 24 11V17.5C24 22.5 20.5 25.8 16 27C11.5 25.8 8 22.5 8 17.5V11Z"
          fill="#10B981"
          fillOpacity="0.15"
          stroke="#10B981"
          strokeWidth="1.2"
        />
        <path
          d="M16 10V22"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 13.5C12 11.567 13.567 10 15.5 10"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 18.5C12 20.433 13.567 22 15.5 22"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 10H18.5C19.88 10 21 11.12 21 12.5C21 13.88 19.88 15.5 18.5 15.5H16"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M16 16.5H19C20.38 16.5 21.5 17.62 21.5 19C21.5 20.38 20.38 22 19 22H16"
          stroke="#10B981"
          strokeWidth="1.8"
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
