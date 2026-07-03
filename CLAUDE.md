# Kepram Website — Technical Briefing

This file is for **website work only**. For business strategy, BNI outreach, pipeline status, etc., see the memory files (`kepram-ai-consulting`, `kepram-current-pipeline`, etc.) — do not mix the two.

---

## What This Is

The marketing site for Kepram LLC at **https://kepram.com** (custom domain via GoDaddy → GitHub Pages).

HTML/CSS/JS, no frameworks, no build step. Lives at `~/Projects/kepram/`. Repo: `github.com/aravindmurari/kepram`.

**Structure (multi-page, July 2026):** the site is organized around **two products** — **AI Front Desk** and **AI Custom Agents**.

- `index.html` — homepage (kepram.com), leads with both products (Front Desk first)
- `ai-front-desk/index.html` — served at `/ai-front-desk/` (turnkey product page, no price, "Get a quote" CTA)
- `ai-custom-agents/index.html` — served at `/ai-custom-agents/` (bespoke product page, shows $1,500 setup + $199/mo as a starting point)

**Routing convention:** directory + `index.html` → clean URL (`/ai-front-desk/`). Subpages use **root-relative** asset paths (`/style.css`, `/assets/...`) so they resolve at the domain root. Nav/footer/chat-widget markup is duplicated across all three pages (no build step, no includes) — edit all three when changing shared chrome.

**Two products:**
- **AI Front Desk** — packaged, turnkey. Voice (inbound + after-hours), missed-call SMS text-back, web chat, appointment booking. Sits on top of the client's existing phone system + CRM, no disruption. Pricing is quote-based (never show a number on its page).
- **AI Custom Agents** — bespoke builds scoped per use case, all on one core engine (goals + knowledge files + guardrails): sales assistant, training bot, Q&A bot, internal tools, anything. The live webchat assistant (chat widget) is **one example** of a custom agent, not a standalone product. Pricing starts at $1,500 setup + $199/month.

## Brand v3 (current — June 2026)

| Token | Value | Role |
|---|---|---|
| `--ink` | `#17191C` | Primary text, dark surfaces |
| `--paper` | `#F4F1EA` | Warm-bone primary background |
| `--white` | `#FFFFFF` | Cards, contrast surfaces |
| `--flare` | `#F0502E` | Signature coral — sparing accent |
| `--petrol` | `#103D3A` | Secondary depth |
| `--sand` | `#E5DBCB` | Quiet warm panels |
| `--g-100`–`--g-900` | graphite scale | Neutrals |

**Fonts:** Space Grotesk (display, -0.04em tracking), Hanken Grotesk (body), Space Mono (uppercase labels, 0.14–0.18em tracking).

**Logo:** Geometric K mark + integrated wordmark. The mark IS the "K" of "Kepram"; "EPRĀM" follows (no doubled K). The "A" is a normal capital with a coral top bar (macron) drawn above it via `.wordmark__a::before`. Reference: `assets/kepram-wordmark.html`.

**Brand voice:** Plain, exact, quietly confident. Tagline: "AI that works." (footer only, paired with logo).

**Brand assets:** `assets/kepram-mark-ink.svg`, `assets/kepram-mark-coral.svg`, `assets/kepram-mark-paper.svg`, `assets/kepram-appicon.svg`.

## Homepage sections (top → bottom)

1. **Nav** — sticky, integrated wordmark logo, mono-uppercase links (AI Front Desk / AI Custom Agents / Why Kepram / Process), ink CTA button. Five items, so the nav collapses to the hamburger at ≤900px (not 640px).
2. **Hero** — headline "Put AI to work / across your business.", floating chat-bubble animation (11s CSS loop). Two CTAs point to the two product pages.
3. **Services / Products** — `.product-duo`: two `.product-card`s (AI Front Desk first, AI Custom Agents second), each with feature list, a mono price line, and an ink CTA to its page. Below: the 2 secondary service cards (Software Dev, AI Training) are retained.
4. **Why Kepram** — 4 numbered differentiators + 4-row comparison table (Template AI tools vs Kepram)
5. **How It Works** — 4 phase labels (UNDERSTAND / BUILD / LIVE / ONGOING), headline "From conversation to live agent in days."
6. **Industries** — 8 specific cards + 1 "Any other industry" catch-all (3×3 grid)
7. **Guarantee** (`#guarantee`) — risk-reversal band: petrol card (mirrors the mid-CTA card pattern), eyebrow + "Start risk-free." headline + 3 points (14 days or setup free / cancel anytime, no contracts / performs or setup refunded). Single coral signal = the eyebrow.
8. **Mid-CTA** — ink banner, coral CTA
9. **Contact** — form wired to Google Apps Script (saves to "Kepram Leads" Google Sheet + emails aravindmurari@gmail.com)
10. **Footer** — wordmark with coral macron + "AI that works." + copy
11. **Chat widget** (floating, bottom-right) — connected to live Kepram AI agent at `https://kepram-aiagent-production.up.railway.app`

Note: the Process "Ongoing" step also mentions a **monthly performance dashboard** (bookings/contacts/directions) — added June 2026 to back the guarantee.

## Contact Form

- POSTs to Google Apps Script web app
- Apps Script saves row to "Kepram Leads" sheet + emails notification
- **Spam protection:**
  - Hidden honeypot field `name="website"` (off-screen, aria-hidden, tabindex -1)
  - Hidden timestamp field `name="form_loaded_at"` set by JS on page load
  - Apps Script rejects if honeypot is filled OR submission arrives <3s after form load
  - On spam detection, returns `{"result":"success"}` silently so bots don't iterate
- Fields: name (required), business, email (required), phone (optional), message (required)

## Deployment

```
~/Projects/kepram/
├── index.html                 ← homepage
├── ai-front-desk/index.html   ← /ai-front-desk/
├── ai-custom-agents/index.html← /ai-custom-agents/
├── style.css                  ← shared across all pages
├── CNAME                      ← kepram.com
├── CLAUDE.md                  ← this file
├── README.md
└── assets/
    ├── kepram-mark-ink.svg
    ├── kepram-mark-coral.svg
    ├── kepram-mark-paper.svg
    ├── kepram-appicon.svg
    └── kepram-wordmark.html
```

- Push to `main` → GitHub Pages auto-builds → live at kepram.com in ~30s
- Hard refresh (Cmd+Shift+R) to bypass cache

## Design Rules

- **Coral is a signal**, never a field of color. One coral element per view at most (button, accent text, macron). Don't add second coral elements just because it "looks nice."
- **The K mark** is always the geometric mark. Never substitute typography. Never recolor outside palette.
- **Wordmark** = mark + "EPRAM" with coral macron over the A. Never just "Kepram" as text in a logo lockup.
- **Sentence case for headlines** (e.g., "From conversation to live agent in days." not "From Conversation To Live Agent In Days.")
- **No founder name on the site.** Use "we" / "Kepram" throughout. (Memory: user-background notes Aravind doesn't want his identity prominent yet.)
- **No mention of white-labeling** anywhere. User decision (June 2026) — it's not a positioning point for now.
- **Industries:** "Any other industry" stays as the LAST card in the grid (catch-all closer).
- **`[hidden]` !important** is in the CSS reset — needed because some sections use `display: flex` which would otherwise override the hidden attribute.

## Active TODOs / Known Issues

- None currently. Spam protection validated. Site is stable.

## See Also (memory)

- `kepram-ai-consulting.md` — business overview, services, pricing
- `kepram-current-pipeline.md` — current sales pipeline, who's been messaged, who's responded
- `kepram-product-positioning.md` — voice, terminology, differentiators
- `kepram-competitor-pricing.md` — market pricing research (Tidio, Intercom, etc.)
