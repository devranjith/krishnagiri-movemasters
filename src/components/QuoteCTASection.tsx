import { business } from "@/config/business";
import { CallButton, QuoteButton, WhatsAppButton } from "./CTAButtons";

export function QuoteCTASection({
  title = "Get a free quotation for your move",
  description = "Share your moving details and we will get back to you with a clear quotation. No obligation.",
  variant = "primary",
}: {
  title?: string;
  description?: string;
  variant?: "primary" | "light";
}) {
  const dark = variant === "primary";
  return (
    <section className="py-14 sm:py-16">
      <div className="container-page">
        <div
          className={
            dark
              ? "rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12"
              : "rounded-2xl border border-border bg-secondary px-6 py-12 sm:px-12"
          }
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className={dark ? "mt-3 text-primary-foreground/80" : "mt-3 text-muted-foreground"}>
              {description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <QuoteButton size="lg" />
              <WhatsAppButton size="lg" />
              <CallButton
                size="lg"
                variant={dark ? "solid" : "outline"}
                className={dark ? "bg-primary-foreground/10 hover:bg-primary-foreground/20" : ""}
              >
                Call {business.phone}
              </CallButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
