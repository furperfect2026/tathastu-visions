import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, IndianRupee } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PackageTier = "basic" | "standard" | "premium";

const rates: Record<PackageTier, number> = {
  basic: 1550,
  standard: 1750,
  premium: 2250,
};

const floorFactors: Record<string, number> = {
  "ground": 1,
  "g+1": 2,
  "g+2": 3,
  "g+3": 4,
};

export const Route = createFileRoute("/construction/cost-estimator")({
  head: () => ({
    meta: [
      { title: "Construction Cost Estimator | Tathastu Infra Pune" },
      {
        name: "description",
        content:
          "Use Tathastu Infra's quick construction cost estimator for Pune projects and get a tailored quote for your home or commercial scope.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.tathastuinfra.in/construction/cost-estimator" }],
  }),
  component: ConstructionCostEstimatorPage,
});

function ConstructionCostEstimatorPage() {
  const [area, setArea] = useState("1000");
  const [tier, setTier] = useState<PackageTier>("standard");
  const [floors, setFloors] = useState("ground");

  const totalBuiltUpArea = useMemo(() => {
    const areaNum = Number(area);
    if (!Number.isFinite(areaNum) || areaNum <= 0) return null;
    return Math.round(areaNum * floorFactors[floors]);
  }, [area, floors]);

  const estimate = useMemo(() => {
    if (!totalBuiltUpArea) return null;
    return Math.round(totalBuiltUpArea * rates[tier]);
  }, [tier, totalBuiltUpArea]);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 text-ivory sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--color-primary)_35%,transparent),transparent_38%),radial-gradient(circle_at_80%_15%,#21456d,transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/70 to-ink" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow !text-primary-glow">Tathastu Infra Construction</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,8.5vw,5.5rem)] font-medium leading-[1.02]">
              Construction <span className="italic text-gradient-gold">Cost Estimator</span>
            </h1>
            <p className="mt-6 text-base text-ivory/75 sm:text-lg">
              Use this quick estimate for planning. Final pricing depends on site conditions, scope and
              material selections.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border sm:p-8">
              <h2 className="font-display text-3xl font-semibold text-ink">Calculate Your Estimate</h2>

              <div className="mt-7 space-y-5">
                <div>
                  <Label htmlFor="area">Per-floor built-up area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    min={100}
                    value={area}
                    onChange={(event) => setArea(event.target.value)}
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="package">Package tier</Label>
                  <Select value={tier} onValueChange={(value: PackageTier) => setTier(value)}>
                    <SelectTrigger id="package" className="mt-2 h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - ₹1550 / sq ft</SelectItem>
                      <SelectItem value="standard">Standard - ₹1750 / sq ft</SelectItem>
                      <SelectItem value="premium">Premium - ₹2250 / sq ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="floors">Floors</Label>
                  <Select value={floors} onValueChange={setFloors}>
                    <SelectTrigger id="floors" className="mt-2 h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ground">Ground floor</SelectItem>
                      <SelectItem value="g+1">G+1</SelectItem>
                      <SelectItem value="g+2">G+2</SelectItem>
                      <SelectItem value="g+3">G+3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-3xl bg-ink p-7 text-ivory shadow-luxe sm:p-8">
              <p className="eyebrow !text-primary-glow">Estimated Budget</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/20 text-primary-glow">
                  <IndianRupee className="h-6 w-6" />
                </span>
                <p className="font-display text-5xl font-semibold">
                  {estimate ? `₹${estimate.toLocaleString("en-IN")}` : "—"}
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ivory/70">
                This is a planning estimate. Site condition, structure complexity, elevation details and
                finishing preferences can change final costing.
              </p>

              <div className="mt-6 rounded-2xl bg-ivory/6 p-4">
                <p className="text-sm text-ivory/70">Total built-up area used</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ivory">
                  {totalBuiltUpArea ? `${totalBuiltUpArea.toLocaleString("en-IN")} sq ft` : "Enter area"}
                </p>
                <p className="mt-1 text-xs text-ivory/55">
                  {Number(area) > 0
                    ? `${Number(area).toLocaleString("en-IN")} sq ft x ${floorFactors[floors]} floor${floorFactors[floors] === 1 ? "" : "s"}`
                    : "Area multiplies automatically when you select G+1, G+2 or G+3."}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full bg-gradient-gold px-7 text-ink shadow-gold">
                  <Link to="/" hash="contact">
                    Get Exact Quote
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-ivory/25 bg-ivory/5 px-7 text-ivory hover:bg-ivory/10"
                >
                  <Link to="/projects">
                    View Projects
                  </Link>
                </Button>
              </div>

              <div className="mt-8 rounded-2xl bg-ivory/6 p-4">
                <p className="text-sm text-ivory/70">
                  Want help right now? Chat with our assistant or request a callback from our experts.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-ivory pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="rounded-3xl bg-card p-7 shadow-luxe ring-1 ring-border sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-ink shadow-gold">
                <Calculator className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-3xl font-semibold text-ink">Need project-wise costing?</h3>
                <p className="mt-3 max-w-3xl text-muted-foreground">
                  Share your floor plan, city and target finish level. Tathastu Infra will map a clearer
                  cost breakup with practical recommendations.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
