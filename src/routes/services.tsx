import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { services } from "@/config/content";
import { QuoteButton, WhatsAppButton } from "@/components/CTAButtons";
import { Section, SectionHeading } from "@/components/Section";
import { QuoteCTASection } from "@/components/QuoteCTASection";

const title = `Packing & Moving Services in Krishnagiri | ${business.shortName}`;
const description =
  "Household shifting, office relocation, packing and unpacking, loading and unloading, and two-wheeler transportation from Krishnagiri.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <Section className="border-b border-border bg-secondary/40">
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title="Moving services from Krishnagiri"
          description="Choose the full service or only the parts you need. Every enquiry gets a clear quotation before any work begins."
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <QuoteButton size="lg" />
          <WhatsAppButton size="lg" />
        </div>
      </Section>

      {services.map((service, index) => (
        <Section
          key={service.slug}
          id={service.slug}
          className={index % 2 === 1 ? "bg-secondary/40" : ""}
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {service.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                {service.short}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <QuoteButton />
                <WhatsAppButton
                  variant="outline"
                  message={`Hi, I would like a free quotation for ${service.title.toLowerCase()}.`}
                />
              </div>
            </div>
            <ul className="card-surface space-y-3 p-6">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-foreground">
                  <span aria-hidden="true" className="mt-0.5 font-bold text-accent">
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <QuoteCTASection title="Not sure which service you need?" description="Tell us about your move and we will suggest the right combination and share a quotation." />
    </>
  );
}
