import { supabase } from "@/integrations/supabase/client";

export type QuotePayload = {
  fullName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  pickupLocation: string;
  destination: string;
  movingDate?: string;
  propertyType?: string;
  services: string[];
  floors?: string;
  liftAvailable?: boolean | null;
  approxBoxes?: string;
  heavyItems?: string;
  additionalMessage?: string;
  photos?: File[];
  source?: string;
};

/**
 * Saves an enquiry as: customer -> lead -> quote_request.
 * Email notifications can be added later inside `notifyTeam()`.
 */
export async function submitQuoteRequest(payload: QuotePayload) {
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .insert({
      full_name: payload.fullName.trim(),
      phone: payload.phone.trim(),
      whatsapp: payload.whatsapp?.trim() || null,
      email: payload.email?.trim() || null,
    })
    .select("id")
    .single();

  // Inserts are allowed but reading back may be restricted; fall back gracefully.
  const customerId = customer?.id ?? null;
  if (customerError && !customerId) {
    throw new Error("We could not save your details. Please try again or call us.");
  }

  const { data: lead } = await supabase
    .from("leads")
    .insert({
      customer_id: customerId,
      source: payload.source ?? "website-quote-form",
      status: "new",
      message: payload.additionalMessage?.trim() || null,
    })
    .select("id")
    .single();

  const photoPaths = await uploadPhotos(payload.photos ?? []);

  const { error: quoteError } = await supabase.from("quote_requests").insert({
    customer_id: customerId,
    lead_id: lead?.id ?? null,
    pickup_location: payload.pickupLocation.trim(),
    destination: payload.destination.trim(),
    moving_date: payload.movingDate || null,
    property_type: payload.propertyType || null,
    services: payload.services,
    floors: payload.floors?.trim() || null,
    lift_available: payload.liftAvailable ?? null,
    approx_boxes: payload.approxBoxes?.trim() || null,
    heavy_items: payload.heavyItems?.trim() || null,
    additional_message: payload.additionalMessage?.trim() || null,
    photo_paths: photoPaths,
  });

  if (quoteError) {
    throw new Error("We could not send your request. Please try again or call us.");
  }

  await notifyTeam();
  return { ok: true as const };
}

/** Simple contact-page enquiry: customer + lead only. */
export async function submitContactEnquiry(input: {
  fullName: string;
  phone: string;
  email?: string;
  message: string;
}) {
  const { data: customer } = await supabase
    .from("customers")
    .insert({
      full_name: input.fullName.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
    })
    .select("id")
    .single();

  const { error } = await supabase.from("leads").insert({
    customer_id: customer?.id ?? null,
    source: "website-contact-form",
    status: "new",
    message: input.message.trim(),
  });

  if (error) {
    throw new Error("We could not send your message. Please try again or call us.");
  }

  await notifyTeam();
  return { ok: true as const };
}

async function uploadPhotos(files: File[]): Promise<string[]> {
  const paths: string[] = [];
  for (const file of files.slice(0, 5)) {
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("quote-photos").upload(path, file);
    if (!error) paths.push(path);
  }
  return paths;
}

/**
 * Placeholder for future email/SMS notification to the business team.
 * Hook a server function in here when notifications are needed.
 */
async function notifyTeam(): Promise<void> {
  return;
}
