import OpenAI from "openai";
import type { AuditEngineInterface, AuditReport, EngineInput } from "../types";
import { getSystemPrompt, getUserPrompt } from "./prompts";
import { parseAuditResponse } from "./parser";
import { getOpenAIKeyPool } from "./key-pool";

export class OpenAIEngine implements AuditEngineInterface {
  name = "openai";

  async analyze(input: EngineInput): Promise<AuditReport> {
    const pool = getOpenAIKeyPool();
    const apiKey = pool.getKey();

    try {
      const client = new OpenAI({ apiKey });
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 8192,
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: getSystemPrompt(input.locale) },
          { role: "user", content: getUserPrompt(input.code, input.locale) },
        ],
      });

      const rawText = response.choices[0]?.message?.content || "";
      return parseAuditResponse(rawText, input.code);
    } catch (error) {
      pool.markFailed(apiKey);
      throw error;
    }
  }
}
