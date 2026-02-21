import { useTranslations } from "next-intl";
import { Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-cyber-border bg-cyber-card/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-6 w-6 text-neon-green" />
              <span className="text-lg font-bold text-glow-green">
                OpenBench
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("product")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-neon-green cursor-pointer transition-colors">
                Audit
              </li>
              <li className="hover:text-neon-green cursor-pointer transition-colors">
                Dashboard
              </li>
              <li className="hover:text-neon-green cursor-pointer transition-colors">
                API
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("resources")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-neon-green cursor-pointer transition-colors">
                Documentation
              </li>
              <li className="hover:text-neon-green cursor-pointer transition-colors">
                SWC Registry
              </li>
              <li className="hover:text-neon-green cursor-pointer transition-colors">
                Blog
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-neon-green cursor-pointer transition-colors">
                Privacy
              </li>
              <li className="hover:text-neon-green cursor-pointer transition-colors">
                Terms
              </li>
            </ul>
          </div>
        </div>
        <Separator className="bg-cyber-border my-8" />
        <p className="text-center text-xs text-muted-foreground">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
