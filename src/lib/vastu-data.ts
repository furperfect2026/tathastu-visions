import {
  Compass,
  Droplets,
  Flame,
  Wind,
  Mountain,
  Sun,
  LayoutTemplate,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type VastuElement = "Water" | "Fire" | "Earth" | "Air" | "Space";

export type VastuZone = {
  id: string;
  name: string;
  title: string;
  element: VastuElement;
  gridPos: { row: number; col: number };
  icon?: LucideIcon;
};

export const vastuZones: VastuZone[] = [
  { id: "nw", name: "North West", title: "Air Element", element: "Air", gridPos: { row: 0, col: 0 }, icon: Wind },
  { id: "n", name: "North", title: "Wealth", element: "Water", gridPos: { row: 0, col: 1 }, icon: Droplets },
  { id: "ne", name: "North East", title: "Spirituality", element: "Water", gridPos: { row: 0, col: 2 }, icon: Sun },
  { id: "w", name: "West", title: "Creativity", element: "Water", gridPos: { row: 1, col: 0 }, icon: Droplets },
  { id: "center", name: "Center", title: "Space", element: "Space", gridPos: { row: 1, col: 1 }, icon: LayoutTemplate },
  { id: "e", name: "East", title: "Health", element: "Air", gridPos: { row: 1, col: 2 }, icon: Wind },
  { id: "sw", name: "South West", title: "Stability", element: "Earth", gridPos: { row: 2, col: 0 }, icon: Mountain },
  { id: "s", name: "South", title: "Strength", element: "Earth", gridPos: { row: 2, col: 1 }, icon: Mountain },
  { id: "se", name: "South East", title: "Fire Element", element: "Fire", gridPos: { row: 2, col: 2 }, icon: Flame },
];

export const roomTypes = [
  "Balcony",
  "Washroom / Toilet",
  "Children Bedroom",
  "Dining Room",
  "Guest Bedroom",
  "Kitchen",
  "Underground Tank",
  "Master Bedroom",
  "Parking",
  "Pooja Room",
  "Porch",
  "Staircase",
  "Store Room",
  "Utility Room",
  "Living Room",
  "Main Entrance"
];

type ScoreRating = "EXCELLENT" | "NEUTRAL" | "POOR";

export type RoomScoreRule = {
  score: number;
  rating: ScoreRating;
  message: string;
};

// Map of [Room][Zone ID] to Rule
export const roomScoring: Record<string, Record<string, RoomScoreRule>> = {
  "Kitchen": {
    "se": { score: 10, rating: "EXCELLENT", message: "South-East is the ideal zone for the fire element." },
    "nw": { score: 7, rating: "NEUTRAL", message: "North-West is an acceptable alternative for kitchens." },
    "ne": { score: 0, rating: "POOR", message: "Kitchens in North-East clash with the water element." },
    "sw": { score: 0, rating: "POOR", message: "Avoid kitchens in South-West." },
    "center": { score: 0, rating: "POOR", message: "Center must be clear. No fire here." },
  },
  "Pooja Room": {
    "ne": { score: 10, rating: "EXCELLENT", message: "Perfect placement for spiritual growth and clarity." },
    "e": { score: 10, rating: "EXCELLENT", message: "East is very auspicious for prayer rooms." },
    "n": { score: 8, rating: "EXCELLENT", message: "North is a very good location for a Pooja room." },
    "s": { score: 0, rating: "POOR", message: "South is generally avoided for Pooja rooms." },
    "sw": { score: 0, rating: "POOR", message: "South-West is highly unsuited for Pooja." },
    "center": { score: 10, rating: "EXCELLENT", message: "Brahmasthan is sacred, great for meditation." },
  },
  "Master Bedroom": {
    "sw": { score: 10, rating: "EXCELLENT", message: "Ideal for the head of the family, bringing stability." },
    "s": { score: 7, rating: "NEUTRAL", message: "Acceptable for bedrooms." },
    "w": { score: 7, rating: "NEUTRAL", message: "Acceptable for bedrooms." },
    "ne": { score: 0, rating: "POOR", message: "Causes unrest; avoid master bedroom here." },
    "se": { score: 0, rating: "POOR", message: "Fire zone can cause temperament issues." },
  },
  "Washroom / Toilet": {
    "nw": { score: 10, rating: "EXCELLENT", message: "Best location for waste disposal." },
    "w": { score: 8, rating: "EXCELLENT", message: "Very suitable location." },
    "s": { score: 7, rating: "NEUTRAL", message: "Acceptable with proper placement." },
    "ne": { score: 0, rating: "POOR", message: "Strictly avoid! Blocks positive energy." },
    "center": { score: 0, rating: "POOR", message: "Strictly avoid toilets in the center." },
    "sw": { score: 0, rating: "POOR", message: "Can cause health and stability issues." },
  },
  "Main Entrance": {
    "n": { score: 10, rating: "EXCELLENT", message: "Brings wealth and opportunities." },
    "ne": { score: 10, rating: "EXCELLENT", message: "Highly auspicious, brings positivity." },
    "e": { score: 10, rating: "EXCELLENT", message: "Welcomes health and energy." },
    "s": { score: 0, rating: "POOR", message: "Generally avoided, requires specific placement." },
    "sw": { score: 0, rating: "POOR", message: "Highly inauspicious for main entrances." },
  },
  "Living Room": {
    "n": { score: 10, rating: "EXCELLENT", message: "Ideal for social interaction and wealth." },
    "e": { score: 10, rating: "EXCELLENT", message: "Brings good health and active energy." },
    "ne": { score: 10, rating: "EXCELLENT", message: "Very positive space for gatherings." },
    "nw": { score: 7, rating: "NEUTRAL", message: "Good for a lively environment." },
    "sw": { score: 0, rating: "POOR", message: "Guests may overstay or cause heavy energy." },
  },
  "Staircase": {
    "s": { score: 10, rating: "EXCELLENT", message: "Good for heavy structures." },
    "sw": { score: 10, rating: "EXCELLENT", message: "Ideal for heavy elements to anchor the home." },
    "w": { score: 10, rating: "EXCELLENT", message: "Suitable for staircases." },
    "ne": { score: 0, rating: "POOR", message: "North-East must be light; avoid stairs." },
    "center": { score: 0, rating: "POOR", message: "Avoid heavy structures in the center." },
  },
  "Underground Tank": {
    "ne": { score: 10, rating: "EXCELLENT", message: "Best location for underground water." },
    "n": { score: 10, rating: "EXCELLENT", message: "Very auspicious for water elements." },
    "e": { score: 10, rating: "EXCELLENT", message: "Good location for underground water." },
    "sw": { score: 0, rating: "POOR", message: "Avoid underground tanks in the heavy Earth zone." },
    "s": { score: 0, rating: "POOR", message: "Inauspicious for water elements." },
  },
};

// Fallback logic for unmapped combinations
export function getRoomScore(room: string, zoneId: string): RoomScoreRule {
  const roomRules = roomScoring[room];
  if (roomRules && roomRules[zoneId]) {
    return roomRules[zoneId];
  }
  
  // Default fallbacks based on general element rules if not explicitly defined
  if (zoneId === "center") {
    return { score: 3, rating: "POOR", message: "The center should generally be kept clear of enclosed rooms." };
  }
  if (zoneId === "ne") {
    return { score: 5, rating: "NEUTRAL", message: "North-East should ideally be kept light and open." };
  }
  if (zoneId === "sw") {
    return { score: 5, rating: "NEUTRAL", message: "South-West should be heavy and grounded." };
  }
  
  return { score: 7, rating: "NEUTRAL", message: "This is a generally acceptable placement." };
}
