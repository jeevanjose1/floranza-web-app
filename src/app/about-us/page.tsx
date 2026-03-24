import CommonHeader from "@/components/common/common-header";
import React from "react";
import {
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Check,
  Star,
  ShoppingBag,
  Globe,
} from "lucide-react";

export default function page() {
  return (
    <main className="w-full bg-white min-h-screen  text-foreground">
      <CommonHeader title="About Us" />

      {/*─────────────────────────────────────────────────
        HERO
      ─────────────────────────────────────────────────*/}
      <section className="container-md mx-auto py-16 md:py-20 text-center border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Est. November 2022 · Kozhikode, Kerala
        </p>
        <h1 className="font-lora text-4xl md:text-5xl text-foreground mb-5 leading-tight">
          About Floranza
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          One of Kerala's fastest-growing ladies fashion boutiques — offering
          premium kurtis, stylish ethnic wear, and affordable women's clothing
          online and offline.
        </p>
      </section>

      {/*─────────────────────────────────────────────────
        INTRO
      ─────────────────────────────────────────────────*/}
      <section className="container-md mx-auto py-16 md:py-20 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Our Story
            </p>
            <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
              A Trusted Destination for Women
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Founded in November 2022 by Vineeth Thomas and Linda Vineeth,
                Floranza has quickly become a leading ladies boutique in
                Kozhikode (Calicut) — a preferred destination for women
                searching for quality ethnic wear at genuine prices.
              </p>
              <p>
                With a strong presence in retail and e-commerce, Floranza serves
                thousands of happy customers across Kerala, India, and globally
                through its offline store in Thiruvambady and its growing online
                fashion platform.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Our Vision
            </p>
            <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
              Fashion with Purpose
            </h2>
            <div className="bg-secondary rounded-xl p-6 md:p-8 border border-border mb-6">
              <p className="font-lora text-lg text-foreground italic leading-relaxed">
                "To create a fashion destination where women can find stylish,
                comfortable, and perfectly fitting outfits at affordable
                prices."
              </p>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Customers searching for the best kurti shop in Kerala, affordable
              designer kurtis, trendy ethnic wear, or a ladies boutique near
              Kozhikode consistently choose Floranza.
            </p>
          </div>
        </div>
      </section>

      {/*─────────────────────────────────────────────────
        WOMEN-FOCUSED & PROMISE
      ─────────────────────────────────────────────────*/}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-md mx-auto py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Women-Centric
              </p>
              <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
                A Women-Focused Fashion Brand
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Led by entrepreneur Linda Vineeth, Floranza is a proudly
                  women-centric brand that deeply understands what modern women
                  look for — comfort, confidence, and elegance.
                </p>
                <p className="font-medium text-foreground">
                  Collections curated to suit:
                </p>
                <ul className="space-y-2">
                  {[
                    "Daily wear needs",
                    "Office wear",
                    "Festive & party occasions",
                    "Women of all age groups",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-foreground shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Today,{" "}
                  <strong className="text-foreground">
                    80%+ of our team are women
                  </strong>
                  , making Floranza a platform for empowering women through
                  employment and growth.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  Our Promise
                </p>
                <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
                  Confidence in Every Outfit
                </h2>
              </div>
              <div className="bg-white rounded-xl border border-border p-6 md:p-8">
                <p className="font-lora text-2xl text-foreground italic leading-snug mb-4">
                  "Beautiful fits. Comfortable designs. Confidence in every
                  outfit."
                </p>
                <p className="text-sm text-muted-foreground">
                  This strong emotional connection is why Floranza is becoming
                  one of the most loved ladies boutiques in Kerala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*─────────────────────────────────────────────────
        FOUNDERS
      ─────────────────────────────────────────────────*/}
      <section className="container-md mx-auto py-16 md:py-20 border-b border-border">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Leadership
          </p>
          <h2 className="font-lora text-3xl md:text-4xl text-foreground leading-snug">
            Founders Behind Floranza
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-secondary/40 border border-border rounded-xl p-8">
            <h3 className="font-lora text-2xl text-foreground mb-1">
              Linda Vineeth
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Creative Direction & Design
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              A former nurse who transitioned to fashion, leading creative
              direction and product design to fulfil real women's clothing
              needs.
            </p>
          </div>
          <div className="bg-secondary/40 border border-border rounded-xl p-8">
            <h3 className="font-lora text-2xl text-foreground mb-1">
              Vineeth Thomas
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Business Growth & Strategy
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              An MBA graduate who returned from Qatar to build a trusted ethnic
              fashion brand in Kerala through strong strategy and vision.
            </p>
          </div>
        </div>
        <p className="text-center text-base text-muted-foreground mt-8 max-w-xl mx-auto">
          Together, they built Floranza with a mission to create a fashion brand
          in Kerala that truly understands real women's needs.
        </p>
      </section>

      {/*─────────────────────────────────────────────────
        COLLECTIONS & QUALITY
      ─────────────────────────────────────────────────*/}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-md mx-auto py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Premium Ethnic Wear
            </p>
            <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-4 leading-snug">
              Premium Kurtis & Ethnic Wear Loved by Thousands
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              A top kurti boutique in Kerala, blending tradition with modern
              trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Collections */}
            <div className="bg-white rounded-xl border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                  <ShoppingBag className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-lora text-2xl text-foreground">
                  Our Collections Include
                </h3>
              </div>
              <ul className="divide-y divide-border">
                {[
                  "Designer Kurtis",
                  "Cotton Kurtis (daily wear & breathable fabrics)",
                  "Kurti Sets with Dupatta",
                  "Party Wear Kurtis",
                  "Office Wear Ethnic Collections",
                  "Handpicked Trendy Women's Fashion",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 py-4 text-base text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quality */}
            <div className="bg-white rounded-xl border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                  <Check className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-lora text-2xl text-foreground">
                  Focus on Quality
                </h3>
              </div>
              <p className="text-sm text-muted-foreground italic mb-8">
                Each outfit is crafted with a focus on:
              </p>
              <ul className="space-y-4">
                {[
                  "Premium fabric quality",
                  "Comfort fit (ideal for Indian body types)",
                  "Quality lining & finishing",
                  "Modern designs & trending colors",
                  "Long-lasting durability",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 bg-secondary/60 rounded-lg px-5 py-4 text-base text-foreground font-medium"
                  >
                    <Check className="w-4 h-4 shrink-0 text-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/*─────────────────────────────────────────────────
        FLORISTA MANUFACTURING
      ─────────────────────────────────────────────────*/}
      <section className="container-md mx-auto py-16 md:py-20 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
              In-House Manufacturing
            </p>
            <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
              FLORISTA — Our Production Unit
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                To ensure consistent quality, perfect fit, and unique designs,
                Floranza operates its own production unit under the brand{" "}
                <strong className="text-foreground">FLORISTA</strong>.
              </p>
              <p>
                This direct manufacturing advantage helps Floranza stand out
                among boutiques in Kerala — offering premium fashion at value
                pricing.
              </p>
            </div>
          </div>
          <div className="bg-secondary/40 border border-border rounded-xl p-8">
            <p className="text-base font-medium text-foreground mb-6">
              With a team of 40+ skilled professionals, FLORISTA enables:
            </p>
            <ol className="space-y-5">
              {[
                "Superior quality control",
                "Exclusive in-house designs",
                "Faster production cycles",
                "Affordable pricing without compromise",
              ].map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-base text-muted-foreground"
                >
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/*─────────────────────────────────────────────────
        ACHIEVEMENTS & COMMUNITY
      ─────────────────────────────────────────────────*/}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-md mx-auto py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20">
            {/* Achievements */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Achievements
              </p>
              <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-4 leading-snug">
                Trusted by Thousands of Customers
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                Floranza has built a strong reputation for quality, service, and
                customer satisfaction. We also offer on-the-spot alterations for
                a perfect fit every time.
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: <Star className="w-5 h-5" fill="currentColor" />,
                    label: "4.8 Google Rating with 1900+ reviews",
                  },
                  {
                    icon: <ShoppingBag className="w-5 h-5" />,
                    label: "400+ outfits sold online daily",
                  },
                  {
                    icon: <Globe className="w-5 h-5" />,
                    label: "Customers across India & worldwide",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "2000 sq.ft boutique store in Kozhikode",
                  },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 bg-white border border-border rounded-xl px-5 py-4 text-base text-foreground font-medium"
                  >
                    <span className="shrink-0 text-foreground">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Community + Mission */}
            <div className="space-y-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  Online Community
                </p>
                <h2 className="font-lora text-3xl md:text-4xl text-foreground mb-6 leading-snug">
                  A Strong Online Fashion Community
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Connecting with women daily through style inspiration, new
                  arrivals, and trending fashion.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    {
                      n: "250K+",
                      l: "Instagram",
                      icon: (
                        <Instagram className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                      ),
                    },
                    {
                      n: "170K+",
                      l: "Facebook",
                      icon: (
                        <Facebook className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                      ),
                    },
                    {
                      n: "38K+",
                      l: "YouTube",
                      icon: (
                        <Youtube className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                      ),
                    },
                  ].map(({ n, l, icon }) => (
                    <div
                      key={l}
                      className="bg-white border border-border rounded-xl py-5 px-3"
                    >
                      {icon}
                      <p className="text-xl font-bold text-foreground">{n}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                        {l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-main! text-primary-foreground rounded-xl p-8">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground/60 mb-4">
                  Our Mission
                </p>
                <ul className="space-y-4 text-base text-primary-foreground/90 leading-relaxed mb-8">
                  {[
                    "To become a globally recognized ethnic fashion brand",
                    "To be the most trusted household name for South Indian women",
                    'To redefine "Perfect Fit" through comfort, confidence, and thoughtful design',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60 shrink-0 mt-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-primary-foreground/20 pt-6">
                  <p className="font-lora text-lg italic text-primary-foreground leading-snug">
                    "Every woman deserves to feel confident, comfortable, and
                    effortlessly beautiful."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*─────────────────────────────────────────────────
        VISIT FLORANZA
      ─────────────────────────────────────────────────*/}
      <section className="container-md mx-auto py-16 md:py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Location
        </p>
        <h2 className="font-lora text-3xl md:text-5xl text-foreground mb-6 leading-tight">
          Visit Floranza
        </h2>
        <p className="text-base text-muted-foreground mb-10 max-w-lg mx-auto">
          Whether you&apos;re searching for a trusted ladies boutique in Kerala,
          the best kurti shop in Kozhikode, stylish ethnic wear online, or
          affordable designer kurtis — Floranza welcomes you.
        </p>

        <div className="inline-flex flex-col sm:flex-row items-center gap-5 bg-secondary border border-border rounded-xl px-8 py-7 mb-12 text-left">
          <div className="w-12 h-12 border border-border rounded-full bg-white flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-foreground" />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-lora text-2xl text-foreground">
              Floranza Fashion Boutique
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Thiruvambady, Kozhikode, Kerala
            </p>
          </div>
        </div>

        <p className="font-lora text-xl md:text-2xl text-foreground italic max-w-xl mx-auto">
          "Join thousands of happy customers who trust Floranza for their
          everyday fashion."
        </p>
      </section>
    </main>
  );
}
