import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { business, whatsappLink } from "@/config/business";
import { cn } from "@/lib/utils";

type Size = "md" | "lg";

const sizeClass: Record<Size, string> = {
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-6 py-3.5",
};

/** Primary conversion CTA - always links to the quote page. */
export function QuoteButton({
  size = "md",
  className,
  children = "Get FREE Quote",
}: {
  size?: Size;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      to="/quote"
      className={cn(
        "btn-base bg-accent text-accent-foreground shadow-sm hover:bg-accent/90",
        sizeClass[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Opens WhatsApp with a pre-filled message. */
export function WhatsAppButton({
  size = "md",
  className,
  message,
  children = "WhatsApp Us",
  variant = "solid",
}: {
  size?: Size;
  className?: string;
  message?: string;
  children?: ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "btn-base",
        variant === "solid"
          ? "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
          : "border border-whatsapp text-whatsapp hover:bg-whatsapp/10",
        sizeClass[size],
        className,
      )}
    >
      <WhatsAppIcon />
      {children}
    </a>
  );
}

/** Click-to-call using the configured business phone number. */
export function CallButton({
  size = "md",
  className,
  children = "Call Now",
  variant = "outline",
}: {
  size?: Size;
  className?: string;
  children?: ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <a
      href={business.phoneHref}
      aria-label={`Call ${business.shortName}`}
      className={cn(
        "btn-base",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-input text-foreground hover:bg-secondary",
        sizeClass[size],
        className,
      )}
    >
      <PhoneIcon />
      {children}
    </a>
  );
}

/** The three standard CTAs used on every important page. */
export function CtaRow({
  size = "lg",
  className,
  showCall = true,
}: {
  size?: Size;
  className?: string;
  showCall?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <QuoteButton size={size} />
      <WhatsAppButton size={size} />
      {showCall && <CallButton size={size} />}
    </div>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.22-1.37a9.9 9.9 0 0 0 4.82 1.23h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.88 9.88 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.22 8.22 0 0 1-1.26-4.37c0-4.55 3.7-8.25 8.26-8.25 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.84c0 4.55-3.71 8.21-8.28 8.21Zm4.52-6.15c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
