# Project Inventory — Redesign 2026

Generated from four parallel discovery passes over `/Volumes/Comcreate`, verified against each
project's own source. Machine-readable records: `inventory-merged.json`; featured subset: `featured.json`.

## Totals
| Metric | Count |
|---|---|
| Directories inventoried | 94 |
| Substantiated as real, distinct projects | 62 |
| Featured in the portfolio | 17 |
| Renderable in this environment | 79 |
| Projects with captured screenshots | 14 |

## Verification rules applied
- Purpose taken from README, layout/page metadata, or route structure — never the folder name.
- Technologies taken from `package.json`, lockfiles, config and imports — never inferred.
- Anything unprovable is recorded as `unknown`; no clients, metrics, dates or live URLs are invented.
- Duplicates resolved by git recency and completeness; the superseded copy is marked and kept visible.

## Full inventory
| Project | Source (/Volumes/Comcreate/) | Type | Renderable | In portfolio | Screenshots | Notes |
|---|---|---|---|---|---|---|
| Agent Dashboard | agentsDashboard | dashboard | yes | featured | none | Highest-value item: a genuine internal-tool/AI-orchestration product. Show via scree |
| AI Project Audit Dashboard | ai-audit-dashboard | dashboard | yes | featured | desktop+mobile | Strong portfolio dashboard piece with built-in mock demo data. Sanitize: real client |
| ComCreate CRM | Comcreate-Simple-Crm | dashboard | yes | featured | desktop+mobile | Substantial product-style dashboard; good portfolio piece (needs seeded DB or screen |
| FWP CRM (Free With Purpose) | FWP-CRM-SHOPIFY | dashboard | yes | yes | — | Real e-commerce CRM, pairs with the Free With Purpose storefront work; may need mock |
| Scenic Pricing App | ScenicPricingApp-main | dashboard | no | no | — | Internal quoting tool tied to Scenic Doors client and overlaps the canonical scenic- |
| SD Dumping Solutions (booking platform) | sdd-umps-frontendmain (1) | dashboard | yes | featured | desktop+mobile | Top-tier: full-stack booking + admin app, not just a site. Folder 'sdd-umps-frontend |
| ComCreate Task Timer | Task-timer | dashboard | no | yes | — | Real internal product, good dashboard case study; will need mock data or screenshots |
| All Levels Athletics | AllLevelsAthletics-website | ecommerce | yes | featured | desktop+mobile | Canonical (identical HEAD to all-levels-athletics; this one has .env.local and is th |
| All Levels Athletics (duplicate) | all-levels-athletics | ecommerce | yes | no | — | Exact duplicate of AllLevelsAthletics-website. |
| ATP - All Terrain Performance | ATP-ECommerce-Final | ecommerce | yes | featured | desktop+mobile | Canonical; most complete and most recent. Strong e-commerce showcase. |
| ATP e-commerce (early copy) | atp-ecommerce | ecommerce | yes | no | — | Superseded by ATP-ECommerce-Final (163 commits, 32 pages, later date). |
| Bahamii Shopify Theme | bahamii-theme | ecommerce | no | yes | — | Genuine ecommerce work. Not renderable locally; use the included screenshots or the  |
| Camp Alegria | Camp-Alegria | ecommerce | yes | featured | desktop+mobile | Flagship full-stack product; strong portfolio piece. |
| FIRAELI Luxury Ritual Candles | Firaeli-client | ecommerce | yes | yes | — | Canonical: more complete superset of firaeli (portals, API) with longer history. |
| firaeli (initial HTML) | firaeli | ecommerce | yes | no | — | Early snapshot superseded by Firaeli-client. |
| free-with-purpose (copy) | free-with-purpose | ecommerce | yes | no | — | Duplicate clone, strict subset. |
| Free With Purpose (HTML/Shopify) | FreeWithPurpose-HTML-Shopify | ecommerce | yes | yes | — | Canonical: superset of free-with-purpose (adds brand-card files, qrcode) with identi |
| RS Surf Co. Shopify Theme | rs-surf-co-theme | ecommerce | no | yes | — | Canonical RS Surf entry: newest (2026-09), most complete. Use QA screenshots if live |
| San Diego Classic Auto Detail | SanDiego-ClassicCarDetail | ecommerce | yes | yes | — | Canonical: identical HEAD commit (15b2a36) and identical tracked files to SanDiegoCl |
| San Diego Classic Auto Detail (duplicate copy) | SanDiegoClassicCarDetail | ecommerce | yes | no | — | Duplicate of SanDiego-ClassicCarDetail (identical commit and files). Only useful as  |
| Scenic Doors | Scenic-Doors | ecommerce | yes | featured | desktop+mobile | Canonical Scenic entry: git-tracked, most commits, public site plus portal/admin. |
| BNC Builders Mobile (BncMobile) | BNC-ReactNative | mobile-app | no | featured | none | Active internal tool; showcase via screenshots/recordings. Note: AuthKey .p8 file si |
| Camp Alegria Admin (mobile) | CampAlegria-Mobile | mobile-app | no | yes | — | Companion to Camp Alegria; show as mobile screenshot. |
| 9 Pine Tree Road (clone) | 9-pine-tree-road-clone | prototype | yes | no | — | Duplicate/clone stub of 9-pine-tree-road; canonical is 9-pine-tree-road. |
| Lamborghini Clone (practice) | lamborghini-clone | prototype | yes | no | — | Reproduces a commercial brand's site and trademarks; not client work and weak as ori |
| Landings (15 template explorations) | Landings | prototype | yes | no | — | Generic style exercises with lorem ipsum, not client work. |
| Nova1 Supplements (context + concept) | nova1-supplements-context | prototype | yes | no | — | Mostly confidential client records; the mockup is a one-page unapproved concept. Re- |
| RIVIT Sport Mockup | Rivet-site | prototype | yes | yes | — | Not empty as expected: contains a complete 9-page static mockup. Note the folder is  |
| RsSurf (HTML fragments) | RsSurf | prototype | no | no | — | Earliest, fragmentary version; superseded by RS-SURF and the Shopify theme. |
| Scenic Pricing Local | scenic-pricing-local | prototype | yes | no | — | Early local variant of the Scenic pricing tool; superseded by ScenicPricingApp-main  |
| UI-templates | UI-templates | prototype | no | no | — | Directory empty. |
| ATP Scrapper | ATP-Scrapper | tool | no | no | — | Pure scraper with no UI; support tooling for ATP. |
| Casita Azul Sanity Studio | casita-azul-studio | tool | no | no | — | Companion CMS studio to CasitaAzul, not a standalone showcase. |
| site-to-pdf | site-to-pdf | tool | no | no | — | Internal tooling, no visual surface; excluded per spec (no UI). |
| StreetEasy Scraper | StreetEasy-Scrapper | tool | no | no | — | Pure scraper with no UI. |
| Worktrees (teqneeq git worktree) | Worktrees | tool | no | no | — | Duplicate worktree; canonical is /Volumes/Comcreate/teqneeq-engagement. |
| Zillow Scraper API | ZillowScrapper | tool | no | no | — | Pure scraper with no dashboard UI. |
| Scenic Doors (COMCREATE) | COMCREATE | unknown | no | featured | desktop+mobile | Empty directory. |
| 14840 Sutton St | 14840-sutton-st | web-site | yes | yes | — | Clean luxury real-estate landing; good example of listing microsites. |
| 19922 Pacific Coast Highway | 19922PCH | web-site | yes | yes | — | Recent real-estate landing; sibling of 19926PCH, could be shown as a pair. |
| 19926 Pacific Coast Highway | 19926PCH | web-site | yes | yes | — | Recent real-estate landing; sibling of 19922PCH. |
| 4 Corners Concrete Coatings | 4corners | web-site | yes | yes | — | Substantial, recent client site with CMS and SEO work. |
| 9 Pine Tree Road | 9-pine-tree-road | web-site | yes | yes | — | Canonical of the pair; full-featured booking site. |
| Appleseed Medical | appleseed-medical | web-site | yes | yes | — | Real client medical-supply site; modest depth but clean. Same industry as V3 Biomedi |
| B.A.M. Auto Collision | BAM | web-site | yes | yes | — | Recent, polished redesign with design-direction docs. |
| Blue Fox Garage Doors | BlueFox | web-site | yes | yes | — | Recent, design-system-driven build with documented decisions. |
| BNC Builders Inc. | new-bnc-builders | web-site | yes | featured | desktop+mobile | Canonical BNC site; most complete and recent. |
| BNC Builders (original site) | bnc-builders | web-site | yes | no | — | Superseded by new-bnc-builders (356 commits, 65 pages, Sanity/Supabase, recent). |
| The Bridge Chiropractic | Bridge-chiropractic | web-site | yes | yes | — | Recent Astro build, good performance showcase. |
| Casita Azul | CasitaAzul | web-site | yes | featured | desktop+mobile | Most recently active, deep bilingual site plus admin pipeline; strong case study. |
| Casita Azul (preschool site, pages router) | All_CASITA/Casita-Azul | web-site | yes | no | — | Likely staging/test copy ('casitaazulpdxtest'); purpose less verifiable than other C |
| Casita Azul Education landing | All_CASITA/Landing-Spanish-Horizon | web-site | yes | no | — | Thin hub landing; older (Feb 2026) and overlaps with the dedicated sites. |
| Chatham Motel (context repo) | chatham-motel-context | web-site | yes | no | — | Primarily a confidential contracts/context repo. Static site/ may be a candidate but |
| CL ACCESS | CL-Access-main | web-site | yes | no | — | Thin coming-soon stub; optional extra. |
| Cocinarte | All_CASITA/cocinarte | web-site | yes | yes | — | Recent, feature-rich site. |
| Coconut Bay Bahamas | coconut-bay-bahamas | web-site | yes | featured | desktop+mobile | Standout: public site plus full-stack admin portal. Strong case study. Portal screen |
| ComCreate Agency Site | comcreate-svelte | web-site | yes | yes | — | Canonical, most complete and current agency site; the agency's own work. Chosen over |
| Comcreate (Next App Router rewrite) | comcreate-new | web-site | yes | no | — | Superseded by comcreate-svelte; middle generation (remote New-Comcreate-site). |
| Comcreate Site (legacy Next Pages) | Comcreate-site | web-site | yes | no | — | Superseded by comcreate-svelte (current agency site, remote comcreate-io/comcreate-s |
| Luxury Concierge (Cadiz & Lluis) | Concierge-Zillow | web-site | yes | yes | — | Large, recent, multi-role product with AI integrations; strong showcase. |
| Cosent Care | cosent-site | web-site | yes | yes | — | Healthcare brand site of reasonable depth; disclose v0 origin if shown. |
| Crea Development | crea-development | web-site | yes | yes | — | Luxury real-estate-adjacent single-pager; worth including as a visual/motion showcas |
| Crossroadz Towing | CrossRoadz | web-site | yes | yes | — | Recent, polished local-business redesign with documented design system. |
| Custom Living Homes Redesign | Custom-Living-Homes | web-site | yes | yes | — | Real client redesign deliverable (home builder/ADU). Static, so renderable via file  |
| DCStreamlined | dcstreamlined | web-site | yes | yes | — | Verified as a landing page, not a dashboard. Include as a polished luxury landing pa |
| Direct Holdings | DirectHoldings | web-site | yes | yes | — | Clean one-page corporate site; small but renderable. Lower priority. |
| Haven Outdoor (Em-Landscape) | Em-Landscape | web-site | yes | yes | — | Very recent, polished local-service site. Package name em-landscape-design; displaye |
| ER Soccer Development | ER-soccer | web-site | yes | featured | desktop+mobile | Recent, full-stack, strong case study. |
| Forsyth4Defense | forsyth4defense | web-site | yes | yes | — | Solid legal-vertical site with wide page coverage. |
| Key Buyers Club | KeyBuyersClub | web-site | yes | featured | none | Full product with documentation (BMAD docs). keyDocs subfolder is an internal docs v |
| Key Real Estate Capital | key-real-estate | web-site | yes | yes | — | Canonical, most developed Key site. |
| Key Real State Capital (v0 variant) | keyswag-website | web-site | yes | no | — | Superseded variant of key-real-estate. |
| King Roofing | king-roofing | web-site | yes | featured | desktop+mobile | Large local-service SEO site with CMS; strong case study. Package name is king-roofi |
| House of Sacred Flame Valentine's Landing Opti | Landing-Valentines-hosf | web-site | yes | no | — | Unversioned design-option set for a seasonal promo; consider only if a campaign-land |
| Liberman Law Group | liberman-law-group | web-site | yes | yes | — | Quality legal site with content system and performance budgets. |
| Morning Star Garage Doors | MorningStar | web-site | yes | yes | — | Recent, polished marketing site with documented design direction. |
| BNC Builders Inc. (pinnacle-drywall folder) | pinnacle-drywall | web-site | yes | yes | — | Large, live, CMS-backed site. Possible duplicate of bnc-builders / new-bnc-builders  |
| RECVR | RECVR | web-site | yes | yes | — | Rich feature set, recent, strong ecommerce/booking-style content. |
| RS-SURF-NewDesign | RS-SURF-NewDesign | web-site | yes | no | — | Not a distinct redesign: same site and branding as RS-SURF, a pre-Oct-2025 iteration |
| RS-SURF (static, 2025) | RS-SURF | web-site | yes | no | — | Superseded: the live-relevant RS Surf work is the 2026 Shopify theme; this is an old |
| Ruben Real Estate | Ruben-RealEstate | web-site | yes | yes | — | Deep, multi-page site with CMS-like pages; good case study. |
| San Diego Waxing Company | SanDiego-WaxingCompany | web-site | yes | yes | — | Recent real-client one-pager, small but complete. |
| Sisters in Motion SF | Sisters-In-Motion | web-site | yes | featured | desktop+mobile | Rich, recent, full-stack marketing site. |
| Smokes Concrete | Smokes-Concrete | web-site | yes | yes | — | Very recent redesign with documented concept; strong before/after candidate. |
| Social HQ | Social-HQ | web-site | yes | yes | — | Compact agency one-pager; lower priority but complete. |
| Southwest Construction Services | Southwest-Construction | web-site | yes | yes | — | Recent multi-page contractor site. |
| Spanish Horizons Academy | All_CASITA/Spanish-horizons-site | web-site | yes | yes | — | Substantial multi-page school site. |
| Teknik Design & Remodeling | teknik-site | web-site | yes | yes | — | Substantial live client site with admin and media pipeline; strong case study. |
| Tensui Water | TensuiWater | web-site | yes | yes | — | Recent, polished, motion-rich site with documented design system. |
| Teqneeq Website Rebuild | teqneeq-engagement | web-site | yes | yes | — | Strong SEO/GEO migration story, but unreleased and confidential; include only after  |
| San Diego Waxing Company Landing | triana-lander | web-site | yes | no | — | Single lander with minimal stack; adult-adjacent service reduces portfolio fit. Opti |
| Trump-Hollow Builders | trump-hollow-builders | web-site | yes | yes | — | Modest but clean contractor site; include as a supporting entry. |
| V3 Biomedical | V3Biomedical | web-site | yes | featured | desktop+mobile | Active, polished healthcare B2B site with CMS and tests. Note: design/ redesign is a |
| WoundWave | Landing-WoundWave | web-site | yes | yes | — | Polished B2B landing with product catalog; renderable. |
