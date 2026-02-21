import type { AIEngine, AuditEngineInterface } from "../types";
import { ClaudeEngine } from "./claude";
import { OpenAIEngine } from "./openai";

export function createEngine(engine: AIEngine): AuditEngineInterface {
  switch (engine) {
    case "claude":
      return new ClaudeEngine();
    case "openai":
      return new OpenAIEngine();
    default:
      throw new Error(`Unsupported AI engine: ${engine}`);
  }
}
