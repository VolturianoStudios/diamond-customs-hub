import type { CarBrand, Category, Product } from "./types";

import bmwThumb from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/thumb/bmw.png";
import bmwOpt from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/optimized/bmw.png";
import bmwOrig from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/original/bmw.png";
import mercThumb from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/thumb/mercedes-benz.png";
import mercOpt from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/optimized/mercedes-benz.png";
import mercOrig from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/original/mercedes-benz.png";
import audiThumb from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/thumb/audi.png";
import audiOpt from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/optimized/audi.png";
import audiOrig from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/original/audi.png";
import volvoThumb from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/thumb/volvo.png";
import volvoOpt from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/optimized/volvo.png";
import volvoOrig from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/original/volvo.png";
import vwThumb from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/thumb/volkswagen.png";
import vwOpt from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/optimized/volkswagen.png";
import vwOrig from "@/assets/car-logos-dataset-master/car-logos-dataset-master/logos/original/volkswagen.png";

export const CAR_BRANDS: CarBrand[] = [
  { slug: "bmw", name: "BMW", tagline: "The Ultimate Driving Machine", logo: { thumb: bmwThumb, optimized: bmwOpt, original: bmwOrig } },
  { slug: "mercedes", name: "Mercedes-Benz", tagline: "The Best or Nothing", logo: { thumb: mercThumb, optimized: mercOpt, original: mercOrig } },
  { slug: "audi", name: "Audi", tagline: "Vorsprung durch Technik", logo: { thumb: audiThumb, optimized: audiOpt, original: audiOrig } },
  { slug: "volvo", name: "Volvo", tagline: "Designed Around You", logo: { thumb: volvoThumb, optimized: volvoOpt, original: volvoOrig } },
  { slug: "volkswagen", name: "Volkswagen", tagline: "Das Auto", logo: { thumb: vwThumb, optimized: vwOpt, original: vwOrig } },
];

export const CATEGORIES: Category[] = [
  {
    slug: "badges",
    name: "Badges & Emblems",
    description: "Premium replacement badges and chrome delete emblems.",
  },
  {
    slug: "steering-wheels",
    name: "Steering Wheels",
    description: "Custom and OEM-style steering wheels with carbon and leather finishes.",
  },
  {
    slug: "multimedia",
    name: "Multimedia Screens",
    description: "CarPlay & Android Auto screens with seamless integration.",
  },
  {
    slug: "door-lights",
    name: "Door Projector Lights",
    description: "Logo projector lights for doors. Plug & play installation.",
  },
  {
    slug: "ambient-lighting",
    name: "Ambient Lighting",
    description: "RGB interior lighting kits for a custom cabin atmosphere.",
  },
  {
    slug: "cleaning",
    name: "Detailing & Cleaning",
    description: "Pro-grade detailing tools and cleaning kits for your vehicle.",
  },
];

// Mock products. Structured to map 1:1 to a future products table.
export const PRODUCTS: Product[] = [
  {
    id: "p_001",
    slug: "bmw-m-performance-badge",
    name: "BMW M Performance Badge",
    shortDescription: "Premium 3D emblem with adhesive backing.",
    description:
      "High-quality M Performance badge crafted from durable ABS with a polished chrome finish. Pre-applied 3M automotive adhesive for a perfect fit.",
    price: 349,
    compareAtPrice: 499,
    currency: "SEK",
    images: ["/placeholder.svg"],
    category: "badges",
    brand: "bmw",
    tags: ["m-performance", "emblem"],
    inStock: true,
    featured: true,
    badge: "BESTSELLER",
  },
  {
    id: "p_002",
    slug: "carbon-fiber-steering-wheel-bmw",
    name: "Carbon Fiber Steering Wheel — BMW",
    shortDescription: "Custom carbon & alcantara steering wheel.",
    description:
      "Hand-stitched alcantara grip with real carbon fiber accents. Direct fit for most modern BMW models. Includes airbag relocation kit.",
    price: 8990,
    currency: "SEK",
    images: ["/placeholder.svg"],
    category: "steering-wheels",
    brand: "bmw",
    inStock: true,
    featured: true,
    badge: "NEW",
  },
  {
    id: "p_003",
    slug: "carplay-screen-volvo-xc60",
    name: "CarPlay Screen — Volvo XC60",
    shortDescription: '8.8" wireless CarPlay & Android Auto screen.',
    description:
      "Plug-and-play multimedia upgrade designed for the Volvo XC60. Wireless CarPlay, Android Auto, GPS and reverse camera support.",
    price: 6990,
    currency: "SEK",
    images: ["/placeholder.svg"],
    category: "multimedia",
    brand: "volvo",
    inStock: true,
    featured: true,
  },
  {
    id: "p_004",
    slug: "door-projector-lights-mercedes",
    name: "Door Projector Lights — Mercedes",
    shortDescription: "HD logo projection. Wireless install.",
    description:
      "Replace your factory door lights with crisp HD Mercedes logo projectors. No wiring required — fits directly into the OEM housing.",
    price: 449,
    currency: "SEK",
    images: ["/placeholder.svg"],
    category: "door-lights",
    brand: "mercedes",
    inStock: true,
  },
  {
    id: "p_005",
    slug: "ambient-rgb-kit-pro",
    name: "Ambient RGB Pro Kit",
    shortDescription: "App-controlled RGB ambient lighting.",
    description:
      "Premium RGB ambient lighting kit with smartphone control, music sync and 16M colors. Universal fit for any vehicle.",
    price: 1290,
    currency: "SEK",
    images: ["/placeholder.svg"],
    category: "ambient-lighting",
    brand: "universal",
    inStock: true,
    featured: true,
  },
  {
    id: "p_006",
    slug: "interior-detailing-kit",
    name: "Interior Detailing Kit",
    shortDescription: "Pro-grade detailing brushes & cleaners.",
    description:
      "Complete kit for interior detailing: vent brushes, microfiber towels, leather cleaner and dashboard polish. Used by professionals.",
    price: 599,
    currency: "SEK",
    images: ["/placeholder.svg"],
    category: "cleaning",
    brand: "universal",
    inStock: true,
  },
  {
    id: "p_007",
    slug: "audi-rs-grille-badge",
    name: "Audi RS Grille Badge",
    shortDescription: "OEM-style RS badge for Audi grilles.",
    description: "Replacement RS grille badge with chrome finish. Direct fit for most Audi models.",
    price: 399,
    currency: "SEK",
    images: ["/placeholder.svg"],
    category: "badges",
    brand: "audi",
    inStock: true,
  },
  {
    id: "p_008",
    slug: "vw-led-door-lights",
    name: "VW LED Door Lights",
    shortDescription: "Volkswagen logo door projectors.",
    description: "Crisp VW logo projection with plug-and-play install. Includes both driver and passenger units.",
    price: 449,
    currency: "SEK",
    images: ["/placeholder.svg"],
    category: "door-lights",
    brand: "volkswagen",
    inStock: true,
  },
];

// Helper queries — replace with API calls when backend is added.
export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getProductsByCategory = (slug: string): Product[] =>
  PRODUCTS.filter((p) => p.category === slug);

export const getProductsByBrand = (slug: string): Product[] =>
  PRODUCTS.filter((p) => p.brand === slug);

export const getFeaturedProducts = (): Product[] =>
  PRODUCTS.filter((p) => p.featured);
