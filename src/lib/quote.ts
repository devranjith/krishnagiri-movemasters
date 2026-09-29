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
 * IDs are generated in the browser because enquiry rows are write-only
 * (visitors cannot read them back).
 * Email notifications can be added later inside `notifyTeam()`.
 */
export async function submitQuoteRequest(payload: QuotePayload) {
  const customerId = crypto.randomUUID();
  const leadId = crypto.randomUUID();

  const { error: customerError } = await supabase.from("customers").insert({
    id: customerId,
    full_name: payload.fullName.trim(),
    phone: payload.phone.trim(),
    whatsapp: payload.whatsapp?.trim() || null,
    email: payload.email?.trim() || null,
  });
  if (customerError) throw new Error(SAVE_ERROR);

  const { error: leadError } = await supabase.from("leads").insert({
    id: leadId,
    customer_id: customerId,
    source: payload.source ?? "website-quote-form",
    status: "new",
    message: payload.additionalMessage?.trim() || null,
  });
  if (leadError) throw new Error(SAVE_ERROR);

  const photoPaths = await uploadPhotos(payload.photos ?? []);

  const { error: quoteError } = await supabase.from("quote_requests").insert({
    customer_id: customerId,
    lead_id: leadId,
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
  if (quoteError) throw new Error(SAVE_ERROR);

  await notifyTeam();
  return { ok: true as const };
}

/** Simple contact-page enquiry: customer + lead only. */
export async function submitContactEnquiry(input: {
  fullName: string;
  phone: string;
  email?: string | undefined;
  message: string;
}) {
  const customerId = crypto.randomUUID();

  const { error: customerError } = await supabase.from("customers").insert({
    id: customerId,
    full_name: input.fullName.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || null,
  });
  if (customerError) throw new Error(SAVE_ERROR);

  const { error } = await supabase.from("leads").insert({
    customer_id: customerId,
    source: "website-contact-form",
    status: "new",
    message: input.message.trim(),
  });
  if (error) throw new Error(SAVE_ERROR);

  await notifyTeam();
  return { ok: true as const };
}

const SAVE_ERROR =
  "We could not send your request. Please try again, or call / WhatsApp us directly.";

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
 * Placeholder for a future email / SMS notification to the business team.
 * Add a server function call here when notifications are needed.
 */
async function notifyTeam(): Promise<void> {
  return;
}
