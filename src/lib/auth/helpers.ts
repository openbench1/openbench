import { auth } from "@/lib/auth";

export async function getOptionalUserId(): Promise<string | null> {
  try {
    const session = await auth();
    return (session?.user?.id as string) ?? null;
  } catch {
    return null;
  }
}
