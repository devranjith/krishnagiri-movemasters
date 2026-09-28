import { business } from "@/config/business";

/** LocalBusiness structured data used on the home and contact pages. */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: business.name,
  description: `Packers and movers in ${business.city}, ${business.state} offering household shifting, packing, loading, unloading and two-wheeler transportation.`,
  telephone: business.phone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.city,
    addressRegion: business.state,
    addressCountry: "IN",
  },
  areaServed: business.serviceAreas.filter((a) => !a.toLowerCase().includes("request")),
  openingHours: "Mo-Su 08:00-20:00",
};
