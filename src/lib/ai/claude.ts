import Anthropic from "@anthropic-ai/sdk";
import type { AuditEngineInterface, AuditReport, EngineInput } from "../types";
import { getSystemPrompt, getUserPrompt } from "./prompts";
import { parseAuditResponse } from "./parser";

export class ClaudeEngine implements AuditEngineInterface {
  name = "claude";
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
  }

  async analyze(input: EngineInput): Promise<AuditReport> {
    const response = await this.client.messages.create({
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
  }
}
