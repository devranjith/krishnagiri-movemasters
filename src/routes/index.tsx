import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-moving.jpg";
import { business } from "@/config/business";
import { howItWorks, services, whyChooseUs } from "@/config/content";
import { CallButton, QuoteButton, WhatsAppButton } from "@/components/CTAButtons";
import { Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { QuoteCTASection } from "@/components/QuoteCTASection";
import { FAQSection } from "@/components/FAQSection";
import { localBusinessJsonLd } from "@/components/StructuredData";

const title = `Packers & Movers in Krishnagiri | ${business.shortName}`;
const description =
  "Reliable packers and movers in Krishnagiri for household shifting to Bangalore, Hosur, Chennai and Salem. Packing, loading, transportation and unloading. Get a free quote.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd) },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="fade-up">
            <p className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
              {business.city}, {business.state}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              Reliable Packers &amp; Movers in Krishnagiri
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Safe and hassle-free household shifting from Krishnagiri to Bangalore, Hosur,
              Chennai and nearby cities.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <QuoteButton size="lg" />
              <WhatsAppButton size="lg" />
              <CallButton size="lg" />
            </div>
            <p className="mt-6 text-sm font-semibold text-foreground">
              Packing • Loading • Transportation • Unloading
            </p>
          </div>

          <div className="fade-up overflow-hidden rounded-2xl border border-border shadow-sm">
            <img
              src={heroImage}
              alt="Moving team carefully loading wrapped furniture and cartons into a moving truck in Krishnagiri"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <Section id="services">
        <SectionHeading
          eyebrow="Our services"
          title="Moving services we handle"
          description="From a single room to a full household, we plan the move around what you actually need."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <Link
          to="/services"
          className="mt-8 inline-block text-sm font-semibold text-accent hover:underline"
        >
          View all services in detail →
        </Link>
      </Section>

      {/* Why choose us */}
      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Why choose us"
          title="A local team that keeps things clear"
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="card-surface p-6">
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Free quote band (middle of page) */}
      <QuoteCTASection />

      {/* How it works */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="Six simple steps from enquiry to delivery"
        />
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorks.map((step, index) => (
            <li key={step.title} className="card-surface p-6">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="mt-4 font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Service areas */}
      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Service areas"
          title="Where we move households"
          description="Based in Krishnagiri and regularly moving customers to nearby cities."
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {business.serviceAreas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground"
            >
              {area}
            </li>
          ))}
        </ul>
      </Section>

      <FAQSection />

      {/* Bottom CTA */}
      <QuoteCTASection
        title="Planning a move? Let's talk today."
        description="Send us a WhatsApp message or request a free quotation. We will reply with a clear, honest quotation for your move."
      />
    </>
  );
}
