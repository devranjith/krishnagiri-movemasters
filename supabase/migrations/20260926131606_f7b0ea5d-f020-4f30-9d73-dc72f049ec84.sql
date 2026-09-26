CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  moving_date DATE,
  property_type TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
  floors TEXT,
  lift_available BOOLEAN,
  approx_boxes TEXT,
  heavy_items TEXT,
  additional_message TEXT,
  photo_paths TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.customers TO anon, authenticated;
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT ALL ON public.customers TO service_role;
GRANT ALL ON public.leads TO service_role;
GRANT ALL ON public.quote_requests TO service_role;

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit customer details" ON public.customers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can submit a quote request" ON public.quote_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can upload quote photos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'quote-photos');