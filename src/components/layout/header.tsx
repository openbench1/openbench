"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { WalletButton } from "@/components/auth/wallet-button";
import { Button } from "@/components/ui/button";
import { Menu, X, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/scan", label: t("token") },
    { href: "/nft", label: t("nft"), soon: true },
    { href: "/nfa", label: t("nfa"), soon: true },
    { href: "/mev", label: t("mev"), soon: true },
    { href: "/flash-loan", label: t("flashLoan"), soon: true },
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
        <Link href="/" className="flex items-center shrink-0">
          <Logo iconSize={28} />
        </Link>

        {/* Desktop Nav — center */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm px-3 py-1.5 rounded-md transition-colors",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {link.soon && (
                  <span className="absolute -top-1 -right-1 text-[9px] leading-none font-medium bg-muted text-muted-foreground px-1 py-0.5 rounded">
                    soon
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
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
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2 px-2 rounded-md hover:bg-muted/50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
              {link.soon && (
                <span className="text-[9px] leading-none font-medium bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                  soon
                </span>
              )}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-3 border-t border-gray-100 mt-2">
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
