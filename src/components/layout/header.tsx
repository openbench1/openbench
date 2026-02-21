"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { UserButton } from "@/components/auth/user-button";
import { WalletButton } from "@/components/auth/wallet-button";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/scan", label: t("scan") },
    { href: "/dashboard", label: t("dashboard") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cyber-bg/80 backdrop-blur-xl border-b border-cyber-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="h-7 w-7 text-neon-green group-hover:animate-glow-pulse transition-all" />
          <span className="text-xl font-bold text-glow-green tracking-tight">
            OpenBench
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-neon-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://x.com/openbench_lab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-neon-green transition-colors"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <LanguageSwitcher />
          <WalletButton />
          <UserButton />
          <Button
            asChild
            size="sm"
            className="bg-neon-green text-black font-semibold hover:shadow-neon-green transition-all"
          >
            <Link href="/scan">{t("launchApp")}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-cyber-bg/95 backdrop-blur-xl border-b border-cyber-border p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-neon-green py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://x.com/openbench_lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neon-green transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <LanguageSwitcher />
            <WalletButton />
            <UserButton />
            <Button
              asChild
              size="sm"
              className="bg-neon-green text-black font-semibold"
            >
              <Link href="/scan">{t("launchApp")}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
