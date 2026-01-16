"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-4 text-white">
      <p className="font-helvetica-now text-[40px] tracking-[-0.04em] uppercase">
        Something went wrong
      </p>
      <p className="text-center font-roboto text-base text-white/70">
        We could not load the latest headlines. You can retry below or head back
        later.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-full border border-white/40 px-7 py-2 text-sm uppercase tracking-[0.2em] transition-colors hover:border-white hover:text-white"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-full bg-white px-7 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/90"
        >
          Go home
        </a>
      </div>
      {error.digest && (
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Error code: {error.digest}
        </p>
      )}
    </main>
  );
}
