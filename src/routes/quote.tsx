import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { CallButton, WhatsAppButton } from "@/components/CTAButtons";
import { QuoteForm } from "@/components/QuoteForm";
import { Section, SectionHeading } from "@/components/Section";

const title = `Get a Free Moving Quote | ${business.shortName}`;
const description =
  "Request a free quotation for house shifting from Krishnagiri. Share your pickup, destination and moving details and our team will contact you.";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/quote" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeading
            as="h1"
            eyebrow="Free quotation"
            title="Tell us about your move"
            description="Fill in the details below. We never calculate a price automatically - our team reviews your requirement and shares a clear quotation."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton />
            <CallButton />
          </div>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li>✓ No obligation and no hidden charges</li>
            <li>✓ We call you back to confirm the details</li>
            <li>✓ Quotation based on your actual requirement</li>
          </ul>
        </div>

        <QuoteForm />
      </div>
    </Section>
  );
}
