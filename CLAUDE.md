# Kepram Website — Claude Code Briefing

## What This Is

The main marketing website for Kepram LLC — an AI consulting company that builds custom AI agents and software for small businesses. Deployed to GitHub Pages.

## Site Structure

Single-page HTML site (`index.html` + `style.css`). No frameworks, no build step.

### Sections (top to bottom)
1. **Nav** — sticky, mobile-responsive with hamburger menu
2. **Hero** — main headline, sub-copy, CTA buttons
3. **Services** — 3 cards: AI Agents, Software Development, AI Training
4. **Why Kepram** — 4 differentiator blocks
5. **How It Works** — 3-step process
6. **Industries** — 6 vertical cards
7. **Contact** — Formspree contact form
8. **Footer**

## Brand

- **Colors:** Emerald green (#059669) accent on white + gray backgrounds
- **Font:** Inter (Google Fonts)
- **Tone:** Professional, direct, no jargon. "We" voice throughout. Company-focused — no founder identity.

## Formspree Setup (TODO)

In `index.html`, find:
```
action="https://formspree.io/f/YOUR_FORM_ID"
```
Replace `YOUR_FORM_ID` with the actual ID from formspree.io (free account, use aravindmurari@gmail.com).

## Deployment

GitHub Pages — push to `main` branch of `kepram` repo (aravindmurari/kepram).
Live at: `aravindmurari.github.io/kepram`

## Design Rules

- Never expose founder name or identity on the site
- Use "we" and "our team" throughout (not "I")
- Keep sections in the existing order — the page is designed to flow hero → services → differentiators → process → industries → contact
- Accent color is ONLY #059669 / #047857 — don't introduce new accent colors
