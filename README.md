# QSOLFIGMA  
*Debloated Specification Template — Version v1.1.0*

A lean, high-velocity template for publishing your design spec *and* delivering embedded updates inside Figma.  
Built for the QSOL‑IMC ecosystem: minimal dependencies, maximum clarity.

---

## 🎯 Why this exists  
- You want a spec template that **loads fast**, **installs clean**, and **evolves painlessly**.  
- You don’t want a bloated design-system-framework that’ll age like a heavy Docker image.  
- You want to ship **tokens**, **components**, **Figma links**, and **docs** in one tidy repo — and be done with it.

---

## 📦 What’s inside  
- `index.html` — the entry point.  
- `/src` — minimal React + TSX harness (optional) for live preview.  
- `spec.tsx` (or `spec.md`) — the “QSOL SPEC v1.0” document: tokens, spacing, naming conventions, component library.  
- `package.json`, `vite.config.ts` — super-light tooling to build/serve.  
- Figma URL snippets / embed instructions for direct designer access.

---

## 🚀 Installation  
```bash
# Clone the repo:
git clone https://github.com/QSOLKCB/QSOLFIGMA.git
cd QSOLFIGMA

# Install dependencies:
npm ci   # or yarn install

# Start dev server:
npm run dev    # launches locally at http://localhost:3000
🧩 Usage
Open the Figma file link found in the spec.

Apply tokens / styles from the “tokens” section.

Use the component guidelines in the “components” section for building UI.

When you update the spec, simply re-build & deploy (npm run build) and notify the team.

🎨 Spec Highlights
Spacing scale: 4 / 8 / 16 / 32px — no sprawling custom values.

Typography:

Headings: Inter

Code / Mono: JetBrains Mono

Color system: neutral, accent, highlight — flat, semantic.

Naming rules: Lower-kebab for tokens (e.g., spacing-small), Pascal for components (ButtonPrimary).

Component set: Buttons, Cards, Forms — sufficient for MVP, extend as needed.

🧹 Guidelines for Extension
If you add a dependency, ask: “Does this reduce lines of code and build size?” If no, skip it.

If you add a token, ask: “Is this genuinely reused across contexts?” If no, omit it.

Keep the spec under 500 lines to preserve readability and minimal-ism.

📜 Licensing
© 2025 QSOL-IMC · MIT-licensed
Feel free to fork, adapt, and deploy — just keep it lean, keep it fast.

🧪 Want to contribute?
Open a pull request, include your change in the spec, update the version in package.json (now v1.1.0) and we’ll review.
