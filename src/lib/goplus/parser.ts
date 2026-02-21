import type { GoPlusTokenData } from "./types";
import type {
  ScanResult,
  TokenInfo,
  RiskItem,
  RiskLevel,
  HolderInfo,
  LiquidityInfo,
} from "../types";
import { nanoid } from "nanoid";

function toBool(val?: string): boolean {
  return val === "1";
}

function toPercent(val?: string): string {
  if (!val) return "0%";
  const num = parseFloat(val) * 100;
  return `${num.toFixed(1)}%`;
}

function riskItem(
  key: string,
  nameEn: string,
  nameZh: string,
  status: RiskLevel,
  descEn: string,
  descZh: string,
  value?: string
): RiskItem {
  return {
    key,
    nameEn,
    nameZh,
    status,
    descriptionEn: descEn,
    descriptionZh: descZh,
    value,
  };
}

function buildRiskItems(data: GoPlusTokenData): RiskItem[] {
  const items: RiskItem[] = [];

  // Honeypot
  const isHoneypot = toBool(data.is_honeypot);
  items.push(
    riskItem(
      "honeypot",
      "Honeypot Detection",
      "貔貅/蜜罐检测",
      isHoneypot ? "danger" : "safe",
      isHoneypot
        ? "This token is a honeypot! You may not be able to sell it."
        : "This token can be bought and sold normally.",
      isHoneypot
        ? "这是貔貅币！你可能无法卖出。"
        : "该代币可以正常买卖。"
    )
  );

  // Buy tax
  const buyTax = parseFloat(data.buy_tax || "0") * 100;
  const buyLevel: RiskLevel =
    buyTax > 10 ? "danger" : buyTax > 5 ? "warning" : "safe";
  items.push(
    riskItem(
      "buyTax",
      "Buy Tax",
      "买入税率",
      buyLevel,
      buyTax > 10
        ? `Buy tax is ${buyTax.toFixed(1)}%, which is very high!`
        : buyTax > 5
        ? `Buy tax is ${buyTax.toFixed(1)}%, relatively high.`
        : `Buy tax is ${buyTax.toFixed(1)}%, normal.`,
      buyTax > 10
        ? `买入税 ${buyTax.toFixed(1)}%，非常高！`
        : buyTax > 5
        ? `买入税 ${buyTax.toFixed(1)}%，偏高。`
        : `买入税 ${buyTax.toFixed(1)}%，正常。`,
      `${buyTax.toFixed(1)}%`
    )
  );

  // Sell tax
  const sellTax = parseFloat(data.sell_tax || "0") * 100;
  const sellLevel: RiskLevel =
    sellTax > 10 ? "danger" : sellTax > 5 ? "warning" : "safe";
  items.push(
    riskItem(
      "sellTax",
      "Sell Tax",
      "卖出税率",
      sellLevel,
      sellTax > 10
        ? `Sell tax is ${sellTax.toFixed(1)}%, which is very high!`
        : sellTax > 5
        ? `Sell tax is ${sellTax.toFixed(1)}%, relatively high.`
        : `Sell tax is ${sellTax.toFixed(1)}%, normal.`,
      sellTax > 10
        ? `卖出税 ${sellTax.toFixed(1)}%，非常高！`
        : sellTax > 5
        ? `卖出税 ${sellTax.toFixed(1)}%，偏高。`
        : `卖出税 ${sellTax.toFixed(1)}%，正常。`,
      `${sellTax.toFixed(1)}%`
    )
  );

  // Open source
  const isOpenSource = toBool(data.is_open_source);
  items.push(
    riskItem(
      "openSource",
      "Contract Verified",
      "合约是否开源",
      isOpenSource ? "safe" : "warning",
      isOpenSource
        ? "Contract source code is verified and public."
        : "Contract source code is not verified. Be cautious.",
      isOpenSource
        ? "合约代码已开源验证。"
        : "合约未开源验证，请谨慎。"
    )
  );

  // Proxy contract
  const isProxy = toBool(data.is_proxy);
  items.push(
    riskItem(
      "proxy",
      "Proxy Contract",
      "代理合约",
      isProxy ? "warning" : "safe",
      isProxy
        ? "This is a proxy contract. The owner could change the logic."
        : "This is not a proxy contract.",
      isProxy
        ? "这是代理合约，所有者可能修改合约逻辑。"
        : "非代理合约。"
    )
  );

  // Mintable
  const isMintable = toBool(data.is_mintable);
  items.push(
    riskItem(
      "mintable",
      "Can Mint New Tokens",
      "是否可增发",
      isMintable ? "warning" : "safe",
      isMintable
        ? "The owner can mint new tokens, which may dilute your holdings."
        : "No minting function found.",
      isMintable
        ? "所有者可以增发新代币，可能稀释你的持仓。"
        : "未发现增发功能。"
    )
  );

  // Transfer pausable
  const isPausable = toBool(data.transfer_pausable);
  items.push(
    riskItem(
      "pausable",
      "Can Pause Trading",
      "是否可暂停交易",
      isPausable ? "danger" : "safe",
      isPausable
        ? "The owner can pause all transfers. This is very risky!"
        : "Trading cannot be paused.",
      isPausable
        ? "所有者可以暂停所有转账，非常危险！"
        : "交易不可被暂停。"
    )
  );

  // Slippage modifiable
  const slippageModifiable = toBool(data.slippage_modifiable);
  items.push(
    riskItem(
      "taxModifiable",
      "Can Modify Tax",
      "是否可修改税率",
      slippageModifiable ? "danger" : "safe",
      slippageModifiable
        ? "The owner can change buy/sell tax at any time!"
        : "Tax rates cannot be modified.",
      slippageModifiable
        ? "所有者可以随时修改买卖税率！"
        : "税率不可修改。"
    )
  );

  // Blacklist
  const hasBlacklist = toBool(data.is_blacklisted);
  items.push(
    riskItem(
      "blacklist",
      "Blacklist Function",
      "黑名单功能",
      hasBlacklist ? "warning" : "safe",
      hasBlacklist
        ? "The contract has a blacklist function. Your address could be blocked."
        : "No blacklist function found.",
      hasBlacklist
        ? "合约有黑名单功能，你的地址可能被封禁。"
        : "未发现黑名单功能。"
    )
  );

  // Owner can take back ownership
  const canTakeBack = toBool(data.can_take_back_ownership);
  items.push(
    riskItem(
      "takeBackOwnership",
      "Can Reclaim Ownership",
      "是否可回收所有权",
      canTakeBack ? "danger" : "safe",
      canTakeBack
        ? "The previous owner can reclaim ownership even after renouncing!"
        : "Ownership cannot be reclaimed.",
      canTakeBack
        ? "前所有者可以重新获取所有权，即使已放弃！"
        : "所有权不可被回收。"
    )
  );

  // Owner change balance
  const canChangeBalance = toBool(data.owner_change_balance);
  items.push(
    riskItem(
      "changeBalance",
      "Owner Can Modify Balance",
      "所有者可修改余额",
      canChangeBalance ? "danger" : "safe",
      canChangeBalance
        ? "The owner can directly modify anyone's token balance!"
        : "Balances cannot be modified by the owner.",
      canChangeBalance
        ? "所有者可以直接修改任何人的代币余额！"
        : "所有者无法修改余额。"
    )
  );

  // Hidden owner
  const hiddenOwner = toBool(data.hidden_owner);
  items.push(
    riskItem(
      "hiddenOwner",
      "Hidden Owner",
      "隐藏所有者",
      hiddenOwner ? "danger" : "safe",
      hiddenOwner
        ? "The contract has a hidden owner function!"
        : "No hidden owner detected.",
      hiddenOwner
        ? "合约存在隐藏所有者功能！"
        : "未检测到隐藏所有者。"
    )
  );

  // Self-destruct
  const selfDestruct = toBool(data.selfdestruct);
  items.push(
    riskItem(
      "selfDestruct",
      "Self-destruct Function",
      "自毁功能",
      selfDestruct ? "danger" : "safe",
      selfDestruct
        ? "The contract can be self-destructed, destroying all funds!"
        : "No self-destruct function found.",
      selfDestruct
        ? "合约可以自毁，所有资金将被销毁！"
        : "未发现自毁功能。"
    )
  );

  // External call
  const externalCall = toBool(data.external_call);
  items.push(
    riskItem(
      "externalCall",
      "External Call Risk",
      "外部调用风险",
      externalCall ? "warning" : "safe",
      externalCall
        ? "The contract makes external calls, which may introduce risks."
        : "No risky external calls found.",
      externalCall
        ? "合约存在外部调用，可能引入风险。"
        : "未发现外部调用风险。"
    )
  );

  // Anti-whale
  const isAntiWhale = toBool(data.is_anti_whale);
  items.push(
    riskItem(
      "antiWhale",
      "Anti-Whale Mechanism",
      "防巨鲸机制",
      isAntiWhale ? "safe" : "warning",
      isAntiWhale
        ? "Anti-whale mechanism is in place to limit large transactions."
        : "No anti-whale protection. Large sells could crash the price.",
      isAntiWhale
        ? "有防巨鲸机制，限制大额交易。"
        : "无防巨鲸保护，大额卖出可能导致价格暴跌。"
    )
  );

  return items;
}

function calculateSafetyScore(items: RiskItem[], isHoneypot: boolean): number {
  if (isHoneypot) return 0;

  let score = 100;
  for (const item of items) {
    if (item.status === "danger") score -= 15;
    if (item.status === "warning") score -= 5;
  }
  return Math.max(0, Math.min(100, score));
}

export function parseScanResult(
  address: string,
  chainId: string,
  data: GoPlusTokenData
): ScanResult {
  const isHoneypot = toBool(data.is_honeypot);
  const riskItems = buildRiskItems(data);
  const safetyScore = calculateSafetyScore(riskItems, isHoneypot);

  const holders: HolderInfo[] = (data.holders || [])
    .slice(0, 10)
    .map((h) => ({
      address: h.address,
      balance: h.balance,
      percent: toPercent(h.percent),
      isContract: h.is_contract === 1,
      isLocked: h.is_locked === 1,
      tag: h.tag,
    }));

  const lpHolders: HolderInfo[] = (data.lp_holders || []).map((h) => ({
    address: h.address,
    balance: h.balance,
    percent: toPercent(h.percent),
    isContract: h.is_contract === 1,
    isLocked: h.is_locked === 1,
    tag: h.tag,
  }));

  const isLpLocked = lpHolders.some((h) => h.isLocked);
  const lpLockPercent = lpHolders
    .filter((h) => h.isLocked)
    .reduce((sum, h) => sum + parseFloat(h.percent), 0);

  const dex = data.dex?.[0];

  const liquidity: LiquidityInfo = {
    dexName: dex?.name,
    pairAddress: dex?.pair,
    liquidity: dex?.liquidity,
    isLpLocked,
    lpLockPercent: lpLockPercent > 0 ? `${lpLockPercent.toFixed(1)}%` : undefined,
    lpHolders,
  };

  const tokenInfo: TokenInfo = {
    address: address.toLowerCase(),
    name: data.token_name || "Unknown",
    symbol: data.token_symbol || "???",
    totalSupply: data.total_supply || "0",
    decimals: parseInt(data.decimals || "18"),
    chainId,
    isOpenSource: toBool(data.is_open_source),
    isProxy: toBool(data.is_proxy),
    creatorAddress: data.creator_address,
    ownerAddress: data.owner_address,
  };

  return {
    id: nanoid(12),
    address: address.toLowerCase(),
    chainId,
    status: "completed",
    createdAt: new Date().toISOString(),
    safetyScore,
    tokenInfo,
    riskItems,
    holders,
    liquidity,
    buyTax: `${(parseFloat(data.buy_tax || "0") * 100).toFixed(1)}%`,
    sellTax: `${(parseFloat(data.sell_tax || "0") * 100).toFixed(1)}%`,
    isHoneypot,
    honeypotReason: isHoneypot
      ? "Token cannot be sold after purchase"
      : undefined,
  };
}
