import { useState } from "react";
import { z } from "zod";
import { submitQuoteRequest } from "@/lib/quote";
import { CallButton, WhatsAppButton } from "./CTAButtons";

const propertyTypes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Office", "Other"];
const serviceOptions = ["Packing", "Loading", "Transportation", "Unloading", "Unpacking"];

const stepSchemas = [
  z.object({
    fullName: z.string().trim().min(2, "Please enter your full name").max(100),
    phone: z
      .string()
      .trim()
      .min(8, "Please enter a valid phone number")
      .max(20, "Phone number is too long"),
    whatsapp: z.string().trim().max(20).optional().or(z.literal("")),
  }),
  z.object({
    pickupLocation: z.string().trim().min(2, "Please enter the pickup location").max(160),
    destination: z.string().trim().min(2, "Please enter the destination").max(160),
    movingDate: z.string().optional().or(z.literal("")),
    propertyType: z.string().min(1, "Please select the property type"),
  }),
  z.object({
    services: z.array(z.string()).min(1, "Please select at least one service"),
  }),
  z.object({
    floors: z.string().trim().max(40).optional().or(z.literal("")),
    approxBoxes: z.string().trim().max(40).optional().or(z.literal("")),
    heavyItems: z.string().trim().max(400).optional().or(z.literal("")),
    additionalMessage: z.string().trim().max(1000).optional().or(z.literal("")),
  }),
];

const stepTitles = [
  "Your details",
  "Moving details",
  "Services required",
  "Additional details",
];

type FormState = {
  fullName: string;
  phone: string;
  whatsapp: string;
  pickupLocation: string;
  destination: string;
  movingDate: string;
  propertyType: string;
  services: string[];
  floors: string;
  liftAvailable: string;
  approxBoxes: string;
  heavyItems: string;
  additionalMessage: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  whatsapp: "",
  pickupLocation: "",
  destination: "",
  movingDate: "",
  propertyType: "",
  services: [],
  floors: "",
  liftAvailable: "",
  approxBoxes: "",
  heavyItems: "",
  additionalMessage: "",
};

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(index: number) {
    const result = stepSchemas[index].safeParse(form as unknown as Record<string, unknown>);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Record<string, string> = {};
    for (const issue of result.error.issues) {
      next[String(issue.path[0])] = issue.message;
    }
    setErrors(next);
    return false;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validateStep(step)) return;
    if (step < stepSchemas.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitting(true);
    setServerError("");
    try {
      await submitQuoteRequest({
        fullName: form.fullName,
        phone: form.phone,
        whatsapp: form.whatsapp || form.phone,
        pickupLocation: form.pickupLocation,
        destination: form.destination,
        movingDate: form.movingDate,
        propertyType: form.propertyType,
        services: form.services,
        floors: form.floors,
        liftAvailable:
          form.liftAvailable === "" ? null : form.liftAvailable === "yes",
        approxBoxes: form.approxBoxes,
        heavyItems: form.heavyItems,
        additionalMessage: form.additionalMessage,
        photos,
      });
      setSubmitted(true);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card-surface fade-up p-8 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
          ✓
        </div>
        <h2 className="mt-4 text-2xl font-bold text-foreground">Thank you!</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Your quotation request has been received. Our team will contact you shortly to
          understand your requirements and provide a quotation.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton size="lg" message="Hi, I just submitted a free quote request." />
          <CallButton size="lg" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface p-6 sm:p-8">
      <ol className="mb-6 flex flex-wrap gap-2" aria-label="Form progress">
        {stepTitles.map((title, index) => (
          <li
            key={title}
            aria-current={index === step ? "step" : undefined}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              index === step
                ? "bg-accent text-accent-foreground"
                : index < step
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground"
            }`}
          >
            {index + 1}. {title}
          </li>
        ))}
      </ol>

      <div className="fade-up space-y-5" key={step}>
        {step === 0 && (
          <>
            <Field label="Full Name" error={errors['fullName']} htmlFor="fullName" required>
              <input
                id="fullName"
                className={inputClass}
                value={form.fullName}
                autoComplete="name"
                onChange={(e) => update("fullName", e.target.value)}
              />
            </Field>
            <Field label="Phone Number" error={errors['phone']} htmlFor="phone" required>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={inputClass}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Field>
            <Field label="WhatsApp Number (if different)" htmlFor="whatsapp" error={errors['whatsapp']}>
              <input
                id="whatsapp"
                type="tel"
                inputMode="tel"
                className={inputClass}
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
              />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Pickup Location" error={errors['pickupLocation']} htmlFor="pickup" required>
              <input
                id="pickup"
                className={inputClass}
                placeholder="Area, city"
                value={form.pickupLocation}
                onChange={(e) => update("pickupLocation", e.target.value)}
              />
            </Field>
            <Field label="Destination" error={errors['destination']} htmlFor="destination" required>
              <input
                id="destination"
                className={inputClass}
                placeholder="Area, city"
                value={form.destination}
                onChange={(e) => update("destination", e.target.value)}
              />
            </Field>
            <Field label="Moving Date" htmlFor="movingDate">
              <input
                id="movingDate"
                type="date"
                className={inputClass}
                value={form.movingDate}
                onChange={(e) => update("movingDate", e.target.value)}
              />
            </Field>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-foreground">
                Property type <span className="text-accent">*</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <label
                    key={type}
                    className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      form.propertyType === type
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-input text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      className="sr-only"
                      value={type}
                      checked={form.propertyType === type}
                      onChange={() => update("propertyType", type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
              {errors['propertyType'] && <ErrorText>{errors['propertyType']}</ErrorText>}
            </fieldset>
          </>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-foreground">
              Which services do you need? <span className="text-accent">*</span>
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {serviceOptions.map((option) => {
                const checked = form.services.includes(option);
                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                      checked
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-input text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="size-4 accent-current"
                      checked={checked}
                      onChange={() =>
                        update(
                          "services",
                          checked
                            ? form.services.filter((s) => s !== option)
                            : [...form.services, option],
                        )
                      }
                    />
                    {option}
                  </label>
                );
              })}
            </div>
            {errors['services'] && <ErrorText>{errors['services']}</ErrorText>}
          </fieldset>
        )}

        {step === 3 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Number of floors" htmlFor="floors">
                <input
                  id="floors"
                  className={inputClass}
                  placeholder="e.g. 2nd floor"
                  value={form.floors}
                  onChange={(e) => update("floors", e.target.value)}
                />
              </Field>
              <Field label="Lift available?" htmlFor="lift">
                <select
                  id="lift"
                  className={inputClass}
                  value={form.liftAvailable}
                  onChange={(e) => update("liftAvailable", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </Field>
            </div>
            <Field label="Approximate number of boxes" htmlFor="boxes">
              <input
                id="boxes"
                className={inputClass}
                placeholder="e.g. 15-20"
                value={form.approxBoxes}
                onChange={(e) => update("approxBoxes", e.target.value)}
              />
            </Field>
            <Field label="Large / heavy items" htmlFor="heavy">
              <input
                id="heavy"
                className={inputClass}
                placeholder="Fridge, washing machine, almirah..."
                value={form.heavyItems}
                onChange={(e) => update("heavyItems", e.target.value)}
              />
            </Field>
            <Field label="Additional message" htmlFor="message">
              <textarea
                id="message"
                rows={4}
                className={inputClass}
                value={form.additionalMessage}
                onChange={(e) => update("additionalMessage", e.target.value)}
              />
            </Field>
            <Field label="Photos of your items (optional, up to 5)" htmlFor="photos">
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foreground"
                onChange={(e) => setPhotos(Array.from(e.target.files ?? []).slice(0, 5))}
              />
            </Field>
            <p className="text-xs text-muted-foreground">
              We do not calculate prices automatically. Our team reviews your requirement
              and shares a quotation after speaking with you.
            </p>
          </>
        )}
      </div>

      {serverError && (
        <p role="alert" className="mt-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            className="btn-base border border-input px-5 py-3 text-sm"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="btn-base bg-accent px-6 py-3.5 text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
        >
          {step < stepSchemas.length - 1
            ? "Continue"
            : submitting
              ? "Sending..."
              : "GET MY FREE QUOTE"}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/30";

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm text-destructive">{children}</p>;
}
