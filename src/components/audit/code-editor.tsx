"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-cyber-bg border border-cyber-border rounded-lg flex items-center justify-center text-muted-foreground">
      Loading editor...
    </div>
  ),
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const t = useTranslations("audit.editor");

  return (
    <div className="relative rounded-lg overflow-hidden border border-cyber-border">
      <MonacoEditor
        height="500px"
        language="sol"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-geist-mono), monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          padding: { top: 16 },
          renderLineHighlight: "line",
          bracketPairColorization: { enabled: true },
        }}
        beforeMount={(monaco) => {
          // Register Solidity language if not already registered
          const langs = monaco.languages.getLanguages();
          if (!langs.some((l: { id: string }) => l.id === "sol")) {
            monaco.languages.register({ id: "sol" });
            monaco.languages.setMonarchTokensProvider("sol", {
              keywords: [
                "pragma",
                "solidity",
                "contract",
                "interface",
                "library",
                "function",
                "modifier",
                "event",
                "struct",
                "enum",
                "mapping",
                "address",
                "bool",
                "string",
                "uint",
                "uint256",
                "uint8",
                "int",
                "int256",
                "bytes",
                "bytes32",
                "public",
                "private",
                "internal",
                "external",
                "view",
                "pure",
                "payable",
                "returns",
                "return",
                "if",
                "else",
                "for",
                "while",
                "do",
                "require",
                "assert",
                "revert",
                "emit",
                "import",
                "is",
                "new",
                "delete",
                "this",
                "super",
                "memory",
                "storage",
                "calldata",
                "msg",
                "block",
                "tx",
                "constructor",
                "receive",
                "fallback",
                "override",
                "virtual",
                "abstract",
                "immutable",
                "constant",
                "indexed",
                "anonymous",
                "unchecked",
              ],
              tokenizer: {
                root: [
                  [/\/\/.*$/, "comment"],
                  [/\/\*/, "comment", "@comment"],
                  [/"[^"]*"/, "string"],
                  [/'[^']*'/, "string"],
                  [
                    /[a-zA-Z_]\w*/,
                    {
                      cases: {
                        "@keywords": "keyword",
                        "@default": "identifier",
                      },
                    },
                  ],
                  [/0[xX][0-9a-fA-F]+/, "number.hex"],
                  [/\d+/, "number"],
                  [/[;,.]/, "delimiter"],
                ],
                comment: [
                  [/[^/*]+/, "comment"],
                  [/\*\//, "comment", "@pop"],
                  [/[/*]/, "comment"],
                ],
              },
            } as Parameters<typeof monaco.languages.setMonarchTokensProvider>[1]);
          }
        }}
      />
      <div className="absolute bottom-2 right-4 text-xs text-muted-foreground bg-cyber-bg/80 px-2 py-0.5 rounded">
        {t("charCount", { count: value.length })}
      </div>
    </div>
  );
}
