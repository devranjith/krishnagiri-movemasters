import { Link } from "@tanstack/react-router";
import { business, whatsappLink } from "@/config/business";
import { services } from "@/config/content";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/50">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-base font-bold text-foreground">{business.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{business.addressLine}</p>
          <p className="mt-4 text-sm text-muted-foreground">{business.workingHours}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a className="hover:text-foreground" href={business.phoneHref}>
                Phone: {business.phone}
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {business.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-foreground" href={`mailto:${business.email}`}>
                Email: {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Quick links</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" to="/">Home</Link></li>
            <li><Link className="hover:text-foreground" to="/services">Services</Link></li>
            <li><Link className="hover:text-foreground" to="/quote">Get a Quote</Link></li>
            <li><Link className="hover:text-foreground" to="/about">About</Link></li>
            <li><Link className="hover:text-foreground" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to="/services"
                  hash={service.slug}
                  className="hover:text-foreground"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link className="hover:text-foreground" to="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-foreground" to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
