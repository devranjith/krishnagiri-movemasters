/** Site content that is likely to be edited later: services, steps, FAQs. */

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  points: string[];
};

export const services: ServiceItem[] = [
  {
    slug: "household-shifting",
    title: "Household Shifting",
    short:
      "Complete home shifting for 1 BHK, 2 BHK and 3 BHK homes, local and intercity.",
    points: [
      "1 BHK, 2 BHK, 3 BHK and larger homes",
      "Local shifting within Krishnagiri",
      "Intercity moves to Hosur, Bangalore, Chennai and Salem",
      "Careful handling of furniture and fragile items",
    ],
  },
  {
    slug: "office-relocation",
    title: "Office Relocation",
    short:
      "Planned relocation for small offices with furniture and equipment handling.",
    points: [
      "Small office and shop relocation",
      "Desks, chairs and cabinet transportation",
      "Computers and equipment packed with care",
      "Move planning to reduce downtime",
    ],
  },
  {
    slug: "packing-unpacking",
    title: "Packing & Unpacking",
    short:
      "Quality packing materials and methodical packing for a safer move.",
    points: [
      "Carton boxes in multiple sizes",
      "Bubble wrap for fragile items",
      "Furniture protection wrapping",
      "Labelled cartons and careful unpacking on request",
    ],
  },
  {
    slug: "loading-unloading",
    title: "Loading & Unloading",
    short:
      "Trained labour teams for coordinated loading and unloading at both ends.",
    points: [
      "Loading at pickup location",
      "Unloading at destination",
      "Heavy furniture handling support",
      "Coordination with the driver and team",
    ],
  },
  {
    slug: "two-wheeler-transportation",
    title: "Two-Wheeler Transportation",
    short: "Bike and scooter transportation along with or separate from your move.",
    points: [
      "Bike and scooter transportation",
      "Secure loading to avoid scratches",
      "Door-to-door service where available",
      "Can be combined with household shifting",
    ],
  },
];

export const whyChooseUs = [
  {
    title: "Transparent quotations",
    text: "We share a clear quotation based on your actual requirement, with no hidden surprises.",
  },
  {
    title: "Careful packing",
    text: "Fragile items, furniture and appliances are packed with suitable materials.",
  },
  {
    title: "Reliable transport partners",
    text: "We work with verified vehicle partners suited to the size of your move.",
  },
  {
    title: "Coordinated loading and unloading",
    text: "Our labour team handles loading and unloading in a planned sequence.",
  },
  {
    title: "Door-to-door service",
    text: "From your current doorstep to your new home, we stay in touch throughout.",
  },
];

export const howItWorks = [
  { title: "Request a Quote", text: "Send your details through the form, WhatsApp or a phone call." },
  { title: "Share Your Moving Details", text: "Tell us your locations, date, house size and items." },
  { title: "Receive Your Quotation", text: "We review the requirement and share a clear quotation." },
  { title: "Packing & Loading", text: "Our team packs your goods and loads them carefully." },
  { title: "Transportation", text: "Your goods travel with a suitable partner vehicle." },
  { title: "Delivery & Unloading", text: "We unload at your new address and place items as needed." },
];

export const faqs = [
  {
    q: "How do I get a quotation?",
    a: "Fill in the free quote form, send a WhatsApp message, or call us. We will discuss your requirement and share a quotation.",
  },
  {
    q: "Do you handle moves outside Krishnagiri?",
    a: "Yes. We regularly handle moves from Krishnagiri to Hosur, Bangalore, Chennai and Salem, and other locations on request.",
  },
  {
    q: "Do you provide packing materials?",
    a: "Yes. We use carton boxes, bubble wrap and protective wrapping for furniture as required for your move.",
  },
  {
    q: "How is the price decided?",
    a: "The price depends on distance, the volume of goods, packing needs, floors and lift availability. We confirm it only after understanding your requirement.",
  },
  {
    q: "How early should I book?",
    a: "Booking a few days in advance helps us arrange the right vehicle and labour team, especially on weekends and month ends.",
  },
];
