"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useTokenPayment } from "@/hooks/use-token-payment";
import { PAYMENT_TOKEN } from "@/lib/payment/config";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Coins,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface PayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess: (txHash: string) => void;
}

export function PayDialog({
  open,
  onOpenChange,
  onPaymentSuccess,
}: PayDialogProps) {
  const t = useTranslations("payment");
  const { openConnectModal } = useConnectModal();

  const {
    pay,
    reset,
    isPaying,
    isConfirming,
    isSuccess,
    txHash,
    error,
    balance,
    hasEnoughBalance,
    isConnected,
    formattedAmount,
  } = useTokenPayment("audit");

  // When payment succeeds, notify parent
  useEffect(() => {
    if (isSuccess && txHash) {
      onPaymentSuccess(txHash);
    }
  }, [isSuccess, txHash, onPaymentSuccess]);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Payment details */}
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("amount")}</span>
              <span className="font-semibold">
                {formattedAmount} {PAYMENT_TOKEN.symbol}
              </span>
            </div>
            {isConnected && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("balance")}</span>
                <span
                  className={
                    hasEnoughBalance
                      ? "font-medium text-emerald-600"
                      : "font-medium text-red-500"
                  }
                >
                  {Number(balance).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  {PAYMENT_TOKEN.symbol}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("network")}</span>
              <span className="font-medium">BNB Smart Chain</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success */}
          {isSuccess && txHash && (
            <div className="flex items-start gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium">{t("success")}</p>
                <a
                  href={`https://bscscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline"
                >
                  {t("viewTx")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}

          {/* Action button */}
          {!isConnected ? (
            <Button
              onClick={() => openConnectModal?.()}
              className="w-full py-5"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {t("connectWallet")}
            </Button>
          ) : isSuccess ? (
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-700"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {t("continue")}
            </Button>
          ) : (
            <Button
              onClick={pay}
              disabled={isPaying || isConfirming || !hasEnoughBalance}
              className="w-full py-5"
            >
              {isPaying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("confirming")}
                </>
              ) : isConfirming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("waiting")}
                </>
              ) : !hasEnoughBalance ? (
                <>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {t("insufficientBalance")}
                </>
              ) : (
                <>
                  <Coins className="mr-2 h-4 w-4" />
                  {t("payButton", { amount: formattedAmount, symbol: PAYMENT_TOKEN.symbol })}
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
