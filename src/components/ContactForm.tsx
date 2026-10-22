"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-8">
        <p className="font-display text-2xl">Message noted</p>
        <p className="mt-3 text-sm text-[var(--fg-soft)]">
          Thanks — this prototype captures your note locally.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 border border-[var(--line)] bg-[var(--bg-elevated)] p-6 md:p-8"
    >
      <label className="block">
        <span className="eyebrow">Name</span>
        <input
          required
          name="name"
          className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none transition-colors focus:border-[var(--fg)]"
        />
      </label>
      <label className="block">
        <span className="eyebrow">Email</span>
        <input
          required
          type="email"
          name="email"
          className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none transition-colors focus:border-[var(--fg)]"
        />
      </label>
      <label className="block">
        <span className="eyebrow">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full resize-y border-b border-[var(--line)] bg-transparent py-3 outline-none transition-colors focus:border-[var(--fg)]"
        />
      </label>
      <button type="submit" className="cta cta-filled mt-2">
        Send note
      </button>
    </form>
  );
}
