"use client";

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { TravelItem } from "@/components/site/TravelScrollStrip";
import { ifnhPreviewData } from "@/lib/ifnh-preview-data";
import { pslPreviewData } from "@/lib/psl-preview-data";
import { scarletWellBriefData } from "@/lib/scarletwell-preview-data";
import { sjmsPreviewData } from "@/lib/sjms-preview-data";
import { wellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import { AboutContent } from "./AboutContent";
import { IfnhProjectModal } from "./IfnhProjectModal";
import { ProjectModalShell } from "./ProjectModalShell";
import { PslProjectModal } from "./PslProjectModal";
import { ScarletWellProjectModal } from "./ScarletWellProjectModal";
import { SjmsProjectModal } from "./SjmsProjectModal";
import { WellnessThroughClayProjectModal } from "./WellnessThroughClayProjectModal";

type ProjectModalKey = "scarletwell" | "psl" | "ifnh" | "wtc" | "sjms";
type ModalKey = "about" | ProjectModalKey | null;

type HomeNavigationProps = {
  aboutTravelItems: TravelItem[];
};

const workItems: Array<{ label: string; modalKey: ProjectModalKey }> = [
  { label: "ScarletWell Studio", modalKey: "scarletwell" },
  { label: "PSL Dashboard", modalKey: "psl" },
  { label: "IFNH InsightOS", modalKey: "ifnh" },
  { label: "Wellness Through Clay", modalKey: "wtc" },
  { label: "SJMS Scholarship Dashboard", modalKey: "sjms" },
];

const navItemClass =
  "focus-ring group relative inline-flex justify-center font-display text-[2.85rem] font-medium uppercase leading-[0.88] tracking-[0.015em] text-foreground transition duration-300 ease-out hover:-translate-y-0.5 hover:opacity-75 sm:text-[4.5rem] lg:text-[5.15rem] motion-reduce:transition-none";

const popoverCardClass =
  "modal-panel-in border border-line bg-background text-left shadow-[0_18px_45px_rgba(72,38,29,0.12)]";

export function HomeNavigation({ aboutTravelItems }: HomeNavigationProps) {
  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isWorkPinned, setIsWorkPinned] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const workMenuRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);

  const closeWorkMenu = () => {
    setIsWorkOpen(false);
    setIsWorkPinned(false);
  };

  const openModal = (modalKey: Exclude<ModalKey, null>) => {
    closeWorkMenu();
    setIsContactOpen(false);
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
    if (isWorkPinned) {
      closeWorkMenu();
      return;
    }

    setIsWorkOpen(true);
    setIsWorkPinned(true);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        isWorkOpen &&
        workMenuRef.current &&
        !workMenuRef.current.contains(target)
      ) {
        closeWorkMenu();
      }

      if (
        isContactOpen &&
        contactCardRef.current &&
        !contactCardRef.current.contains(target)
      ) {
        setIsContactOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWorkMenu();
        setIsContactOpen(false);
        setActiveModal(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWorkOpen, isContactOpen]);

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
              onMouseEnter={() => setIsWorkOpen(true)}
              onMouseLeave={() => {
                if (!isWorkPinned) {
                  setIsWorkOpen(false);
                }
              }}
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
                  className={`${popoverCardClass} absolute left-1/2 top-full z-20 mt-5 w-[min(31rem,calc(100vw-2.5rem))] -translate-x-1/2 px-7 py-6 sm:px-8`}
                >
                  <ul className="space-y-3">
                    {workItems.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => openModal(item.modalKey)}
                          className="focus-ring block w-full py-1 text-left font-display text-[1.55rem] font-medium leading-[1.12] text-foreground transition hover:opacity-70 sm:text-[1.7rem] motion-reduce:transition-none"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="relative flex justify-center">
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isContactOpen}
                aria-controls="home-contact-card"
                onClick={() => {
                  closeWorkMenu();
                  setActiveModal(null);
                  setIsContactOpen((current) => !current);
                }}
                className={navItemClass}
              >
                <span>CONTACT</span>
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-full" />
              </button>
              {isContactOpen ? (
                <ContactCard
                  ref={contactCardRef}
                  onClose={() => setIsContactOpen(false)}
                />
              ) : null}
            </div>
          </nav>
        </div>
      </main>

      <AboutModal
        isOpen={activeModal === "about"}
        onClose={() => setActiveModal(null)}
        travelItems={aboutTravelItems}
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
  travelItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  travelItems: TravelItem[];
}) {
  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="home-about-modal-title"
      title="About"
      summary="Public Health student at Rutgers working across strategy, analytics, operations, and systems that help organizations make clearer decisions."
      showHeader={false}
      childrenClassName=""
    >
      <AboutContent
        travelItems={travelItems}
        titleId="home-about-modal-title"
      />
    </ProjectModalShell>
  );
}

const ContactCard = forwardRef<HTMLDivElement, { onClose: () => void }>(
  function ContactCard(
    {
      onClose,
    }: {
      onClose: () => void;
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        id="home-contact-card"
        role="dialog"
        aria-label="Contact"
        className={`${popoverCardClass} absolute left-1/2 top-full z-20 mt-5 w-[min(28rem,calc(100vw-2.5rem))] -translate-x-1/2 px-6 py-5 sm:px-7`}
      >
        <div className="flex items-start justify-between gap-5">
          <p className="max-w-[20rem] text-sm leading-7 text-muted">
            Based in New Jersey. Open to thoughtful conversations,
            collaborations, and coffee chats.
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact"
            className="focus-ring -mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center text-2xl font-light leading-none text-foreground transition hover:opacity-70 motion-reduce:transition-none"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="mt-5 space-y-2 text-base leading-7 text-foreground">
          <p>
            <a
              className="focus-ring underline decoration-foreground/25 underline-offset-4 transition-opacity duration-300 hover:opacity-70 motion-reduce:transition-none"
              href="mailto:gvivian321@gmail.com"
            >
              gvivian321@gmail.com
            </a>
          </p>
          <p>
            <a
              className="focus-ring underline decoration-foreground/25 underline-offset-4 transition-opacity duration-300 hover:opacity-70 motion-reduce:transition-none"
              href="https://www.linkedin.com/in/vivianglenn"
            >
              linkedin.com/in/vivianglenn
            </a>
          </p>
        </div>
      </div>
    );
  },
);
