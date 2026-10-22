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

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/about", label: "Brand" },
  { href: "/contact", label: "Contact" },
] as const;

export const collections = [
  {
    slug: "aw22",
    title: "Autumn/Winter ‘22",
    blurb: "Denim, knits, and seasonal essentials from the live shop.",
  },
  {
    slug: "essentials",
    title: "Essentials",
    blurb: "Core graphics and staples — Africa Is Not For Sale, GTTW tees, sweats.",
  },
  {
    slug: "ss21",
    title: "S/S ‘21",
    blurb: "The Touch The Sky drop — Fisherman denim, Vim, Benz, Airways.",
  },
] as const;

export const categories = ["Tees", "Hoodies", "Sweatshirts"] as const;

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "fisherman-denim-jacket",
    name: "Fisherman Denim Jacket",
    collection: "S/S ‘21",
    category: "Outerwear",
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
    image: cdn(
      "d597a147d44ad66963624f3b25f83af970dea3a313f7e55c8e082c43ef725b0c",
      "Africa-Is-Not-For-Sale-Black-Front.png",
    ),
  },
];

export const lookbook = [
  {
    src: cdn(
      "4c27be77c002ef200523e8f6f2ea50dba59a4ec65f0f986d029afb96d9400a93",
      "19122020.jpg",
    ),
    alt: "GTTW campaign look",
  },
  {
    src: cdn(
      "c808b52bff0c3b64fab0a3f6c73ea166dd48cb3768fe1bca6bcc39d025809086",
      "_V0A1693.jpg",
    ),
    alt: "GTTW editorial portrait",
  },
  {
    src: cdn(
      "d062ef87d4d0dfccb24b31bc10ff72241b518b7f7d323176d46aeb31a72dab9a",
      "_DSC8449k-2.jpg",
    ),
    alt: "GTTW street editorial",
  },
  {
    src: cdn(
      "912eff25de2ac9d3b71fe26f214af24dda73cb128270d378416d8cc487c2c28c",
      "191220204.jpg",
    ),
    alt: "GTTW lookbook frame",
  },
  {
    src: cdn(
      "50e239fd696d8b8ee0be5850cc0b433d5c73b0064742f4e2f04a5397bad9494e",
      "1DA4930F-DD7F-433A-B869-E08D21C506B9.JPG",
    ),
    alt: "GTTW culture editorial",
  },
  {
    src: cdn(
      "58fde600030eeb26e5f47bc3cc723ff27008d4ca9e94cfb8a5f30ea66cc8488e",
      "_DSC8521-copy-2.jpg",
    ),
    alt: "GTTW fashion still",
  },
  {
    src: cdn(
      "21163236459d05a225c59136becbc95e4fa6e5ab042998179e5c31a512ac957b",
      "E15FE768-73A3-46B8-999D-0588D7F0508A-2.jpg",
    ),
    alt: "GTTW campaign detail",
  },
  {
    src: cdn(
      "36ab7ac04ac9dd403ae7f3fd4216b971300631b06b8fd1cff8d8ce90cd0bc181",
      "9DF2B719-4619-428E-86F7-AEAFE4C38180.JPG",
    ),
    alt: "GTTW lookbook frame",
  },
] as const;

export const heroImage = lookbook[0].src;
export const aboutImage = lookbook[2].src;
export const lookbookFeatureImage = lookbook[1].src;

export const radio = [
  { ep: "01", title: "GFLAMEE" },
  { ep: "02", title: "DJ Mohogany" },
  { ep: "03", title: "Blaq Pages" },
  { ep: "04", title: "Dj Kwamzy" },
] as const;
