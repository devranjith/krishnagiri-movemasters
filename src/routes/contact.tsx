import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { ContactForm } from "@/components/ContactForm";
import { ContactSection } from "@/components/ContactSection";
import { Section, SectionHeading } from "@/components/Section";
import { localBusinessJsonLd } from "@/components/StructuredData";

const title = `Contact Packers & Movers in Krishnagiri | ${business.shortName}`;
const description =
  "Call, WhatsApp or email our Krishnagiri packers and movers team, or send an enquiry for house shifting and transportation.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd) },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Talk to our Krishnagiri team"
        description={`We are available ${business.workingHours}.`}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <ContactSection />

          <div className="overflow-hidden rounded-xl border border-border">
            {business.mapsEmbedUrl ? (
              <iframe
                title={`${business.name} location on Google Maps`}
                src={business.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />
            ) : (
              <div className="flex h-72 flex-col items-center justify-center gap-3 bg-secondary/60 p-6 text-center">
                <p className="font-semibold text-foreground">{business.addressLine}</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Map placeholder - add the Google Maps embed link in the business
                  configuration to show the exact location here.
                </p>
                <a
                  href={business.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold text-foreground">Send an enquiry</h2>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
