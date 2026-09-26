import { useState } from "react";
import { z } from "zod";
import { submitContactEnquiry } from "@/lib/quote";
import { CallButton, WhatsAppButton } from "./CTAButtons";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(8, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Please tell us how we can help").max(1000),
});

export function ContactForm() {
  const [values, setValues] = useState({ fullName: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submitContactEnquiry(parsed.data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card-surface fade-up p-8 text-center">
        <h2 className="text-xl font-bold text-foreground">Thank you!</h2>
        <p className="mt-2 text-muted-foreground">
          Your enquiry has been received. Our team will contact you shortly.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <WhatsAppButton />
          <CallButton />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card-surface space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="c-name" className="mb-2 block text-sm font-semibold">
          Name <span className="text-accent">*</span>
        </label>
        <input
          id="c-name"
          className={input}
          value={values.fullName}
          onChange={(e) => setValues({ ...values, fullName: e.target.value })}
        />
        {errors['fullName'] && <p className="mt-2 text-sm text-destructive">{errors['fullName']}</p>}
      </div>
      <div>
        <label htmlFor="c-phone" className="mb-2 block text-sm font-semibold">
          Phone <span className="text-accent">*</span>
        </label>
        <input
          id="c-phone"
          type="tel"
          className={input}
          value={values.phone}
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
        />
        {errors['phone'] && <p className="mt-2 text-sm text-destructive">{errors['phone']}</p>}
      </div>
      <div>
        <label htmlFor="c-email" className="mb-2 block text-sm font-semibold">
          Email
        </label>
        <input
          id="c-email"
          type="email"
          className={input}
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        {errors['email'] && <p className="mt-2 text-sm text-destructive">{errors['email']}</p>}
      </div>
      <div>
        <label htmlFor="c-message" className="mb-2 block text-sm font-semibold">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="c-message"
          rows={4}
          className={input}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
        />
        {errors['message'] && <p className="mt-2 text-sm text-destructive">{errors['message']}</p>}
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          We could not send your message. Please call or WhatsApp us instead.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-base w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}

const input =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30";
