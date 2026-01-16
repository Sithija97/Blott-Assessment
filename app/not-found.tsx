import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-4 text-white">
      <p className="font-helvetica-now text-[64px] tracking-[0.25em] text-white/70">
        404
      </p>
      <p className="text-center font-sans text-[36px] uppercase tracking-[-0.04em] text-white">
        Page Not Found
      </p>
      <p className="text-center font-roboto text-base text-white/70">
        The page you were chasing was moved, renamed, or never published.
      </p>
      <Link
        href="/"
        className="rounded-full border border-white/40 px-8 py-2 text-sm uppercase tracking-[0.2em] transition-colors hover:border-white"
      >
        Back to headlines
      </Link>
    </main>
  );
}
