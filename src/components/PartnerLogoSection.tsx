import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import type { PublicBankingPartner, PublicPartner } from "@/hooks/usePublicPartners";
import axisBankLogo from "@/assets/bank-axis.jpg";
import hdfcBankLogo from "@/assets/bank-hdfc.jpg";
import idbiBankLogo from "@/assets/bank-idbi.jpg";
import sbiBankLogo from "@/assets/bank-sbi.jpg";

type PartnerLogoSectionProps = {
  partners: PublicPartner[];
  bankingPartners?: PublicBankingPartner[];
  compact?: boolean;
};

const fallbackBankLogos: Record<string, string> = {
  hdfc: hdfcBankLogo,
  sbi: sbiBankLogo,
  "axis bank": axisBankLogo,
  axis: axisBankLogo,
  "idbi bank": idbiBankLogo,
  idbi: idbiBankLogo,
};

function PartnerTile({ partner }: { partner: PublicPartner }) {
  const content = (
    <>
      <div className="flex h-24 items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border transition duration-300 group-hover:-translate-y-1 group-hover:shadow-luxe">
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl}
            alt={partner.name}
            loading="lazy"
            className="max-h-16 max-w-full object-contain"
          />
        ) : (
          <span className="font-display text-3xl font-semibold text-primary">
            {partner.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 3)}
          </span>
        )}
      </div>
      <p className="mt-3 text-center text-sm font-semibold text-ink">{partner.name}</p>
      {partner.description && (
        <p className="mx-auto mt-1 line-clamp-2 max-w-[13rem] text-center text-xs leading-relaxed text-muted-foreground">
          {partner.description}
        </p>
      )}
    </>
  );

  if (!partner.websiteUrl) {
    return <div className="group">{content}</div>;
  }

  return (
    <a
      href={partner.websiteUrl}
      target="_blank"
      rel="noreferrer"
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {content}
    </a>
  );
}

function BankingPartnerTile({ partner }: { partner: PublicBankingPartner }) {
  const logo = partner.logoUrl || fallbackBankLogos[partner.name.toLowerCase()];
  const content = (
    <>
      <div className="flex h-24 items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border transition duration-300 group-hover:-translate-y-1 group-hover:shadow-luxe">
        {logo ? (
          <img
            src={logo}
            alt={`${partner.name} home loan partner logo`}
            loading="lazy"
            className="max-h-16 max-w-full object-contain"
          />
        ) : (
          <span className="font-display text-2xl font-semibold text-primary">{partner.name}</span>
        )}
      </div>
      <p className="mt-3 text-sm font-semibold text-ink">{partner.name}</p>
    </>
  );

  if (!partner.websiteUrl) return <div className="group">{content}</div>;

  return (
    <a
      href={partner.websiteUrl}
      target="_blank"
      rel="noreferrer"
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {content}
    </a>
  );
}

export function PartnerLogoSection({
  partners,
  bankingPartners = [],
  compact = false,
}: PartnerLogoSectionProps) {
  if (!partners.length) return null;

  const visiblePartners = compact ? partners.slice(0, 8) : partners;
  const visibleBankingPartners = compact ? bankingPartners.slice(0, 4) : bankingPartners;

  return (
    <section className="bg-gradient-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Trusted Network</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              Our Material Brand Partners
            </h2>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
            <p className="mx-auto mt-7 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Selecting reliable material and execution partners helps Tathastu Infra protect project
              quality, durability and long-term performance.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 relative flex w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
              {[...visiblePartners, ...visiblePartners, ...visiblePartners, ...visiblePartners].map((partner, index) => (
                <div key={`${partner.id}-${index}`} className="w-[200px] sm:w-[280px] shrink-0 pr-4 sm:pr-6">
                  <PartnerTile partner={partner} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {visibleBankingPartners.length > 0 && (
          <Reveal delay={0.12}>
          <div className="mt-16 text-center">
            <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Our Banking Partners
            </h3>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
            <p className="mx-auto mt-7 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              We guide clients with documentation support for home loan and project finance
              conversations through trusted banking channels.
            </p>
            <div className="mt-9 relative flex w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="flex w-max animate-[marquee_30s_linear_infinite_reverse] hover:[animation-play-state:paused]">
                {[...visibleBankingPartners, ...visibleBankingPartners, ...visibleBankingPartners, ...visibleBankingPartners].map((partner, index) => (
                  <div key={`${partner.id}-${index}`} className="w-[200px] sm:w-[280px] shrink-0 pr-4 sm:pr-6">
                    <BankingPartnerTile partner={partner} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Reveal>
        )}

        {!compact && (
          <Reveal delay={0.16}>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-gradient-gold px-7 text-ink shadow-gold">
                <Link to="/" hash="contact">
                  Discuss Your Project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-7">
                <Link to="/projects/construction">See Construction Projects</Link>
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
