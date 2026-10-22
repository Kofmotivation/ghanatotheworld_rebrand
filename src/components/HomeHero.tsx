"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { brand, heroImage } from "@/lib/content";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={heroImage}
          alt="Ghana To The World campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,12,10,0.55) 0%, rgba(11,12,10,0.25) 38%, rgba(11,12,10,0.72) 78%, rgba(11,12,10,0.92) 100%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
        <motion.p
          className="font-display text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.03em]"
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {brand.name}
        </motion.p>

        <motion.h1
          className="mt-5 max-w-xl text-[clamp(1.15rem,2.4vw,1.65rem)] font-normal leading-snug text-[var(--bone)]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Cultural expression through design, fashion & film.
        </motion.h1>

        <motion.p
          className="mt-4 max-w-md text-sm leading-relaxed text-[var(--mist)] md:text-[0.95rem]"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          From Ghana to the world — unique projects for the future of culture.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/shop" className="cta cta-gold">
            Shop the drop
          </Link>
          <Link href="/lookbook" className="cta">
            View lookbook
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
