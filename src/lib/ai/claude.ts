import Anthropic from "@anthropic-ai/sdk";
import type { AuditEngineInterface, AuditReport, EngineInput } from "../types";
import { getSystemPrompt, getUserPrompt } from "./prompts";
import { parseAuditResponse } from "./parser";
import { getAnthropicKeyPool } from "./key-pool";

export class ClaudeEngine implements AuditEngineInterface {
  name = "claude";

  async analyze(input: EngineInput): Promise<AuditReport> {
    const pool = getAnthropicKeyPool();
    const apiKey = pool.getKey();

    try {
      const client = new Anthropic({ apiKey });
      const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        system: getSystemPrompt(input.locale),
        messages: [
          {
            role: "user",
            content: getUserPrompt(input.code, input.locale),
          },
        ],
      });

      const textContent = response.content.find((c) => c.type === "text");
      const rawText = textContent?.text || "";

      return parseAuditResponse(rawText, input.code);
    } catch (error) {
      pool.markFailed(apiKey);
      throw error;
    }
  }
}
