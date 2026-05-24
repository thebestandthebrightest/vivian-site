"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  type SVGProps,
  useEffect,
  useRef,
} from "react";

type ProjectModalShellProps = {
  isOpen: boolean;
  onClose: () => void;
  labelledById: string;
  title: string;
  summary: string;
  eyebrow?: string;
  children?: ReactNode;
  closeLabel?: string;
  panelClassName?: string;
  contentClassName?: string;
  childrenClassName?: string;
  showHeader?: boolean;
};

export function ProjectModalShell({
  isOpen,
  onClose,
  labelledById,
  title,
  summary,
  eyebrow,
  children,
  closeLabel = "Close modal",
  panelClassName = "sm:max-w-[95rem]",
  contentClassName = "max-w-[84rem]",
  childrenClassName = "space-y-12 lg:space-y-14",
  showHeader = true,
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
        className={`modal-panel-in relative mx-auto h-screen w-full overflow-y-auto bg-background sm:h-[calc(100vh-2.5rem)] sm:border sm:border-line ${panelClassName}`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="focus-ring modal-close-button absolute right-3 top-3 z-20 text-2xl font-light leading-none motion-reduce:transition-none sm:right-4 sm:top-4"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={`mx-auto w-full px-6 pb-18 pt-12 sm:px-10 sm:pt-14 lg:px-12 ${contentClassName}`}>
          {showHeader ? (
            <header className="grid gap-6 pb-12 pt-6 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-10">
              <div>
                {eyebrow ? (
                  <p className="system-eyebrow mb-3">{eyebrow}</p>
                ) : null}
                <h2
                  id={labelledById}
                  className="font-display text-[clamp(2.6rem,6vw,4.25rem)] font-medium leading-[0.95] text-foreground"
                >
                  {title}
                </h2>
              </div>
              <p className="max-w-xl text-[0.98rem] leading-7 text-muted sm:text-[1.05rem]">
                {summary}
              </p>
            </header>
          ) : null}

          <div className={childrenClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ModalSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="system-eyebrow">{children}</p>
  );
}

export type ModalIconName =
  | "arrow-right"
  | "bar-chart"
  | "calendar-check"
  | "check-circle"
  | "clipboard"
  | "database"
  | "layers"
  | "message-square"
  | "monitor"
  | "sliders"
  | "target"
  | "users"
  | "wallet";

const MODAL_ICON_PATHS: Record<ModalIconName, ReactNode> = {
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 16v-4M12 16V8M17 16v-6" />
    </>
  ),
  "calendar-check": (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="1.5" />
      <path d="M8 3v3M16 3v3M3 9.5h18" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.5 2.25 2.25 4.75-5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="1.5" />
      <path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 14.5h6M9 18h4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="2.5" />
      <path d="M4 5.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
      <path d="M4 11.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8 4.5-8 4.5-8-4.5z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </>
  ),
  "message-square": <path d="M4 5.5h16v11H10.5L7 20v-3.5H4z" />,
  monitor: (
    <>
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path d="M9 20h6M12 16.5V20" />
      <path d="M8 12.5v-3M12 12.5v-5M16 12.5v-4" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h6M14 6h6M4 12h10M18 12h2M4 18h3M11 18h9" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="9" cy="18" r="2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M16 14.5a4.5 4.5 0 0 1 4.5 4.5" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7.5h15a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19.5H5.5A2.5 2.5 0 0 1 3 17V7a2.5 2.5 0 0 1 2.5-2.5H18" />
      <path d="M16.5 13.5h4" />
      <path d="M7 9.5h4" />
    </>
  ),
};

export function ModalIcon({
  name,
  className = "h-4 w-4",
  ...rest
}: { name: ModalIconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.45}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {MODAL_ICON_PATHS[name]}
    </svg>
  );
}

type ModalTabsProps<T extends string> = {
  items: Array<{ id: T; label: string }>;
  active: T;
  onChange: (id: T) => void;
  ariaLabel: string;
  idPrefix: string;
};

export function ModalTabs<T extends string>({
  items,
  active,
  onChange,
  ariaLabel,
  idPrefix,
}: ModalTabsProps<T>) {
  return (
    <div className="border-b border-line">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex min-w-max gap-2 overflow-x-auto pb-4 lg:min-w-0 lg:flex-wrap"
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              id={`${idPrefix}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${item.id}`}
              onClick={() => onChange(item.id)}
              className="focus-ring inline-flex items-center border px-3 py-2 text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] transition-colors motion-reduce:transition-none"
              style={{
                borderColor: isActive ? "var(--sage-line)" : "transparent",
                background: isActive
                  ? "linear-gradient(180deg, rgba(219, 229, 201, 0.2) 0%, rgba(219, 229, 201, 0.34) 100%)"
                  : "transparent",
                color: isActive ? "var(--foreground)" : "var(--quiet)",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type ModalListItem = {
  title: string;
  detail?: string;
  icon?: ModalIconName;
};

export function SkillsImpactColumns({
  skills,
  impact,
  showConnector = false,
}: {
  skills: ModalListItem[];
  impact: ModalListItem[];
  showConnector?: boolean;
}) {
  return (
    <section className="border-t border-line pt-8">
      <div
        className={`grid gap-8 lg:items-start lg:gap-10 ${
          showConnector ? "lg:grid-cols-[1fr_auto_1fr]" : "lg:grid-cols-2"
        }`}
      >
        <ModalListColumn heading="SKILLS USED" items={skills} />
        {showConnector ? (
          <div
            aria-hidden="true"
            className="hidden self-stretch justify-center lg:flex lg:items-center"
          >
            <ModalArrow />
          </div>
        ) : null}
        <ModalListColumn
          heading="IMPACT"
          items={impact}
          borderColor="var(--sage-line)"
        />
      </div>
    </section>
  );
}

function ModalListColumn({
  heading,
  items,
  borderColor = "var(--line)",
}: {
  heading: string;
  items: ModalListItem[];
  borderColor?: string;
}) {
  return (
    <div>
      <p className="system-eyebrow">{heading}</p>
      <ul className="mt-5 space-y-5">
        {items.map((item) => (
          <li key={item.title} className="border-t pt-4" style={{ borderColor }}>
            <div className="flex items-start gap-2.5">
              {item.icon ? (
                <ModalIcon
                  name={item.icon}
                  className="mt-0.5 h-4 w-4 shrink-0 text-quiet"
                />
              ) : null}
              <div>
                <p className="text-[0.95rem] font-medium leading-6 text-foreground">
                  {item.title}
                </p>
                {item.detail ? (
                  <p className="mt-1.5 text-sm leading-6 text-muted">
                    {item.detail}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

type KpiStripProps = {
  items: Array<{
    label: string;
    value: string;
    highlight?: boolean;
    icon?: ModalIconName;
  }>;
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
                    color: "var(--sage-deep)",
                  }
                : undefined
            }
          >
            {item.value}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            {item.icon ? <ModalIcon name={item.icon} className="h-4 w-4" /> : null}
            <span>{item.label}</span>
          </div>
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
          <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            {item.label}
          </p>
          <p className="mt-3 font-display text-4xl font-medium leading-none text-foreground">
            {item.value}
            <span aria-hidden="true" className="ml-1 text-base text-quiet">
              {item.direction === "up" ? "↑" : "↓"}
            </span>
          </p>
          {item.detail ? (
            <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
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
            <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
              Step {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1.5 font-display text-lg font-medium leading-tight text-foreground sm:text-xl">
              {step.label}
            </p>
            {step.sublabel ? (
              <p className="mt-2 text-sm leading-6 text-muted">{step.sublabel}</p>
            ) : null}
          </div>
          {index < steps.length - 1 ? (
            <div
              aria-hidden="true"
              className="hidden items-center justify-center self-stretch sm:flex"
            >
              <ModalArrow />
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
          <p className="text-sm font-medium leading-6 text-foreground">
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
          <p className="text-right text-sm font-medium leading-5 text-foreground">
            {item.display}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ModalArrow({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`modal-arrow ${className}`}>
      →
    </span>
  );
}

export function ModalInlineLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`focus-ring modal-inline-link ${className}`}
    >
      <span>{children}</span>
      <span className="modal-inline-link-arrow">→</span>
    </a>
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
