import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { Section, SectionHeading } from "@/components/Section";

const title = `Privacy Policy | ${business.shortName}`;
const description =
  "How Krishnagiri MoveCare Packers & Movers collects and uses the information you share in enquiry and quotation forms.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Section>
      <SectionHeading as="h1" title="Privacy Policy" />
      <div className="mt-6 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-bold text-foreground">Information we collect</h2>
          <p className="mt-2">
            When you submit a quotation request or an enquiry, we collect the details you
            enter: your name, phone number, WhatsApp number, email address, moving
            locations and dates, property details, the services you need, and any photos
            or messages you choose to share.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-foreground">How we use it</h2>
          <p className="mt-2">
            We use your information only to understand your moving requirement, contact
            you, prepare a quotation and carry out the move if you book with us.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-foreground">Sharing</h2>
          <p className="mt-2">
            We may share the minimum details needed with our transport partners and labour
            team to complete your move. We do not sell your information.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-foreground">Contact</h2>
          <p className="mt-2">
            For any question about your data, or to ask us to delete your enquiry, contact
            us at {business.email} or {business.phone}.
          </p>
        </section>
      </div>
    </Section>
  );
}
