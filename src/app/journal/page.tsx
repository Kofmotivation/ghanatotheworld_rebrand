import type { Metadata } from "next";
import { JournalExperience } from "@/components/journal/JournalExperience";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "GTTW cultural map — spin the globe and explore looks by city.",
};

export default function JournalPage() {
  return <JournalExperience />;
}
