import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandSocialLink, type SocialBrand } from "./BrandSocialLink";
import { Logo } from "./Logo";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@Tathastu_Infra", brand: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/tathastu_infra/", brand: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", brand: "linkedin" },
] satisfies { label: string; href: string; brand: SocialBrand }[];

const sisterBrands = [
  { name: "Tathastu Construction", href: "https://tathastuconstruction.in" },
  { name: "Tathastu Interior", href: "https://tathastuinterior.in" },
  { name: "Tathastu Homes", href: "https://tathastuhomes.com" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-3 lg:grid-cols-7">
        <div className="md:col-span-3 lg:col-span-2">
          <Logo light />
          <p className="mt-6 max-w-md text-sm text-ivory/70">
            Tathastu Infra is a Lohegaon, Pune based multi-disciplinary firm shaping modern living through
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
              ["/realty", "Flats in Lohegaon"],
              ["/realty", "2 BHK Flats in Lohegaon"],
              ["/realty", "Flats for Rent in Lohegaon"],
              ["/realty", "Plots for Sale in Lohegaon"],
              ["/realty", "Resale Properties in Pune"],
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
              ["/construction", "Construction Company in Lohegaon"],
              ["/construction", "House Construction in Pune"],
              ["/construction/cost-estimator", "Home Construction Cost"],
              ["/construction", "Turnkey Construction"],
              ["/construction", "Commercial Construction"],
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
              ["/interior", "Interior Designer in Lohegaon"],
              ["/interior", "Home Interior Design"],
              ["/interior", "Modular Kitchen in Pune"],
              ["/interior", "Office Interior Design"],
              ["/interior", "Bedroom & Living Room Design"],
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
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-primary" />
              <span className="break-words">Tathastu Infra, Lohegaon, Pune 411047</span>
            </li>
            <li className="flex min-w-0 gap-2">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-primary" />
              <span>+91 78208 64384</span>
            </li>
            <li className="flex min-w-0 gap-2">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-primary" />
              <span className="break-words">tathastu.infra.info@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <p className="eyebrow !text-primary-glow">Sister Brands</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sisterBrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ivory/20 px-3 py-1.5 text-xs text-ivory/75 transition-colors hover:border-primary hover:text-primary-glow"
              >
                {brand.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-ivory/50 sm:px-6 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} All rights reserved to Tathastu Infra.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:justify-end">
            <p>Design & build · Tathastu Infra Studio</p>
            <Link
              to="/admin/projects"
              className="text-ivory/45 underline-offset-4 transition-colors hover:text-primary-glow hover:underline"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
