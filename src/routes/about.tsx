import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { Section, SectionHeading } from "@/components/Section";
import { QuoteCTASection } from "@/components/QuoteCTASection";

const title = `About Us | ${business.shortName} Packers & Movers`;
const description =
  "A locally operated packers and movers service based in Krishnagiri, focused on careful handling, clear communication and transparent quotations.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Careful handling",
    text: "Your belongings are packed, lifted and loaded with attention, especially fragile items and furniture.",
  },
  {
    title: "Clear communication",
    text: "You always know who is coming, when the vehicle is arriving and what stage your move is at.",
  },
  {
    title: "Reliable coordination",
    text: "We coordinate the vehicle, the labour team and the timing so the day of the move stays calm.",
  },
  {
    title: "Transparent quotations",
    text: "We quote after understanding your requirement, and we explain what the quotation covers.",
  },
];

function AboutPage() {
  return (
    <>
      <Section>
        <SectionHeading
          as="h1"
          eyebrow="About us"
          title={`A local moving service based in ${business.city}`}
        />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            {business.name} is a locally operated packers and movers service based in{" "}
            {business.city}, {business.state}. We are a small partnership, and we handle
            household shifting and related moving work with partner vehicles and our own
            labour teams.
          </p>
          <p>
            Because we are local, we know the roads, the apartment buildings and the
            common challenges of moving in and around Krishnagiri, Hosur, Bangalore,
            Chennai and Salem. Every move is coordinated directly by us, so you always
            have one point of contact.
          </p>
          <p>
            We keep our promises realistic. We do not claim to be the biggest or the
            cheapest - we focus on packing your goods properly, arranging a suitable
            vehicle, and keeping you informed until everything is unloaded at your new
            home.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="card-surface p-6">
              <h2 className="font-bold text-foreground">{value.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <QuoteCTASection />
    </>
  );
}
