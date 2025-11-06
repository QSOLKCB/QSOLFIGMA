# QSOLFIGMA  
**Debloated Specification Template — v1.1.0**

A lean, high-velocity template for publishing your design spec *and* delivering embedded updates inside Figma.  
Built for the **QSOL-IMC** ecosystem: minimal dependencies, maximum clarity.

---

## 🎯 Why This Exists
- Loads fast. Installs clean. Evolves painlessly.  
- Avoids bloated design-system frameworks that age like bad milk.  
- Ships **tokens**, **components**, **Figma links**, and **docs** in one tidy repo — then gets out of your way.

---

## 📦 What’s Inside
| File | Purpose |
|------|----------|
| `index.html` | Minimal entry point |
| `/src` | React + TS harness for live preview |
| `spec.tsx` *(or `spec.md`)* | QSOL SPEC v1.1.0 — tokens, spacing, naming, components |
| `package.json`, `vite.config.ts` | Lightweight tooling |
| *(optional)* Figma embed snippets | Direct designer access |

---

## 🚀 Installation
```bash
# Clone the repo
git clone https://github.com/QSOLKCB/QSOLFIGMA.git
cd QSOLFIGMA

# Install dependencies
npm ci  # or yarn install

# Start local server
npm run dev
# → http://localhost:3000
To build for deployment:

bash
Copy code
npm run build
🧩 Usage
Open the Figma file link in the spec.

Apply tokens / styles from the tokens section.

Follow components guidelines for UI builds.

After updates, re-build and deploy (npm run build) — then notify your team.

🎨 Spec Highlights
Category	Values
Spacing Scale	4 / 8 / 16 / 32 px — no randoms
Typography	Inter (Headings), JetBrains Mono (Code)
Color System	neutral, accent, highlight — semantic and flat
Naming Rules	Tokens → kebab-case; Components → PascalCase
Base Components	Button, Card, Form — extend as needed

🧹 Extension Rules
Before adding anything, ask yourself:

Does it cut build time?

Does it cut file size?

Does it make the spec clearer?

If no, delete it.
Keep the spec under 500 lines. Minimalism is clarity.

📜 License
MIT License © 2025 QSOL-IMC
Fork, adapt, remix — but keep it lean and fast.

🧪 Contributing
Open a pull request with:

Your spec change or new token

Updated package.json version (bump from v1.1.0 → next)

We’ll review, merge, and keep the system pure.

⚡ QSOL Principle
“Small code. Big impact.”
– Trent Slade / EmergentMonk

yaml
Copy code
