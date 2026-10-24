import Image from "next/image";
import Link from "next/link";

type Props = {
  /** Header nav vs footer lockup */
  size?: "header" | "footer";
  className?: string;
};

/**
 * Primary web wordmark — gold cursive “Gttw” script.
 * Transparent PNG reads on light + dark; light theme gets a soft drop-shadow.
 */
export function BrandLogo({ size = "header", className = "" }: Props) {
  const header = size === "header";

  return (
    <Link
      href="/"
      className={`brand-logo brand-logo--${size} ${className}`.trim()}
      aria-label="GTTW — Ghana To The World, home"
    >
      <Image
        src="/brand/gttw-gold-script.png"
        alt="Gttw"
        width={header ? 1400 : 1400}
        height={header ? 906 : 906}
        priority={header}
        className="brand-logo__img"
        sizes={header ? "(max-width:768px) 110px, 148px" : "168px"}
      />
    </Link>
  );
}
