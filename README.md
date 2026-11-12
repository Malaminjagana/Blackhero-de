# Black Heroes Security – Next.js starter

A German-language corporate security website built with Next.js App Router, TypeScript and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before launch

1. Replace the BH text mark in the navbar/footer with the approved transparent Black Heroes logo asset.
2. Replace image placeholders with company-owned or licensed photographs in `public/images/`.
3. Verify all offered services, coverage areas, phone and email details with the company.
4. Complete the Impressum and have the Datenschutz page reviewed against the actual technical setup.
5. Replace the temporary `mailto:` form with a secure server-side form handler. Do not collect customer inquiries using a production mailto form.
6. Add verified company references, certifications and testimonials only after written approval.
7. Run `npm run build` and resolve all warnings/errors before deployment.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected Next.js framework settings and deploy.
4. Test the generated `*.vercel.app` domain.
5. Add `blackheroes.de` and `www.blackheroes.de` in Project Settings → Domains.
6. Apply only the DNS records Vercel specifies. Preserve existing MX, SPF, DKIM and DMARC records so company email continues working.

## Notes

- This starter uses Tailwind CSS v4, configured through `src/app/globals.css` and `postcss.config.mjs`; it does not require `tailwind.config.ts`.
- The homepage is a single-page marketing layout with working in-page navigation and a mobile menu.
- The homepage hero uses the interactive workstation in `public/models/desktop_pc/`; its monitor displays the supplied image at `public/images/black-heroes-banner.png`.
- The workstation rotates horizontally by pointer or touch drag. Its zoom is disabled, and the 3D canvas is loaded on the client.
- The contact form is a temporary mailto fallback, not production form processing.
- Legal pages contain explicit placeholders and must be completed before the site goes live.
