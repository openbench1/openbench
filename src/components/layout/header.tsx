"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { WalletButton } from "@/components/auth/wallet-button";
import { Button } from "@/components/ui/button";
import { Menu, X, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/logo";
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
    { href: "/audit", label: t("audit") },
    { href: "/dashboard", label: t("dashboard") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo iconSize={28} />
        </Link>

        {/* Desktop Nav — center */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://x.com/openbench_lab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <LanguageSwitcher />
          <WalletButton />
          <Button
            asChild
            size="sm"
            className="bg-foreground text-background font-medium rounded-full px-5 hover:bg-foreground/90 transition-all"
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
        <div className="md:hidden bg-white border-b border-gray-200 p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground py-2"
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
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <LanguageSwitcher />
            <WalletButton />
            <Button
              asChild
              size="sm"
              className="bg-foreground text-background font-medium rounded-full px-5"
            >
              <Link href="/scan">{t("launchApp")}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
