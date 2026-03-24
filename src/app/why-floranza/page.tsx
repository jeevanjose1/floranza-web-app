import CommonHeader from "@/components/common/common-header";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function WhyFloranzaPage() {
  return (
    <main className="w-full bg-white min-h-screen text-foreground">
      <CommonHeader title="Why Floranza" />

      {/*─────────────────────────────────────────────────
        HERO
      ─────────────────────────────────────────────────*/}
      <section className="container-md mx-auto py-16 md:py-20 text-center border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
          The Floranza Difference
        </p>
        <h1 className="font-lora text-4xl md:text-5xl text-foreground mb-6 leading-tight max-w-3xl mx-auto">
          Designed for the Real You
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          At Floranza, we believe fashion should adapt to your body — not the
          other way around. Founded by Linda Vineeth, Floranza was born from a
          simple observation: most standard clothing sizes in India don't
          account for the beautiful, natural changes a woman's body undergoes.
        </p>
      </section>

      {/*─────────────────────────────────────────────────
        THE PROBLEM
      ─────────────────────────────────────────────────*/}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-md mx-auto py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                The Problem
              </p>
              <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
                Every Woman Knows This (But No One Talks About It)
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  We carefully studied our customers and realized something
                  important — more than{" "}
                  <strong className="text-foreground">
                    70% of South Indian women struggle with a specific "fit
                    gap."
                  </strong>
                </p>
                <p>
                  After the age of 30, many women naturally experience changes
                  in their body — especially around the tummy, waist, and hips.
                  Standard kurtis often fit at the shoulders but feel tight or
                  unflattering around the midriff, belly, and hips, because most
                  Indian kurtis follow a linear size chart that doesn't reflect
                  real women.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                And This Is Where the Problem Starts
              </p>
              <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
                The Fit Gap
              </h2>
              <ul className="divide-y divide-border">
                {[
                  "Kurtis fit perfectly at the shoulders… but feel tight near the tummy",
                  "Fabric pulls or sticks around the belly area",
                  "You feel uncomfortable, even if the dress looks good",
                  "Frequent alterations become stressful and time-consuming",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 py-4 text-base text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0 mt-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-white border border-border rounded-xl p-6 mt-6">
                <p className="font-lora text-lg text-foreground italic leading-relaxed">
                  "This is something most brands ignore. But at Floranza, we
                  decided to solve it."
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  Instead of adjusting the customer to the dress — we redesigned
                  the dress for the customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*─────────────────────────────────────────────────
        3 PILLARS
      ─────────────────────────────────────────────────*/}
      <section className="container-md mx-auto py-16 md:py-20 border-b border-border">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
            The Floranza Engineering
          </p>
          <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-4 leading-snug">
            3 Pillars of a Perfect Fit
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            We didn't just change the fabric — we re-engineered the silhouette
            (the overall shape or outline of a garment when worn on the body).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Pillar 1 */}
          <div className="bg-secondary/40 border border-border rounded-xl p-8 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mb-6">
              1
            </div>
            <h3 className="font-lora text-2xl text-foreground mb-3">
              The "Plus 2" Hip Advantage
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              Most brands follow a rigid, narrow scale. At Floranza, every kurti
              is designed with an extra 2 inches in the hip area compared to
              national standards.
            </p>
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                The Result
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                No more "tugging" or fabric "catching" on the lower tummy — a
                smooth, flowing line with maximum comfort.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-secondary/40 border border-border rounded-xl p-8 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mb-6">
              2
            </div>
            <h3 className="font-lora text-2xl text-foreground mb-3">
              Strategic "Camouflage" Design
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              We specialize in front inverted pleats and gathers. While they
              look like elegant style choices, they serve a deeply functional
              purpose.
            </p>
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                The Result
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                Extra room exactly where it's needed — gracefully covering the
                midriff and belly. Confidence to move freely.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-secondary/40 border border-border rounded-xl p-8 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mb-6">
              3
            </div>
            <h3 className="font-lora text-2xl text-foreground mb-3">
              The "Growth" Margin
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              Your body is dynamic, and your clothes should be too. Every
              Floranza garment comes with a generous 1-inch stitching margin on
              both sides.
            </p>
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                The Result
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                Easy future alterations built right into the seams — clothes
                that last longer and grow with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*─────────────────────────────────────────────────
        TRUST
      ─────────────────────────────────────────────────*/}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-md mx-auto py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Our Community
              </p>
              <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
                Why 450,000+ Women Trust Us
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                We aren't just a label — we are a community of 450,000+ women
                who value comfort as much as style.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "In-House Craftsmanship",
                    desc: "From our 2,000 sq. ft. flagship store in Thiruvambady to our dedicated stitching unit in Anakkampoyil, every piece is handled by our 65-member team.",
                  },
                  {
                    title: "Built for Movement",
                    desc: "Whether you are at the office, a family function, or a busy day out — our designs give you the confidence to move freely without constant adjustments.",
                  },
                ].map(({ title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 bg-white border border-border rounded-xl px-6 py-5"
                  >
                    <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-base mb-1">
                        {title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  More Than a Kurti
                </p>
                <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
                  It's Confidence
                </h2>
                <p className="text-base text-muted-foreground mb-6">
                  We are not just selling kurtis. We are giving you:
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Comfort you can feel all day" },
                  { label: "Confidence you can carry everywhere" },
                  { label: "A fit that truly understands your body" },
                ].map(({ label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 bg-white border border-border rounded-xl px-6 py-5 text-base font-medium text-foreground"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
              <p className="text-base text-muted-foreground leading-relaxed pt-2">
                At Floranza, every piece is thoughtfully crafted with one goal —
                to make you feel comfortable, confident, and beautiful, exactly
                as you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*─────────────────────────────────────────────────
        PROMISE & CTA
      ─────────────────────────────────────────────────*/}
      <section className="container-md mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Promise */}
          <div className="bg-main text-primary-foreground rounded-xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60 mb-4">
                Our Promise
              </p>
              <p className="font-lora text-2xl md:text-3xl italic text-primary-foreground leading-snug mb-6">
                "We don't design for mannequins. We design for the real South
                Indian woman — her life, her transitions, and her grace."
              </p>
            </div>
            <div className="border-t border-primary-foreground/20 pt-6">
              <p className="text-sm font-semibold text-primary-foreground/80">
                — Linda Vineeth, Co-Founder
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-secondary/40 border border-border rounded-xl p-8 md:p-10 flex flex-col justify-center items-start gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Experience the Difference
            </p>
            <h3 className="font-lora text-2xl md:text-3xl text-foreground leading-snug">
              Try Your First Floranza Kurti Today
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Experience what 'Comfort Fit' truly means — a kurti designed
              around you, with the right margins, the right silhouette, and the
              right finish.
            </p>
            <Link
              href="/product-catogery/kurtis"
              className="inline-flex items-center gap-2 bg-main text-primary-foreground rounded-full px-7 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
