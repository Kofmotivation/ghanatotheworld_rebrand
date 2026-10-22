"use client";

import { createGlobe, type Globe } from "globedots";
import { land } from "globedots/land";
import { useEffect, useRef } from "react";
import type { JournalEvent } from "./types";

type Props = {
  events: JournalEvent[];
  selectedEvent: JournalEvent | null;
  onSelectEvent: (event: JournalEvent | null) => void;
};

export function JournalGlobe({
  events,
  selectedEvent,
  onSelectEvent,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const eventsRef = useRef(events);
  const onSelectRef = useRef(onSelectEvent);

  eventsRef.current = events;
  onSelectRef.current = onSelectEvent;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    const globe = createGlobe(canvas, {
      camera: { lat: 12, lng: -5, altitude: 1.85 },
      autoRotate: 3.5,
      interactive: true,
      style: {
        base: "#050506",
        dot: "#d8d4cc",
        glow: "#8a857c",
        glowWidth: 0.22,
        oceanDots: 0.05,
        rim: 0.35,
        diffuse: 1.4,
        night: 0.15,
      },
    });
    globeRef.current = globe;

    const offClick = globe.on("click", (hit) => {
      if (!hit || hit.marker < 0) return;
      const event = eventsRef.current[hit.marker];
      if (event) onSelectRef.current(event);
    });

    (async () => {
      try {
        const landMask = await land();
        if (cancelled) return;
        globe.setLand(...landMask);
        globe.setMarkers(
          eventsRef.current.map((e) => ({
            lat: e.lat,
            lng: e.lng,
            size: 0.014,
            color: "#c4a574",
            shape: "ring" as const,
            title: `${e.city} — ${e.title}`,
          })),
        );
        await globe.ready;
      } catch {
        // Canvas / WebGL unavailable — leave empty shell
      }
    })();

    return () => {
      cancelled = true;
      offClick();
      globe.destroy();
      globeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    if (selectedEvent) {
      globe.setStyle({
        glow: "#e8d5b0",
        glowWidth: 0.32,
      });
      globe.setAutoRotate(0.8);
      void globe.flyTo(
        { lat: selectedEvent.lat, lng: selectedEvent.lng, altitude: 1.35 },
        900,
      );
      globe.setMarkers(
        events.map((e) => ({
          lat: e.lat,
          lng: e.lng,
          size: e.id === selectedEvent.id ? 0.02 : 0.012,
          color: e.id === selectedEvent.id ? "#f0e6d2" : "#c4a574",
          shape: "ring" as const,
          title: `${e.city} — ${e.title}`,
        })),
      );
    } else {
      globe.setStyle({
        glow: "#8a857c",
        glowWidth: 0.22,
      });
      globe.setAutoRotate(3.5);
      globe.setMarkers(
        events.map((e) => ({
          lat: e.lat,
          lng: e.lng,
          size: 0.014,
          color: "#c4a574",
          shape: "ring" as const,
          title: `${e.city} — ${e.title}`,
        })),
      );
    }
  }, [selectedEvent, events]);

  return (
    <canvas
      ref={canvasRef}
      className="journal-globe-canvas h-full w-full touch-none"
      aria-label="Interactive globe of GTTW cultural events. Drag to spin. Click a marker for looks."
    />
  );
}
