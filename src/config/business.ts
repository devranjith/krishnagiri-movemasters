/**
 * SINGLE SOURCE OF TRUTH FOR BUSINESS INFORMATION.
 * Change the values here to update the whole website.
 */

export const business = {
  name: "Krishnagiri MoveCare Packers & Movers",
  shortName: "Krishnagiri MoveCare",
  tagline: "Reliable household shifting from Krishnagiri",
  city: "Krishnagiri",
  state: "Tamil Nadu",
  country: "India",
  addressLine: "Krishnagiri, Tamil Nadu, India",

  // Replace these placeholders with the real business contact details.
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  whatsappNumber: "910000000000", // digits only, with country code
  email: "hello@example.com",

  whatsappDefaultMessage:
    "Hi, I would like to get a free quotation for my move.",

  // Replace src with the real Google Maps embed URL of the business location.
  mapsEmbedUrl: "",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Krishnagiri+Tamil+Nadu",

  serviceAreas: [
    "Krishnagiri",
    "Hosur",
    "Bangalore",
    "Chennai",
    "Salem",
    "Other locations on request",
  ],

  workingHours: "Monday to Sunday, 8:00 AM - 8:00 PM",
} as const;

export function whatsappLink(message: string = business.whatsappDefaultMessage) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
