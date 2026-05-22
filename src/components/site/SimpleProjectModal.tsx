"use client";

import { type KeyboardEvent, useEffect, useRef } from "react";

export type SimpleProjectModalLink = {
  label: string;
  href: string | null;
};

export type SimpleProjectModalData = {
  title: string;
  subtitle: string;
  summary: string;
  details?: string[];
  links?: SimpleProjectModalLink[];
  emptyState?: string;
};

type SimpleProjectModalProps = {
  data: SimpleProjectModalData;
  isOpen: boolean;
  onClose: () => void;
  labelledById: string;
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.22em] text-quiet">
      {children}
    </p>
  );
}

export function SimpleProjectModal({
  data,
  isOpen,
  onClose,
  labelledById,
}: SimpleProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/18 p-0 text-foreground sm:p-5">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
        onKeyDown={handleKeyDown}
        className="modal-panel-in mx-auto h-screen w-full overflow-y-auto bg-background sm:h-[calc(100vh-2.5rem)] sm:max-w-[88rem] sm:border sm:border-line"
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-5 sm:px-10 lg:px-14">
          <div className="sticky top-0 z-10 -mx-6 flex justify-end bg-background/95 px-6 py-4 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="focus-ring text-xs font-medium uppercase leading-5 tracking-[0.2em] text-quiet transition hover:text-foreground motion-reduce:transition-none"
            >
              Close
            </button>
          </div>

          <header className="grid gap-10 pb-14 pt-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:pb-16 lg:pt-14">
            <div>
              <SectionLabel>{data.subtitle}</SectionLabel>
              <h2
                id={labelledById}
                className="mt-4 font-display text-[clamp(3.4rem,9vw,6.5rem)] font-medium leading-[0.92] text-foreground"
              >
                {data.title}
              </h2>
            </div>
            <p className="max-w-xl font-display text-[1.55rem] font-medium leading-[1.2] text-foreground sm:text-[1.85rem]">
              {data.summary}
            </p>
          </header>

          {data.details && data.details.length > 0 ? (
            <section className="border-t border-line py-14 sm:py-18">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Program detail</SectionLabel>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.details.map((item) => (
                  <p
                    key={item}
                    className="border-t border-line pt-4 font-display text-2xl font-medium leading-tight text-foreground"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {data.links && data.links.length > 0 ? (
            <section className="border-t border-line py-14 sm:py-18">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Selected features</SectionLabel>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {data.links.map((link) => (
                  <div
                    key={link.label}
                    className="flex items-center justify-between border border-line bg-foreground/[0.02] px-5 py-4"
                  >
                    <span className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-foreground">
                      {link.label}
                    </span>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet hover:text-foreground"
                      >
                        Open
                      </a>
                    ) : (
                      <span className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
                        Featured
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {data.emptyState ? (
            <section className="border-t border-line py-14 sm:py-18">
              <p className="max-w-xl text-sm leading-7 text-muted">
                {data.emptyState}
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
