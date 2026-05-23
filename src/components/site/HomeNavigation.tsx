"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ifnhPreviewData } from "@/lib/ifnh-preview-data";
import { pslPreviewData } from "@/lib/psl-preview-data";
import { scarletWellBriefData } from "@/lib/scarletwell-preview-data";
import { sjmsPreviewData } from "@/lib/sjms-preview-data";
import { wellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import { IfnhProjectModal } from "./IfnhProjectModal";
import { ProjectModalShell } from "./ProjectModalShell";
import { PslProjectModal } from "./PslProjectModal";
import { ScarletWellProjectModal } from "./ScarletWellProjectModal";
import { SjmsProjectModal } from "./SjmsProjectModal";
import { WellnessThroughClayProjectModal } from "./WellnessThroughClayProjectModal";

type ProjectModalKey = "scarletwell" | "psl" | "ifnh" | "wtc" | "sjms";
type ModalKey = "about" | "contact" | ProjectModalKey | null;

const workItems: Array<{ label: string; modalKey: ProjectModalKey }> = [
  { label: "ScarletWell Studio", modalKey: "scarletwell" },
  { label: "PSL Dashboard", modalKey: "psl" },
  { label: "IFNH InsightOS", modalKey: "ifnh" },
  { label: "Wellness Through Clay", modalKey: "wtc" },
  { label: "SJMS Scholarship Dashboard", modalKey: "sjms" },
];

const navItemClass =
  "focus-ring group relative inline-flex justify-center font-display text-[2.85rem] font-medium uppercase leading-[0.88] tracking-[0.015em] text-foreground transition duration-300 ease-out hover:-translate-y-0.5 hover:opacity-75 sm:text-[4.5rem] lg:text-[5.15rem] motion-reduce:transition-none";

export function HomeNavigation() {
  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isWorkPinned, setIsWorkPinned] = useState(false);
  const workMenuRef = useRef<HTMLDivElement>(null);

  const closeWorkMenu = () => {
    setIsWorkOpen(false);
    setIsWorkPinned(false);
  };

  const openModal = (modalKey: Exclude<ModalKey, null>) => {
    closeWorkMenu();
    setActiveModal(modalKey);
  };

  const handleWorkPointerEnter = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse") {
      setIsWorkOpen(true);
    }
  };

  const handleWorkPointerLeave = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse" && !isWorkPinned) {
      setIsWorkOpen(false);
    }
  };

  const handleWorkClick = () => {
    setIsWorkOpen((current) => {
      const next = !current;
      setIsWorkPinned(next);
      return next;
    });
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        isWorkOpen &&
        workMenuRef.current &&
        !workMenuRef.current.contains(event.target as Node)
      ) {
        closeWorkMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWorkMenu();
        setActiveModal(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWorkOpen]);

  return (
    <>
      <main className="flex min-h-svh items-center justify-center bg-background px-5 py-12 text-foreground sm:px-10 lg:px-14">
        <div className="flex w-full max-w-[46rem] flex-col items-center text-center">
          <nav
            className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7"
            aria-label="Primary navigation"
          >
            <h1 className="contents">
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => openModal("about")}
                className={navItemClass}
              >
                <span>VIVIAN GLENN</span>
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-full" />
              </button>
            </h1>

            <div
              ref={workMenuRef}
              className="relative flex justify-center"
              onPointerEnter={handleWorkPointerEnter}
              onPointerLeave={handleWorkPointerLeave}
            >
              <button
                type="button"
                aria-expanded={isWorkOpen}
                aria-controls="home-work-popover"
                onClick={handleWorkClick}
                className={navItemClass}
              >
                <span>WORK</span>
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-full" />
              </button>

              {isWorkOpen ? (
                <div
                  id="home-work-popover"
                  className="modal-panel-in absolute left-1/2 top-full z-20 mt-4 w-[min(19rem,calc(100vw-3rem))] -translate-x-1/2 border border-line bg-background/98 px-5 py-4 text-left shadow-[0_18px_45px_rgba(72,38,29,0.12)]"
                >
                  <ul className="space-y-1.5">
                    {workItems.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => openModal(item.modalKey)}
                          className="focus-ring block w-full py-1.5 text-left font-display text-[1.35rem] font-medium leading-tight text-foreground transition hover:opacity-70 motion-reduce:transition-none"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => openModal("contact")}
              className={navItemClass}
            >
              <span>CONTACT</span>
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-full" />
            </button>
          </nav>
        </div>
      </main>

      <AboutModal
        isOpen={activeModal === "about"}
        onClose={() => setActiveModal(null)}
      />
      <ContactModal
        isOpen={activeModal === "contact"}
        onClose={() => setActiveModal(null)}
      />
      <ScarletWellProjectModal
        data={scarletWellBriefData}
        isOpen={activeModal === "scarletwell"}
        onClose={() => setActiveModal(null)}
      />
      <PslProjectModal
        data={pslPreviewData}
        isOpen={activeModal === "psl"}
        onClose={() => setActiveModal(null)}
      />
      <IfnhProjectModal
        data={ifnhPreviewData}
        isOpen={activeModal === "ifnh"}
        onClose={() => setActiveModal(null)}
      />
      <WellnessThroughClayProjectModal
        data={wellnessThroughClayPreviewData}
        isOpen={activeModal === "wtc"}
        onClose={() => setActiveModal(null)}
      />
      <SjmsProjectModal
        data={sjmsPreviewData}
        isOpen={activeModal === "sjms"}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}

function AboutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="home-about-modal-title"
      title="About"
      summary="Public Health student at Rutgers working across strategy, analytics, operations, and systems that help organizations make clearer decisions."
      panelClassName="sm:max-w-[62rem]"
      contentClassName="max-w-4xl"
    >
      <section className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
        <div className="space-y-5 text-base leading-8 text-muted sm:text-lg">
          <p>
            I&apos;m interested in translating messy information into clear
            tools, decisions, and operating rhythms.
          </p>
          <p>
            My work sits where research, program design, analytics, and
            AI-assisted execution become practical infrastructure.
          </p>
        </div>
        <div className="space-y-7">
          <div>
            <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Education
            </p>
            <div className="mt-3 space-y-1 text-sm leading-7">
              <p className="font-medium text-foreground">Rutgers University</p>
              <p className="text-muted">Bachelor of Science, Public Health</p>
              <p className="text-quiet">Class of 2027 / GPA: 3.97/4.0</p>
            </div>
          </div>
          <div>
            <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Capabilities
            </p>
            <ul className="mt-3 grid gap-x-8 gap-y-1 text-sm leading-7 text-muted sm:grid-cols-2">
              <li>Operational strategy</li>
              <li>Program evaluation</li>
              <li>Dashboard systems</li>
              <li>Decision-support tools</li>
              <li>AI-assisted synthesis</li>
              <li>Workflow design</li>
            </ul>
          </div>
        </div>
      </section>
    </ProjectModalShell>
  );
}

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="home-contact-modal-title"
      title="Contact"
      summary="Based in New Jersey. Open to thoughtful conversations, collaborations, and coffee chats."
      panelClassName="sm:max-w-[44rem]"
      contentClassName="max-w-2xl"
    >
      <section className="space-y-3 text-base leading-8 text-muted sm:text-lg">
        <p>
          <a
            className="focus-ring text-foreground underline decoration-foreground/25 underline-offset-4 transition-opacity duration-300 hover:opacity-70 motion-reduce:transition-none"
            href="mailto:gvivian321@gmail.com"
          >
            gvivian321@gmail.com
          </a>
        </p>
        <p>
          <a
            className="focus-ring text-foreground underline decoration-foreground/25 underline-offset-4 transition-opacity duration-300 hover:opacity-70 motion-reduce:transition-none"
            href="https://www.linkedin.com/in/vivianglenn"
          >
            linkedin.com/in/vivianglenn
          </a>
        </p>
      </section>
    </ProjectModalShell>
  );
}
