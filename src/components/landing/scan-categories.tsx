"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Coins, Image, Landmark, Gamepad2, Dog, ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    key: "token",
    icon: Coins,
    examples: [
      { name: "USDT", chain: "1", address: "0xdac17f958d2ee523a2206206994597c13d831ec7" },
      { name: "PEPE", chain: "1", address: "0x6982508145454ce325ddbe47a25d4ec3d2311933" },
      { name: "SHIB", chain: "1", address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce" },
    ],
  },
  {
    key: "nft",
    icon: Image,
    examples: [
      { name: "BAYC", chain: "1", address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" },
      { name: "Azuki", chain: "1", address: "0xed5af388653567af2f388e6224dc7c4b3241c544" },
      { name: "Pudgy Penguins", chain: "1", address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8" },
    ],
  },
  {
    key: "defi",
    icon: Landmark,
    examples: [
      { name: "Uniswap V3", chain: "1", address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" },
      { name: "Aave", chain: "1", address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9" },
      { name: "PancakeSwap", chain: "56", address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82" },
    ],
  },
  {
    key: "gamefi",
    icon: Gamepad2,
    examples: [
      { name: "AXS", chain: "1", address: "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b" },
      { name: "SAND", chain: "1", address: "0x3845badade8e6dff049820680d1f14bd3903a5d0" },
      { name: "GALA", chain: "1", address: "0xd1d2eb1b1e90b638588728b4130137d262c87cae" },
    ],
  },
  {
    key: "meme",
    icon: Dog,
    examples: [
      { name: "DOGE", chain: "56", address: "0xba2ae424d960c26247dd6c32edc70b295c744c43" },
      { name: "FLOKI", chain: "56", address: "0xfb5b838b6cfeedc2873ab27866079ac55363d37e" },
      { name: "BONK", chain: "1", address: "0x1151cb3d861920e07a38e03eead12c32178567f6" },
    ],
  },
] as const;

export function ScanCategories() {
  const t = useTranslations("scanCategories");

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 text-foreground">
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto text-sm">
          {t("subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {CATEGORIES.map(({ key, icon: Icon, examples }) => (
            <div
              key={key}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-9 w-9 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Icon className="h-4.5 w-4.5 text-foreground" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{t(key)}</h3>
              </div>
              <ul className="space-y-2">
                {examples.map((ex) => (
                  <li key={ex.name}>
                    <Link
                      href={`/report/${ex.chain}/${ex.address}`}
                      className="group flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{ex.name}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
