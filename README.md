# Black Heroes Security

The Black Heroes Security website is a German-language corporate website built with the Next.js App Router, TypeScript, React, and Tailwind CSS v4. It is hosted as a static site on GitHub Pages.

- **Repository:** [Malaminjagana/Blackhero-de](https://github.com/Malaminjagana/Blackhero-de)
- **Live website:** [malaminjagana.github.io/Blackhero-de](https://malaminjagana.github.io/Blackhero-de/)
- **Production branch:** `main`
- **Deployment:** GitHub Actions; the static export is generated in `out/`

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
| `npm run build` | Run the Next.js production build and static export using the current environment. |
| `git diff` | Review unstaged changes before committing. Use `git diff --cached` to review staged changes. |
| `git add .` | Stage all changes in the current repository. Check `git status` first so unrelated files are not included. |
| `git commit -m "Describe your changes"` | Create a commit with a concise description of the staged changes. |
| `git push origin main` | Push the `main` branch to GitHub and trigger deployment. |

If you are working on a branch other than `main`, do not push it as `main`; integrate the reviewed changes into `main` before expecting production deployment.

## GitHub Pages production configuration

GitHub Pages serves this project below the repository path `/Blackhero-de/`, rather than at the domain root. The following files and settings work together to create a deployable static site:

- [`next.config.ts`](./next.config.ts) enables static export with `output: "export"`, configures Next.js `basePath` from `NEXT_PUBLIC_BASE_PATH`, disables image optimization for static hosting, and enables trailing slashes.
- [`src/lib/asset-path.ts`](./src/lib/asset-path.ts) provides the `assetPath()` helper for public assets. It adds `NEXT_PUBLIC_BASE_PATH` when set and leaves paths unprefixed when it is unset.
- `NEXT_PUBLIC_BASE_PATH` is set to `/Blackhero-de` by the deployment workflow. For a production-path build locally, use:

  ```bash
  NEXT_PUBLIC_BASE_PATH=/Blackhero-de npm run build
  ```

- [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) installs dependencies, sets the production base path, runs the build, and uploads `out/` to GitHub Pages.
- `out/` contains the generated static website, including HTML, CSS, JavaScript, and public assets. It is created by the build and should not be committed or manually uploaded.

Local development is unprefixed by default: do not set `NEXT_PUBLIC_BASE_PATH` when running `npm run dev` locally. Always use `assetPath()` for public assets so the same source works both locally and under the GitHub Pages repository path.

For example:

```tsx
import { assetPath } from "@/lib/asset-path";

<img
  src={assetPath("/images/example.webp")}
  alt="Description"
/>
```

The actual image file must exist inside `public/images/` (in this example, `public/images/example.webp`). Keep asset paths and filename capitalization consistent.

## Automatic deployment

Pushing changes to `main` starts the GitHub Actions workflow automatically:

1. GitHub checks out the repository and installs dependencies with `npm ci`.
2. The workflow builds the static site with `NEXT_PUBLIC_BASE_PATH=/Blackhero-de`.
3. The generated `out/` directory is uploaded as a GitHub Pages artifact.
4. The deploy job publishes that artifact to GitHub Pages.

Monitor runs at [GitHub Actions](https://github.com/Malaminjagana/Blackhero-de/actions). A deployment is successful only when **both the build and deploy jobs pass**. Afterward, check the [live website](https://malaminjagana.github.io/Blackhero-de/).

## Special instructions for developers

- Never remove or casually modify the GitHub Pages `basePath` configuration.
- Never remove or bypass the `assetPath()` helper for public assets.
- Do not use root-relative public image paths without `assetPath()`.
- Keep every GLTF model's referenced binary files and textures together in the correct public directory.
- Do not upload the `out/` folder manually; GitHub Actions publishes it.
- Do not commit `node_modules/`.
- Never commit secrets, tokens, or environment credentials.
- After deployment, check the browser console and Network tab for errors or failed asset requests.
- After visual changes, verify the site at mobile sizes as well as desktop.

## Troubleshooting

| Problem | Possible solution |
| --- | --- |
| GitHub Pages shows a README instead of the website | In the repository's Pages settings, check that the deployment source is **GitHub Actions**. |
| Images return 404 | Confirm the file exists under `public/`, check filename capitalization, and use `assetPath()` for its URL. |
| The 3D model returns 404 or fails to load | Check that `scene.gltf`, its referenced binary file, and every referenced texture are present together under `public/models/desktop_pc/`. Inspect the browser Network tab for the failed path. |
| A client-side application error appears | Inspect the browser console for the first error and the Network tab for failed requests. Check the affected component and, for the 3D hero, its error boundaries. |
| GitHub Actions fails | Open the failing run and inspect the first failed step in the [Actions logs](https://github.com/Malaminjagana/Blackhero-de/actions). Fix the reported issue and push a new commit to `main`. |
| The local build succeeds but deployment fails | Run `NEXT_PUBLIC_BASE_PATH=/Blackhero-de npm run build` to test the production base path locally, then inspect the workflow logs. |

## Deployment checklist

- [ ] Correct branch selected (`main` for production).
- [ ] Changes tested locally.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Production base-path build passes when the base-path or asset configuration changes.
- [ ] Git changes reviewed; only intended files are staged.
- [ ] Changes committed.
- [ ] Changes pushed to `main`.
- [ ] GitHub Actions build job succeeds.
- [ ] GitHub Actions deploy job succeeds.
- [ ] Live website checked, including browser console, Network tab, and mobile layout where relevant.

## Before launch and content notes

- Replace image placeholders with company-owned or licensed photographs in `public/images/`.
- Verify services, coverage areas, phone and email details with the company.
- Complete the Impressum and have the Datenschutz page reviewed against the actual technical setup.
- Replace the temporary `mailto:` form with a secure server-side form handler before collecting production inquiries.
- Add company references, certifications, and testimonials only after verification and written approval.

The homepage is a single-page marketing layout with in-page navigation and a mobile menu. The 3D workstation in `public/models/desktop_pc/` is loaded on the client, rotates horizontally by pointer or touch drag, and has zoom disabled. Legal pages contain placeholders and must be completed before launch.

## Future improvements

As the project grows, a separate development branch and a pull-request review workflow can be introduced before changes are merged into `main`.
