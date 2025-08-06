// import { useEffect } from "react";

export const Modal = ({
  open,
  onClose,
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  open: boolean;
}) => {
  // useEffect(() => {
  //   if (!open) return;
  //   const onKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") onClose();
  //   };
  //   window.addEventListener("keydown", onKeyDown);
  //   return () => window.removeEventListener("keydown", onKeyDown);
  // }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-md bg-stone-800 rounded-xl shadow-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-neutral-600 hover:text-neutral-400 text-2xl focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="p-6">{children}</div>
        {footer && <div className=" p-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};
