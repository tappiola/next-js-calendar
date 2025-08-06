import clsx from "clsx";

type TooltipProps = {
  text?: string;
  children: React.ReactNode;
  className?: string;
};

export const Tooltip = ({ text, children, className }: TooltipProps) => {
  if (!text) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={clsx("relative group inline-block", className)}>
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex bg-neutral-700 text-white text-xs rounded px-3 py-2 z-10 whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};
