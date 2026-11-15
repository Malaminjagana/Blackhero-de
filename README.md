# Black Heroes Security

The Black Heroes Security website is a German-language corporate website built with the Next.js App Router, TypeScript, React, and Tailwind CSS v4. It is designed to run on Vercel, including its server-side contact form.

- **Repository:** [Malaminjagana/Blackhero-de](https://github.com/Malaminjagana/Blackhero-de)
- **Live website:** The URL assigned to the Vercel project
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

## Vercel deployment and contact form

The project uses the Next.js server runtime for its `/api/contact` route and cannot be deployed as a static GitHub Pages export. Connect this repository to Vercel and use the standard Next.js build settings. Vercel can deploy the configured production branch automatically on pushes.

Set these variables in the local `.env.local` file for development and in **Vercel → Project → Settings → Environment Variables** for each Vercel environment where the form should send mail:

| Variable | Value |
| --- | --- |
| `SMTP_HOST` | `smtp.ionos.de` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | `amin.j@blackheroes.de` |
| `SMTP_PASSWORD` | Your IONOS mailbox password |

Use [`.env.example`](./.env.example) as a template. Never commit `.env.local` or an actual mailbox password. SMTP variables must remain server-side; do not prefix them with `NEXT_PUBLIC_`. GitHub Pages cannot run the SMTP API route, so the active deployment must use a server-capable host such as Vercel.

In development, keep `NEXT_PUBLIC_BASE_PATH` unset unless you intentionally serve the app below a URL subpath. Always use `assetPath()` for public assets.

For example:

```tsx
import { assetPath } from "@/lib/asset-path";

<img
  src={assetPath("/images/example.webp")}
  alt="Description"
/>
```

The actual image file must exist inside `public/images/` (in this example, `public/images/example.webp`). Keep asset paths and filename capitalization consistent.

### Test the contact form locally

1. Copy `.env.example` to `.env.local` and set the real IONOS mailbox password locally.
2. Run `npm run dev` and open the local website.
3. Submit the contact form with valid details and confirm the inquiry arrives at `amin.j@blackheroes.de`.
4. Verify that invalid input is rejected and that the form displays its success or error status.

Do not use a real password in source control or paste it into a public issue or pull request. Email delivery should only be reported as verified after an actual delivery test.

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

## Before launch and content notes

- Replace image placeholders with company-owned or licensed photographs in `public/images/`.
- Verify services, coverage areas, phone and email details with the company.
- Complete the Impressum and have the Datenschutz page reviewed against the actual technical setup.
- Configure and verify the server-side contact form before collecting production inquiries.
- Add company references, certifications, and testimonials only after verification and written approval.

The homepage is a single-page marketing layout with in-page navigation and a mobile menu. The 3D workstation in `public/models/desktop_pc/` is loaded on the client, rotates horizontally by pointer or touch drag, and has zoom disabled. Legal pages contain placeholders and must be completed before launch.

## Future improvements

As the project grows, a separate development branch and a pull-request review workflow can be introduced before changes are merged into `main`.
