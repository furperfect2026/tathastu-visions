import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandSocialLink, type SocialBrand } from "./BrandSocialLink";
import { Logo } from "./Logo";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@Tathastu_Infra", brand: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/tathastu_infra/", brand: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", brand: "linkedin" },
] satisfies { label: string; href: string; brand: SocialBrand }[];

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-3 lg:grid-cols-7">
        <div className="md:col-span-3 lg:col-span-2">
          <Logo light />
          <p className="mt-6 max-w-md text-sm text-ivory/70">
            Tathastu is a Lohegaon, Pune based multi-disciplinary firm shaping modern living through
            visionary real estate, robust construction and masterful interior design.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, href, brand }) => (
              <BrandSocialLink key={label} brand={brand} href={href} label={label} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/services", "Services"],
              ["/projects", "Projects"],
              ["/#contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-ivory/70 transition-colors hover:text-primary-glow">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Property Search</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/flats-in-lohegaon-pune", "Flats in Lohegaon"],
              ["/2-bhk-flats-in-lohegaon-pune", "2 BHK Flats"],
              ["/flats-for-rent-in-lohegaon-pune", "Flats for Rent"],
              ["/plots-for-sale-in-lohegaon-pune", "Plots for Sale"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-ivory/70 transition-colors hover:text-primary-glow">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Construction</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/construction-company-in-lohegaon-pune", "Lohegaon Construction"],
              ["/house-construction-in-pune", "House Construction"],
              ["/home-construction-cost-in-pune", "Construction Cost"],
              ["/turnkey-construction-in-pune", "Turnkey Build"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-ivory/70 transition-colors hover:text-primary-glow">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Interiors</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/interior-designer-in-lohegaon-pune", "Lohegaon Designer"],
              ["/home-interior-design-in-pune", "Home Interiors"],
              ["/modular-kitchen-in-pune", "Modular Kitchen"],
              ["/office-interior-design-in-pune", "Office Interiors"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-ivory/70 transition-colors hover:text-primary-glow">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-ivory/70">
            <li className="flex min-w-0 gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-primary" />{" "}
              <span className="break-words">Tathastu, Lohegaon, Pune 411047</span>
            </li>
            <li className="flex min-w-0 gap-2">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-primary" />{" "}
              <span>+91 78208 64384</span>
            </li>
            <li className="flex min-w-0 gap-2">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-primary" />{" "}
              <span className="break-words">tathastu.infra.info@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-ivory/50 sm:px-6 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Tathastu. Building dreams. Creating reality.</p>
          <p>Design & build · Tathastu Studio</p>
        </div>
      </div>
    </footer>
  );
}
