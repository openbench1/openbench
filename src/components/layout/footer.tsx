"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Twitter, Github, ExternalLink } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gray-200 py-12">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3">
              <Logo iconSize={24} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://x.com/openbench_lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/openbench1/openbench"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t("product")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/scan" className="hover:text-foreground transition-colors">
                  {t("tokenLink")}
                </Link>
              </li>
              <li>
                <Link href="/nft" className="hover:text-foreground transition-colors">
                  {t("nftLink")}
                </Link>
              </li>
              <li>
                <Link href="/nfa" className="hover:text-foreground transition-colors">
                  {t("nfaLink")}
                </Link>
              </li>
              <li>
                <Link href="/mev" className="hover:text-foreground transition-colors">
                  {t("mevLink")}
                </Link>
              </li>
              <li>
                <Link href="/flash-loan" className="hover:text-foreground transition-colors">
                  {t("flashLoanLink")}
                </Link>
              </li>
              <li>
                <Link href="/audit" className="hover:text-foreground transition-colors">
                  {t("auditLink")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t("resources")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/openbench1/openbench#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {t("docsLink")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://swcregistry.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  SWC Registry
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/openbench1/openbench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Community */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/openbench1/openbench/blob/main/PRIVACY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {t("privacyLink")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/openbench1/openbench/blob/main/TERMS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {t("termsLink")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  {t("dashboardLink")}
                </Link>
              </li>
              <li>
                <a
                  href="https://x.com/openbench_lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Twitter / X
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
