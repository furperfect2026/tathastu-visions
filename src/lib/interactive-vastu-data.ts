import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import interior3 from "@/assets/interior-3.jpg";
import interior4 from "@/assets/interior-4.png";
import projectInterior1 from "@/assets/project-interior-1.jpg";
import projectInterior2 from "@/assets/project-interior-2.jpg";
import projectInterior3 from "@/assets/project-interior-3.jpg";
import projectInterior4 from "@/assets/project-interior-4.jpg";
import project5 from "@/assets/project-5.jpg";

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
    image: projectInterior4,
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
    image: interior1,
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
    image: projectInterior1,
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
    image: interior2,
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
    image: interior4,
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
    image: projectInterior3,
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
    image: projectInterior2,
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
    image: project5,
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
    image: interior3,
  },
};

export const layoutOrder = [
  "nw", "n", "ne",
  "w",  "c", "e",
  "sw", "s", "se"
];
