import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@Tathastu_Infra", Icon: Youtube, className: "border-[#ff0033]/70 bg-[#ff0033] text-white shadow-[0_0_28px_-10px_#ff0033]" },
  { label: "Instagram", href: "https://www.instagram.com/tathastu_infra/", Icon: Instagram, className: "border-[#f58529]/70 bg-[linear-gradient(135deg,#f58529,#dd2a7b_45%,#8134af_72%,#515bd4)] text-white shadow-[0_0_28px_-10px_#dd2a7b]" },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin, className: "border-[#0a66c2]/70 bg-[#0a66c2] text-white shadow-[0_0_28px_-10px_#0a66c2]" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-6 max-w-md text-sm text-ivory/70">
            Tathastu is a Lohegaon, Pune based multi-disciplinary firm shaping modern living through
            visionary real estate, robust construction and masterful interior design.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, href, Icon, className }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04]",
                  className,
                )}
              >
                <Icon className="h-4.5 w-4.5 fill-current stroke-[1.8]" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/", "Home"], ["/about", "About"], ["/services", "Services"],
              ["/projects", "Projects"], ["/#contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-ivory/70 transition-colors hover:text-primary-glow">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-primary-glow">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-ivory/70">
            <li className="flex min-w-0 gap-2"><MapPin className="mt-0.5 h-4 w-4 flex-none text-primary" /> <span className="break-words">Shop No. 2, Tathastu, Lohegaon, Pune 411047</span></li>
            <li className="flex min-w-0 gap-2"><Phone className="mt-0.5 h-4 w-4 flex-none text-primary" /> <span>+91 78208 64384</span></li>
            <li className="flex min-w-0 gap-2"><Mail className="mt-0.5 h-4 w-4 flex-none text-primary" /> <span className="break-words">tathastu.infra.info@gmail.com</span></li>
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
