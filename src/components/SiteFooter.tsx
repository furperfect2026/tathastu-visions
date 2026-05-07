import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="invert"><Logo /></div>
          <p className="mt-6 max-w-md text-sm text-ivory/70">
            Tathastu is a multi-disciplinary firm shaping the future of modern living through
            visionary real estate, robust construction and masterful interior design.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-primary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/", "Home"], ["/about", "About"], ["/services", "Services"],
              ["/projects", "Projects"], ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-ivory/70 transition-colors hover:text-primary-glow">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-ivory/70">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Lohegaon, Pune, Maharashtra</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> +91 00000 00000</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" /> hello@tathastu.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-ivory/50 md:flex-row">
          <p>© {new Date().getFullYear()} Tathastu. Building dreams. Creating reality.</p>
          <p>Design & build · Tathastu Studio</p>
        </div>
      </div>
    </footer>
  );
}
