const cdn = (hash: string, name: string) =>
  `https://freight.cargo.site/t/original/i/${hash}/${name}`;

export const brand = {
  name: "Ghana To The World",
  short: "GTTW",
  statement:
    "“Ghana To The World” is a gift of love that arose from the founders’ enthusiasm towards cultural expression, specifically through design, fashion & film. We strive to produce unique projects that are geared towards the future development of cultural expression.",
  headline: "Touch The Sky in Latest SS21 Drop",
  policy: "ALL SALES FINAL",
  copyright: "© 2022, GTTW",
  socials: {
    instagram: "https://www.instagram.com/ghanatotheworld/",
    twitter: "https://twitter.com/ghanatotheworld",
  },
} as const;

/** Primary nav — Shop opens as a mega panel (House of Errors–style) */
export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/campaigns", label: "Collections" },
  { href: "/looks", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
  { href: "/radio", label: "Radio" },
  { href: "/about", label: "About" },
] as const;

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  sizes: string[];
  soldOut: boolean;
  cargoUrl: string;
  cargoSlug: string;
  description: string;
  image: string;
  images: string[];
  campaignSlugs: string[];
};

export function productImage(p: Product) {
  return p.images[0];
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export const products: Product[] = [
  {
    slug: "black-accra-tee",
    name: "Black Accra Tee",
    collection: "Essentials",
    category: "Tees",
    price: 75.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: false,
    cargoUrl: "https://gttw.net/Black-Accra-Tee",
    cargoSlug: "Black-Accra-Tee",
    description: `Regular fit tee with round neck opening. Midweight 100% supima cotton. Contrast stiching. “ACCRA” patch on chest area. Text embroidered on the front. Logo printed on the back. Hand wash. Hang to dry.`,
    campaignSlugs: ["essentials"],
    image: cdn("66bfa31a42c4bb999503ac8f9b4cfcfd334be0a9c4989588e05fe2f7f78e76c1", "GTTW-ACCRA-BLACK.png"),
    images: [
      cdn("66bfa31a42c4bb999503ac8f9b4cfcfd334be0a9c4989588e05fe2f7f78e76c1", "GTTW-ACCRA-BLACK.png"),
    ],
  },
  {
    slug: "africa-is-not-for-sale-tee-black",
    name: "Africa Is Not For Sale Tee (Black)",
    collection: "Essentials",
    category: "Tees",
    price: 45.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/Black-Africa-is-Not-For-Sale-Tee",
    cargoSlug: "Black-Africa-is-Not-For-Sale-Tee",
    description: `DETAILS: Regular fit tee with round neck opening. Lightweight 100% supima cotton. Text printed on the front. Star logo printed on the back. True to size. Machine wash cold seperate, gentle cycle. Hang to dry. Sold Out`,
    campaignSlugs: ["essentials"],
    image: cdn("f44c41589d4f7d0bc247b78650dc7018aed980f2661f8384ee1afcef9ea6563f", "Africa-Is-Not-For-Sale-Black-Front.png"),
    images: [
      cdn("f44c41589d4f7d0bc247b78650dc7018aed980f2661f8384ee1afcef9ea6563f", "Africa-Is-Not-For-Sale-Black-Front.png"),
    ],
  },
  {
    slug: "ghana-to-the-world-hoodie-black",
    name: "Ghana To The World Hoodie (Black)",
    collection: "Essentials",
    category: "Hoodies",
    price: 75.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/Black-Ghana-To-The-World-Hoodie",
    cargoSlug: "Black-Ghana-To-The-World-Hoodie",
    description: `DETAILS: REGULAR FIT HOODIE. MID-WEIGHT 80% COTTON 20% POLYESTER. EMBROIDERED TEXT ON FRONT, PRINTED LOGO AT THE BACK FIT: TRUE TO SIZE CARE: MACHINE WASH COLD SEPARATE, GENTLE CYCLE. HANG TO DRY. Sold Out`,
    campaignSlugs: ["essentials"],
    image: cdn("85f10a42ae59065e716181bf5bcd07376ada020be6e830b6a49262aab654cdfc", "Ghana-To-The-World-Black-Front.png"),
    images: [
      cdn("85f10a42ae59065e716181bf5bcd07376ada020be6e830b6a49262aab654cdfc", "Ghana-To-The-World-Black-Front.png"),
    ],
  },
  {
    slug: "og-gttw-long-sleeve-tee",
    name: "OG GTTW Long Sleeve Tee",
    collection: "Essentials",
    category: "Long sleeves",
    price: 50.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/Black-OG-GTTW-Staple-Sweatshirt",
    cargoSlug: "Black-OG-GTTW-Staple-Sweatshirt",
    description: `DETAILS: REGULAR FIT TEE WITH ROUND NECK OPENING. LIGHTWEIGHT 90% SUPIMA COTTON / 10% SPANDEX. FIT: TRUE TO SIZE CARE: MACHINE WASH COLD SEPARATE, GENTLE CYCLE. HANG TO DRY. Sold Out`,
    campaignSlugs: ["essentials"],
    image: cdn("bf291bc923a1b3ec4a980006a39edd483a9551dd6c01115754528871d8a9daeb", "Ghana-To-The-World-Sweatshirt-Black-Front.png"),
    images: [
      cdn("bf291bc923a1b3ec4a980006a39edd483a9551dd6c01115754528871d8a9daeb", "Ghana-To-The-World-Sweatshirt-Black-Front.png"),
    ],
  },
  {
    slug: "fisherman-denim-jacket",
    name: "Fisherman Denim Jacket",
    collection: "S/S '21",
    category: "Outerwear",
    price: 250.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: false,
    cargoUrl: "https://gttw.net/Fisherman-Denim-Jacket",
    cargoSlug: "Fisherman-Denim-Jacket",
    description: `DETAILS: 100% Cotton Denim. Non-Stretch Printed Denim throughout. Tonal Stiching. Button closure at front. Flap pockets at chest. Welt pockets at waist. Adjustable buttoned tabs at back hem. Model is 5 ft 11” and wears L. Sizing Recommendation Mens: True To Size Womens: We recommend purchasing 1 size down for a regular fit. Purchase your normal size for an oversized look.`,
    campaignSlugs: ["touch-the-sky", "fisherman", "aw22"],
    image: cdn("b652497c757a6c21eba8e2efdaf9783a7592aacecaf92294d381c678b163cfa9", "GTTW_Fisherman-Denim_19_05_2021_Front.png"),
    images: [
      cdn("b652497c757a6c21eba8e2efdaf9783a7592aacecaf92294d381c678b163cfa9", "GTTW_Fisherman-Denim_19_05_2021_Front.png"),
      cdn("162761c2c829487f6aec58dcf621b7a2a259c5d4510bd3aea0a1d53db078ba47", "GTTW_Fisherman-Denim_19_05_2021_Back.png"),
    ],
  },
  {
    slug: "gttw-airways-knit-sweater",
    name: "GTTW Airways Knit Sweater",
    collection: "S/S '21",
    category: "Knitwear",
    price: 200.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/GTTW-Airways-Knit-Sweater",
    cargoSlug: "GTTW-Airways-Knit-Sweater",
    description: `Long sleeve knit cotton and wool-blend sweater in baby blue. Rib knit crewneck collar, cuffs, and hem. Intarsia knit clouds, plane patch logo embroidery on the front. Model is 5 ft 11” and wears M. Sold Out`,
    campaignSlugs: ["touch-the-sky", "knit-airways", "aw22"],
    image: cdn("3c615fff780f9566c02288401adde1c42f02390f965ee707aa1793ee27e9a1c3", "GTTW-PLANE-FRONT.png"),
    images: [
      cdn("3c615fff780f9566c02288401adde1c42f02390f965ee707aa1793ee27e9a1c3", "GTTW-PLANE-FRONT.png"),
      cdn("290a17698bd3187d4c35afdcd7b1b9608731bb84eea0b515a94359d77ba2e876", "GTTW-PLANE-BACK.png"),
    ],
  },
  {
    slug: "gttw-benz-knit-sweater",
    name: "GTTW Benz Knit Sweater",
    collection: "S/S '21",
    category: "Knitwear",
    price: 200.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/GTTW-Benz-Knit-Sweater",
    cargoSlug: "GTTW-Benz-Knit-Sweater",
    description: `Long sleeve color-blocked knit cotton and wool-blend sweater in green  with black sleeves. Rib knit crewneck collar, cuffs, and hem.  Intarsia knit car logo with GTTW logo on the front. Model is 5 ft 11” and wears M. Sold Out`,
    campaignSlugs: ["touch-the-sky", "knit-airways", "aw22"],
    image: cdn("fbce5cc5dcae1e89aa0b044e734cd0ced29a957007353020c45fe9557936cb0e", "GTTW-BENZ-FRONT.png"),
    images: [
      cdn("fbce5cc5dcae1e89aa0b044e734cd0ced29a957007353020c45fe9557936cb0e", "GTTW-BENZ-FRONT.png"),
      cdn("09ea12627db724f00b14931e1bc57bcd808540db7516ae622ffadb21399ba32e", "GTTW-BENZ-BACK.png"),
    ],
  },
  {
    slug: "africa-to-the-world-hoodie",
    name: "Africa To The World Hoodie",
    collection: "Essentials",
    category: "Hoodies",
    price: 75.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/Green-Ghana-To-The-World-Hoodie",
    cargoSlug: "Green-Ghana-To-The-World-Hoodie",
    description: `DETAILS: REGULAR FIT HOODIE. MID-WEIGHT 80% COTTON 20% POLYESTER. EMBROIDERED TEXT ON FRONT, PRINTED LOGO AT THE BACK FIT: TRUE TO SIZE CARE: MACHINE WASH COLD SEPARATE, GENTLE CYCLE. HANG TO DRY. Sold Out`,
    campaignSlugs: ["essentials"],
    image: cdn("b841366e793ca46a53efd304857a49689666491e15dcfd3c4e9c7de7b4da297a", "Africa-To-The-World.png"),
    images: [
      cdn("b841366e793ca46a53efd304857a49689666491e15dcfd3c4e9c7de7b4da297a", "Africa-To-The-World.png"),
    ],
  },
  {
    slug: "mens-fisherman-denim-pants",
    name: "Men's Fisherman Denim Pants",
    collection: "S/S '21",
    category: "Bottoms",
    price: 180.0,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    soldOut: false,
    cargoUrl: "https://gttw.net/Men-s-Fisherman-Denim-Pants",
    cargoSlug: "Men-s-Fisherman-Denim-Pants",
    description: `100% Cotton denim. Printed design throughout. Straight Leg. Tonal Stitching. Imported. Classic 5-pocket jeans. Size Chart`,
    campaignSlugs: ["touch-the-sky", "fisherman"],
    image: cdn("eb27fdcb945217fcff06753a2a052808ed33e71034259b6a2fadb4a8e8fb6d24", "GTTW-Fisherman-Denim-Pants-Front-2.png"),
    images: [
      cdn("eb27fdcb945217fcff06753a2a052808ed33e71034259b6a2fadb4a8e8fb6d24", "GTTW-Fisherman-Denim-Pants-Front-2.png"),
      cdn("c438463f77857f4ac068ebc42c8d151bafd7d3266bb72f0c44ec8161285aec6e", "GTTW-Fisherman-Denim-Pants-Back.png"),
    ],
  },
  {
    slug: "vim-button-up-shirt",
    name: "Vim Button Up Shirt",
    collection: "S/S '21",
    category: "Tops",
    price: 85.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/Vim-Shirt",
    cargoSlug: "Vim-Shirt",
    description: `100% Polyester. Satin. Short sleeve button up. Vim logo in different colors. The world is yours blimp. Patch pocket at chest. Open spread collar.`,
    campaignSlugs: ["touch-the-sky", "vim"],
    image: cdn("ec6c23230979516abbed3769281a3f8a588cd6b24aebb7c9a292518bf99c6b0b", "GTTW-VIM-TEE-FRONT.png"),
    images: [
      cdn("ec6c23230979516abbed3769281a3f8a588cd6b24aebb7c9a292518bf99c6b0b", "GTTW-VIM-TEE-FRONT.png"),
      cdn("3236a138290cdbf3ca13d3134f17d1a50007dae61f3e324c9767bf8e64c86b2e", "GTTW-VIM-TEE-BACK.png"),
    ],
  },
  {
    slug: "vim-trunks",
    name: "Vim Trunks",
    collection: "S/S '21",
    category: "Bottoms",
    price: 50.0,
    sizes: ["S", "M", "L", "XL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/Vim-Shorts",
    cargoSlug: "Vim-Shorts",
    description: `100% Polyester satin trunks in black. Mid-rise. Three-pocket styling. Drawstring at elasticized waistband. Logo printed in white at front. Vim & The world is yours blimb logos all over print. Sold Out`,
    campaignSlugs: ["touch-the-sky", "vim"],
    image: cdn("9dcab2ff32fab4a60dfc1bc0448c3402aba3f553cfe1879b8668347e1be79dd5", "GTTW-VIM-SHORTS.png"),
    images: [
      cdn("9dcab2ff32fab4a60dfc1bc0448c3402aba3f553cfe1879b8668347e1be79dd5", "GTTW-VIM-SHORTS.png"),
    ],
  },
  {
    slug: "white-accra-tee",
    name: "White Accra Tee",
    collection: "Essentials",
    category: "Tees",
    price: 75.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: false,
    cargoUrl: "https://gttw.net/White-Accra-Tee",
    cargoSlug: "White-Accra-Tee",
    description: `Regular fit tee with round neck opening. Midweight 100% supima cotton. Contrast stiching. “ACCRA” patch on chest area. Text embroidered on the front. Logo printed on the back. Hand wash. Hang to dry.`,
    campaignSlugs: ["essentials"],
    image: cdn("198e2d69f055d82d943cba9d26787f954d2893e8653f4f6b47261b1cb7752e29", "GTTW-ACCRA-WHITE.png"),
    images: [
      cdn("198e2d69f055d82d943cba9d26787f954d2893e8653f4f6b47261b1cb7752e29", "GTTW-ACCRA-WHITE.png"),
    ],
  },
  {
    slug: "africa-is-not-for-sale-tee-white",
    name: "Africa Is Not For Sale Tee (White)",
    collection: "Essentials",
    category: "Tees",
    price: 45.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/White-Africa-is-Not-For-Sale-Tee-1",
    cargoSlug: "White-Africa-is-Not-For-Sale-Tee-1",
    description: `Regular fit tee with round neck opening. Lightweight 100% supima cotton. Text printed on the front. Star logo printed on the back. True to size. Machine wash cold seperate, gentle cycle. Hang to dry. Sold Out`,
    campaignSlugs: ["essentials"],
    image: cdn("3fa46b7c9bfed2f7cb3d2ba27c82a04692b8fa8fecc389166f181c4eec914467", "Africa-Is-Not-For-Sale-White-Front.png"),
    images: [
      cdn("3fa46b7c9bfed2f7cb3d2ba27c82a04692b8fa8fecc389166f181c4eec914467", "Africa-Is-Not-For-Sale-White-Front.png"),
    ],
  },
  {
    slug: "womens-fisherman-denim-pants",
    name: "Women's Fisherman Denim Pants",
    collection: "S/S '21",
    category: "Bottoms",
    price: 180.0,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    soldOut: false,
    cargoUrl: "https://gttw.net/Women-s-Fisherman-Denim-Pants",
    cargoSlug: "Women-s-Fisherman-Denim-Pants",
    description: `100% Cotton denim. Printed design throughout. Straight Leg. Tonal Stitching. Imported. Classic 5-pocket jeans. Fits true to size.`,
    campaignSlugs: ["touch-the-sky", "fisherman"],
    image: cdn("eb27fdcb945217fcff06753a2a052808ed33e71034259b6a2fadb4a8e8fb6d24", "GTTW-Fisherman-Denim-Pants-Front-2.png"),
    images: [
      cdn("eb27fdcb945217fcff06753a2a052808ed33e71034259b6a2fadb4a8e8fb6d24", "GTTW-Fisherman-Denim-Pants-Front-2.png"),
      cdn("a9b6eece7ca5be45fed33dcf4962cb953572e20a4faf414ce312883600021b53", "GTTW-Fisherman-Denim-Pants-Back.png"),
    ],
  },
  {
    slug: "ghana-to-the-world-hoodie-yellow",
    image: cdn("a4af47de3d33ac7a0fbcee4cda564926762e4201ebbb7b08472e508a1665ddc2", "Ghana-To-THe-World-Yellow-Front.png"),
    name: "Ghana To The World Hoodie (Yellow)",
    collection: "Essentials",
    category: "Hoodies",
    price: 75.0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: true,
    cargoUrl: "https://gttw.net/Yellow-Ghana-To-The-World-Hoodie",
    cargoSlug: "Yellow-Ghana-To-The-World-Hoodie",
    description: `DETAILS: REGULAR FIT HOODIE. MID-WEIGHT 80% COTTON 20% POLYESTER. EMBROIDERED TEXT ON FRONT, PRINTED LOGO AT THE BACK FIT: TRUE TO SIZE CARE: MACHINE WASH COLD SEPARATE, GENTLE CYCLE. HANG TO DRY. Sold Out`,
    campaignSlugs: ["essentials"],
    images: [
      cdn("a4af47de3d33ac7a0fbcee4cda564926762e4201ebbb7b08472e508a1665ddc2", "Ghana-To-THe-World-Yellow-Front.png"),
    ],
  }
];

export type RadioEpisode = {
  ep: string;
  title: string;
};

export const radio: RadioEpisode[] = [
  { ep: "01", title: "GFLAMEE" },
  { ep: "02", title: "DJ Mohogany" },
  { ep: "03", title: "Blaq Pages" },
  { ep: "04", title: "Dj Kwamzy" },
];

export type Campaign = {
  slug: string;
  number: string;
  title: string;
  season: string;
  tagline: string;
  story: string;
  image: string;
  stills: string[];
  productSlugs: string[];
  lookSlugs: string[];
  radioEps: string[];
  shopFilter: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "touch-the-sky",
    number: "01",
    title: "Touch The Sky",
    season: "S/S ‘21",
    tagline: "The SS21 drop — Ghana To The World, airborne.",
    story:
      "“Ghana To The World” Touch The Sky in Latest SS21 Drop. Cultural expression through design, fashion & film — the season that named the climb.",
    image: cdn(
      "4c27be77c002ef200523e8f6f2ea50dba59a4ec65f0f986d029afb96d9400a93",
      "19122020.jpg",
    ),
    stills: [
      cdn(
        "c808b52bff0c3b64fab0a3f6c73ea166dd48cb3768fe1bca6bcc39d025809086",
        "_V0A1693.jpg",
      ),
      cdn(
        "d062ef87d4d0dfccb24b31bc10ff72241b518b7f7d323176d46aeb31a72dab9a",
        "_DSC8449k-2.jpg",
      ),
      cdn(
        "912eff25de2ac9d3b71fe26f214af24dda73cb128270d378416d8cc487c2c28c",
        "191220204.jpg",
      ),
    ],
    productSlugs: [
      "fisherman-denim-jacket",
      "mens-fisherman-denim-pants",
      "vim-button-up-shirt",
      "gttw-benz-knit-sweater",
      "gttw-airways-knit-sweater",
    ],
    lookSlugs: ["fisherman-full", "vim-set", "knit-travel"],
    radioEps: ["01", "02"],
    shopFilter: "ss21",
  },
  {
    slug: "fisherman",
    number: "02",
    title: "Fisherman",
    season: "S/S ‘21",
    tagline: "Denim cut for work, worn as culture.",
    story:
      "Fisherman Denim Jacket, Men’s and Women’s Fisherman Denim Pants — indigo structure from the S/S ‘21 shop surface.",
    image: cdn(
      "50e239fd696d8b8ee0be5850cc0b433d5c73b0064742f4e2f04a5397bad9494e",
      "1DA4930F-DD7F-433A-B869-E08D21C506B9.JPG",
    ),
    stills: [
      cdn(
        "58fde600030eeb26e5f47bc3cc723ff27008d4ca9e94cfb8a5f30ea66cc8488e",
        "_DSC8521-copy-2.jpg",
      ),
    ],
    productSlugs: [
      "fisherman-denim-jacket",
      "mens-fisherman-denim-pants",
      "womens-fisherman-denim-pants",
    ],
    lookSlugs: ["fisherman-full"],
    radioEps: ["01"],
    shopFilter: "fisherman",
  },
  {
    slug: "knit-airways",
    number: "03",
    title: "Knit Airways",
    season: "S/S ‘21",
    tagline: "Benz and Airways — knits that travel.",
    story:
      "GTTW Benz Knit Sweater and GTTW Airways Knit Sweater — knitwear named for motion and place.",
    image: cdn(
      "21163236459d05a225c59136becbc95e4fa6e5ab042998179e5c31a512ac957b",
      "E15FE768-73A3-46B8-999D-0588D7F0508A-2.jpg",
    ),
    stills: [
      cdn(
        "36ab7ac04ac9dd403ae7f3fd4216b971300631b06b8fd1cff8d8ce90cd0bc181",
        "9DF2B719-4619-428E-86F7-AEAFE4C38180.JPG",
      ),
    ],
    productSlugs: ["gttw-benz-knit-sweater", "gttw-airways-knit-sweater"],
    lookSlugs: ["knit-travel"],
    radioEps: ["02"],
    shopFilter: "knit",
  },
  {
    slug: "essentials",
    number: "04",
    title: "Essentials",
    season: "Permanent",
    tagline: "Graphics that stay — Africa Is Not For Sale, GTTW tees.",
    story:
      "Core graphics and staples from the Essentials set on gttw.net — Africa Is Not For Sale, Ghana To The World tees and sweats.",
    image: cdn(
      "66bfa31a42c4bb999503ac8f9b4cfcfd334be0a9c4989588e05fe2f7f78e76c1",
      "GTTW-ACCRA-BLACK.png",
    ),
    stills: [
      cdn(
        "d597a147d44ad66963624f3b25f83af970dea3a313f7e55c8e082c43ef725b0c",
        "Africa-Is-Not-For-Sale-Black-Front.png",
      ),
    ],
    productSlugs: [
      "black-accra-tee",
      "white-accra-tee",
      "africa-is-not-for-sale-tee-black",
      "africa-is-not-for-sale-tee-white",
      "ghana-to-the-world-hoodie-black",
      "ghana-to-the-world-hoodie-yellow",
      "africa-to-the-world-hoodie",
      "og-gttw-long-sleeve-tee",
    ],
    lookSlugs: ["essentials-graphic"],
    radioEps: ["03"],
    shopFilter: "essentials",
  },
  {
    slug: "aw22",
    number: "05",
    title: "Autumn / Winter ‘22",
    season: "A/W ‘22",
    tagline: "Season header from the live shop — denser layers, same voice.",
    story:
      "Autumn/Winter ‘22 appears on the live GTTW shop surface alongside Essentials. Campaign stills carry the colder chapter.",
    image: cdn(
      "c808b52bff0c3b64fab0a3f6c73ea166dd48cb3768fe1bca6bcc39d025809086",
      "_V0A1693.jpg",
    ),
    stills: [
      cdn(
        "d062ef87d4d0dfccb24b31bc10ff72241b518b7f7d323176d46aeb31a72dab9a",
        "_DSC8449k-2.jpg",
      ),
    ],
    productSlugs: [
      "gttw-benz-knit-sweater",
      "gttw-airways-knit-sweater",
      "fisherman-denim-jacket",
      "mens-fisherman-denim-pants",
    ],
    lookSlugs: ["knit-travel", "fisherman-full"],
    radioEps: ["04"],
    shopFilter: "aw22",
  },
];

export type Look = {
  slug: string;
  name: string;
  season: string;
  blurb: string;
  image: string;
  productSlugs: string[];
};

export const looks: Look[] = [
  {
    slug: "fisherman-full",
    name: "Fisherman Full",
    season: "S/S ‘21",
    blurb: "Jacket + pants — the denim set from the shop.",
    image: cdn(
      "b652497c757a6c21eba8e2efdaf9783a7592aacecaf92294d381c678b163cfa9",
      "GTTW_Fisherman-Denim_19_05_2021_Front.png",
    ),
    productSlugs: ["fisherman-denim-jacket", "mens-fisherman-denim-pants"],
  },
  {
    slug: "vim-set",
    name: "Vim Set",
    season: "S/S ‘21",
    blurb: "Vim Button Up Shirt with Vim Trunks.",
    image: cdn(
      "ec6c23230979516abbed3769281a3f8a588cd6b24aebb7c9a292518bf99c6b0b",
      "GTTW-VIM-TEE-FRONT.png",
    ),
    productSlugs: ["vim-button-up-shirt", "vim-trunks"],
  },
  {
    slug: "knit-travel",
    name: "Knit Travel",
    season: "S/S ‘21",
    blurb: "Airways knit — named for the journey.",
    image: cdn(
      "3c615fff780f9566c02288401adde1c42f02390f965ee707aa1793ee27e9a1c3",
      "GTTW-PLANE-FRONT.png",
    ),
    productSlugs: ["gttw-airways-knit-sweater", "gttw-benz-knit-sweater"],
  },
  {
    slug: "essentials-graphic",
    name: "Essentials Graphic",
    season: "Essentials",
    blurb: "GTTW tee + Africa Is Not For Sale.",
    image: cdn(
      "f44c41589d4f7d0bc247b78650dc7018aed980f2661f8384ee1afcef9ea6563f",
      "Africa-Is-Not-For-Sale-Black-Front.png",
    ),
    productSlugs: ["africa-is-not-for-sale-tee-black", "black-accra-tee"],
  },
];

/** Lookbook galleries — one dedicated image set per collection (HOE Gallery rhythm) */
export type LookbookGallery = {
  slug: string;
  title: string;
  season: string;
  tagline: string;
  cover: string;
  images: { src: string; alt: string }[];
  productSlugs: string[];
  shopFilter: string;
};

export const lookbookGalleries: LookbookGallery[] = [
  {
    slug: "touch-the-sky",
    title: "Touch The Sky",
    season: "S/S ‘21",
    tagline: "The SS21 drop — airborne stills from the campaign.",
    cover: cdn(
      "4c27be77c002ef200523e8f6f2ea50dba59a4ec65f0f986d029afb96d9400a93",
      "19122020.jpg",
    ),
    images: [
      {
        src: cdn(
          "4c27be77c002ef200523e8f6f2ea50dba59a4ec65f0f986d029afb96d9400a93",
          "19122020.jpg",
        ),
        alt: "Touch The Sky campaign portrait",
      },
      {
        src: cdn(
          "912eff25de2ac9d3b71fe26f214af24dda73cb128270d378416d8cc487c2c28c",
          "191220204.jpg",
        ),
        alt: "Touch The Sky editorial still",
      },
      {
        src: cdn(
          "c808b52bff0c3b64fab0a3f6c73ea166dd48cb3768fe1bca6bcc39d025809086",
          "_V0A1693.jpg",
        ),
        alt: "Campaign portrait — Touch The Sky era",
      },
      {
        src: cdn(
          "d062ef87d4d0dfccb24b31bc10ff72241b518b7f7d323176d46aeb31a72dab9a",
          "_DSC8449k-2.jpg",
        ),
        alt: "Street editorial — SS21",
      },
      {
        src: cdn(
          "21163236459d05a225c59136becbc95e4fa6e5ab042998179e5c31a512ac957b",
          "E15FE768-73A3-46B8-999D-0588D7F0508A-2.jpg",
        ),
        alt: "Lookbook frame — SS21",
      },
      {
        src: cdn(
          "58fde600030eeb26e5f47bc3cc723ff27008d4ca9e94cfb8a5f30ea66cc8488e",
          "_DSC8521-copy-2.jpg",
        ),
        alt: "Fashion still — SS21",
      },
    ],
    productSlugs: [
      "fisherman-denim-jacket",
      "vim-button-up-shirt",
      "gttw-benz-knit-sweater",
      "gttw-airways-knit-sweater",
    ],
    shopFilter: "ss21",
  },
  {
    slug: "fisherman",
    title: "Fisherman",
    season: "S/S ‘21",
    tagline: "Denim cut for work — gallery from the Fisherman chapter.",
    cover: cdn(
      "50e239fd696d8b8ee0be5850cc0b433d5c73b0064742f4e2f04a5397bad9494e",
      "1DA4930F-DD7F-433A-B869-E08D21C506B9.JPG",
    ),
    images: [
      {
        src: cdn(
          "50e239fd696d8b8ee0be5850cc0b433d5c73b0064742f4e2f04a5397bad9494e",
          "1DA4930F-DD7F-433A-B869-E08D21C506B9.JPG",
        ),
        alt: "Fisherman denim look",
      },
      {
        src: cdn(
          "2eb389228766edb8b5f0b695c1f5cbd8ac3c266daff66f1a18ab80db7c4b94d5",
          "_V0A1434-copy.jpeg",
        ),
        alt: "Fisherman jacket worn",
      },
      {
        src: cdn(
          "fa8144a885cc8432970d258735f56538d6e3e0f514f2b81dd52f8b12ca9df6b2",
          "_V0A1344.jpeg",
        ),
        alt: "Fisherman editorial frame",
      },
      {
        src: cdn(
          "f3ca437f809dc23a31c635e0fe78ae10e92228eb3a6edf06564b690a75692c46",
          "_V0A1487.jpeg",
        ),
        alt: "Fisherman detail still",
      },
      {
        src: cdn(
          "58fde600030eeb26e5f47bc3cc723ff27008d4ca9e94cfb8a5f30ea66cc8488e",
          "_DSC8521-copy-2.jpg",
        ),
        alt: "Fisherman chapter street still",
      },
      {
        src: cdn(
          "b652497c757a6c21eba8e2efdaf9783a7592aacecaf92294d381c678b163cfa9",
          "GTTW_Fisherman-Denim_19_05_2021_Front.png",
        ),
        alt: "Fisherman Denim Jacket flat",
      },
    ],
    productSlugs: [
      "fisherman-denim-jacket",
      "mens-fisherman-denim-pants",
      "womens-fisherman-denim-pants",
    ],
    shopFilter: "fisherman",
  },
  {
    slug: "knit-airways",
    title: "Knit Airways",
    season: "S/S ‘21",
    tagline: "Benz and Airways — knits in motion.",
    cover: cdn(
      "21163236459d05a225c59136becbc95e4fa6e5ab042998179e5c31a512ac957b",
      "E15FE768-73A3-46B8-999D-0588D7F0508A-2.jpg",
    ),
    images: [
      {
        src: cdn(
          "21163236459d05a225c59136becbc95e4fa6e5ab042998179e5c31a512ac957b",
          "E15FE768-73A3-46B8-999D-0588D7F0508A-2.jpg",
        ),
        alt: "Knit Airways look",
      },
      {
        src: cdn(
          "36ab7ac04ac9dd403ae7f3fd4216b971300631b06b8fd1cff8d8ce90cd0bc181",
          "9DF2B719-4619-428E-86F7-AEAFE4C38180.JPG",
        ),
        alt: "Knitwear editorial",
      },
      {
        src: cdn(
          "56c092b769d42f0c38a63241733b793417a7d9f399179659f602ddda8f5e09ba",
          "_V0A1606.jpg",
        ),
        alt: "Airways knit worn",
      },
      {
        src: cdn(
          "c39d82396bf005b096951ffdd89394886cbdc99a0cabdd7a886047bc9eab1661",
          "IMG_6759.jpeg",
        ),
        alt: "Benz knit detail",
      },
      {
        src: cdn(
          "478d58810a31baf472744b2aecd974ae4d2c8c270470c30aa095776ed417e4bf",
          "_V0A1693.jpeg",
        ),
        alt: "Knit Airways portrait",
      },
      {
        src: cdn(
          "3c615fff780f9566c02288401adde1c42f02390f965ee707aa1793ee27e9a1c3",
          "GTTW-PLANE-FRONT.png",
        ),
        alt: "Airways Knit Sweater",
      },
    ],
    productSlugs: ["gttw-benz-knit-sweater", "gttw-airways-knit-sweater"],
    shopFilter: "knit",
  },
  {
    slug: "essentials",
    title: "Essentials",
    season: "Permanent",
    tagline: "Graphics that stay — Accra, Africa Is Not For Sale, GTTW staples.",
    cover: cdn(
      "683a42bae28fd6afa3319a2bcc4f134a2d338a46019eadeed82da92cf406ab6f",
      "EfUkW5eXkAAPBue.jpeg",
    ),
    images: [
      {
        src: cdn(
          "683a42bae28fd6afa3319a2bcc4f134a2d338a46019eadeed82da92cf406ab6f",
          "EfUkW5eXkAAPBue.jpeg",
        ),
        alt: "Accra tee worn",
      },
      {
        src: cdn(
          "c40015a98e318b4e5e691eb298694987d4be6df981f462d16f02a20e76f32333",
          "EfUkW5iX0AET8_K.jpeg",
        ),
        alt: "White Accra tee worn",
      },
      {
        src: cdn(
          "66bfa31a42c4bb999503ac8f9b4cfcfd334be0a9c4989588e05fe2f7f78e76c1",
          "GTTW-ACCRA-BLACK.png",
        ),
        alt: "Black Accra Tee",
      },
      {
        src: cdn(
          "f44c41589d4f7d0bc247b78650dc7018aed980f2661f8384ee1afcef9ea6563f",
          "Africa-Is-Not-For-Sale-Black-Front.png",
        ),
        alt: "Africa Is Not For Sale Tee",
      },
      {
        src: cdn(
          "85f10a42ae59065e716181bf5bcd07376ada020be6e830b6a49262aab654cdfc",
          "Ghana-To-The-World-Black-Front.png",
        ),
        alt: "GTTW Hoodie Black",
      },
      {
        src: cdn(
          "a4af47de3d33ac7a0fbcee4cda564926762e4201ebbb7b08472e508a1665ddc2",
          "Ghana-To-THe-World-Yellow-Front.png",
        ),
        alt: "GTTW Hoodie Yellow",
      },
      {
        src: cdn(
          "b841366e793ca46a53efd304857a49689666491e15dcfd3c4e9c7de7b4da297a",
          "Africa-To-The-World.png",
        ),
        alt: "Africa To The World Hoodie",
      },
      {
        src: cdn(
          "0542371f6ba6a5594aab018c67a1058210c0682591fa3521a9e31cfb1da108ce",
          "GTTW-01.png",
        ),
        alt: "GTTW brand graphic 01",
      },
    ],
    productSlugs: [
      "black-accra-tee",
      "white-accra-tee",
      "africa-is-not-for-sale-tee-black",
      "ghana-to-the-world-hoodie-black",
      "africa-to-the-world-hoodie",
    ],
    shopFilter: "essentials",
  },
  {
    slug: "aw22",
    title: "Autumn / Winter ‘22",
    season: "A/W ‘22",
    tagline: "Colder chapter — denser layers, same voice.",
    cover: cdn(
      "c808b52bff0c3b64fab0a3f6c73ea166dd48cb3768fe1bca6bcc39d025809086",
      "_V0A1693.jpg",
    ),
    images: [
      {
        src: cdn(
          "c808b52bff0c3b64fab0a3f6c73ea166dd48cb3768fe1bca6bcc39d025809086",
          "_V0A1693.jpg",
        ),
        alt: "A/W ‘22 portrait",
      },
      {
        src: cdn(
          "d062ef87d4d0dfccb24b31bc10ff72241b518b7f7d323176d46aeb31a72dab9a",
          "_DSC8449k-2.jpg",
        ),
        alt: "A/W ‘22 street still",
      },
      {
        src: cdn(
          "36ab7ac04ac9dd403ae7f3fd4216b971300631b06b8fd1cff8d8ce90cd0bc181",
          "9DF2B719-4619-428E-86F7-AEAFE4C38180.JPG",
        ),
        alt: "A/W knit layering",
      },
      {
        src: cdn(
          "21163236459d05a225c59136becbc95e4fa6e5ab042998179e5c31a512ac957b",
          "E15FE768-73A3-46B8-999D-0588D7F0508A-2.jpg",
        ),
        alt: "A/W lookbook frame",
      },
      {
        src: cdn(
          "50e239fd696d8b8ee0be5850cc0b433d5c73b0064742f4e2f04a5397bad9494e",
          "1DA4930F-DD7F-433A-B869-E08D21C506B9.JPG",
        ),
        alt: "A/W denim layer",
      },
    ],
    productSlugs: [
      "gttw-benz-knit-sweater",
      "gttw-airways-knit-sweater",
      "fisherman-denim-jacket",
    ],
    shopFilter: "aw22",
  },
];

/** Category tiles on home — DP-style entry grid */
export const homeCategories = [
  {
    label: "Tees",
    href: "/shop?chapter=essentials",
    image: cdn(
      "66bfa31a42c4bb999503ac8f9b4cfcfd334be0a9c4989588e05fe2f7f78e76c1",
      "GTTW-ACCRA-BLACK.png",
    ),
  },
  {
    label: "Denim",
    href: "/shop?chapter=fisherman",
    image: cdn(
      "b652497c757a6c21eba8e2efdaf9783a7592aacecaf92294d381c678b163cfa9",
      "GTTW_Fisherman-Denim_19_05_2021_Front.png",
    ),
  },
  {
    label: "Knitwear",
    href: "/shop?chapter=knit",
    image: cdn(
      "3c615fff780f9566c02288401adde1c42f02390f965ee707aa1793ee27e9a1c3",
      "GTTW-PLANE-FRONT.png",
    ),
  },
  {
    label: "Lookbook",
    href: "/looks",
    image: cdn(
      "c808b52bff0c3b64fab0a3f6c73ea166dd48cb3768fe1bca6bcc39d025809086",
      "_V0A1693.jpg",
    ),
  },
] as const;

export const journalEntries = [
  {
    number: "01",
    title: "Touch The Sky",
    date: "May 28",
    line: "“Ghana To The World” Touch The Sky in Latest SS21 Drop.",
    href: "/campaigns/touch-the-sky",
  },
  {
    number: "02",
    title: "Mission",
    date: "May 26",
    line: "A gift of love — cultural expression through design, fashion & film.",
    href: "/about",
  },
] as const;

export const filmStills = [
  {
    src: cdn(
      "4c27be77c002ef200523e8f6f2ea50dba59a4ec65f0f986d029afb96d9400a93",
      "19122020.jpg",
    ),
    caption: "Campaign still — Touch The Sky era",
  },
  {
    src: cdn(
      "c808b52bff0c3b64fab0a3f6c73ea166dd48cb3768fe1bca6bcc39d025809086",
      "_V0A1693.jpg",
    ),
    caption: "Editorial portrait",
  },
  {
    src: cdn(
      "d062ef87d4d0dfccb24b31bc10ff72241b518b7f7d323176d46aeb31a72dab9a",
      "_DSC8449k-2.jpg",
    ),
    caption: "Street editorial",
  },
  {
    src: cdn(
      "58fde600030eeb26e5f47bc3cc723ff27008d4ca9e94cfb8a5f30ea66cc8488e",
      "_DSC8521-copy-2.jpg",
    ),
    caption: "Fashion still",
  },
] as const;

export const categories = ["Tees", "Hoodies", "Long sleeves", "Knitwear", "Outerwear", "Bottoms", "Tops"] as const;

export const heroImage = campaigns[0].image;

export function getCampaign(slug: string) {
  return campaigns.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getLook(slug: string) {
  return looks.find((l) => l.slug === slug);
}

export function getLookbookGallery(slug: string) {
  return lookbookGalleries.find((g) => g.slug === slug);
}

export function productsForCampaign(slug: string) {
  const c = getCampaign(slug);
  if (!c) return [];
  return c.productSlugs
    .map((s) => getProduct(s))
    .filter((p): p is Product => Boolean(p));
}

export function looksForCampaign(slug: string) {
  const c = getCampaign(slug);
  if (!c) return [];
  return c.lookSlugs
    .map((s) => getLook(s))
    .filter((l): l is Look => Boolean(l));
}

export function radioForCampaign(slug: string) {
  const c = getCampaign(slug);
  if (!c) return [];
  return c.radioEps
    .map((ep) => radio.find((r) => r.ep === ep))
    .filter((r): r is RadioEpisode => Boolean(r));
}
