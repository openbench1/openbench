"use client";

import { useState, useCallback } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { bsc } from "wagmi/chains";
import { erc20Abi } from "@/lib/payment/abi";
import {
  PAYMENT_TOKEN,
  TREASURY_ADDRESS,
  PRICES,
} from "@/lib/payment/config";
import { formatUnits } from "viem";

type PaymentType = keyof typeof PRICES;

export function useTokenPayment(type: PaymentType = "audit") {
  const amount = PRICES[type];
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<string | null>(null);

  // Read token balance
  const { data: rawBalance, refetch: refetchBalance } = useReadContract({
    address: PAYMENT_TOKEN.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: PAYMENT_TOKEN.chainId,
    query: { enabled: !!address },
  });

  const balance = rawBalance
    ? formatUnits(rawBalance, PAYMENT_TOKEN.decimals)
    : "0";

  const hasEnoughBalance = rawBalance ? rawBalance >= amount : false;

  // Write: transfer tokens
  const {
    writeContractAsync,
    isPending: isPaying,
  } = useWriteContract();

  // Wait for tx confirmation
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({
      hash: txHash,
      chainId: PAYMENT_TOKEN.chainId,
    });

  const pay = useCallback(async () => {
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    setError(null);

    try {
      // Switch to BSC if not already on it
      if (chainId !== PAYMENT_TOKEN.chainId) {
        await switchChainAsync({ chainId: bsc.id });
      }

      const hash = await writeContractAsync({
        address: PAYMENT_TOKEN.address,
        abi: erc20Abi,
        functionName: "transfer",
        args: [TREASURY_ADDRESS, amount],
        chainId: PAYMENT_TOKEN.chainId,
      });

      setTxHash(hash);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Payment failed";
      // Simplify common wallet errors
      if (msg.includes("User rejected") || msg.includes("denied")) {
        setError("Transaction rejected by user");
      } else if (msg.includes("insufficient")) {
        setError("Insufficient token balance");
      } else {
        setError(msg);
      }
    }
  }, [address, chainId, switchChainAsync, writeContractAsync, amount]);

  const reset = useCallback(() => {
    setTxHash(undefined);
    setError(null);
    refetchBalance();
  }, [refetchBalance]);

  return {
    pay,
    reset,
    isPaying,
    isConfirming,
    isSuccess,
    txHash,
    error,
    balance,
    hasEnoughBalance,
    isConnected: !!address,
    formattedAmount: formatUnits(amount, PAYMENT_TOKEN.decimals),
  };
}
