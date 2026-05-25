import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/", hash: "contact", label: "Contact" },
] as const;

const mobileServiceLinks = [
  { to: "/realty", label: "Realty" },
  { to: "/construction", label: "Construction" },
  { to: "/interior", label: "Interior" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") {
        setActiveSection(pathname);
        return;
      }

      const sectionIds = [
        { id: "home", to: "/" },
        { id: "services", to: "/services" },
        { id: "projects", to: "/projects" },
        { id: "contact", to: "/#contact" },
      ] as const;
      const anchor = Math.min(window.innerHeight * 0.38, 360);
      const current = sectionIds.find(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= anchor && rect.bottom > anchor;
      });

      setActiveSection(current?.to ?? "/");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;
  const servicesActive = ["/services", "/realty", "/construction", "/interior"].includes(pathname);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        transparent
          ? "bg-transparent text-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          : "border-b border-border/70 bg-background/90 text-foreground shadow-[0_18px_42px_-30px_var(--color-ink)] backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="min-w-0">
          <Logo light={transparent} />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={"hash" in l ? l.hash : undefined}
              className={cn(
                "group relative text-[0.95rem] font-semibold tracking-[0.01em] transition-colors duration-300 ease-out xl:text-base",
                transparent
                  ? "text-ivory/90 hover:text-primary-glow"
                  : "text-foreground/75 hover:text-ink",
              )}
              activeOptions={{ exact: l.to === "/" }}
            >
              {({ isActive }) => {
                const activeTo = "hash" in l ? `/#${l.hash}` : l.to;
                const active = pathname === "/" ? activeSection === activeTo : isActive;

                return (
                  <>
                    <span
                      className={cn(
                        "transition-colors duration-300 ease-out",
                        active && (transparent ? "text-primary-glow" : "text-ink"),
                      )}
                    >
                      {l.label}
                    </span>
                    <span
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </>
                );
              }}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button
            asChild
            className="rounded-full bg-gradient-gold px-6 text-ink shadow-gold hover:opacity-90"
          >
            <Link to="/" hash="contact">
              Get In Touch →
            </Link>
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          className={cn(
            "rounded-full border p-2 transition-colors duration-300 ease-out lg:hidden",
            transparent
              ? "border-ivory/45 bg-ivory/10 text-ivory backdrop-blur"
              : "border-border text-foreground",
          )}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {links
              .filter((link) => link.label !== "Services")
              .map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={"hash" in l ? l.hash : undefined}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors duration-300 ease-out hover:bg-muted"
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {({ isActive }) => {
                    const activeTo = "hash" in l ? `/#${l.hash}` : l.to;
                    const active = pathname === "/" ? activeSection === activeTo : isActive;

                    return (
                      <span
                        className={cn(
                          active && "text-ink underline decoration-primary underline-offset-4",
                        )}
                      >
                        {l.label}
                      </span>
                    );
                  }}
                </Link>
              ))}
            <div className="rounded-2xl border border-border bg-card/60 p-1">
              <button
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((value) => !value)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors duration-300 ease-out hover:bg-muted"
              >
                <span
                  className={cn(
                    servicesActive && "text-ink underline decoration-primary underline-offset-4",
                  )}
                >
                  Services
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    servicesOpen && "rotate-180",
                  )}
                />
              </button>
              {servicesOpen && (
                <div className="grid gap-1 px-2 pb-2">
                  {mobileServiceLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted",
                        pathname === item.to ? "bg-primary/10 text-ink" : "text-foreground/75",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Button asChild className="mt-2 rounded-full bg-gradient-gold text-ink">
              <Link to="/" hash="contact" onClick={() => setOpen(false)}>
                Get In Touch →
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
