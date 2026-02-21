"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export function UserButton() {
  const { data: session, status } = useSession();
  const t = useTranslations("header");

  if (status === "loading") {
    return (
      <div className="h-8 w-8 rounded-full bg-cyber-border animate-pulse" />
    );
  }

  if (!session) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signIn("github")}
        className="text-muted-foreground hover:text-neon-green"
      >
        <LogIn className="h-4 w-4 mr-1.5" />
        {t("signIn")}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {session.user?.image ? (
        <img
          src={session.user.image}
          alt={session.user.name || ""}
          className="h-7 w-7 rounded-full border border-neon-green/30"
        />
      ) : (
        <div className="h-7 w-7 rounded-full bg-neon-green/20 border border-neon-green/30 flex items-center justify-center text-xs text-neon-green font-bold">
          {session.user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut()}
        className="text-muted-foreground hover:text-neon-green"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
