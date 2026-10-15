import { AnimatedSpan, Terminal, TypingAnimation } from "./components/ui/terminal";
import Stars from "./components/site/Stars";
import Nav from "./components/site/Nav";
import Hero from "./components/site/Hero";
import Study from "./components/site/Study";
import MoreWork from "./components/site/MoreWork";
import Record from "./components/site/Record";
import Close from "./components/site/Close";
import { dashboardShots, takeoffShots } from "./data/site";

function App() {
  return (
    <>
      <Stars />
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Study
          id="work"
          title="Agent Dashboard"
          lede="Queue the work, start it, leave. Claude runs review, maintenance, and recurrent tasks. The app opens the pull request."
          shots={dashboardShots}
          stack={[
            { name: "Electron", src: "electron.svg" },
            { name: "React", src: "react.svg" },
            { name: "TypeScript", src: "typescript.svg" },
            { name: "SQLite", src: "sqlite.svg" },
            { name: "Supabase", src: "supabase.svg" },
          ]}
          body={[
            "A Mac app I designed and run across many local codebases. A lot of it is autonomous code review, maintenance, and recurrent tasks. Claude Code executes every job. Cursor only queues, edits, and pauses. One agent per folder.",
            "After a commit, the app pushes and writes a ship card. The worker does not push.",
          ]}
          terminal={
            <Terminal className="max-w-none">
              <TypingAnimation>{"$ orchestrator start --project agent-dashboard"}</TypingAnimation>
              <AnimatedSpan className="text-emerald-400">✔ One agent in this folder.</AnimatedSpan>
              <AnimatedSpan className="text-emerald-400">✔ Claude Code running the job.</AnimatedSpan>
              <AnimatedSpan className="text-emerald-400">✔ Cursor can queue and pause. It does not run it.</AnimatedSpan>
              <TypingAnimation>Ship card written. Pull request opened.</TypingAnimation>
            </Terminal>
          }
          facts={[
            { label: "Shell", value: "Electron, React, TypeScript, SQLite. One terminal per project." },
            { label: "Workers", value: "Local Claude CLI. Opus by default, Haiku for small edits." },
            { label: "Manager", value: "Cursor. Queue and pause only. It does not run the jobs." },
            { label: "After a run", value: "Ship card, cost record, push, one pull request." },
            { label: "Also wired", value: "Monday.com, Google and Meta ads, Supabase. Scoped per project." },
          ]}
        />
        <Study
          id="takeoff"
          title="AI Takeoff"
          lede="A shoring plan goes in as a PDF. Counted hardware comes back in 3 minutes. The same sheet used to take eight hours."
          shots={takeoffShots}
          stack={[
            { name: "Next.js", src: "nextjs.svg" },
            { name: "React", src: "react.svg" },
            { name: "TypeScript", src: "typescript.svg" },
            { name: "Python", src: "python.svg" },
            { name: "FastAPI", src: "fastapi.svg" },
            { name: "OpenCV", src: "opencv.svg" },
            { name: "Vercel", src: "vercel.svg" },
            { name: "Railway", src: "railway.svg" },
          ]}
          body={[
            "Built for TTF Scaffolding. Six microservices split the job. Shape detection and object detection run in parallel on the same sheet.",
            "Both results go into one model, so the next drawing is easier to recognize. The more sheets go through, the smarter the model gets.",
            "Next.js handles the upload, the report, and corrections. Gemini only guesses a frame spec and rewrites OCR. The quantities do not depend on it. A correction changes the overlay. It does not rerun detection.",
          ]}
          terminal={
            <Terminal className="max-w-none">
              <TypingAnimation>{"$ takeoff run --sheet shoring-plan.pdf"}</TypingAnimation>
              <AnimatedSpan className="text-emerald-400">✔ Shape detection on the sheet.</AnimatedSpan>
              <AnimatedSpan className="text-emerald-400">✔ Object detection on the same marks.</AnimatedSpan>
              <AnimatedSpan className="text-emerald-400">✔ Both results added to the model.</AnimatedSpan>
              <TypingAnimation>138 elements. The next sheet will be easier.</TypingAnimation>
            </Terminal>
          }
          facts={[
            { label: "Dashboard", value: "Next.js. Upload, history, report, PDF export, corrections." },
            { label: "Pipeline", value: "Six Python microservices on FastAPI. The two detections run in parallel. One drawing at a time." },
            { label: "Models", value: "Shape detection and object detection feed one model. More drawings make recognition easier. Gemini only covers a frame spec and an OCR rewrite." },
            { label: "Storage", value: "Finished takeoffs in MySQL, on the company host." },
            { label: "Live", value: "Dashboard on Vercel. Gateway and the other services on Railway." },
          ]}
        />
        <MoreWork />
        <Record />
        <Close />
      </main>
    </>
  );
}

export default App;
