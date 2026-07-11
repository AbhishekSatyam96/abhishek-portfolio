"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

/**
 * Copies the email to the clipboard with inline "Copied" feedback, so nobody
 * is forced through their mail client just to grab the address.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions / old browser) — the mailto CTA
      // next to this button still covers reaching out.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors hover:border-white/20 hover:text-fg"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-accent" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
