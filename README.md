# Black Heroes Security

The Black Heroes Security website is a German-language corporate website built with the Next.js App Router, TypeScript, React, and Tailwind CSS v4. It is designed to run on Vercel, including its server-side contact form.

- **Repository:** [Malaminjagana/Blackhero-de](https://github.com/Malaminjagana/Blackhero-de)
- **Live website:** [https://www.blackheroes.de/](https://www.blackheroes.de/)
- **Production branch:** `main`
- **Deployment:** Vercel

The homepage includes the company information, service sections, contact details, and an interactive 3D workstation. Application source is in `src/app/` and `src/components/`; public images and the 3D model are in `public/`.

## Prerequisites

Install the following tools before working on the project:

- **Node.js** (GitHub Actions currently uses Node.js 22)
- **npm** (included with Node.js)
- **Git**
- **Visual Studio Code** (recommended)

## Initial setup

Clone the repository, install dependencies, and start the local development server:

```bash
git clone https://github.com/Malaminjagana/Blackhero-de.git
cd Blackhero-de
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The development server watches source files and refreshes the site as you make changes.

## Daily development workflow

Follow these steps for each change:

1. Open the project folder in VS Code.
2. Check the current branch and working tree before editing.
3. Start the development server and keep it running while you work.
4. Make changes in VS Code or with GitHub Copilot.
5. Test the changes in the browser, including relevant screen sizes and interactions.
6. Stop the development server with **Ctrl+C** in its terminal.
7. Run the linter.
8. Run the production build and fix any errors.
9. Review the changed files and diff; stage only the intended changes.
10. Commit and push the changes to `main` to deploy them.

### Useful commands

| Command | Purpose |
| --- | --- |
| `git status` | Show the current branch and changed, staged, and untracked files. |
| `git branch` | List local branches and mark the currently selected branch. |
| `npm run dev` | Start the local Next.js development server at `http://localhost:3000`. Stop it with **Ctrl+C**. |
| `npm run lint` | Run ESLint against the `src` directory. |
| `npm run build` | Run the Next.js production build using the current environment. |
| `git diff` | Review unstaged changes before committing. Use `git diff --cached` to review staged changes. |
| `git add .` | Stage all changes in the current repository. Check `git status` first so unrelated files are not included. |
| `git commit -m "Describe your changes"` | Create a commit with a concise description of the staged changes. |
| `git push origin main` | Push the `main` branch to GitHub and trigger deployment. |

If you are working on a branch other than `main`, do not push it as `main`; integrate the reviewed changes into `main` before expecting production deployment.

## Environment Variables and Configuration

The contact form sends email through the server-side `/api/contact` route using Resend. The site itself can run and build without Resend credentials, but contact form delivery returns a service-unavailable error until the Resend variables are configured. Each inquiry is sent in one email request to both `amin.j@blackheroes.de` and `support@blackheroessecurity.de`; the visitor's validated address is used only as `Reply-To`. A successful API response means Resend accepted the message; it does not independently confirm inbox delivery.

Copy [`.env.example`](./.env.example) to `.env.local` for local development, then fill in the values from Resend and the verified sending domain:

```bash
cp .env.example .env.local
```

`.env.local` is for machine-specific credentials and is excluded from Git. `.env.example` is committed so developers can see which settings the application expects; it contains placeholders only and must never contain real credentials. Do not commit `.env.local` or expose the Resend API key through a `NEXT_PUBLIC_` variable.

| Variable | Purpose | Required? | Where to obtain it | Local / production |
| --- | --- | --- | --- | --- |
| `RESEND_API_KEY` | Server-side Resend API credential | Required for contact email | Resend API keys | Set in `.env.local` and Vercel; never expose publicly |
| `CONTACT_FROM_EMAIL` | Sender address on the authenticated Resend domain | Required; must be a valid, verified sender address | Your verified sending domain in Resend | Set in `.env.local` and Vercel |
| `CONTACT_EMAIL_TO` | Comma-separated recipient addresses; must include both Black Heroes inboxes | Required | `amin.j@blackheroes.de,support@blackheroessecurity.de` | Set in `.env.local` and Vercel |
| `NEXT_PUBLIC_BASE_PATH` | URL prefix for deployments hosted below a path | Optional; leave empty for a root-domain deployment | Your deployment's URL path, if applicable | Local or production only when using a subpath; this is public configuration, not a secret |

For Vercel, add the three Resend variables in **Project → Settings → Environment Variables** for each environment where the form should send mail (Development, Preview, and/or Production). Keep `RESEND_API_KEY` server-side. `NEXT_PUBLIC_BASE_PATH` is normally unnecessary on Vercel and should only be set for a subpath deployment.

The Resend credentials are read only by the server route. The visitor never controls the sender or recipients, and the validated visitor address is set as `Reply-To`. Ensure the sender's domain is verified in Resend and its required DNS records are configured. The current handler applies an in-memory limit of five valid submissions per IP per 15 minutes; because Vercel may run multiple function instances, configure a Vercel Firewall rate-limit rule for a distributed production limit. Existing SMTP variables are no longer read by the application; keep them in Vercel until the Resend integration has been verified in production, then they can be removed.

The `/api/contact` route requires the standard Next.js server runtime, so the application cannot use a static-only host for email delivery. Vercel supports the required route. Always use `assetPath()` for public assets.

## Search engine metadata

The homepage and legal pages use the Next.js Metadata API for unique titles, descriptions, Open Graph/Twitter cards, robots directives, and `www.blackheroes.de` canonicals. The App Router generates `/sitemap.xml` and `/robots.txt`; the sitemap intentionally lists only the homepage, Impressum, and Datenschutzerklärung. The middleware permanently redirects the apex host to the canonical `www` host.

### Test the contact form locally

1. Copy `.env.example` to `.env.local` and fill in the Resend API key, verified sender, and both recipient addresses.
2. Run `npm run dev` and open the local website.
3. Submit a valid inquiry and confirm that it arrives at both `amin.j@blackheroes.de` and `support@blackheroessecurity.de`.
4. Verify that invalid fields and a filled honeypot are rejected, and that SMTP configuration or delivery errors produce the generic form error without clearing the entered values.

Do not use a real password in source control or paste it into a public issue or pull request. Email delivery should only be reported as verified after an actual delivery test.

For example:

```tsx
import { assetPath } from "@/lib/asset-path";

<img
  src={assetPath("/images/example.webp")}
  alt="Description"
/>
```

The actual image file must exist inside `public/images/` (in this example, `public/images/example.webp`). Keep asset paths and filename capitalization consistent.

## Special instructions for developers

- Never remove or bypass the `assetPath()` helper for public assets.
- Do not use root-relative public image paths without `assetPath()`.
- Keep every GLTF model's referenced binary files and textures together in the correct public directory.
- Do not commit `node_modules/`.
- Never commit secrets, tokens, or environment credentials.
- After deployment, check the browser console and Network tab for errors or failed asset requests.
- After visual changes, verify the site at mobile sizes as well as desktop.

## Troubleshooting

| Problem | Possible solution |
| --- | --- |
| Images return 404 | Confirm the file exists under `public/`, check filename capitalization, and use `assetPath()` for its URL. |
| The 3D model returns 404 or fails to load | Check that `scene.gltf`, its referenced binary file, and every referenced texture are present together under `public/models/desktop_pc/`. Inspect the browser Network tab for the failed path. |
| A client-side application error appears | Inspect the browser console for the first error and the Network tab for failed requests. Check the affected component and, for the 3D hero, its error boundaries. |
| Contact form reports a sending error | Check that all five `SMTP_*` variables are configured locally or in Vercel, then inspect server logs without exposing credentials. |
| Vercel deployment fails | Inspect the Vercel build logs and confirm that the project uses the standard Next.js framework settings. |

## Deployment checklist

- [ ] Correct branch selected (`main` for production).
- [ ] Changes tested locally.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Required SMTP variables are configured for the Vercel deployment.
- [ ] Git changes reviewed; only intended files are staged.
- [ ] Changes committed.
- [ ] Changes pushed to `main`.
- [ ] Vercel deployment succeeds.
- [ ] Live website checked, including browser console, Network tab, and mobile layout where relevant.
- [ ] `https://www.blackheroes.de/sitemap.xml` and `https://www.blackheroes.de/robots.txt` return valid responses.

## Before launch and content notes

- Replace image placeholders with company-owned or licensed photographs in `public/images/`.
- Verify services, coverage areas, phone and email details with the company.
- Complete the Impressum and have the Datenschutz page reviewed against the actual technical setup.
- Configure and verify the server-side contact form before collecting production inquiries.
- Add company references, certifications, and testimonials only after verification and written approval.

The homepage is a single-page marketing layout with in-page navigation and a mobile menu. The 3D workstation in `public/models/desktop_pc/` is loaded on the client, rotates horizontally by pointer or touch drag, and has zoom disabled. Legal pages contain placeholders and must be completed before launch.

## Future improvements

As the project grows, a separate development branch and a pull-request review workflow can be introduced before changes are merged into `main`.
