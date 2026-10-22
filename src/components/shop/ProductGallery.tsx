"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const src = images[active] ?? images[0];

  return (
    <div>
      <div className="product-frame relative aspect-square w-full overflow-hidden bg-[var(--bg-muted)]">
        <Image
          src={src}
          alt={name}
          fill
          priority
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-contain object-center p-8 md:p-14"
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2 md:grid-cols-5">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={`product-frame relative aspect-square overflow-hidden bg-[var(--bg-muted)] ${
                i === active ? "ring-1 ring-[var(--fg)]" : ""
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="120px"
                className="object-contain object-center p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
