"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Upload, FileCode2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileContent: (content: string, fileName: string) => void;
}

export function FileUpload({ onFileContent }: FileUploadProps) {
  const t = useTranslations("audit.editor");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".sol")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileContent(content, file.name);
        setFileName(file.name);
      };
      reader.readAsText(file);
    },
    [onFileContent]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground mb-2 block">
        {t("uploadLabel")}
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200",
          isDragging
            ? "border-neon-green bg-neon-green/5"
            : "border-cyber-border hover:border-cyber-border-hover"
        )}
      >
        <input
          type="file"
          accept=".sol"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {fileName ? (
          <div className="flex items-center justify-center gap-2 text-neon-green">
            <FileCode2 className="h-5 w-5" />
            <span className="text-sm font-medium">{fileName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFileName(null);
              }}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="h-8 w-8" />
            <span className="text-sm">{t("uploadHint")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
