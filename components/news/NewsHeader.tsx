export default function NewsHeader() {
  return (
    <section className="mt-[96.8px] mb-18.75">
      <h1 className="font-helvetica-now text-[80px] leading-[88%] tracking-[-0.01em] uppercase text-white mb-0">
        LATEST NEWS
      </h1>
      <div className="flex flex-row items-baseline gap-5.75">
        <h2 className="font-albra font-light text-[80px] leading-[88%] tracking-[-0.06em] uppercase text-white">
          FROM
        </h2>
        <hr className="w-48.25 border-t border-white mt-auto mb-auto" />
        <h2 className="font-helvetica-now text-[80px] leading-[88%] tracking-[-0.01em] uppercase text-white">
          THE WORLD
        </h2>
      </div>
    </section>
  );
}
