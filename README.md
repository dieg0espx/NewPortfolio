# Diego Espinosa — Portfolio

React (Create React App) + Tailwind portfolio showcasing selected development work.

## Running it

```bash
npm install
npm start      # dev server at http://localhost:3000
npm test       # test suite
npm run build  # production build
```

## Structure

```
src/
  App.js                   page composition
  data/projects.js         featured project records (the single source of content truth)
  components/
    Nav.js  Hero.js  Work.js  Approach.js  Stack.js  Education.js  Contact.js
    ProjectFrame.js        browser/phone frame with a scrollable captured screenshot
    CharacterMark.js       decorative marks (hidden from assistive tech)
public/projects/           captured project screenshots (desktop + mobile)
docs/redesign-2026/        discovery, PRD, inventory and screenshot map
```

## Design system

The 2026 redesign implements a warm-paper visual system: `#f6f5f4` canvas, white cards with 1px
hairline borders and no shadows, a single blue (`#0075de`) for the primary action, and accent hues
(`#ffb110`, `#f64932`, `#62aef0`, `#02093a`) used only as card backgrounds. Type is Inter with
negative tracking at display sizes, plus Source Serif 4 for editorial subheads. Tokens live in
`tailwind.config.js` and `src/index.css`; the full rationale is in `docs/redesign-2026/`.

## Content rules

Project copy is derived from each project's own source. No clients, metrics, dates, technologies or
deployment links are asserted without evidence, and projects that could not be rendered say so
explicitly rather than showing a substitute image. Previews are captured screenshots, never live
embeds of the original sites.
