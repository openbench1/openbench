import { ImageResponse } from "next/og";
import { getChainById } from "@/lib/chains";
import { getCachedScan } from "@/lib/goplus/cached-client";

export const alt = "OpenBench Token Security Report";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string; chain: string; address: string }>;
}) {
  const { chain: chainId, address } = await params;
  const chain = getChainById(chainId);
  const scan = await getCachedScan(chainId, address);

  const tokenName = scan?.tokenInfo.name || "Unknown Token";
  const tokenSymbol = scan?.tokenInfo.symbol || "???";
  const safetyScore = scan?.safetyScore ?? 0;
  const isHoneypot = scan?.isHoneypot ?? false;
  const chainName = chain?.name || "Unknown";

  const scoreColor = isHoneypot
    ? "#ff0040"
    : safetyScore >= 80
      ? "#00ff41"
      : safetyScore >= 50
        ? "#ffaa00"
        : "#ff0040";

  const statusText = isHoneypot
    ? "HONEYPOT"
    : safetyScore >= 80
      ? "SAFE"
      : safetyScore >= 50
        ? "CAUTION"
        : "DANGER";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)",
          fontFamily: "sans-serif",
          color: "#e8e8f0",
        }}
      >
        {/* Top: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#00ff41",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 800,
              color: "#000",
            }}
          >
            OB
          </div>
          <span style={{ color: "#00ff41", fontSize: "28px", fontWeight: 700 }}>
            OpenBench
          </span>
          <span style={{ color: "#555", fontSize: "20px", marginLeft: "8px" }}>
            EVMBench-Powered Security
          </span>
        </div>

        {/* Middle: Token info and score */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "52px", fontWeight: 700, lineHeight: 1.1 }}>
              {tokenName.length > 20 ? tokenName.slice(0, 20) + "..." : tokenName}
            </div>
            <div style={{ color: "#888899", fontSize: "28px" }}>
              ${tokenSymbol} on {chainName}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "20px 40px",
              borderRadius: "16px",
              border: `2px solid ${scoreColor}33`,
              background: `${scoreColor}0a`,
            }}
          >
            <div style={{ fontSize: "72px", fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
              {isHoneypot ? "0" : safetyScore}
            </div>
            <div style={{ color: scoreColor, fontSize: "18px", fontWeight: 700, letterSpacing: "2px" }}>
              {statusText}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1a1a2e",
            paddingTop: "20px",
          }}
        >
          <span style={{ color: "#666", fontSize: "16px" }}>
            {address.slice(0, 6)}...{address.slice(-4)} on {chainName}
          </span>
          <span style={{ color: "#00d4ff", fontSize: "16px", fontWeight: 600 }}>
            Scan free at openbench.xyz
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
