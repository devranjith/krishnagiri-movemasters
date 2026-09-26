import { Link } from "@tanstack/react-router";
import type { ServiceItem } from "@/config/content";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="card-surface flex h-full flex-col p-6 hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.short}
      </p>
      <Link
        to="/services"
        hash={service.slug}
        className="mt-4 text-sm font-semibold text-accent hover:underline"
      >
        Learn more →
      </Link>
    </article>
  );
}
