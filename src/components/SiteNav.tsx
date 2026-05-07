import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-ivory/85 backdrop-blur-xl shadow-[0_1px_0_0_oklch(0.88_0.02_78)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-primary transition-all",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </>
              )}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild className="rounded-full bg-gradient-gold px-6 text-ink shadow-gold hover:opacity-90">
            <Link to="/contact">Get In Touch →</Link>
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden rounded-full border border-border p-2 text-ink"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-ivory/95 backdrop-blur-xl">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink/80 hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 rounded-full bg-gradient-gold text-ink">
              <Link to="/contact" onClick={() => setOpen(false)}>Get In Touch →</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
