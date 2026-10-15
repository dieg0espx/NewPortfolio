import { ArrowRight, Sparkles } from "lucide-react";
import { AuroraText } from "../ui/aurora-text";

const stack = [
  { name: "Next.js", src: "nextjs.svg" },
  { name: "TypeScript", src: "typescript.svg" },
  { name: "React Native", src: "react-native.svg" },
  { name: "Node.js", src: "nodejs.svg" },
  { name: "Python", src: "python.svg" },
  { name: "FastAPI", src: "fastapi.svg" },
  { name: "Electron", src: "electron.svg" },
  { name: "OpenCV", src: "opencv.svg" },
  { name: "Postgres", src: "postgres.svg" },
  { name: "SQLite", src: "sqlite.svg" },
  { name: "AWS", src: "aws.svg" },
  { name: "Supabase", src: "supabase.svg" },
  { name: "Vercel", src: "vercel.svg" },
  { name: "Railway", src: "railway.svg" },
];

export default function Hero() {
  const row = [...stack, ...stack];

  return (
    <section className="hero" id="top">
      <a className="pill fade-in" href="#work" style={{ "--delay": "0ms" }}>
        <Sparkles size={14} strokeWidth={1.75} aria-hidden="true" />
        Open to AI engineering roles
        <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
      </a>
      <h1 className="display fade-in" style={{ "--delay": "200ms" }}>
        Diego Espinosa builds
        <br className="break-md" /> the systems that do <AuroraText>the work</AuroraText>.
      </h1>
      <p className="sub fade-in" style={{ "--delay": "400ms" }}>
        A desktop orchestrator runs coding agents across a portfolio of folders.
        <br className="break-md" /> A vision pipeline turns a construction drawing into a bill of materials.
      </p>
      <p className="hero-place fade-in" style={{ "--delay": "500ms" }}>
        Work is permitted. Family reunification.
        <br className="break-sm" /> Bocholt, Germany.
      </p>
      <div className="hero-frame fade-up" style={{ "--delay": "400ms" }}>
        <img
          className="hero-shot"
          src={`${process.env.PUBLIC_URL}/work/hero-devices.webp`}
          width="1280"
          height="542"
          alt="Agent Dashboard on a MacBook and AI Takeoff on a tablet, both running."
        />
      </div>
      <div className="logos">
        <div className="marquee" aria-label="Stack">
          <div className="marquee-track">
            {row.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className="stack-item"
                aria-hidden={index >= stack.length || undefined}
              >
                <img
                  className="stack-logo"
                  src={`${process.env.PUBLIC_URL}/stack/${item.src}`}
                  alt=""
                />
                <span className="stack-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
