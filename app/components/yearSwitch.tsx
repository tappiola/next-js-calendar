import Link from "next/link";

export const YearSwitch = ({ year }: { year: number }) => {
  return (
    <div className="flex items-center justify-center mx-auto pb-4 gap-x-12">
      <Link
        href={`/?${new URLSearchParams({ year: String(year - 1) }).toString()}`}
        className="text-neutral-400 hover:text-neutral-50 flex items-center justify-center gap-2"
      >
        <span className="text-xl">&larr;</span> Prev
      </Link>
      <div className="text-amber-400 font-bold text-3xl">{year}</div>
      <Link
        href={`/?${new URLSearchParams({ year: String(year + 1) }).toString()}`}
        className="text-neutral-400 hover:text-neutral-50 flex items-center justify-center gap-2"
      >
        Next <span className="text-xl">&rarr;</span>
      </Link>
    </div>
  );
};
