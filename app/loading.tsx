export default function Loading() {
  return (
    <main className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-4 text-white">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15">
        <span
          className="h-9 w-9 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      </span>
      <p className="font-helvetica-now text-[28px] tracking-[0.2em] text-white">
        Fetching News...
      </p>
      <p className="font-roboto text-sm text-white/70">
        Fetching the latest market headlines for you.
      </p>
    </main>
  );
}
