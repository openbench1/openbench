"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check } from "lucide-react";

interface ShareButtonsProps {
  tokenName: string;
  tokenSymbol: string;
  safetyScore: number;
  isHoneypot: boolean;
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function ShareButtons({
  tokenName,
  tokenSymbol,
  safetyScore,
  isHoneypot,
}: ShareButtonsProps) {
  const t = useTranslations("report.share");
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
    setCanNativeShare(!!navigator.share);
  }, []);

  const statusText = isHoneypot
    ? "HONEYPOT"
    : safetyScore >= 80
      ? "SAFE"
      : safetyScore >= 50
        ? "CAUTION"
        : "DANGER";

  const shareText = t("tweetText", {
    tokenName,
    tokenSymbol,
    score: safetyScore,
    status: statusText,
  });

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: `${tokenName} Security Report`,
        text: shareText,
        url: currentUrl,
      });
    } catch {
      // user cancelled
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = currentUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;

  if (!currentUrl) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {canNativeShare && (
        <Button
          variant="outline"
          size="sm"
          className="border-cyber-border hover:border-neon-blue"
          onClick={handleNativeShare}
        >
          <Share2 className="h-4 w-4 mr-1.5" />
          {t("nativeShare")}
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        className="border-cyber-border hover:border-neon-green"
        onClick={handleCopyLink}
      >
        {copied ? (
          <Check className="h-4 w-4 mr-1.5 text-neon-green" />
        ) : (
          <Copy className="h-4 w-4 mr-1.5" />
        )}
        {copied ? t("copied") : t("copyLink")}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="border-cyber-border hover:border-neon-blue"
        asChild
      >
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <XIcon className="h-4 w-4 mr-1.5" />
          {t("twitter")}
        </a>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="border-cyber-border hover:border-neon-blue"
        asChild
      >
        <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
          <TelegramIcon className="h-4 w-4 mr-1.5" />
          {t("telegram")}
        </a>
      </Button>
    </div>
  );
}
