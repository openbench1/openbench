// GoPlus API raw response types

export interface GoPlusResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface GoPlusTokenSecurityResult {
  [address: string]: GoPlusTokenData;
}

export interface GoPlusTokenData {
  token_name?: string;
  token_symbol?: string;
  total_supply?: string;
  decimals?: string;
  holder_count?: string;
  creator_address?: string;
  owner_address?: string;

  // Honeypot
  is_honeypot?: string; // "0" or "1"
  honeypot_with_same_creator?: string;

  // Tax
  buy_tax?: string; // "0.05" = 5%
  sell_tax?: string;
  slippage_modifiable?: string; // "0" or "1"

  // Contract risks
  is_open_source?: string;
  is_proxy?: string;
  is_mintable?: string;
  can_take_back_ownership?: string;
  owner_change_balance?: string;
  hidden_owner?: string;
  selfdestruct?: string;
  external_call?: string;
  personal_slippage_modifiable?: string;

  // Trading
  cannot_buy?: string;
  cannot_sell_all?: string;
  trading_cooldown?: string;
  transfer_pausable?: string;
  is_blacklisted?: string;
  is_whitelisted?: string;
  is_anti_whale?: string;
  anti_whale_modifiable?: string;

  // Holders
  holders?: GoPlusHolder[];
  lp_holders?: GoPlusLPHolder[];
  lp_total_supply?: string;

  // DEX
  dex?: GoPlusDex[];

  // Ownership
  owner_percent?: string;
  creator_percent?: string;
}

export interface GoPlusHolder {
  address: string;
  balance: string;
  percent: string;
  is_contract: number;
  is_locked: number;
  tag?: string;
}

export interface GoPlusLPHolder {
  address: string;
  balance: string;
  percent: string;
  is_contract: number;
  is_locked: number;
  tag?: string;
  NFT_list?: unknown[];
}

export interface GoPlusDex {
  name: string;
  liquidity: string;
  pair: string;
}
