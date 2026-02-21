/**
 * API Key Pool Manager
 *
 * Supports single key and multi-key modes:
 * - Single: OPENAI_API_KEY (current)
 * - Multi:  OPENAI_API_KEYS = "sk-xxx,sk-yyy,sk-zzz" (future)
 *
 * Features:
 * - Round-robin rotation across multiple keys
 * - Cooldown on failure (60s default)
 */

interface KeyState {
  key: string;
  cooldownUntil: number; // timestamp, 0 = available
}

class KeyPool {
  private keys: KeyState[] = [];
  private index = 0;
  private cooldownMs: number;

  constructor(envKeys: string, envKey: string, cooldownMs = 60_000) {
    this.cooldownMs = cooldownMs;

    const multiKeys = process.env[envKeys];
    if (multiKeys) {
      this.keys = multiKeys
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
        .map((key) => ({ key, cooldownUntil: 0 }));
    }

    if (this.keys.length === 0) {
      const singleKey = process.env[envKey];
      if (singleKey) {
        this.keys = [{ key: singleKey, cooldownUntil: 0 }];
      }
    }
  }

  /** Get the next available API key (round-robin, skipping cooled-down keys) */
  getKey(): string {
    if (this.keys.length === 0) {
      throw new Error("No API keys configured");
    }

    const now = Date.now();
    const total = this.keys.length;

    for (let i = 0; i < total; i++) {
      const idx = (this.index + i) % total;
      const state = this.keys[idx];
      if (state.cooldownUntil <= now) {
        this.index = (idx + 1) % total;
        return state.key;
      }
    }

    // All keys on cooldown — use the one with earliest cooldown expiry
    const earliest = this.keys.reduce((a, b) =>
      a.cooldownUntil < b.cooldownUntil ? a : b
    );
    return earliest.key;
  }

  /** Mark a key as failed — puts it on cooldown */
  markFailed(key: string): void {
    const state = this.keys.find((k) => k.key === key);
    if (state) {
      state.cooldownUntil = Date.now() + this.cooldownMs;
    }
  }

  get size(): number {
    return this.keys.length;
  }
}

// Singleton pools
let openaiPool: KeyPool | null = null;
let anthropicPool: KeyPool | null = null;

export function getOpenAIKeyPool(): KeyPool {
  if (!openaiPool) {
    openaiPool = new KeyPool("OPENAI_API_KEYS", "OPENAI_API_KEY");
  }
  return openaiPool;
}

export function getAnthropicKeyPool(): KeyPool {
  if (!anthropicPool) {
    anthropicPool = new KeyPool("ANTHROPIC_API_KEYS", "ANTHROPIC_API_KEY");
  }
  return anthropicPool;
}
