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
      <div className="border border-[var(--line)] p-8 md:p-10">
        <p className="font-display text-2xl">Message noted</p>
        <p className="mt-3 text-sm text-[var(--mist)]">
          Thanks — this prototype captures your note locally. Wire a real inbox
          when ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 border border-[var(--line)] p-6 md:p-8">
      <label className="block">
        <span className="text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
          Name
        </span>
        <input
          required
          name="name"
          className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none transition-colors focus:border-[var(--indigo)]"
        />
      </label>
      <label className="block">
        <span className="text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
          Email
        </span>
        <input
          required
          type="email"
          name="email"
          className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none transition-colors focus:border-[var(--indigo)]"
        />
      </label>
      <label className="block">
        <span className="text-xs tracking-[0.14em] text-[var(--mist)] uppercase">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full resize-y border-b border-[var(--line)] bg-transparent py-3 outline-none transition-colors focus:border-[var(--indigo)]"
        />
      </label>
      <button type="submit" className="cta cta-indigo mt-4">
        Send note
      </button>
    </form>
  );
}
