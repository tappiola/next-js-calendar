"use client";

import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div>
      <h2>{error.message ?? "Something went wrong!"}</h2>
      <button onClick={() => router.replace("/")}>Try again</button>
    </div>
  );
}
