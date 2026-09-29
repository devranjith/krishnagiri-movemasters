<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project conventions

- All business contact details, brand name and service areas live in `src/config/business.ts`; editable page content (services, steps, FAQs) lives in `src/config/content.ts`. Never hardcode these in components, so the business can be rebranded from one place.
- Website enquiries are write-only: `customers`, `leads` and `quote_requests` allow inserts from visitors and no reads, so IDs are generated client-side in `src/lib/quote.ts`.
