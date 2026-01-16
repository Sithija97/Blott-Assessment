export default function NewsHeader() {
  return (
    <section className="mt-[96.8px] mb-18.75 px-4 sm:px-6 lg:px-0">
      <h1 className="mb-3 font-helvetica-now text-[clamp(2.75rem,12vw,5rem)] leading-[88%] tracking-[-0.01em] uppercase text-white">
        LATEST NEWS
      </h1>
      <div className="flex flex-row items-baseline gap-5.75 max-[380px]:flex-col max-[380px]:items-start max-[380px]:gap-2">
        <h2 className="font-albra font-light text-[clamp(2.25rem,11vw,5rem)] leading-[88%] tracking-[-0.06em] uppercase text-white">
          FROM
        </h2>
        <hr className="w-48.25 border-t border-white max-[640px]:w-24 max-[448px]:w-16 max-[380px]:h-0.5 max-[380px]:w-full" />
        <h2 className="font-helvetica-now text-[clamp(2.25rem,11vw,5rem)] leading-[88%] tracking-[-0.01em] uppercase text-white">
          THE WORLD
        </h2>
      </div>
    </section>
  );
}
