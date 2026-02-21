"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wallet/config";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const theme = darkTheme({
  accentColor: "#00ff41",
  accentColorForeground: "#000000",
  borderRadius: "medium",
  fontStack: "system",
  overlayBlur: "small",
});

theme.colors.modalBackground = "#0d0d14";
theme.colors.modalBorder = "#1a1a2e";
theme.colors.profileForeground = "#0d0d14";
theme.colors.closeButtonBackground = "#1a1a2e";

export function Web3Provider({ children }: { children: React.ReactNode }) {
  if (!wagmiConfig) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
