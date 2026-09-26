import { business, whatsappLink } from "@/config/business";
import { PhoneIcon, WhatsAppIcon } from "./CTAButtons";

export function ContactSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <a
        href={business.phoneHref}
        className="card-surface flex items-start gap-4 p-5 hover:shadow-md"
      >
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <PhoneIcon />
        </span>
        <span>
          <span className="block font-semibold text-foreground">Call Us</span>
          <span className="block text-sm text-muted-foreground">{business.phone}</span>
        </span>
      </a>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="card-surface flex items-start gap-4 p-5 hover:shadow-md"
      >
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-whatsapp/10 text-whatsapp">
          <WhatsAppIcon />
        </span>
        <span>
          <span className="block font-semibold text-foreground">WhatsApp</span>
          <span className="block text-sm text-muted-foreground">{business.phone}</span>
        </span>
      </a>

      <a
        href={`mailto:${business.email}`}
        className="card-surface flex items-start gap-4 p-5 hover:shadow-md"
      >
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
          @
        </span>
        <span>
          <span className="block font-semibold text-foreground">Email</span>
          <span className="block text-sm text-muted-foreground">{business.email}</span>
        </span>
      </a>

      <div className="card-surface flex items-start gap-4 p-5">
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
          📍
        </span>
        <span>
          <span className="block font-semibold text-foreground">Location</span>
          <span className="block text-sm text-muted-foreground">{business.addressLine}</span>
        </span>
      </div>
    </div>
  );
}
