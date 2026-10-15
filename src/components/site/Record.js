const roles = [
  {
    when: "05.2025 — present",
    title: "Senior Web Developer",
    meta: "Comcreate · San Diego · contract, remote · the main job",
    text: "Websites, product software, and the agent service that now runs across that portfolio. Scrum on the client work. Plan and Place, Camp Alegría, and ER Soccer Development shipped in this seat.",
  },
  {
    when: "07.2019 — present",
    title: "Full-Stack Developer",
    meta: "TTF Scaffolding · Surrey · part-time, about 15 hours a week · remote",
    text: "Parallel with Comcreate, and not a Comcreate client. The current focus is the AI takeoff. Before that: the company site, and a native time-and-attendance app. A personal code on a tablet clocks in and out, and the day closes into payroll.",
  },
  {
    when: "06.2024 — 12.2024",
    title: "App Developer",
    meta: "Advici.app · Vancouver · full-time, remote",
    text: "React Native and Node.js for property-insurance claims. The phone captures the property and the damage. The submission reaches the insurer as a structured form. In an emergency, such as a flood, the job can be dispatched to a contractor.",
  },
  {
    when: "08.2022 — 05.2024",
    title: "Web Developer, then Project Manager and COO",
    meta: "True Zenith Creative · Texas company · full-time, from Mérida",
    text: "Custom client sites, mostly WordPress, plus the integrations those sites needed. The company started a move to React. React stayed the smaller share of what shipped. As COO: hiring, interviews, and payroll, alongside delivery.",
  },
];

const schools = [
  {
    when: "01.2024 — 12.2024",
    title: "Diploma, International Business",
    meta: "Gastown Business College · Vancouver",
  },
  {
    when: "09.2019 — 09.2021",
    title: "Web and Mobile App Development",
    meta: "CICCC · Vancouver",
  },
  {
    when: "08.2017 — 02.2019",
    title: "Mechatronics engineering, studies not completed",
    meta: "Universidad Modelo · Mérida · about half the curriculum",
  },
];

const languages = [
  { label: "Spanish", value: "Native." },
  { label: "English", value: "Super fluent. I speak it every day." },
  { label: "German", value: "A1, already certified. Constantly learning." },
];

const tools = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Node.js",
  "Python",
  "FastAPI",
  "Electron",
  "OpenCV",
  "Postgres",
  "SQLite",
  "AWS",
  "Supabase",
  "Vercel",
  "Railway",
];

export default function Record() {
  return (
    <>
      <section className="section" id="record" aria-labelledby="record-title">
        <div className="wrap">
          <header className="record-head">
            <p className="eyebrow">2019 — present</p>
            <h2 id="record-title">Record</h2>
          </header>
          <ol className="rail">
            {roles.map((role) => (
              <li key={role.title} className={role.when.includes("present") ? "is-now" : undefined}>
                <span className="rail-mark" aria-hidden="true" />
                <article>
                  <p className="rail-when">{role.when}</p>
                  <h3>{role.title}</h3>
                  <ul className="rail-meta">
                    {role.meta.split(" · ").map((part) => (
                      <li key={part}>{part}</li>
                    ))}
                  </ul>
                  <p>{role.text}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="education" aria-labelledby="education-title">
        <div className="wrap">
          <header className="record-head">
            <h2 id="education-title">Education</h2>
          </header>
          <ol className="school-track">
            {schools.map((school, index) => (
              <li key={school.title}>
                <span className="school-index">{String(index + 1).padStart(2, "0")}</span>
                <p className="rail-when">{school.when}</p>
                <h3>{school.title}</h3>
                <p>{school.meta}</p>
              </li>
            ))}
          </ol>
          <p className="award">
            <span>2018</span>
            Second place, Concurso SumoBots, categoría Minis Sumo, at Tecnológico de Monterrey. During the mechatronics studies.
          </p>

          <header className="record-head lang-head">
            <h2>Languages</h2>
          </header>
          <div className="lang-row">
            {languages.map((language) => (
              <article key={language.label}>
                <h3>{language.label}</h3>
                <span
                  className="lang-meter"
                  style={{ "--level": language.label === "Spanish" ? "100%" : language.label === "English" ? "78%" : "22%" }}
                />
                <p>{language.value}</p>
              </article>
            ))}
          </div>

          <ul className="pills">
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
