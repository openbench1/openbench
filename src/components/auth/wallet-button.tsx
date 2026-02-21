"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "@/lib/wallet/config";

export function WalletButton() {
  if (!wagmiConfig) return null;

  return (
    <ConnectButton
      chainStatus="icon"
      accountStatus="avatar"
      showBalance={false}
    />
  );
}
