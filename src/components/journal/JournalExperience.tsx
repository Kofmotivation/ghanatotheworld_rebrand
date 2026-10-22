"use client";

import { useState } from "react";
import eventsData from "@/data/events.json";
import { EventModal } from "./EventModal";
import { JournalGlobe } from "./JournalGlobe";
import type { JournalEvent } from "./types";

const events = eventsData as JournalEvent[];

export function JournalExperience() {
  const [selectedEvent, setSelectedEvent] = useState<JournalEvent | null>(
    null,
  );

  return (
    <div className="journal-experience relative h-[calc(100dvh-var(--header-offset,7.5rem))] min-h-[520px] w-full overflow-hidden bg-[#050506] text-white">
      {/* Subtle atmosphere behind the globe */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(196,165,116,0.12) 0%, transparent 55%), radial-gradient(ellipse at center, #0a0a0c 0%, #050506 70%)",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-wrap items-end justify-between gap-4 px-4 pt-5 md:px-8 md:pt-7">
        <div>
          <p className="text-[0.65rem] tracking-[0.16em] text-white/50 uppercase">
            Journal
          </p>
          <h1 className="font-display mt-2 text-[clamp(2.2rem,6vw,3.6rem)] leading-none tracking-[0.02em]">
            Cultural map
          </h1>
          <p className="mt-3 max-w-sm text-sm text-white/55">
            Spin the globe. Tap a city marker for looks from that chapter.
          </p>
        </div>
        <p className="text-[0.65rem] tracking-[0.12em] text-white/40 uppercase">
          {events.length} events · drag to spin
        </p>
      </div>

      <div
        className={`absolute inset-0 transition-[filter] duration-500 ${
          selectedEvent
            ? "brightness-110 drop-shadow-[0_0_48px_rgba(232,213,176,0.25)]"
            : ""
        }`}
      >
        <JournalGlobe
          events={events}
          selectedEvent={selectedEvent}
          onSelectEvent={setSelectedEvent}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-5 md:px-8 md:pb-7">
        <ul className="pointer-events-auto flex flex-wrap gap-2">
          {events.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => setSelectedEvent(e)}
                className={`border px-3 py-1.5 text-[0.65rem] tracking-[0.12em] uppercase transition-colors ${
                  selectedEvent?.id === e.id
                    ? "border-white/70 bg-white/10 text-white"
                    : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                }`}
              >
                {e.city}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedEvent ? (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      ) : null}
    </div>
  );
}
