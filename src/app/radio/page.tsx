import type { Metadata } from "next";
import { RadioHub } from "@/components/radio/RadioHub";

export const metadata: Metadata = {
  title: "Radio",
  description:
    "GTTW Radio — mixes, sessions, and archive. Episodes from gttw.net plus honest placeholders.",
};

export default function RadioPage() {
  return <RadioHub />;
}
