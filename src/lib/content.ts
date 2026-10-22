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

/** Clean commerce nav — Deadly Ponies–inspired rhythm */
export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/campaigns", label: "Collections" },
  { href: "/looks", label: "Lookbook" },
  { href: "/radio", label: "Radio" },
  { href: "/about", label: "About" },
] as const;

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: string;
  image: string;
  campaignSlugs: string[];
};

export const products: Product[] = [
  {
    slug: "fisherman-denim-jacket",
    name: "Fisherman Denim Jacket",
    collection: "S/S ‘21",
    category: "Outerwear",
    campaignSlugs: ["touch-the-sky", "fisherman"],
    image: cdn(
      "f0f123c65ff602ff00006ae90c36373ca02c1955436bffcf19e2956244820395",
      "GTTW_Fisherman-Denim_19_05_2021_Front.png",
    ),
  },
  {
    slug: "mens-fisherman-denim-pants",
    name: "Men’s Fisherman Denim Pants",
    collection: "S/S ‘21",
    category: "Bottoms",
    campaignSlugs: ["touch-the-sky", "fisherman"],
    image: cdn(
      "f35c5d22c5f77d631a75e4ce8040d2469b8f123ce021e6c86e1294376a2ae425",
      "GTTW-Fisherman-Denim-Pants-Front.png",
    ),
  },
  {
    slug: "womens-fisherman-denim-pants",
    name: "Women’s Fisherman Denim Pants",
    collection: "S/S ‘21",
    category: "Bottoms",
    campaignSlugs: ["touch-the-sky", "fisherman"],
    image: cdn(
      "485fd6f8cab26bf074a2f050d6369a44b44b4bb06d5c3efacd8b8547f412d17a",
      "GTTW-WOMEN-S-FISHERMAN-DENIM-FRONT.png",
    ),
  },
  {
    slug: "vim-button-up-shirt",
    name: "Vim Button Up Shirt",
    collection: "S/S ‘21",
    category: "Tops",
    campaignSlugs: ["touch-the-sky", "vim"],
    image: cdn(
      "558736e01c56ef85f454541ddcd0ebf473ba0940636f0b65527a2c33ae28b81f",
      "GTTW-VIM-TEE-FRONT.png",
    ),
  },
  {
    slug: "vim-trunks",
    name: "Vim Trunks",
    collection: "S/S ‘21",
    category: "Bottoms",
    campaignSlugs: ["touch-the-sky", "vim"],
    image: cdn(
      "83657d976e4a12228d9f1fb5cecdac5fa8a740eeb6d1e2ba913bb5c6a88bdc5a",
      "GTTW-VIM-SHORTS.png",
    ),
  },
  {
    slug: "gttw-benz-knit-sweater",
    name: "GTTW Benz Knit Sweater",
    collection: "S/S ‘21",
    category: "Knitwear",
    campaignSlugs: ["touch-the-sky", "knit-airways"],
    image: cdn(
      "57faaa0755ed0c9df1971a65eb86b48c76952c683ea2c616292fef5133e69402",
      "GTTW-BENZ-FRONT.png",
    ),
  },
  {
    slug: "gttw-airways-knit-sweater",
    name: "GTTW Airways Knit Sweater",
    collection: "S/S ‘21",
    category: "Knitwear",
    campaignSlugs: ["touch-the-sky", "knit-airways"],
    image: cdn(
      "6d0df2f85e03e8be6dde69211955ba20a842d767a40c04460135748f95b2964c",
      "GTTW-PLANE-FRONT.png",
    ),
  },
  {
    slug: "ghana-to-the-world-tee-black",
    name: "Ghana To The World Tee",
    collection: "Essentials",
    category: "Tees",
    campaignSlugs: ["essentials"],
    image: cdn(
      "1c7068501cfb7e10e6bb91ade4a816c033e3b4020eefd8a35bafb8e52c3c4b63",
      "Ghana-To-The-World-Tee-Black-Front.png",
    ),
  },
  {
    slug: "africa-is-not-for-sale",
    name: "Africa Is Not For Sale Tee",
    collection: "Essentials",
    category: "Tees",
    campaignSlugs: ["essentials"],
    image: cdn(
      "d597a147d44ad66963624f3b25f83af970dea3a313f7e55c8e082c43ef725b0c",
      "Africa-Is-Not-For-Sale-Black-Front.png",
    ),
  },
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
      "1c7068501cfb7e10e6bb91ade4a816c033e3b4020eefd8a35bafb8e52c3c4b63",
      "Ghana-To-The-World-Tee-Black-Front.png",
    ),
    stills: [
      cdn(
        "d597a147d44ad66963624f3b25f83af970dea3a313f7e55c8e082c43ef725b0c",
        "Africa-Is-Not-For-Sale-Black-Front.png",
      ),
    ],
    productSlugs: ["ghana-to-the-world-tee-black", "africa-is-not-for-sale"],
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
      "f0f123c65ff602ff00006ae90c36373ca02c1955436bffcf19e2956244820395",
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
      "558736e01c56ef85f454541ddcd0ebf473ba0940636f0b65527a2c33ae28b81f",
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
      "6d0df2f85e03e8be6dde69211955ba20a842d767a40c04460135748f95b2964c",
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
      "d597a147d44ad66963624f3b25f83af970dea3a313f7e55c8e082c43ef725b0c",
      "Africa-Is-Not-For-Sale-Black-Front.png",
    ),
    productSlugs: ["africa-is-not-for-sale", "ghana-to-the-world-tee-black"],
  },
];

/** Category tiles on home — DP-style entry grid */
export const homeCategories = [
  {
    label: "Tees",
    href: "/shop?chapter=essentials",
    image: cdn(
      "1c7068501cfb7e10e6bb91ade4a816c033e3b4020eefd8a35bafb8e52c3c4b63",
      "Ghana-To-The-World-Tee-Black-Front.png",
    ),
  },
  {
    label: "Denim",
    href: "/shop?chapter=fisherman",
    image: cdn(
      "f0f123c65ff602ff00006ae90c36373ca02c1955436bffcf19e2956244820395",
      "GTTW_Fisherman-Denim_19_05_2021_Front.png",
    ),
  },
  {
    label: "Knitwear",
    href: "/shop?chapter=knit",
    image: cdn(
      "6d0df2f85e03e8be6dde69211955ba20a842d767a40c04460135748f95b2964c",
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

export const categories = ["Tees", "Hoodies", "Sweatshirts"] as const;

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
