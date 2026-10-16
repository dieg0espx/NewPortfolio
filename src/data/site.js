const asset = (file) => `${process.env.PUBLIC_URL}/work/${file}`;

export const EMAILS = [
  { address: "espinosa9de@gmail.com", flag: "🇩🇪" },
  { address: "espinosa9mx@gmail.com", flag: "🇲🇽" },
];
export const EMAIL = EMAILS[0].address;
export const PHONES = [
  { label: "+49 152 13451741", href: "tel:+4915213451741", flag: "🇩🇪" },
  { label: "+52 9999088639", href: "tel:+529999088639", flag: "🇲🇽" },
];

export const placeShots = [
  {
    id: "floors",
    label: "Floors",
    src: asset("place-1.webp"),
    w: 2000,
    h: 1379,
    alt: "The finishes step asking about floors, with Luxury vinyl plank selected among hardwood, tile, stone, concrete and carpet.",
    note: "Eleven finishes questions, one screen each. Every one of them takes a “Not sure yet”, because on a first visit most answers are.",
  },
  {
    id: "walls",
    label: "Walls",
    src: asset("place-2.webp"),
    w: 2000,
    h: 1379,
    alt: "The same step asking about walls, with Paint selected among tile, wallpaper, wood paneling, Venetian plaster and shiplap.",
    note: "The step list down the left stays visible, so the client can see how much is left and jump back to change an answer.",
  },
  {
    id: "plan",
    label: "Plan editor",
    src: asset("place-3.webp"),
    w: 2000,
    h: 1379,
    alt: "The floor plan editor with an L-shaped kitchen drawn, fixtures placed, a unit switcher down the right side, and twelve validation warnings flagged in red.",
    note: "Geometry is stored in millimetres and shown in whichever unit is tapped. Validation runs live: here twelve fixtures overlap a wall, so the editor flags them in red and still lets the drawing stand.",
  },
  {
    id: "before",
    label: "Before",
    src: asset("place-before.webp"),
    w: 583,
    h: 402,
    alt: "The existing kitchen before any work: oak raised-panel cabinets, granite counters, white appliances, and beige tile floor.",
    note: "The room as it stands, photographed on the first visit with the client in it. This is what the concept is built from.",
  },
  {
    id: "after1",
    label: "After",
    src: asset("place-after1.webp"),
    w: 2000,
    h: 1379,
    alt: "The generated concept of the same kitchen: flat cream cabinets, pale stone counters, light oak floor, and an island with stools.",
    note: "The same room, same camera. Cabinets, counters, floor, and island follow the answers and the drawn plan, not a stock template.",
  },
  {
    id: "after2",
    label: "Second view",
    src: asset("place-after2.webp"),
    w: 2000,
    h: 1379,
    alt: "A second concept view down the length of the kitchen island toward the dining and living area beyond.",
    note: "Four views come back per run, each from a camera computed off the room the contractor drew. An AI concept, not a construction spec.",
  },
];

export const dashboardShots = [
  {
    id: "projects",
    label: "Projects",
    src: asset("dashboard-projects.webp"),
    w: 2000,
    h: 1170,
    alt: "Agent Dashboard home: a grid of project folders, pause switches, Vercel badges, and the Start orchestrator control.",
    note: "The home grid. Drag order is the order the orchestrator walks. The switch pauses a folder without deleting it.",
  },
  {
    id: "tasks",
    label: "Tasks",
    src: asset("dashboard-tasks.webp"),
    w: 2000,
    h: 1170,
    alt: "A project task board with Queue, Done, and Failed columns.",
    note: "Queue, done, and failed. A task with a dependency stays queued until the parent is done.",
  },
  {
    id: "logs",
    label: "Runs",
    src: asset("dashboard-logs.webp"),
    w: 2000,
    h: 1170,
    alt: "Runs and logs for one project, with the raw worker stream open.",
    note: "Each run keeps the persona, duration, tokens, cost, and the raw stream the app parses.",
  },
  {
    id: "team",
    label: "Team",
    src: asset("dashboard-team.webp"),
    w: 2000,
    h: 1170,
    alt: "Agent team roster split between the Claude workers and the Cursor project managers.",
    note: "Eight roles on each side. The same job titles, different people, different permissions.",
  },
  {
    id: "chat",
    label: "Chat",
    src: asset("dashboard-chat.webp"),
    w: 2000,
    h: 2910,
    tall: true,
    alt: "Team chat window on the Claude team room after a job posts its own completion.",
    note: "Three rooms: Claude, Cursor, and a shared room. A finished job posts in the voice of the persona who ran it.",
  },
  {
    id: "settings",
    label: "Settings",
    src: asset("dashboard-settings.webp"),
    w: 2000,
    h: 1170,
    alt: "Settings for appearance, Claude Code path, Opus model, Haiku cheap lane, and concurrency.",
    note: "Opus for the full jobs. Haiku for the cheap lane. Concurrency is a cap, not a reason to put two agents in one folder.",
  },
];

export const takeoffShots = [
  {
    id: "processing",
    label: "Processing",
    src: asset("takeoff-processing.webp"),
    w: 2000,
    h: 1170,
    alt: "AI Takeoff dashboard while a construction PDF is processing.",
    note: "The dashboard stays on this step until the stored result exists, then opens the report.",
  },
  {
    id: "main",
    label: "Main",
    src: asset("takeoff-main.webp"),
    w: 2000,
    h: 1170,
    alt: "Analysis report with every detected class drawn back onto a shoring plan, and the quantity panel beside it.",
    note: "Main draws every class at once. The panel is the bill of materials, not a second detection pass.",
  },
  {
    id: "frames",
    label: "Frames",
    src: asset("takeoff-frames.webp"),
    w: 2000,
    h: 1170,
    alt: "Frames layer: green boxes labeled with height and width on the drawing.",
    note: "A box is a bay, not one frame. The digits inside say how many physical frames of which height sit there.",
  },
  {
    id: "crossbars",
    label: "Crossbars",
    src: asset("takeoff-crossbars.webp"),
    w: 2000,
    h: 1170,
    alt: "Crossbars layer: diagonal braces colored by span across the bays.",
    note: "Span and frame height pick the crossbar. The color is a lookup, not a freehand mark.",
  },
  {
    id: "shores",
    label: "Shores",
    src: asset("takeoff-shores.webp"),
    w: 2000,
    h: 1170,
    alt: "Shores layer: red square shores and blue X shores marked on the plan.",
    note: "Blue X markers and red squares. Shores Type A is the blue count minus the red count.",
  },
  {
    id: "beams",
    label: "Beams",
    src: asset("takeoff-beams.webp"),
    w: 2000,
    h: 1170,
    alt: "Aluminum beams layer: rails recolored by length on the drawing.",
    note: "Parallel rails are paired to a nominal length, from 5 feet through 24 feet, including 10 foot 6.",
  },
  {
    id: "select",
    label: "Select",
    src: asset("takeoff-select.webp"),
    w: 2000,
    h: 1170,
    alt: "A selected aluminum beam on the drawing, labeled 9 foot alum beams.",
    note: "Click a mark and the viewer reads its class. Wood is left out of that list on purpose.",
  },
];

const moreAsset = (file) => `${process.env.PUBLIC_URL}/work/more/${file}`;

const sites = [
  ["em-landscape.webp", 4810, 16, "EM Landscape", "https://em-landscape.vercel.app"],
  ["morningstar-garage.webp", 3590, 12, "Morningstar Garage", "https://morningstar-garage.vercel.app"],
  ["bnc-builders.webp", 3728, 12, "BNC Builders", "https://new-bnc-builders.vercel.app"],
  ["nova.webp", 4278, 14, "Nova", "https://nova1-two.vercel.app"],
  ["tensui.webp", 6567, 21, "Tensui", "https://tensui-water.vercel.app"],
  ["teqneeq.webp", 3687, 12, "Teqneeq", "https://teqneeq-engagement.vercel.app"],
  ["sd-dumping.webp", 4006, 13, "SD Dumping Solutions", "https://www.sddumpingsolutions.com"],
];

export const moreWork = sites.map(([file, h, pan, title, url]) => ({
  title,
  url,
  src: moreAsset(file),
  w: 800,
  h,
  pan,
}));
