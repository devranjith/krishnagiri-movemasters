import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { Section, SectionHeading } from "@/components/Section";

const title = `Terms & Conditions | ${business.shortName}`;
const description =
  "Terms for quotations, bookings and moving services provided by Krishnagiri MoveCare Packers & Movers.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Section>
      <SectionHeading as="h1" title="Terms & Conditions" />
      <div className="mt-6 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-bold text-foreground">Quotations</h2>
          <p className="mt-2">
            Quotations are prepared after we understand your requirement. Amounts shared
            before an inspection or a detailed discussion are indicative and may change if
            the actual volume, access or distance differs from the details provided.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-foreground">Bookings</h2>
          <p className="mt-2">
            A move is confirmed only after you accept the quotation and we confirm the
            date. Vehicle and labour availability is subject to prior bookings.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-foreground">Goods and packing</h2>
          <p className="mt-2">
            Please inform us in advance about fragile, valuable or hazardous items. Items
            packed by the customer are transported as packed. We recommend telling us
            about heavy items and floor or lift access before the move.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-foreground">Delays</h2>
          <p className="mt-2">
            Delivery timelines are estimates and can be affected by traffic, weather, road
            conditions or circumstances beyond our control. We keep you informed if a
            delay occurs.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-foreground">Contact</h2>
          <p className="mt-2">
            For any clarification on these terms, contact {business.name} at{" "}
            {business.phone} or {business.email}.
          </p>
        </section>
      </div>
    </Section>
  );
}
