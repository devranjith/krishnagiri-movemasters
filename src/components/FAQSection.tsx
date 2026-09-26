import { faqs } from "@/config/content";
import { Section, SectionHeading } from "./Section";

export function FAQSection({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions"
        description="Answers to what customers usually ask before booking a move."
      />
      <div className="mt-8 max-w-3xl divide-y divide-border">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground">
              {item.q}
              <span className="text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
