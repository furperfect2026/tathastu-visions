import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePublicProjects, type PublicProject } from "@/hooks/usePublicProjects";
import {
  Search,
  MapPin,
  Heart,
  Star,
  List,
  Grid,
  Home,
  Building,
  Wrench,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  X,
  Compass,
  ArrowLeft,
  PhoneCall,
  SlidersHorizontal,
  Share2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

import realty2 from "@/assets/realty-2.jpg";
import realty3 from "@/assets/realty-3.jpg";
import realty4 from "@/assets/realty-4.jpg";
import constructionProject3 from "@/assets/project-construction-3.jpg";
import realtyProject1 from "@/assets/project-realty-pride-world-city.jpg";
import realtyProject2 from "@/assets/project-realty-utsava-regency.jpg";

interface PropertyConfig {
  bhk: string;
  size: string;
  price: string;
}

interface Property {
  id: string;
  title: string;
  location: string;
  neighborhood: "Pune East" | "Pune West" | "Pune North" | "Pune South" | "Pune Central" | string;
  city: "Pune" | "Mumbai" | "Bangalore";
  price: string;
  priceVal: number; // base price in Rupees
  type: "Residential" | "Commercial" | "Under Construction" | "Ready to Move";
  category: "Residential" | "Commercial";
  rating: number;
  lat: number;
  lng: number;
  x: number; // map coordinates
  y: number;
  images: string[];
  beds: string;
  area: string;
  tagline: string;
  description: string;
  highlights: string[];
  amenities: string[];
  configs: PropertyConfig[];
}

const realtyProperties: Property[] = [
  {
    id: "rp1",
    title: "Pride World City",
    location: "Charholi, Pune East",
    neighborhood: "Pune East",
    city: "Pune",
    price: "69.99 L - 2.65 Cr",
    priceVal: 6999000,
    type: "Under Construction",
    category: "Residential",
    rating: 4.8,
    lat: 18.6201,
    lng: 73.9103,
    x: 48,
    y: 24,
    images: [realtyProject1, realty4, realty3],
    beds: "2, 3, 4, 4.5 BHK",
    area: "673 to 2,260 Sq.ft",
    tagline: "Premium Township Living in Charholi",
    description: "Pride World City is a massive, multi-acre township project situated in Charholi, Pune East. Designed with contemporary architecture, it offers beautiful views, wide-open roads, and comprehensive state-of-the-art amenities including schools, shopping malls, and premium clubhouse facilities.",
    highlights: [
      "Pune International Airport (Located 20 minutes away)",
      "Pune-Ahmednagar Highway (Can be reached in 15 mins)",
      "Ramwadi Metro Station (Situated 15 minutes away)"
    ],
    amenities: ["Clubhouse", "Swimming Pool", "Kids Play Area", "24/7 Security", "Gymnasium", "Landscape Garden"],
    configs: [
      { bhk: "2 BHK", size: "673 Sq.ft", price: "₹ 69.99 L" },
      { bhk: "3 BHK", size: "1050 Sq.ft", price: "₹ 1.25 Cr" },
      { bhk: "4 BHK", size: "1850 Sq.ft", price: "₹ 2.10 Cr" },
      { bhk: "4.5 BHK", size: "2260 Sq.ft", price: "₹ 2.65 Cr" }
    ]
  },
  {
    id: "rp2",
    title: "Kumar Magnacity",
    location: "Manjri, Pune East",
    neighborhood: "Pune East",
    city: "Pune",
    price: "49.99 L - 1.49 Cr",
    priceVal: 4999000,
    type: "Under Construction",
    category: "Residential",
    rating: 4.6,
    lat: 18.5204,
    lng: 73.9780,
    x: 76,
    y: 48,
    images: [realty3, realty4, realtyProject2],
    beds: "Plots, 1, 2, 3 BHK",
    area: "554 to 1,700 Sq.ft",
    tagline: "Mega township project with premium plots & flats in Manjri",
    description: "Kumar Magnacity in Manjri, East Pune, is a luxury township offering a curated selection of residential flats and premium plots. The project features excellent open spaces, organic farming spaces, clean environment corridors, and a grand luxury clubhouse.",
    highlights: [
      "Solapur Highway connectivity (2 mins away)",
      "Hadapsar IT Park (Located 10 minutes away)",
      "Noble Hospital (Situated 12 minutes away)"
    ],
    amenities: ["Sports Courts", "Mega Central Park", "Clubhouse", "Party Lawn", "Jogging Track", "Swimming Pool"],
    configs: [
      { bhk: "1 BHK", size: "554 Sq.ft", price: "₹ 49.99 L" },
      { bhk: "2 BHK", size: "850 Sq.ft", price: "₹ 82 L" },
      { bhk: "3 BHK", size: "1250 Sq.ft", price: "₹ 1.15 Cr" },
      { bhk: "Plots", size: "1700 Sq.ft", price: "₹ 1.49 Cr" }
    ]
  },
  {
    id: "rp3",
    title: "Lodha Massimo",
    location: "Baner, Pune West",
    neighborhood: "Pune West",
    city: "Pune",
    price: "4.25 Cr Onwards",
    priceVal: 42500000,
    type: "Under Construction",
    category: "Residential",
    rating: 5.0,
    lat: 18.5593,
    lng: 73.7821,
    x: 18,
    y: 34,
    images: [realty4, realty3, realtyProject1],
    beds: "3.5, 4.5 BHK",
    area: "1,767 to 5,360 Sq.ft",
    tagline: "Ultra-luxury Nature Escape Apartments and Penthouses",
    description: "Lodha Massimo is a nature-focused luxury retreat in Baner. Located right on Pan Card Club Road, this iconic high-rise complex offers stunning panoramic views of the Baner hills, private pools, personal elevator access, and a masterfully designed clubhouse.",
    highlights: [
      "Pan Card Club Road (Heart of Baner)",
      "Mumbai-Pune Expressway (Connected in 5 mins)",
      "Balewadi High Street (Located 3 minutes away)"
    ],
    amenities: ["Banquet Hall", "Clubhouse", "Jogging Track", "Sports Courts", "Infinity Pool", "Private Decks"],
    configs: [
      { bhk: "3.5 BHK", size: "1767 Sq.ft", price: "₹ 4.25 Cr" },
      { bhk: "4.5 BHK", size: "2108 - 5360 Sq.ft", price: "Price on Request" }
    ]
  },
  {
    id: "rp4",
    title: "Pristine The Lords",
    location: "Pashan, Pune West",
    neighborhood: "Pune West",
    city: "Pune",
    price: "1.35 Cr - 2.8 Cr",
    priceVal: 13500000,
    type: "Under Construction",
    category: "Residential",
    rating: 4.8,
    lat: 18.5342,
    lng: 73.8012,
    x: 22,
    y: 58,
    images: [realtyProject2, realty2, realty4],
    beds: "3, 4.5 BHK",
    area: "1,583 to 1,739 Sq.ft",
    tagline: "Absolute Luxury Nestled in Pashan Valley",
    description: "Pristine The Lords in Pashan is a design-first residential enclave optimized for elite comfort and privacy. Offering hill-facing apartments with premium fittings, massive window spaces, and private elevator lobbies.",
    highlights: [
      "Pashan Lake (Located 2 minutes away)",
      "Pune University (Connected in 10 mins)",
      "Hinjewadi IT Phase 1 (Located 15 minutes away)"
    ],
    amenities: ["Pashan Lake View", "Private Deck", "Gymnasium", "Power Backup", "Clubhouse", "Swimming Pool"],
    configs: [
      { bhk: "3 BHK", size: "1583 Sq.ft", price: "₹ 1.35 Cr" },
      { bhk: "4.5 BHK", size: "1739 Sq.ft", price: "₹ 2.80 Cr" }
    ]
  },
  {
    id: "rp5",
    title: "Godrej Greenfront",
    location: "Hinjewadi, Pune West",
    neighborhood: "Pune West",
    city: "Pune",
    price: "1.29 Cr - 1.8 Cr",
    priceVal: 12900000,
    type: "Under Construction",
    category: "Residential",
    rating: 4.7,
    lat: 18.5913,
    lng: 73.7389,
    x: 18,
    y: 28,
    images: [realtyProject2, realty3, realty4],
    beds: "2, 3 BHK",
    area: "944 to 1,255 Sq.ft",
    tagline: "Modern high-rise residences in Hinjewadi Tech Park",
    description: "Godrej Greenfront brings premium green living to Hinjewadi. Situated close to the major IT offices, the project offers smart home automation, organic gardens, oxygen parks, and an award-winning layout for maximum sunlight and ventilation.",
    highlights: [
      "Hinjewadi IT Park Phase 1 (Walkable)",
      "Upcoming Metro Station (Located 2 minutes away)",
      "D-Mart Hinjewadi (Situated 5 minutes away)"
    ],
    amenities: ["Metro Walk", "Phase 1 IT Hub", "Organic Garden", "Swimming Pool", "Sports Turf", "Indoor Games Area"],
    configs: [
      { bhk: "2 BHK", size: "944 Sq.ft", price: "₹ 1.29 Cr" },
      { bhk: "3 BHK", size: "1255 Sq.ft", price: "₹ 1.80 Cr" }
    ]
  },
  {
    id: "rp6",
    title: "Prestige Beverly Hills",
    location: "Undri, Pune South",
    neighborhood: "Pune South",
    city: "Pune",
    price: "1.4 Cr - 2.8 Cr",
    priceVal: 14000000,
    type: "Ready to Move",
    category: "Residential",
    rating: 4.9,
    lat: 18.4593,
    lng: 73.9108,
    x: 52,
    y: 78,
    images: [realty4, realtyProject1, realty2],
    beds: "3, 4 BHK",
    area: "1,100 to 2,100 Sq.ft",
    tagline: "Luxury high-rise apartments overlooking green hills",
    description: "Prestige Beverly Hills is a state-of-the-art residential tower complex located in Undri. Backed by Prestige's structural excellence, it features beautiful modern layouts, open views of the southern hills, and close proximity to premium educational institutes.",
    highlights: [
      "NIBM Road Corridor (5 mins away)",
      "Delhi Public School (Located 3 minutes away)",
      "Command Hospital (Situated 15 minutes away)"
    ],
    amenities: ["DPS School Proximity", "Hill View", "Clubhouse", "Security", "Yoga Deck", "Kids Pool"],
    configs: [
      { bhk: "3 BHK", size: "1100 Sq.ft", price: "₹ 1.40 Cr" },
      { bhk: "4 BHK", size: "2100 Sq.ft", price: "₹ 2.80 Cr" }
    ]
  },
  {
    id: "rp7",
    title: "Tathastu Central Plaza",
    location: "Kothrud, Pune Central",
    neighborhood: "Pune Central",
    city: "Pune",
    price: "95 L - 2.2 Cr",
    priceVal: 9500000,
    type: "Ready to Move",
    category: "Commercial",
    rating: 4.8,
    lat: 18.5073,
    lng: 73.8077,
    x: 32,
    y: 54,
    images: [realty2, realty3, constructionProject3],
    beds: "Retail Shops & Office Spaces",
    area: "450 to 1,600 Sq.ft",
    tagline: "Premium commercial spaces in central Kothrud corridor",
    description: "Tathastu Central Plaza Kothrud is a premium hybrid destination. It features high-visibility commercial retail spaces on the lower floors and custom luxury residences above, situated in the heart of Pune's central commercial corridor.",
    highlights: [
      "Karve Road Intersection (1 min walk)",
      "Deccan Gymkhana (Connected in 8 mins)",
      "Kothrud Metro Station (Located 2 minutes away)"
    ],
    amenities: ["Karve Road Walk", "Boutique Living", "Underground Parking", "Elevators", "Power Backup", "CCTV Surveillance"],
    configs: [
      { bhk: "2 BHK", size: "850 Sq.ft", price: "₹ 95 L" },
      { bhk: "3 BHK", size: "1250 Sq.ft", price: "₹ 1.60 Cr" },
      { bhk: "Shops", size: "450 Sq.ft", price: "₹ 2.20 Cr" }
    ]
  },
  {
    id: "rp8",
    title: "Sai Residency",
    location: "Dhanori, Pune North",
    neighborhood: "Pune North",
    city: "Pune",
    price: "55 L - 95 L",
    priceVal: 5500000,
    type: "Ready to Move",
    category: "Residential",
    rating: 4.6,
    lat: 18.5912,
    lng: 73.9012,
    x: 32,
    y: 42,
    images: [realty2, realty3, realty4],
    beds: "1 & 2 BHK Flats",
    area: "650 to 1,050 Sq.ft",
    tagline: "Excellent Airport Access & Connectivity",
    description: "Sai Residency is a boutique apartment complex in Dhanori, offering highly efficient, budget-friendly layouts with premium building materials, excellent water facilities, and quick airport access.",
    highlights: [
      "Pune Airport (Located 5 minutes away)",
      "Viman Nagar (Connected in 8 mins)",
      "Dhanori Lake Park (Located 2 minutes away)"
    ],
    amenities: ["Airport Access", "Viman Nagar Proximity", "24/7 Security", "Intercom", "Solar Water Heating", "Rainwater Harvesting"],
    configs: [
      { bhk: "1 BHK", size: "650 Sq.ft", price: "₹ 55 L" },
      { bhk: "2 BHK", size: "1050 Sq.ft", price: "₹ 95 L" }
    ]
  },
  {
    id: "rp9",
    title: "Godrej Eternia",
    location: "Shivajinagar, Pune Central",
    neighborhood: "Pune Central",
    city: "Pune",
    price: "Price on Request",
    priceVal: 0,
    type: "Ready to Move",
    category: "Commercial",
    rating: 4.8,
    lat: 18.5308,
    lng: 73.8475,
    x: 48,
    y: 52,
    images: [realty3, realty4, constructionProject3],
    beds: "Offices & Retail Shops",
    area: "Area on Request",
    tagline: "Retail Shops & Offices in Old Mumbai Road",
    description: "Godrej Eternia in Shivajinagar, Pune Central comprises a wide selection of premium retail spaces and modern corporate offices. G+7 storey project spread across 5 acres with state-of-the-art facilities.",
    highlights: [
      "Old Mumbai Road highway frontage",
      "Shivajinagar Metro Station (3 mins walk)",
      "Pune Railway Station (10 mins drive)"
    ],
    amenities: ["Cafeteria", "Conference Room", "Air Conditioned", "Intercom", "Power Backup"],
    configs: [
      { bhk: "Commercial Office", size: "Area on Request", price: "Price on Request" },
      { bhk: "Retail Shop", size: "Area on Request", price: "Price on Request" }
    ]
  },
  {
    id: "rp10",
    title: "Kolte Patil Three Jewels",
    location: "Tilekar Nagar, Kondhwa, Pune",
    neighborhood: "Pune South",
    city: "Pune",
    price: "Price on Request",
    priceVal: 0,
    type: "Ready to Move",
    category: "Commercial",
    rating: 4.7,
    lat: 18.4575,
    lng: 73.8908,
    x: 52,
    y: 72,
    images: [realty4, realty2, constructionProject3],
    beds: "Retail Shops",
    area: "Area on Request",
    tagline: "Retail Shops in Tilekar Nagar, Kondhwa",
    description: "Kolte Patil Three Jewels in Kondhwa, Pune South is thoughtfully designed to cater to modern retail businesses. Offering excellent visibility, wide walkways, and robust infrastructure in a high-footfall zone.",
    highlights: [
      "High density residential neighborhood",
      "Katraj-Kondhwa Road connectivity (5 mins)",
      "Excellent road frontage"
    ],
    amenities: ["Conference Room", "Air Conditioned", "Intercom", "Internet / Wi-Fi", "Ample Parking"],
    configs: [
      { bhk: "Retail Shop", size: "Area on Request", price: "Price on Request" }
    ]
  }
];

const neighborhoodsByCity: Record<string, string[]> = {
  Pune: ["Pune East", "Pune West", "Pune North", "Pune South", "Pune Central"],
  Mumbai: ["Navi Mumbai", "Thane", "Central Mumbai", "Western Mumbai", "South Mumbai", "Kalyan Dombivali"],
  Bangalore: ["Whitefield", "Indiranagar", "Koramangala", "Hebbal", "Electronic City"]
};

function parseDynamicRealtyProject(p: PublicProject): Property {
  let description = p.blurb || "";
  let neighborhood = "Pune East";
  let beds = "";
  let area = "";
  let tagline = "";
  let highlights: string[] = [];
  let amenities: string[] = [];
  let configs: PropertyConfig[] = [];
  let realtyType = "Under Construction";
  let realtyCategory = "Residential";

  if (p.blurb && p.blurb.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(p.blurb);
      if (parsed.isRealtyJson) {
        description = parsed.description || "";
        neighborhood = parsed.neighborhood || "Pune East";
        beds = parsed.beds || "";
        area = parsed.area || "";
        tagline = parsed.tagline || "";
        highlights = parsed.highlights || [];
        amenities = parsed.amenities || [];
        configs = parsed.configs || [];
        realtyType = parsed.realtyType || "Under Construction";
        realtyCategory = parsed.realtyCategory || "Residential";
      }
    } catch (e) {
      console.error("Error parsing dynamic project description", e);
    }
  }

  // Parse price label into a numeric value for filtering
  let priceVal = 5000000; // default 50L
  if (p.priceLabel) {
    const rawPrice = p.priceLabel.toLowerCase();
    if (rawPrice.includes("cr")) {
      const match = rawPrice.match(/[\d.]+/);
      if (match) priceVal = parseFloat(match[0]) * 10000000;
    } else if (rawPrice.includes("l")) {
      const match = rawPrice.match(/[\d.]+/);
      if (match) priceVal = parseFloat(match[0]) * 100000;
    }
  }

  return {
    id: p.id,
    title: p.title,
    location: p.location,
    neighborhood,
    city: "Pune", // default
    price: p.priceLabel || "Price on Request",
    priceVal,
    type: realtyType,
    category: realtyCategory as "Residential" | "Commercial",
    rating: 4.8,
    lat: 18.5204,
    lng: 73.8567,
    x: 50,
    y: 50,
    images: p.galleryImages && p.galleryImages.length ? [p.image, ...p.galleryImages] : [p.image],
    beds,
    area,
    tagline,
    description,
    highlights,
    amenities,
    configs
  };
}

export function RealtyPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  
  // Left sidebar filter states
  const [sidebarCategory, setSidebarCategory] = useState<"All" | "Residential" | "Commercial">("All");
  const [sidebarStatus, setSidebarStatus] = useState({
    readyToMove: false,
    underConstruction: false,
    newLaunches: false
  });

  const { projects: dbProjects } = usePublicProjects("realty");

  const allProperties = useMemo(() => {
    const parsedDb = dbProjects.map(parseDynamicRealtyProject).filter(Boolean);
    const dbTitles = new Set(parsedDb.map((p) => p.title.toLowerCase()));
    const filteredFallback = realtyProperties.filter((p) => !dbTitles.has(p.title.toLowerCase()));
    return [...parsedDb, ...filteredFallback];
  }, [dbProjects]);

  const hoveredProperty = useMemo(() => {
    return allProperties.find((p) => p.id === hoveredPropertyId) || null;
  }, [hoveredPropertyId, allProperties]);

  // Handle URL query parameters for deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type"); // e.g. "Commercial", "Residential", "Under Construction", "Ready to Move"
    const statusParam = params.get("status"); // e.g. "readyToMove", "underConstruction", "newLaunches"
    const cityParam = params.get("city");
    const neighborhoodParam = params.get("neighborhood");

    if (typeParam) {
      setSelectedType(typeParam);
      if (typeParam === "Commercial") {
        setSidebarCategory("Commercial");
      } else if (typeParam === "Residential") {
        setSidebarCategory("Residential");
      }
    }
    if (statusParam) {
      if (statusParam === "underConstruction" || statusParam === "Under Construction") {
        setSidebarStatus((prev) => ({ ...prev, underConstruction: true }));
        setSelectedType("Under Construction");
      } else if (statusParam === "readyToMove" || statusParam === "Ready to Move") {
        setSidebarStatus((prev) => ({ ...prev, readyToMove: true }));
        setSelectedType("Ready to Move");
      } else if (statusParam === "newLaunches" || statusParam === "Upcoming New Launches") {
        setSidebarStatus((prev) => ({ ...prev, newLaunches: true }));
        setSelectedType("Under Construction");
      }
    }
    if (cityParam) {
      setSelectedCity(cityParam);
    }
    if (neighborhoodParam) {
      setSelectedNeighborhood(neighborhoodParam);
    }

    if (typeParam || statusParam || neighborhoodParam) {
      setTimeout(() => {
        const portal = document.getElementById("realty-portal");
        if (portal) {
          portal.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, []);
  const [sidebarBudget, setSidebarBudget] = useState(10); // in Crores
  const [sidebarPropertyType, setSidebarPropertyType] = useState<string[]>([]);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentView, setCurrentView] = useState<"search" | "detail">("search");
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Call Back Modal states
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackProperty, setCallbackProperty] = useState<Property | null>(null);
  const [detailTab, setDetailTab] = useState<"highlights" | "overview" | "pricing" | "gallery" | "map">("highlights");

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem("tathastu_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("tathastu_favorites", JSON.stringify(updated));
  };

  const nextImage = (id: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndices((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % max,
    }));
  };

  const prevImage = (id: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndices((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + max) % max,
    }));
  };

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      // Filter by city
      if (selectedCity !== "All" && p.city !== selectedCity) return false;

      // Filter by sub-location tag
      if (selectedNeighborhood && p.neighborhood !== selectedNeighborhood) return false;

      // Filter by category cards / sidebar
      if (selectedType) {
        if (selectedType === "Residential" && p.category !== "Residential") return false;
        if (selectedType === "Commercial" && p.category !== "Commercial") return false;
        if (selectedType === "Under Construction" && p.type !== "Under Construction") return false;
        if (selectedType === "Ready to Move" && p.type !== "Ready to Move") return false;
      }

      // Sidebar Category (Residential / Commercial)
      if (sidebarCategory !== "All" && p.category !== sidebarCategory) return false;

      // Sidebar Status
      if (sidebarStatus.readyToMove || sidebarStatus.underConstruction || sidebarStatus.newLaunches) {
        const matchReady = sidebarStatus.readyToMove && p.type === "Ready to Move";
        const matchUnder = sidebarStatus.underConstruction && p.type === "Under Construction";
        const matchLaunch = sidebarStatus.newLaunches && p.type === "Under Construction"; // count launches under UC
        if (!matchReady && !matchUnder && !matchLaunch) return false;
      }

      // Sidebar Budget
      const maxBudgetVal = sidebarBudget * 10000000; // convert to Rupees
      if (p.priceVal > 0 && p.priceVal > maxBudgetVal) return false;

      // Filter by property sub-type (Plot, Retail Shop, Commercial Office, Food Court, Showroom)
      if (sidebarPropertyType.length > 0) {
        const matchesType = sidebarPropertyType.some((type) => {
          const t = type.toLowerCase();
          const bedsLower = p.beds.toLowerCase();
          const titleLower = p.title.toLowerCase();
          const descLower = p.description.toLowerCase();
          
          if (t === "plot" && (bedsLower.includes("plot") || titleLower.includes("plot"))) return true;
          if (t === "retail shop" && (bedsLower.includes("shop") || titleLower.includes("shop"))) return true;
          if (t === "commercial office" && (bedsLower.includes("office") || titleLower.includes("office"))) return true;
          if (t === "food court" && (bedsLower.includes("food") || titleLower.includes("food") || descLower.includes("food"))) return true;
          if (t === "showroom" && (bedsLower.includes("showroom") || titleLower.includes("showroom"))) return true;
          return false;
        });
        if (!matchesType) return false;
      }

      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesLocation = p.location.toLowerCase().includes(query);
        const matchesTagline = p.tagline.toLowerCase().includes(query);
        const matchesBeds = p.beds.toLowerCase().includes(query);
        return matchesTitle || matchesLocation || matchesTagline || matchesBeds;
      }

      return true;
    });
  }, [allProperties, selectedCity, selectedType, selectedNeighborhood, searchQuery, sidebarCategory, sidebarStatus, sidebarBudget, sidebarPropertyType]);

  const residentialCount = allProperties.filter((p) => p.category === "Residential").length;
  const commercialCount = allProperties.filter((p) => p.category === "Commercial").length;
  const underConstructionCount = allProperties.filter((p) => p.type === "Under Construction").length;
  const readyToMoveCount = allProperties.filter((p) => p.type === "Ready to Move").length;

  const categories = [
    { label: "Residential Properties", type: "Residential", icon: Home, count: `${residentialCount} properties` },
    { label: "Commercial Properties", type: "Commercial", icon: Building, count: `${commercialCount} properties` },
    { label: "Under Construction", type: "Under Construction", icon: Wrench, count: `${underConstructionCount} properties` },
    { label: "Ready to Move", type: "Ready to Move", icon: CheckSquare, count: `${readyToMoveCount} properties` },
  ];

  const handleOpenDetail = (p: Property) => {
    setSelectedProperty(p);
    setCurrentView("detail");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <section id="realty-portal" className="bg-background py-16 text-foreground relative border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Render Search Results View */}
        {currentView === "search" && (
          <>
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <p className="eyebrow font-semibold">Tathastu Realty Search</p>
                <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl text-ink">
                  Premium Real Estate Properties in <span className="text-gradient-gold italic">{selectedCity === "All" ? "India" : selectedCity}</span>
                </h2>
              </div>
            </Reveal>

            {/* Category Cards Grid */}
            <Reveal delay={0.05}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedType === cat.type;
                  return (
                    <button
                      key={cat.type}
                      onClick={() => setSelectedType(isSelected ? null : cat.type)}
                      className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all duration-300 ${
                        isSelected
                          ? "bg-card border-amber-400/80 shadow-gold scale-[1.02]"
                          : "bg-card/50 border-border hover:border-amber-400/40 hover:bg-card hover:-translate-y-0.5"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-amber-400/30 to-transparent opacity-40 pointer-events-none" />
                      )}
                      <div className={`p-4 rounded-xl transition-all duration-300 ${
                        isSelected ? "bg-gradient-gold text-ink" : "bg-secondary text-primary group-hover:bg-gradient-gold group-hover:text-ink"
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-display text-sm font-semibold tracking-wide">{cat.label}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{cat.count}</p>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Search Bar Container */}
            <Reveal delay={0.1}>
              <div className="relative bg-card border border-border shadow-luxe rounded-3xl p-5 mb-6 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-full md:w-1/4 relative border-b md:border-b-0 md:border-r border-border pb-3 md:pb-0 md:pr-4">
                    <label className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      Search City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        setSelectedNeighborhood(null);
                      }}
                      className="mt-1 block w-full bg-transparent border-0 text-base font-semibold focus:outline-none focus:ring-0 cursor-pointer text-ink dark:text-ivory"
                    >
                      <option value="Pune" className="bg-card text-foreground">Pune</option>
                      <option value="Mumbai" className="bg-card text-foreground">Mumbai</option>
                      <option value="Bangalore" className="bg-card text-foreground">Bangalore</option>
                      <option value="All" className="bg-card text-foreground">All Cities</option>
                    </select>
                  </div>

                  <div className="w-full md:flex-1 relative flex items-center">
                    <Search className="h-5 w-5 text-muted-foreground absolute left-3" />
                    <input
                      type="text"
                      placeholder="Search Location, Project, beds or specifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-transparent border-0 text-base focus:outline-none focus:ring-0 text-ink dark:text-ivory placeholder-muted-foreground"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
                    {(searchQuery || selectedType || selectedNeighborhood) && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedType(null);
                          setSelectedNeighborhood(null);
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Reset
                      </Button>
                    )}
                    <Button className="w-full md:w-auto rounded-full bg-gradient-gold px-7 text-ink font-semibold shadow-gold hover:scale-[1.02] transition-transform">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Neighborhood Tags */}
            {selectedCity !== "All" && neighborhoodsByCity[selectedCity] && (
              <Reveal delay={0.12}>
                <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
                  {neighborhoodsByCity[selectedCity].map((nb) => {
                    const isSelected = selectedNeighborhood === nb;
                    return (
                      <button
                        key={nb}
                        onClick={() => setSelectedNeighborhood(isSelected ? null : nb)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-gold border-amber-400 text-ink shadow-gold"
                            : "bg-card/30 border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                        }`}
                      >
                        📍 {nb}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            )}

            {/* Main Listings Layout (Sidebar + Results) */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-2xl font-semibold text-ink">
                Upcoming New Launches {selectedCity !== "All" && `in ${selectedCity}`}
              </h3>
              <div className="flex items-center border border-border bg-card rounded-full p-1 shadow-sm">
                <Button
                  variant="ghost"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full h-8 w-8 ${viewMode === "grid" ? "bg-gradient-gold text-ink" : "text-muted-foreground"}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full h-8 w-8 ${viewMode === "list" ? "bg-gradient-gold text-ink" : "text-muted-foreground"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Split Panel Grid (Sidebar Filters on Left, Properties on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
              
              {/* Left Sidebar Filter Panel */}
              <aside className="bg-card border border-border rounded-3xl p-6 space-y-6 shadow-sm sticky top-28">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-3 flex items-center gap-1.5">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-primary" /> Property Type
                  </h4>
                  <div className="space-y-2.5 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-ink/80 hover:text-ink font-medium">
                      <input
                        type="radio"
                        name="sidebarCategory"
                        checked={sidebarCategory === "All"}
                        onChange={() => setSidebarCategory("All")}
                        className="h-4 w-4 border-border rounded text-primary focus:ring-primary"
                      />
                      <span>All Properties</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-ink/80 hover:text-ink font-medium">
                      <input
                        type="radio"
                        name="sidebarCategory"
                        checked={sidebarCategory === "Residential"}
                        onChange={() => setSidebarCategory("Residential")}
                        className="h-4 w-4 border-border rounded text-primary focus:ring-primary"
                      />
                      <span>Residential</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-ink/80 hover:text-ink font-medium">
                      <input
                        type="radio"
                        name="sidebarCategory"
                        checked={sidebarCategory === "Commercial"}
                        onChange={() => setSidebarCategory("Commercial")}
                        className="h-4 w-4 border-border rounded text-primary focus:ring-primary"
                      />
                      <span>Commercial</span>
                    </label>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-3">Construction Status</h4>
                  <div className="space-y-2.5 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-ink/80 hover:text-ink font-medium">
                      <input
                        type="checkbox"
                        checked={sidebarStatus.readyToMove}
                        onChange={(e) => setSidebarStatus({ ...sidebarStatus, readyToMove: e.target.checked })}
                        className="h-4 w-4 border-border rounded text-primary focus:ring-primary"
                      />
                      <span>Ready to Move</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-ink/80 hover:text-ink font-medium">
                      <input
                        type="checkbox"
                        checked={sidebarStatus.underConstruction}
                        onChange={(e) => setSidebarStatus({ ...sidebarStatus, underConstruction: e.target.checked })}
                        className="h-4 w-4 border-border rounded text-primary focus:ring-primary"
                      />
                      <span>Under Construction</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-ink/80 hover:text-ink font-medium">
                      <input
                        type="checkbox"
                        checked={sidebarStatus.newLaunches}
                        onChange={(e) => setSidebarStatus({ ...sidebarStatus, newLaunches: e.target.checked })}
                        className="h-4 w-4 border-border rounded text-primary focus:ring-primary"
                      />
                      <span>Upcoming New Launches</span>
                    </label>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs uppercase tracking-wider text-ink font-bold">Max Budget</h4>
                    <span className="text-xs font-semibold text-gradient-gold">{sidebarBudget} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={sidebarBudget}
                    onChange={(e) => setSidebarBudget(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-secondary h-1.5 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ink/60 mt-1 font-medium">
                    <span>1 Cr</span>
                    <span>5 Cr</span>
                    <span>10 Cr+</span>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-3">Type of Property</h4>
                  <div className="space-y-2.5 text-sm">
                    {["Plot", "Retail Shop", "Commercial Office", "Food Court", "Showroom"].map((type) => {
                      const isChecked = sidebarPropertyType.includes(type);
                      return (
                        <label key={type} className="flex items-center gap-2 cursor-pointer text-ink/80 hover:text-ink font-medium">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSidebarPropertyType([...sidebarPropertyType, type]);
                              } else {
                                setSidebarPropertyType(sidebarPropertyType.filter((t) => t !== type));
                              }
                            }}
                            className="h-4 w-4 border-border rounded text-primary focus:ring-primary"
                          />
                          <span>{type}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* Right Side: Properties Listings */}
              <div className="space-y-6">
                {filteredProperties.length === 0 ? (
                  <div className="text-center py-20 bg-card border border-border rounded-3xl">
                    <Info className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="font-display text-xl font-semibold text-ink">No Properties Found</h4>
                    <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                      We couldn't find any premium properties matching your exact search. Try resetting filters or changing the search queries.
                    </p>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                    {filteredProperties.map((p) => {
                      const activeImgIndex = carouselIndices[p.id] || 0;
                      const isFav = favorites.includes(p.id);

                      // Standard Card for Grid View
                      if (viewMode === "grid") {
                        return (
                          <motion.article
                            key={p.id}
                            onMouseEnter={() => setHoveredPropertyId(p.id)}
                            onMouseLeave={() => setHoveredPropertyId(null)}
                            className="group flex flex-col overflow-hidden rounded-3xl bg-card border border-border hover:border-amber-400/30 hover:shadow-luxe transition-all duration-300"
                            layout
                          >
                            <div className="relative aspect-[1.4/1] overflow-hidden bg-slate-900 shrink-0">
                              <img
                                src={p.images[activeImgIndex]}
                                alt={p.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                              <div className="absolute inset-x-4 top-4 flex justify-between items-center z-10">
                                <span className="inline-block rounded-full bg-ink/75 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-glow border border-primary/20">
                                  {p.type}
                                </span>
                                <button
                                  onClick={(e) => toggleFavorite(p.id, e)}
                                  className="grid h-8 w-8 place-items-center rounded-full bg-ink/65 border border-ivory/10 text-ivory backdrop-blur hover:bg-gradient-gold hover:text-ink transition-all"
                                >
                                  <Heart className={`h-4.5 w-4.5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                                </button>
                              </div>

                              {p.images.length > 1 && (
                                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                  <button
                                    onClick={(e) => prevImage(p.id, p.images.length, e)}
                                    className="grid h-8 w-8 place-items-center rounded-full bg-ink/70 text-ivory hover:bg-gradient-gold hover:text-ink"
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={(e) => nextImage(p.id, p.images.length, e)}
                                    className="grid h-8 w-8 place-items-center rounded-full bg-ink/70 text-ivory hover:bg-gradient-gold hover:text-ink"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 p-5 flex flex-col">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1 text-primary font-semibold">
                                  <Star className="h-3.5 w-3.5 fill-current" />
                                  {p.rating.toFixed(1)}
                                </span>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                  {p.neighborhood}
                                </span>
                              </div>

                              <h4 className="mt-3 font-display text-xl font-semibold text-ink dark:text-ivory leading-tight truncate">
                                {p.title}
                              </h4>

                              <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                                {p.location}
                              </p>

                              <div className="mt-3 grid grid-cols-2 gap-2 text-xs border-y border-border/40 py-2.5 my-2.5">
                                <div>
                                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Area Size</p>
                                  <p className="font-semibold text-foreground mt-0.5">{p.area}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">BHK Config</p>
                                  <p className="font-semibold text-foreground mt-0.5">{p.beds}</p>
                                </div>
                              </div>

                              <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                                <div>
                                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Price</p>
                                  <p className="text-lg font-bold text-gradient-gold">₹{p.price}</p>
                                </div>
                                <Button
                                  onClick={() => handleOpenDetail(p)}
                                  className="rounded-full bg-[#005bb7] hover:bg-[#004a96] text-white px-4 py-1.5 h-auto text-xs font-semibold shadow-sm transition-all"
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </motion.article>
                        );
                      }

                      // Landscape Card for Split View (looks like the second user screenshot)
                      return (
                        <motion.article
                          key={p.id}
                          onMouseEnter={() => setHoveredPropertyId(p.id)}
                          onMouseLeave={() => setHoveredPropertyId(null)}
                          className="group flex flex-col md:flex-row overflow-hidden rounded-3xl bg-card border border-border hover:border-amber-400/30 hover:shadow-luxe transition-all duration-300"
                          layout
                        >
                          {/* Image Left Panel */}
                          <div className="relative w-full md:w-72 aspect-[1.3/1] md:aspect-auto overflow-hidden bg-slate-900 shrink-0">
                            <img
                              src={p.images[activeImgIndex]}
                              alt={p.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Badges & Favorite Overlay */}
                            <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/75 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-glow border border-primary/20">
                              {p.type}
                            </span>
                            <button
                              onClick={(e) => toggleFavorite(p.id, e)}
                              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-ink/65 border border-ivory/10 text-ivory backdrop-blur hover:bg-gradient-gold hover:text-ink transition-all animate-fade"
                            >
                              <Heart className={`h-4.5 w-4.5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                            </button>

                            {/* 360 View Indicator overlay */}
                            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-ink/65 backdrop-blur px-2.5 py-1 rounded-lg border border-ivory/10 text-[10px] font-semibold text-ivory">
                              <Compass className="h-3.5 w-3.5 text-primary" />
                              360° View
                            </div>
                          </div>

                          {/* Details Right Panel */}
                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                  {p.beds} · {p.category}
                                </span>
                                <span className="flex items-center gap-1 text-primary font-semibold">
                                  <Star className="h-3.5 w-3.5 fill-current" />
                                  {p.rating.toFixed(1)}
                                </span>
                              </div>

                              <h4 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-ivory leading-snug">
                                {p.title}
                              </h4>

                              <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                                {p.location}
                              </p>

                              {/* Configurations Table Grid */}
                              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                                {p.configs.slice(0, 3).map((cfg, cidx) => (
                                  <div key={cidx} className="bg-secondary/40 border border-border/40 p-2.5 rounded-xl text-center">
                                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{cfg.bhk}</p>
                                    <p className="font-semibold text-foreground text-xs mt-0.5">{cfg.size}</p>
                                    <p className="text-primary font-bold text-xs mt-0.5">{cfg.price}</p>
                                  </div>
                                ))}
                              </div>

                              {/* Amenities Row */}
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {p.amenities.slice(0, 4).map((amenity) => (
                                  <span key={amenity} className="text-[10px] text-muted-foreground bg-secondary/20 px-2 py-1 rounded border border-border/30">
                                    {amenity}
                                  </span>
                                ))}
                              </div>

                              <p className="mt-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                {p.description}
                              </p>
                            </div>

                            {/* Buttons Row */}
                            <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3">
                              <div className="text-lg font-bold text-gradient-gold">
                                ₹{p.price} <span className="text-[10px] text-muted-foreground font-normal uppercase">Onwards</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  onClick={() => handleOpenDetail(p)}
                                  className="rounded-full border border-border text-ink dark:text-ivory hover:bg-secondary px-5 py-2 h-auto text-xs font-semibold transition-all"
                                >
                                  View Details
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCallbackProperty(p);
                                    setShowCallbackModal(true);
                                  }}
                                  className="rounded-full bg-[#005bb7] hover:bg-[#004a96] text-white px-5 py-2 h-auto text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                                >
                                  <PhoneCall className="h-3.5 w-3.5" /> Instant Call Back
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Explore Pune Neighborhoods Map Section */}
            <Reveal delay={0.1}>
              <div className="mt-16 border-t border-border/40 pt-12">
                <div className="max-w-3xl mb-2">
                  <p className="eyebrow font-semibold">Location Map</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    Explore Pune Neighborhoods
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Browse all our premium residential projects, commercial spaces, and new launches across growth corridors in Pune East, West, North, and South.
                  </p>
                </div>
                <InteractivePuneMap 
                  properties={filteredProperties.length > 0 ? filteredProperties : allProperties} 
                  onSelectProperty={handleOpenDetail} 
                />
              </div>
            </Reveal>
          </>
        )}

        {/* Render Property Detail View (looks like the first user screenshot) */}
        {currentView === "detail" && selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Back Button & Breadcrumbs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
              <Button
                variant="ghost"
                onClick={() => setCurrentView("search")}
                className="text-xs text-muted-foreground hover:text-foreground w-fit p-0 flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Search
              </Button>
              <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-1.5">
                <span>Home</span>
                <span>/</span>
                <span>Pune</span>
                <span>/</span>
                <span>{selectedProperty.neighborhood}</span>
                <span>/</span>
                <span>{selectedProperty.location.split(",")[0]}</span>
                <span>/</span>
                <span className="font-semibold text-foreground">{selectedProperty.title}</span>
              </div>
            </div>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h1 className="font-display text-4xl font-semibold leading-tight text-ink dark:text-ivory">
                  {selectedProperty.title} {selectedProperty.location.split(",")[0]}
                </h1>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  {selectedProperty.location}
                </p>
              </div>

              {/* Header Configurations row */}
              <div className="flex flex-wrap items-center gap-8 bg-secondary/30 border border-border/40 p-4 rounded-2xl w-full md:w-auto">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Configuration</p>
                  <p className="text-base font-bold text-foreground mt-1">{selectedProperty.beds}</p>
                </div>
                <div className="h-8 w-px bg-border/40" />
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Price</p>
                  <p className="text-base font-bold text-gradient-gold mt-1">₹{selectedProperty.price}</p>
                </div>
                <div className="h-8 w-px bg-border/40" />
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Carpet Area</p>
                  <p className="text-base font-bold text-foreground mt-1">{selectedProperty.area}</p>
                </div>
              </div>
            </div>

            {/* Media Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
              {/* Large Main Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-900 border border-border shadow-luxe">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="h-full w-full object-cover"
                />
                
                {/* Heart & Share Overlay Buttons */}
                <div className="absolute right-4 top-4 flex gap-2 z-10">
                  <button
                    onClick={(e) => toggleFavorite(selectedProperty.id, e)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-ink/75 border border-ivory/10 text-ivory hover:bg-gradient-gold hover:text-ink transition-all shadow-md"
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(selectedProperty.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-ink/75 border border-ivory/10 text-ivory hover:bg-gradient-gold hover:text-ink transition-all shadow-md">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Rating Badges */}
                <div className="absolute left-4 bottom-4 flex gap-2 z-10">
                  <div className="bg-ink/75 border border-ivory/10 px-3.5 py-2 rounded-xl text-xs font-semibold text-ivory backdrop-blur flex items-center gap-1.5 shadow-md">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>5 ★ Average Rating</span>
                  </div>
                  <button className="bg-ink/75 border border-ivory/10 px-4 py-2 rounded-xl text-xs font-semibold text-ivory backdrop-blur hover:bg-gradient-gold hover:text-ink transition-all shadow-md">
                    Floor Plans
                  </button>
                  <button className="bg-ink/75 border border-ivory/10 px-4 py-2 rounded-xl text-xs font-semibold text-ivory backdrop-blur hover:bg-gradient-gold hover:text-ink transition-all shadow-md">
                    Video Tour
                  </button>
                </div>
              </div>

              {/* Grid of gallery thumbs (looks like the right column in screenshot) */}
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden bg-slate-900 border border-border group cursor-pointer">
                  <img src={selectedProperty.images[1] || selectedProperty.images[0]} alt="Video Thumbnail" className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-ivory/10 border border-ivory/20 text-ivory backdrop-blur group-hover:bg-primary group-hover:text-ink transition-all">
                      ▶
                    </span>
                  </div>
                  <span className="absolute left-3 top-3 text-[10px] font-semibold text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded">Video</span>
                </div>

                <div className="relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden bg-slate-900 border border-border group cursor-pointer">
                  <img src={realty3} alt="Floor Plan" className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center" />
                  <span className="absolute left-3 top-3 text-[10px] font-semibold text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded">Unit Floor Plans</span>
                </div>

                <div className="relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden bg-slate-900 border border-border group cursor-pointer">
                  <img src={selectedProperty.images[2] || selectedProperty.images[0]} alt="Amenities" className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center" />
                  <span className="absolute left-3 top-3 text-[10px] font-semibold text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded">Amenities</span>
                </div>

                <div className="relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden bg-slate-900 border border-border group cursor-pointer">
                  <img src={realty2} alt="Sample Flat" className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center" />
                  <span className="absolute left-3 top-3 text-[10px] font-semibold text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded">Sample Flat Image</span>
                </div>

                {/* +47 Photos Grid Button */}
                <div className="col-span-2 relative aspect-[20/8] lg:aspect-auto rounded-2xl overflow-hidden bg-slate-900 border border-border group cursor-pointer flex items-center justify-center">
                  <img src={selectedProperty.images[0]} alt="Full Gallery" className="absolute inset-0 h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/65 flex items-center justify-center z-10" />
                  <div className="relative z-20 text-center text-ivory">
                    <span className="inline-block border border-ivory/30 bg-ivory/10 backdrop-blur px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wider group-hover:bg-primary group-hover:text-ink transition-all">
                      📷 + 47 Photos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Info & Call Back Form */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
              
              {/* Left Column: Description, Highlights, Map */}
              <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-8">
                {/* Custom Tab selectors */}
                <div className="flex flex-wrap gap-2 border-b border-border/40 pb-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {(["highlights", "overview", "pricing", "gallery", "map"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all ${
                        detailTab === tab
                          ? "bg-gradient-gold border-amber-400 text-ink"
                          : "bg-secondary/20 border-border/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {detailTab === "highlights" && (
                    <motion.div
                      key="highlights"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-2xl font-semibold text-ink">
                        Highlights of {selectedProperty.title}
                      </h3>
                      <ul className="space-y-4">
                        {selectedProperty.highlights.map((hl, idx) => (
                          <li key={idx} className="flex gap-4 items-start bg-secondary/20 p-4 rounded-2xl border border-border/30">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-gold text-ink shrink-0 font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-foreground mt-2 leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {detailTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="font-display text-2xl font-semibold text-ink">
                        Project Overview
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {selectedProperty.description}
                      </p>
                      <div className="pt-4 grid grid-cols-2 gap-4">
                        <div className="bg-secondary/20 p-4 rounded-2xl border border-border/30">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Property Type</p>
                          <p className="font-semibold text-sm mt-1">{selectedProperty.category}</p>
                        </div>
                        <div className="bg-secondary/20 p-4 rounded-2xl border border-border/30">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</p>
                          <p className="font-semibold text-sm mt-1">{selectedProperty.type}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {detailTab === "pricing" && (
                    <motion.div
                      key="pricing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="font-display text-2xl font-semibold text-ink">
                        Pricing & Floor Plans
                      </h3>
                      <div className="space-y-3">
                        {selectedProperty.configs.map((cfg, cidx) => (
                          <div key={cidx} className="flex justify-between items-center bg-secondary/30 p-4 rounded-xl border border-border/30">
                            <div>
                              <p className="font-semibold text-foreground text-sm">{cfg.bhk}</p>
                              <p className="text-[10px] text-muted-foreground uppercase mt-0.5">Area: {cfg.size}</p>
                            </div>
                            <p className="font-bold text-gradient-gold text-sm">{cfg.price}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {detailTab === "gallery" && (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      {selectedProperty.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                          <img src={img} alt={`Gallery ${idx}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {detailTab === "map" && (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative h-96 rounded-2xl border border-border bg-[#0a1622] overflow-hidden"
                    >
                      <iframe
                        title={`Map showing location of ${selectedProperty.title}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(
                          selectedProperty.title + ", " + selectedProperty.location + ", " + selectedProperty.city
                        )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Callback & Scheduling Form */}
              <aside className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6 shadow-luxe sticky top-28">
                <div>
                  <h4 className="font-display text-2xl font-bold text-ink">Instant Call Back</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Or arrange a detailed site visit with our team.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Site visit request submitted for ${selectedProperty.title}! Our team will call you shortly.`);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="mt-1.5 block w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      className="mt-1.5 block w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Preferred Schedule</label>
                    <select className="mt-1.5 block w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm text-muted-foreground focus:text-foreground">
                      <option>Arrange Site Visit</option>
                      <option>Request Immediate Callback</option>
                      <option>Receive Pricing Brochure</option>
                    </select>
                  </div>

                  <Button type="submit" className="w-full rounded-full bg-[#005bb7] hover:bg-[#004a96] text-white font-semibold h-11 mt-6 hover:scale-[1.01] transition-transform flex items-center justify-center gap-1.5">
                    <PhoneCall className="h-4 w-4" /> Submit Call Back Request
                  </Button>
                </form>
              </aside>
            </div>
          </motion.div>
        )}

      </div>

      {/* Instant Callback Modal */}
      {showCallbackModal && callbackProperty && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/80 px-4 py-6 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-sm bg-card border border-border rounded-3xl p-6 shadow-luxe"
          >
            <button
              onClick={() => {
                setShowCallbackModal(false);
                setCallbackProperty(null);
              }}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground hover:bg-gradient-gold hover:text-ink transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="eyebrow !text-primary-glow">Callback Request</p>
            <h4 className="font-display text-2xl font-bold mt-2 text-ink">
              Instant Callback for {callbackProperty.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Location: {callbackProperty.location}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Callback request submitted for ${callbackProperty.title}! Our team will call you shortly.`);
                setShowCallbackModal(false);
                setCallbackProperty(null);
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="mt-1 block w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className="mt-1 block w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                />
              </div>

              <Button type="submit" className="w-full rounded-full bg-[#005bb7] hover:bg-[#004a96] text-white font-semibold h-11 shadow-md mt-6 hover:scale-[1.01] transition-transform">
                Request Instant Callback
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}

interface InteractivePuneMapProps {
  properties: Property[];
  onSelectProperty: (p: Property) => void;
}

function InteractivePuneMap({ properties, onSelectProperty }: InteractivePuneMapProps) {
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const getCoordinates = (p: Property) => {
    if (p.x !== 50 || p.y !== 50) {
      return { x: p.x, y: p.y };
    }
    const loc = (p.location + " " + p.neighborhood).toLowerCase();
    if (loc.includes("hinjewadi")) return { x: 15, y: 32 };
    if (loc.includes("baner")) return { x: 25, y: 40 };
    if (loc.includes("pashan")) return { x: 28, y: 48 };
    if (loc.includes("kothrud")) return { x: 30, y: 58 };
    if (loc.includes("shivajinagar") || loc.includes("central")) return { x: 45, y: 50 };
    if (loc.includes("dhanori")) return { x: 58, y: 35 };
    if (loc.includes("lohegaon")) return { x: 60, y: 32 };
    if (loc.includes("charholi")) return { x: 48, y: 24 };
    if (loc.includes("manjri")) return { x: 76, y: 48 };
    if (loc.includes("hadapsar")) return { x: 72, y: 54 };
    if (loc.includes("kondhwa")) return { x: 52, y: 72 };
    if (loc.includes("undri")) return { x: 52, y: 78 };
    return { x: 50, y: 50 };
  };

  const activePinId = hoveredPinId || selectedPinId;
  const activeProperty = properties.find((p) => p.id === activePinId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 mt-8">
      {/* Sidebar List */}
      <div className="bg-card border border-border rounded-3xl p-5 max-h-[500px] overflow-y-auto space-y-3 [scrollbar-width:thin] focus:outline-none">
        <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-4">
          Properties on Map ({properties.length})
        </h4>
        {properties.map((p) => {
          const isActive = p.id === activePinId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPinId(p.id === selectedPinId ? null : p.id)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                isActive
                  ? "bg-[#0b1f35] border-amber-400/80 shadow-gold font-medium"
                  : "bg-card/50 border-border/60 hover:border-amber-400/40 hover:bg-card"
              }`}
            >
              <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 mt-0.5">
                <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="font-semibold text-xs text-foreground truncate">{p.title}</h5>
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary shrink-0" />
                  {p.location.split(",")[0]}
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-gradient-gold font-bold">₹{p.price.split(" ")[0]}</span>
                  <span className="text-[9px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground uppercase font-semibold">
                    {p.type.split(" ")[0]}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Map Canvas */}
      <div className="relative h-[500px] rounded-3xl border border-border bg-[#05101a] overflow-hidden shadow-luxe">
        {/* SVG Pune Schematic Map */}
        <svg className="absolute inset-0 w-full h-full text-slate-800 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.08" className="text-ivory/5" />
          </pattern>
          <rect width="100" height="100" fill="url(#map-grid)" />

          {/* Styled rivers (Mula & Mutha confluence) */}
          <path d="M -10,30 C 15,25 25,35 45,45" fill="none" stroke="#005bb7" strokeWidth="1.2" className="opacity-40" />
          <path d="M 10,110 C 20,80 30,65 45,45" fill="none" stroke="#005bb7" strokeWidth="1.2" className="opacity-40" />
          <path d="M 45,45 C 55,42 70,48 110,48" fill="none" stroke="#005bb7" strokeWidth="1.6" className="opacity-45" />

          {/* Highways */}
          <path d="M 15,-10 L 18,30 C 20,50 25,70 35,110" fill="none" stroke="currentColor" strokeDasharray="1,2" strokeWidth="0.25" className="text-ivory/15" />
          <path d="M 45,45 L 60,32 L 110,10" fill="none" stroke="currentColor" strokeDasharray="1,2" strokeWidth="0.25" className="text-ivory/15" />
          <path d="M 45,45 L 75,55 L 110,65" fill="none" stroke="currentColor" strokeDasharray="1,2" strokeWidth="0.25" className="text-ivory/15" />

          {/* Sector Labels */}
          <text x="12" y="22" className="text-[2.5px] font-bold fill-muted-foreground/35 tracking-wider">PUNE WEST (IT HUB)</text>
          <text x="45" y="15" className="text-[2.5px] font-bold fill-muted-foreground/35 tracking-wider">PUNE NORTH</text>
          <text x="75" y="38" className="text-[2.5px] font-bold fill-muted-foreground/35 tracking-wider">PUNE EAST</text>
          <text x="40" y="88" className="text-[2.5px] font-bold fill-muted-foreground/35 tracking-wider">PUNE SOUTH</text>
          <text x="36" y="58" className="text-[2px] font-bold fill-muted-foreground/45 tracking-wider">KOTHRUD</text>
          <text x="46" y="47" className="text-[2px] font-bold fill-muted-foreground/45 tracking-wider">SHIVAJINAGAR</text>
        </svg>

        {/* Property Pins */}
        {properties.map((p) => {
          const { x, y } = getCoordinates(p);
          const isActive = p.id === activePinId;
          return (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ left: `${x}%`, top: `${y}%`, zIndex: isActive ? 50 : 10 }}
            >
              <button
                onClick={() => setSelectedPinId(p.id === selectedPinId ? null : p.id)}
                onMouseEnter={() => setHoveredPinId(p.id)}
                onMouseLeave={() => setHoveredPinId(null)}
                className={`relative flex items-center justify-center h-8 w-8 rounded-full border transition-all ${
                  isActive
                    ? "bg-gradient-gold border-amber-400 text-ink scale-110 shadow-gold"
                    : "bg-ink/75 border-border text-primary hover:border-amber-400 hover:scale-105"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
                )}
                <MapPin className={`h-4 w-4 ${isActive ? "fill-current" : ""}`} />
              </button>
            </div>
          );
        })}

        {/* Popup Card */}
        {activeProperty && (
          <div
            className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-card/95 backdrop-blur border border-border shadow-luxe p-4 rounded-2xl z-[60] flex items-start gap-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
              <img src={activeProperty.images[0]} alt={activeProperty.title} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1 relative">
              <button
                onClick={() => {
                  setSelectedPinId(null);
                  setHoveredPinId(null);
                }}
                className="absolute -top-1 -right-1 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <span className="inline-block rounded-full bg-ink/70 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-primary-glow border border-primary/20">
                {activeProperty.type}
              </span>
              <h5 className="font-semibold text-sm text-foreground mt-1 truncate pr-5">{activeProperty.title}</h5>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-primary shrink-0" />
                {activeProperty.location}
              </p>
              <div className="mt-2.5 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-gradient-gold">₹{activeProperty.price}</span>
                <Button
                  size="sm"
                  onClick={() => onSelectProperty(activeProperty)}
                  className="rounded-full bg-[#005bb7] hover:bg-[#004a96] text-white px-3 py-1 h-auto text-[10px] font-semibold"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
