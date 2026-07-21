import imgNW from "@/assets/vastu_nw_guest_1784658699355.png";
import imgN from "@/assets/vastu_n_living_1784658710694.png";
import imgNE from "@/assets/vastu_ne_puja_1784658720516.png";
import imgW from "@/assets/vastu_w_children_1784658729507.png";
import imgC from "@/assets/vastu_c_center_1784658739619.png";
import imgE from "@/assets/vastu_e_entrance_1784658750755.png";
import imgSW from "@/assets/vastu_sw_master_1784658761365.png";
import imgS from "@/assets/vastu_s_store_1784658773325.png";
import imgSE from "@/assets/vastu_se_kitchen_1784658784347.png";

export type Element = "Water" | "Fire" | "Earth" | "Air" | "Space";

export interface VastuZoneDetails {
  id: string;
  name: string;
  gridArea: string; // e.g., 'nw', 'n', 'ne'
  rulingElement: Element;
  idealFor: string[];
  avoid: string[];
  advantages: string;
  color: string; // Tailwind color class for highlights
  bgClass: string;
  image: string;
}

export const interactiveVastuZones: Record<string, VastuZoneDetails> = {
  nw: {
    id: "nw",
    name: "North-West (Vayavya)",
    gridArea: "nw",
    rulingElement: "Air",
    idealFor: ["Guest Room", "Toilet/Bath", "Parking", "Store Room"],
    avoid: ["Master Bedroom", "Underground Water Tank"],
    advantages: "Support & Stability. Element of Air brings movement, helping guests leave on time and ensuring smooth business transactions.",
    color: "text-slate-500",
    bgClass: "bg-slate-50 border-slate-200",
    image: imgNW,
  },
  n: {
    id: "n",
    name: "North (Kubera)",
    gridArea: "n",
    rulingElement: "Water",
    idealFor: ["Living Room", "Entrance", "Open Spaces", "Underground Tank"],
    avoid: ["Toilet", "Kitchen", "Heavy Furniture", "Red Colors"],
    advantages: "Wealth & Opportunity. Ruled by Kubera (Lord of Wealth). Should be kept open, clean, and bright to attract prosperity.",
    color: "text-blue-500",
    bgClass: "bg-blue-50 border-blue-200",
    image: imgN,
  },
  ne: {
    id: "ne",
    name: "North-East (Ishanya)",
    gridArea: "ne",
    rulingElement: "Water",
    idealFor: ["Puja / Prayer Room", "Meditation", "Study Room", "Entrance"],
    avoid: ["Toilet", "Kitchen", "Master Bedroom", "Heavy Structures"],
    advantages: "Spiritual Growth & Positivity. The most sacred zone, receiving early morning sun. Excellent for mental clarity and health.",
    color: "text-sky-500",
    bgClass: "bg-sky-50 border-sky-200",
    image: imgNE,
  },
  w: {
    id: "w",
    name: "West (Varuna)",
    gridArea: "w",
    rulingElement: "Water",
    idealFor: ["Children's Bedroom", "Dining Room", "Overhead Tank", "Study"],
    avoid: ["Main Entrance", "Kitchen", "Underground Water Tank"],
    advantages: "Creativity & Stability. Brings gains and profits. Ideal for children's learning and dining area for better digestion.",
    color: "text-indigo-500",
    bgClass: "bg-indigo-50 border-indigo-200",
    image: imgW,
  },
  c: {
    id: "c",
    name: "Center (Brahmasthan)",
    gridArea: "c",
    rulingElement: "Space",
    idealFor: ["Courtyard", "Open Space", "Living Area"],
    avoid: ["Pillars", "Toilets", "Kitchens", "Staircases", "Heavy Walls"],
    advantages: "The energetic heart of the home. Keeps the flow of energy uninterrupted. Must be clean, open, and clutter-free.",
    color: "text-amber-500",
    bgClass: "bg-amber-50 border-amber-200",
    image: imgC,
  },
  e: {
    id: "e",
    name: "East (Indra)",
    gridArea: "e",
    rulingElement: "Fire",
    idealFor: ["Living Room", "Main Entrance", "Large Windows", "Balcony"],
    avoid: ["Toilet", "Staircase", "Heavy Walls blocking morning sun"],
    advantages: "Health & Happiness. Welcomes positive energy and maximum natural light (morning sun), ensuring a fresh and healthy environment.",
    color: "text-orange-500",
    bgClass: "bg-orange-50 border-orange-200",
    image: imgE,
  },
  sw: {
    id: "sw",
    name: "South-West (Nairutya)",
    gridArea: "sw",
    rulingElement: "Earth",
    idealFor: ["Master Bedroom", "Heavy Wardrobes", "Safes", "Staircase"],
    avoid: ["Kitchen", "Underground Water Tank", "Main Entrance", "Open Spaces"],
    advantages: "Stability & Strength. Represents the Earth element. Should be the highest and heaviest part of the house to ensure security and protection.",
    color: "text-stone-600",
    bgClass: "bg-stone-50 border-stone-300",
    image: imgSW,
  },
  s: {
    id: "s",
    name: "South (Yama)",
    gridArea: "s",
    rulingElement: "Fire",
    idealFor: ["Store Room", "Staircase", "Heavy Walls"],
    avoid: ["Main Entrance", "Underground Water Tank", "Large Windows"],
    advantages: "Strength & Protection. Provides structural and financial stability. Thicker walls here protect from intense afternoon heat.",
    color: "text-red-600",
    bgClass: "bg-red-50 border-red-200",
    image: imgS,
  },
  se: {
    id: "se",
    name: "South-East (Agni)",
    gridArea: "se",
    rulingElement: "Fire",
    idealFor: ["Kitchen", "Electrical Equipment", "Heaters", "Inverters"],
    avoid: ["Master Bedroom", "Underground Water Tank", "Main Entrance"],
    advantages: "High Energy Zone. Ruled by the Fire element. Perfect for the kitchen to maintain physical health and financial stability.",
    color: "text-rose-500",
    bgClass: "bg-rose-50 border-rose-200",
    image: imgSE,
  },
};

export const layoutOrder = [
  "nw", "n", "ne",
  "w",  "c", "e",
  "sw", "s", "se"
];
