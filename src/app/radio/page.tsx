import type { Metadata } from "next";
import { RadioHub } from "@/components/radio/RadioHub";

export const metadata: Metadata = {
  title: "Radio",
  description:
    "GTTW Radio — guest mixes from SoundCloud. Vinyl catalogue, sessions, and official embeds.",
};

export default function RadioPage() {
  return <RadioHub />;
}
