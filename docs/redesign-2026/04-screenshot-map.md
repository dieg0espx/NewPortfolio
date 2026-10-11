# Screenshot Map — Redesign 2026

Every image in `public/projects/` and the project it was captured from.

## How these were captured
Each project's own dev server was started from its source directory on `/Volumes/Comcreate`, loaded in
headless Chromium (Playwright), scrolled to settle lazy content, captured full-page at 2x, then
downscaled (desktop 1200px, mobile 480px wide) and encoded as JPEG. No image is a mockup, a stock
photo, or a composite — each is a real render of that project's running code. Nothing was written back
to any project's source; temporary dependency installs and a placeholder `.env.local` were removed.

## Mapping
| File | Project | Viewport | Source | Size |
|---|---|---|---|---|
| `public/projects/ai-audit-dashboard-desktop.jpg` | ai-audit-dashboard | desktop | /Volumes/Comcreate/ai-audit-dashboard | 709 KB |
| `public/projects/ai-audit-dashboard-mobile.jpg` | ai-audit-dashboard | mobile | /Volumes/Comcreate/ai-audit-dashboard | 270 KB |
| `public/projects/all-levels-athletics-desktop.jpg` | all-levels-athletics | desktop | /Volumes/Comcreate/AllLevelsAthletics-website | 698 KB |
| `public/projects/all-levels-athletics-mobile.jpg` | all-levels-athletics | mobile | /Volumes/Comcreate/AllLevelsAthletics-website | 623 KB |
| `public/projects/atp-ecommerce-desktop.jpg` | atp-ecommerce | desktop | /Volumes/Comcreate/ATP-ECommerce-Final | 1202 KB |
| `public/projects/atp-ecommerce-mobile.jpg` | atp-ecommerce | mobile | /Volumes/Comcreate/ATP-ECommerce-Final | 958 KB |
| `public/projects/bnc-builders-desktop.jpg` | bnc-builders | desktop | /Volumes/Comcreate/new-bnc-builders | 863 KB |
| `public/projects/bnc-builders-mobile.jpg` | bnc-builders | mobile | /Volumes/Comcreate/new-bnc-builders | 746 KB |
| `public/projects/camp-alegria-desktop.jpg` | camp-alegria | desktop | /Volumes/Comcreate/Camp-Alegria | 411 KB |
| `public/projects/camp-alegria-mobile.jpg` | camp-alegria | mobile | /Volumes/Comcreate/Camp-Alegria | 392 KB |
| `public/projects/casita-azul-desktop.jpg` | casita-azul | desktop | /Volumes/Comcreate/CasitaAzul | 574 KB |
| `public/projects/casita-azul-mobile.jpg` | casita-azul | mobile | /Volumes/Comcreate/CasitaAzul | 568 KB |
| `public/projects/coconut-bay-bahamas-desktop.jpg` | coconut-bay-bahamas | desktop | /Volumes/Comcreate/coconut-bay-bahamas | 783 KB |
| `public/projects/coconut-bay-bahamas-mobile.jpg` | coconut-bay-bahamas | mobile | /Volumes/Comcreate/coconut-bay-bahamas | 524 KB |
| `public/projects/comcreate-crm-desktop.jpg` | comcreate-crm | desktop | /Volumes/Comcreate/Comcreate-Simple-Crm | 42 KB |
| `public/projects/comcreate-crm-mobile.jpg` | comcreate-crm | mobile | /Volumes/Comcreate/Comcreate-Simple-Crm | 42 KB |
| `public/projects/er-soccer-development-desktop.jpg` | er-soccer-development | desktop | /Volumes/Comcreate/ER-soccer | 820 KB |
| `public/projects/er-soccer-development-mobile.jpg` | er-soccer-development | mobile | /Volumes/Comcreate/ER-soccer | 57 KB |
| `public/projects/king-roofing-desktop.jpg` | king-roofing | desktop | /Volumes/Comcreate/king-roofing | 1256 KB |
| `public/projects/king-roofing-mobile.jpg` | king-roofing | mobile | /Volumes/Comcreate/king-roofing | 1114 KB |
| `public/projects/scenic-doors-desktop.jpg` | scenic-doors | desktop | /Volumes/Comcreate/Scenic-Doors | 458 KB |
| `public/projects/scenic-doors-mobile.jpg` | scenic-doors | mobile | /Volumes/Comcreate/Scenic-Doors | 473 KB |
| `public/projects/sd-dumping-solutions-desktop.jpg` | sd-dumping-solutions | desktop | /Volumes/Comcreate/sdd-umps-frontendmain (1) | 1224 KB |
| `public/projects/sd-dumping-solutions-mobile.jpg` | sd-dumping-solutions | mobile | /Volumes/Comcreate/sdd-umps-frontendmain (1) | 1065 KB |
| `public/projects/sisters-in-motion-desktop.jpg` | sisters-in-motion | desktop | /Volumes/Comcreate/Sisters-In-Motion | 1046 KB |
| `public/projects/sisters-in-motion-mobile.jpg` | sisters-in-motion | mobile | /Volumes/Comcreate/Sisters-In-Motion | 1040 KB |
| `public/projects/v3-biomedical-desktop.jpg` | v3-biomedical | desktop | /Volumes/Comcreate/V3Biomedical | 110 KB |
| `public/projects/v3-biomedical-mobile.jpg` | v3-biomedical | mobile | /Volumes/Comcreate/V3Biomedical | 76 KB |

## Featured projects with no screenshot
| Project | Reason |
|---|---|
| Key Buyers Club | Every route requires live Supabase credentials; the app renders an error without them. |
| Agent Dashboard | Electron desktop app — not a browser target. |
| BNC Builders Mobile | Native iOS/Android app; needs a simulator build and backend credentials. |

These three are shown in the portfolio with an accent panel and an explicit "No screenshot captured"
state plus the reason, rather than a substitute or invented image.
