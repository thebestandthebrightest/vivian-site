"use client";

import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";

type WellnessThroughClayProjectModalProps = {
  data: WellnessThroughClayPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

function SectionTitle({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: string;
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="mb-4 text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="font-display text-[2.55rem] font-medium leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
        {children}
      </h3>
    </div>
  );
}

function KpiBand({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div>
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
        {data.kpis.map((kpi) => (
          <div key={kpi.label}>
            <p className="font-display text-5xl font-medium leading-none text-foreground lg:text-6xl">
              {kpi.value}
            </p>
            <p className="mt-3 max-w-40 text-sm leading-6 text-muted">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
        {data.evaluationSignals.map((signal) => (
          <p key={signal} className="text-sm leading-6 text-muted">
            {signal}
          </p>
        ))}
      </div>
    </div>
  );
}

function GrowthTimeline({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {data.timeline.map((item) => (
        <div key={item.cycle} className="border-t border-line pt-5">
          <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            {item.cycle}
          </p>
          <h4 className="mt-4 font-display text-4xl font-medium leading-none text-foreground">
            {item.label}
          </h4>
          <p className="mt-5 font-display text-3xl font-medium leading-none text-foreground">
            {item.metric}
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function AttendanceChart({ data }: { data: WellnessThroughClayPreviewData }) {
  const total = data.attendanceSessions.reduce(
    (sum, session) => sum + session.attendees,
    0,
  );
  const average = total / data.attendanceSessions.length;
  const max = Math.max(...data.attendanceSessions.map((session) => session.attendees));

  return (
    <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
      <div className="space-y-7">
        <div>
          <p className="font-display text-6xl font-medium leading-none text-foreground">
            {total}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            documented duplicated attendance
          </p>
        </div>
        <div>
          <p className="font-display text-5xl font-medium leading-none text-foreground">
            {average.toFixed(1)}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">average/session</p>
        </div>
        <p className="max-w-md text-sm leading-7 text-muted">
          {data.attendanceInsight}
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex h-64 items-end gap-3 border-b border-line sm:gap-4">
          {data.attendanceSessions.map((session) => (
            <div
              key={`${session.date}-${session.attendees}`}
              className="flex min-w-0 flex-1 flex-col items-center justify-end gap-3"
            >
              <span className="text-xs font-medium leading-5 text-foreground">
                {session.attendees}
              </span>
              <div
                className="w-full bg-foreground/28 transition duration-300 hover:bg-foreground/45 motion-reduce:transition-none"
                style={{
                  height: `${Math.max((session.attendees / max) * 82, 18)}%`,
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-8 gap-3 sm:gap-4">
          {data.attendanceSessions.map((session) => (
            <div key={session.date} className="min-w-0 text-center">
              <p className="text-xs leading-5 text-muted">{session.date}</p>
              <p className="mt-1 text-[0.68rem] leading-4 text-quiet">
                {session.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectionModel({ data }: { data: WellnessThroughClayPreviewData }) {
  const [sessions, setSessions] = useState(data.projectionDefaults.sessions);
  const [averageAttendance, setAverageAttendance] = useState(
    data.projectionDefaults.averageAttendance,
  );
  const [capacity, setCapacity] = useState(data.projectionDefaults.capacity);

  const projectedAttendance = Math.round(sessions * averageAttendance);
  const projectedCapacity = sessions * capacity;
  const capacityDelta = projectedCapacity - projectedAttendance;

  const planningSignal = useMemo(() => {
    if (averageAttendance >= capacity - 1) {
      return "Demand may require added sessions or a larger room.";
    }

    if (sessions > data.projectionDefaults.sessions) {
      return "Expansion depends on team capacity and materials planning.";
    }

    return "Room to grow with current format.";
  }, [averageAttendance, capacity, data.projectionDefaults.sessions, sessions]);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
      <div className="space-y-8">
        <div>
          <p className="text-sm font-medium leading-6 text-foreground">
            Sessions planned
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[8, 10, 12].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSessions(option)}
                className={`focus-ring border px-4 py-2 text-sm leading-6 transition duration-300 motion-reduce:transition-none ${
                  sessions === option
                    ? "border-foreground bg-foreground text-background"
                    : "border-line text-muted hover:border-foreground/35 hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="flex items-baseline justify-between gap-5">
            <span className="text-sm font-medium leading-6 text-foreground">
              Average attendance/session
            </span>
            <span className="font-display text-3xl font-medium leading-none text-foreground">
              {averageAttendance.toFixed(1)}
            </span>
          </span>
          <input
            type="range"
            min="14"
            max="20"
            step="0.1"
            value={averageAttendance}
            onChange={(event) => setAverageAttendance(Number(event.target.value))}
            className="mt-4 h-1.5 w-full cursor-pointer accent-foreground"
          />
        </label>

        <label className="block">
          <span className="flex items-baseline justify-between gap-5">
            <span className="text-sm font-medium leading-6 text-foreground">
              Capacity/session
            </span>
            <span className="font-display text-3xl font-medium leading-none text-foreground">
              {capacity}
            </span>
          </span>
          <input
            type="range"
            min="16"
            max="28"
            step="1"
            value={capacity}
            onChange={(event) => setCapacity(Number(event.target.value))}
            className="mt-4 h-1.5 w-full cursor-pointer accent-foreground"
          />
        </label>
      </div>

      <div className="space-y-8">
        <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Directional planning model based on documented session attendance.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-6xl font-medium leading-none text-foreground">
              {projectedAttendance}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              projected duplicated attendance
            </p>
          </div>
          <div>
            <p className="font-display text-6xl font-medium leading-none text-foreground">
              {Math.abs(capacityDelta)}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              {capacityDelta >= 0 ? "unused capacity" : "capacity pressure"}
            </p>
          </div>
        </div>
        <p className="max-w-2xl font-display text-3xl font-medium leading-[1.08] text-foreground">
          {sessions} sessions x {averageAttendance.toFixed(1)} average = ~
          {projectedAttendance} projected touchpoints.
        </p>
        <p className="max-w-xl text-sm leading-7 text-muted">{planningSignal}</p>
      </div>
    </div>
  );
}

function ProjectLinkRows({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div className="border-t border-line">
      {data.projectLinks.map((link) =>
        link.href ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="focus-ring group flex items-center justify-between gap-6 border-b border-line py-5 text-sm leading-6 transition duration-300 hover:text-foreground motion-reduce:transition-none"
          >
            <span className="font-medium text-foreground">{link.label}</span>
            <span className="text-quiet group-hover:text-foreground">Open</span>
          </a>
        ) : (
          <div
            key={link.label}
            className="flex items-center justify-between gap-6 border-b border-line py-5 text-sm leading-6"
          >
            <span className="font-medium text-foreground">{link.label}</span>
            <span className="text-quiet">URL pending</span>
          </div>
        ),
      )}
    </div>
  );
}

function Supports({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {data.supports.map((item) => (
        <p
          key={item}
          className="border-t border-line pt-4 font-display text-2xl font-medium leading-none text-foreground"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export function WellnessThroughClayProjectModal({
  data,
  isOpen,
  onClose,
}: WellnessThroughClayProjectModalProps) {
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
        aria-labelledby="wtc-modal-title"
        onKeyDown={handleKeyDown}
        className="modal-panel-in mx-auto h-screen w-full overflow-y-auto bg-background sm:h-[calc(100vh-2.5rem)] sm:max-w-[88rem] sm:border sm:border-line"
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-5 sm:px-10 lg:px-14">
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

          <header className="grid gap-10 pb-16 pt-10 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:pb-20 lg:pt-16">
            <div>
              <h2
                id="wtc-modal-title"
                className="font-display text-[clamp(4.2rem,11vw,8.4rem)] font-medium leading-[0.86] text-foreground"
              >
                {data.title}
              </h2>
              <p className="mt-8 text-sm font-medium leading-6 text-muted">
                {data.subtitle}
              </p>
            </div>
            <div>
              <p className="max-w-xl font-display text-[2.05rem] font-medium leading-[1.05] text-foreground sm:text-[2.45rem]">
                {data.summary}
              </p>
              <p className="mt-6 text-sm leading-7 text-muted">{data.context}</p>
            </div>
          </header>

          <main>
            <section className="py-12 sm:py-16">
              <KpiBand data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-12 max-w-3xl">
                <SectionTitle eyebrow="Growth timeline">
                  From pilot workshop to repeatable wellness model.
                </SectionTitle>
              </div>
              <GrowthTimeline data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-12 max-w-3xl">
                <SectionTitle eyebrow="Attendance analytics">
                  Documented 2025-2026 participation.
                </SectionTitle>
              </div>
              <AttendanceChart data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-12 max-w-3xl">
                <SectionTitle eyebrow="Growth projection">
                  Directional planning model.
                </SectionTitle>
              </div>
              <ProjectionModel data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionTitle>Press + Project Links</SectionTitle>
              </div>
              <ProjectLinkRows data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionTitle>What this shows</SectionTitle>
              </div>
              <Supports data={data} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
