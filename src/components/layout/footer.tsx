import { useTranslations } from "next-intl";
import { Shield, Twitter } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gray-200 py-12">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-neon-green" />
              <span className="text-base font-semibold text-foreground">OpenBench</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
            <a
              href="https://x.com/openbench_lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-3"
            >
              <Twitter className="h-4 w-4" />
              @openbench_lab
            </a>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t("product")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Audit
              </li>
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Dashboard
              </li>
              <li className="hover:text-foreground cursor-pointer transition-colors">
                API
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t("resources")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Documentation
              </li>
              <li className="hover:text-foreground cursor-pointer transition-colors">
                SWC Registry
              </li>
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Blog
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Privacy
              </li>
              <li className="hover:text-foreground cursor-pointer transition-colors">
                Terms
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
