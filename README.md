# Kexora — Web Design & Digital Engineering Agency

Official website and digital service catalog for **Kexora** (kexora.org). Built with **React 19**, **Vite**, **Tailwind CSS**, and modern TypeScript.

---

## 🚀 How to Launch on GitHub Pages via GitHub Actions

This repository is pre-configured with a zero-config GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Step 1: Push Your Code to GitHub
```bash
git add .
git commit -m "feat: complete kexora agency web application"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Enable GitHub Actions as Pages Source
1. Open your repository on **GitHub.com**.
2. Click on the **Settings** tab (top menu).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** → **Source**, change the dropdown from *"Deploy from a branch"* to **"GitHub Actions"**.

### Step 3: Automatic Deployment
- As soon as you select **GitHub Actions** (or push any commit to `main`), GitHub will automatically run the `.github/workflows/deploy.yml` workflow.
- You can watch the live progress under the **Actions** tab of your repository.
- Once finished (takes ~45 seconds), your live URL will be shown directly on the GitHub Pages settings page (e.g., `https://<your-username>.github.io/<your-repo-name>/` or your custom domain `https://kexora.org`).

---

## ⚡ What Makes This Setup Production-Ready for GitHub Pages:
- **Automatic Base Path Resolution**: Uses `actions/configure-pages@v5` so assets load seamlessly whether you deploy to a repository subfolder or a custom domain (`kexora.org`).
- **SPA 404 Route Protection**: Pre-configured with `404.html` and history router redirection so refreshing `/pricing`, `/services`, or `/our-tools` never results in a 404 error on GitHub Pages.
- **Pre-packaged Media Assets**: All media assets and custom fonts are pre-compiled in `public/api/media/` for 100% static hosting compatibility.
