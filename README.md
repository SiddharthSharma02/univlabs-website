# UnivLabs website

Website for UnivLabs Technologies, built from the UnivLabs brand book (`brand/brand-book.md`).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run lint
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: ICG mode hero, proof bar, families, specialties, ownership, SUFI, quality, pipeline, doors |
| `/products` and `/products/[slug]` | Spectra, Lumina, SurgiStart, Components, Hand instruments, Am-SafeX |
| `/specialties` | General surgery, urology, gynaecology, orthopaedics |
| `/connected-or` | CogniAxis, AxisEdge+, SurgiVault, Dr Mentor |
| `/pay-per-minute` | Leasing programme (closed to new registrations) |
| `/sufi` | Surgeon co-innovation programme |
| `/service` | Service and OBSR |
| `/partners` | Distributor programme |
| `/quality` | Certificates and claims policy |
| `/innovation` | Pipeline: SurgiBot, biodegradable stent |
| `/about` | Story, leadership, facts with sources |
| `/investors` | Highlights and briefing request |
| `/contact` | Enquiry form, pre-selects `?topic=` and `?product=` |

## Editing content

- Numbers and their sources: `content/site.ts` (`facts`).
- Products, statuses and specs: `content/products.ts`.
- Anything still to confirm shows on the page as a dashed "To confirm" box or a `[bracketed]` placeholder.

Working with Claude Code: open this folder and run `claude`. `CLAUDE.md` gives it the brand rules.
