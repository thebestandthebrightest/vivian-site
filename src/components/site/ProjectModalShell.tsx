"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

type ProjectModalShellProps = {
  isOpen: boolean;
  onClose: () => void;
  labelledById: string;
  title: string;
  summary: string;
  children?: ReactNode;
};

export function ProjectModalShell({
  isOpen,
  onClose,
  labelledById,
  title,
  summary,
  children,
}: ProjectModalShellProps) {
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
        className="modal-panel-in mx-auto h-screen w-full overflow-y-auto bg-background sm:h-[calc(100vh-2.5rem)] sm:max-w-[78rem] sm:border sm:border-line"
      >
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-3 sm:px-10 lg:px-12">
          <div className="sticky top-0 z-10 -mx-6 flex justify-end bg-background/95 px-6 py-3 sm:-mx-10 sm:px-10 lg:-mx-12 lg:px-12">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="focus-ring inline-flex items-center gap-2 text-xs font-medium uppercase leading-5 tracking-[0.18em] text-foreground transition hover:opacity-70 motion-reduce:transition-none"
            >
              <span>Close</span>
              <span aria-hidden="true" className="text-base leading-none">
                ×
              </span>
            </button>
          </div>

          <header className="grid gap-6 pb-10 pt-6 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-10">
            <h2
              id={labelledById}
              className="font-display text-[clamp(2.6rem,6vw,4.25rem)] font-medium leading-[0.95] text-foreground"
            >
              {title}
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted sm:text-[1.05rem]">
              {summary}
            </p>
          </header>

          <div className="space-y-10 lg:space-y-12">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ModalSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.22em] text-quiet">
      {children}
    </p>
  );
}

type KpiStripProps = {
  items: Array<{ label: string; value: string; highlight?: boolean }>;
};

export function KpiStrip({ items }: KpiStripProps) {
  return (
    <div className="grid gap-x-8 gap-y-6 border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className="font-display text-4xl font-medium leading-none text-foreground lg:text-[2.75rem]"
            style={
              item.highlight
                ? {
                    background: "var(--sage-soft)",
                    boxShadow: "inset 0 -0.35em 0 var(--sage-soft)",
                    display: "inline-block",
                    padding: "0 0.2em",
                  }
                : undefined
            }
          >
            {item.value}
          </p>
          <p className="mt-2 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

type DeltaCardsProps = {
  items: Array<{
    label: string;
    value: string;
    direction: "up" | "down";
    detail?: string;
    highlight?: boolean;
  }>;
};

export function DeltaCards({ items }: DeltaCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="border border-line bg-background p-5"
          style={
            item.highlight
              ? { borderColor: "var(--sage-line)", background: "var(--sage-soft)" }
              : undefined
          }
        >
          <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            {item.label}
          </p>
          <p className="mt-3 font-display text-4xl font-medium leading-none text-foreground">
            {item.value}
            <span aria-hidden="true" className="ml-1 text-base text-quiet">
              {item.direction === "up" ? "↑" : "↓"}
            </span>
          </p>
          {item.detail ? (
            <p className="mt-3 text-xs leading-5 text-muted">{item.detail}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

type FlowDiagramProps = {
  steps: Array<{ label: string; sublabel?: string; emphasized?: boolean }>;
};

export function FlowDiagram({ steps }: FlowDiagramProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
      {steps.map((step, index) => (
        <div key={step.label} className="flex flex-1 items-stretch gap-2 sm:gap-3">
          <div
            className="flex-1 border border-line px-4 py-4 sm:px-5 sm:py-5"
            style={
              step.emphasized
                ? {
                    borderColor: "var(--sage-line)",
                    background: "var(--sage-soft)",
                  }
                : { background: "var(--background)" }
            }
          >
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Step {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1.5 font-display text-lg font-medium leading-tight text-foreground sm:text-xl">
              {step.label}
            </p>
            {step.sublabel ? (
              <p className="mt-2 text-xs leading-5 text-muted">{step.sublabel}</p>
            ) : null}
          </div>
          {index < steps.length - 1 ? (
            <div
              aria-hidden="true"
              className="flex items-center justify-center self-stretch text-quiet"
            >
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

type CompactBarsProps = {
  items: Array<{ label: string; value: number; display: string; highlight?: boolean }>;
};

export function CompactBars({ items }: CompactBarsProps) {
  const max = Math.max(...items.map((i) => i.value));

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-[minmax(8rem,12rem)_1fr_3.5rem] items-center gap-4"
        >
          <p className="text-xs font-medium leading-5 text-foreground">
            {item.label}
          </p>
          <div className="h-3 bg-foreground/[0.05]">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(item.value / max) * 100}%`,
                background: item.highlight ? "var(--sage)" : "rgba(72,38,29,0.3)",
              }}
              aria-hidden="true"
            />
          </div>
          <p className="text-right text-xs font-medium leading-5 text-foreground">
            {item.display}
          </p>
        </div>
      ))}
    </div>
  );
}

type UsageGridProps = {
  items: string[];
};

export function UsageGrid({ items }: UsageGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item}
          className="border-t border-line pt-3 text-sm font-medium leading-6 text-foreground"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
