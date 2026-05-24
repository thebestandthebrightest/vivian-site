"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { TravelItem } from "@/components/site/TravelScrollStrip";
import { ifnhPreviewData } from "@/lib/ifnh-preview-data";
import { pslPreviewData } from "@/lib/psl-preview-data";
import { scarletWellBriefData } from "@/lib/scarletwell-preview-data";
import { sjmsPreviewData } from "@/lib/sjms-preview-data";
import { wellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import { IfnhProjectModal } from "./IfnhProjectModal";
import { ProfileModalContent } from "./ProfileModalContent";
import { ProjectModalShell } from "./ProjectModalShell";
import { PslProjectModal } from "./PslProjectModal";
import { ScarletWellProjectModal } from "./ScarletWellProjectModal";
import { SjmsProjectModal } from "./SjmsProjectModal";
import { WellnessThroughClayProjectModal } from "./WellnessThroughClayProjectModal";

type ProjectModalKey = "scarletwell" | "psl" | "ifnh" | "wtc" | "sjms";
type ModalKey = "about" | ProjectModalKey | null;
type PopoverKey = "work" | "contact";

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
  "group relative inline-flex justify-center font-display text-[2.85rem] font-medium uppercase leading-[0.88] tracking-[0.015em] text-foreground outline-none transition duration-300 ease-out hover:-translate-y-0.5 hover:opacity-75 focus-visible:opacity-75 sm:text-[4.5rem] lg:text-[5.15rem] motion-reduce:transition-none";

const popoverCardClass = "modal-panel-in modal-popover text-left";
const basePopoverPositionClass =
  "absolute left-1/2 top-full z-20 mt-5 w-[calc(100vw-32px)] -translate-x-1/2 px-7 py-6 sm:px-8";

export function HomeNavigation({ aboutTravelItems }: HomeNavigationProps) {
  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [activePopover, setActivePopover] = useState<PopoverKey | null>(null);
  const [pinnedPopover, setPinnedPopover] = useState<PopoverKey | null>(null);
  const workPopoverRef = useRef<HTMLDivElement>(null);
  const contactPopoverRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelPendingClose = () => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const closePopovers = () => {
    cancelPendingClose();
    setActivePopover(null);
    setPinnedPopover(null);
  };

  const openModal = (modalKey: Exclude<ModalKey, null>) => {
    closePopovers();
    setActiveModal(modalKey);
  };

  const handlePopoverPointerEnter = (
    popover: PopoverKey,
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse") {
      cancelPendingClose();
      setActivePopover(popover);
      setPinnedPopover((current) => (current === popover ? current : null));
    }
  };

  const handlePopoverPointerLeave = (
    popover: PopoverKey,
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType !== "mouse" || pinnedPopover === popover) {
      return;
    }

    cancelPendingClose();
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null;
      setActivePopover((current) => (current === popover ? null : current));
    }, 160);
  };

  const handlePopoverClick = (popover: PopoverKey) => {
    cancelPendingClose();
    setActiveModal(null);

    if (activePopover === popover && pinnedPopover === popover) {
      closePopovers();
      return;
    }

    setActivePopover(popover);
    setPinnedPopover(popover);
  };

  useEffect(() => {
    return () => {
      cancelPendingClose();
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const activeRef =
        activePopover === "work" ? workPopoverRef : contactPopoverRef;

      if (
        activePopover &&
        activeRef.current &&
        !activeRef.current.contains(target)
      ) {
        closePopovers();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopovers();
        setActiveModal(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePopover]);

  return (
    <>
      <main className="flex min-h-svh items-center justify-center bg-background px-5 py-12 text-foreground sm:px-10 lg:px-14">
        <div className="flex w-full max-w-[46rem] -translate-y-14 flex-col items-center text-center sm:-translate-y-12">
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
              ref={workPopoverRef}
              className="relative flex justify-center"
              onPointerEnter={(event) =>
                handlePopoverPointerEnter("work", event)
              }
              onPointerLeave={(event) =>
                handlePopoverPointerLeave("work", event)
              }
            >
              <button
                type="button"
                aria-expanded={activePopover === "work"}
                aria-controls="home-work-popover"
                onClick={() => handlePopoverClick("work")}
                className={navItemClass}
              >
                <span>WORK</span>
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-full" />
              </button>

              {activePopover === "work" ? (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-full z-10 -translate-x-1/2"
                    style={{ height: "2rem", width: "min(31rem, calc(100vw - 32px))" }}
                  />
                  <HomePopover
                  id="home-work-popover"
                  ariaLabel="Work projects"
                  className="max-w-[31rem]"
                >
                  <ul className="space-y-2.5">
                    {workItems.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => openModal(item.modalKey)}
                          className="focus-ring block w-full py-1.5 text-left font-display text-[1.48rem] font-medium leading-[1.12] text-foreground transition hover:opacity-70 sm:text-[1.62rem] motion-reduce:transition-none"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </HomePopover>
                </>
              ) : null}
            </div>

            <div
              ref={contactPopoverRef}
              className="relative flex justify-center"
              onPointerEnter={(event) =>
                handlePopoverPointerEnter("contact", event)
              }
              onPointerLeave={(event) =>
                handlePopoverPointerLeave("contact", event)
              }
            >
              <button
                type="button"
                aria-expanded={activePopover === "contact"}
                aria-controls="home-contact-card"
                onClick={() => handlePopoverClick("contact")}
                className={navItemClass}
              >
                <span>CONTACT</span>
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-full" />
              </button>
              {activePopover === "contact" ? (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-full z-10 -translate-x-1/2"
                    style={{ height: "2rem", width: "min(31rem, calc(100vw - 32px))" }}
                  />
                  <HomePopover
                    id="home-contact-card"
                    ariaLabel="Contact"
                    className="max-w-[31rem]"
                  >
                    <ContactCard />
                  </HomePopover>
                </>
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
      labelledById="home-profile-modal-title"
      title="Profile"
      summary="Public Health student at Rutgers working across strategy, analytics, operations, and systems that help organizations make clearer decisions."
      showHeader={false}
    >
      <ProfileModalContent
        travelItems={travelItems}
        titleId="home-profile-modal-title"
      />
    </ProjectModalShell>
  );
}

function HomePopover({
  id,
  ariaLabel,
  children,
  className = "",
}: {
  id: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      role="dialog"
      aria-label={ariaLabel}
      className={`${popoverCardClass} ${basePopoverPositionClass} ${className}`}
    >
      {children}
    </div>
  );
}

function ContactCard() {
  return (
    <ul className="space-y-2.5">
      <li>
        <p className="py-1.5 font-display text-[1.48rem] font-normal leading-[1.22] text-foreground sm:text-[1.62rem]">
          Based in New Jersey. Open to thoughtful conversations,
          collaborations, and coffee chats.
        </p>
      </li>
      <li>
        <a
          className="focus-ring block w-full py-1.5 text-left font-display text-[1.48rem] font-normal leading-[1.22] text-foreground/65 transition hover:text-foreground hover:opacity-100 sm:text-[1.62rem] motion-reduce:transition-none"
          href="mailto:gvivian321@gmail.com"
        >
          gvivian321@gmail.com
        </a>
      </li>
      <li>
        <a
          className="focus-ring block w-full py-1.5 text-left font-display text-[1.48rem] font-normal leading-[1.22] text-foreground/65 transition hover:text-foreground hover:opacity-100 sm:text-[1.62rem] motion-reduce:transition-none"
          href="https://www.linkedin.com/in/vivianglenn"
        >
          LinkedIn
        </a>
      </li>
    </ul>
  );
}
