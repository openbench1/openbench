import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, bsc } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const wagmiConfig = projectId
  ? getDefaultConfig({
      appName: "OpenBench",
      projectId,
      chains: [mainnet, bsc],
      ssr: true,
    })
  : null;
