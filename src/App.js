import { AnimatedSpan, Terminal, TypingAnimation } from "./components/ui/terminal";
import Stars from "./components/site/Stars";
import Nav from "./components/site/Nav";
import Hero from "./components/site/Hero";
import Study from "./components/site/Study";
import MoreWork from "./components/site/MoreWork";
import Record from "./components/site/Record";
import Close from "./components/site/Close";
import { placeShots, dashboardShots, takeoffShots } from "./data/site";

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
          title="Plan & Place"
          ratio={[2420, 1668]}
          lede="A contractor photographs the kitchen the client wants gone, answers the intake beside them, draws the room to scale, and hands back a photoreal concept of the same space before leaving the driveway."
          shots={placeShots}
          stack={[
            { name: "React Native", src: "react-native.svg" },
            { name: "TypeScript", src: "typescript.svg" },
            { name: "Gemini", src: "gemini.svg" },
          ]}
          body={[
            "An iPad app for kitchen and bathroom remodels and ADUs. The intake is a questionnaire, a set of photos, and a dimensioned floor plan the contractor draws on the spot, all of it autosaved and safe to interrupt.",
            "The plan is not decoration. Room geometry, fixture positions, and per-wall materials are sent to Gemini as structured text, and each of the four camera angles is computed from the shape of the room the contractor drew.",
            "Nothing leaves the device unless it is ticked. Projects, photos, and concepts live in on-device storage, there is no backend and no analytics, and deleting a project deletes its files. Personal fields never enter a prompt.",
          ]}
          terminal={
            <Terminal className="max-w-none">
              <TypingAnimation>{"$ generate --project kitchen-remodel --plan attached"}</TypingAnimation>
              <AnimatedSpan className="text-emerald-400">✔ 1 photo selected. Consent on record.</AnimatedSpan>
              <AnimatedSpan className="text-emerald-400">✔ Plan sent as geometry. 4 cameras derived.</AnimatedSpan>
              <AnimatedSpan className="text-emerald-400">✔ Checks passed: view count, camera distinctness, plan unchanged.</AnimatedSpan>
              <TypingAnimation>4 concepts. Measure from the plan, never the render.</TypingAnimation>
            </Terminal>
          }
          facts={[
            { label: "App", value: "React Native and TypeScript, no Expo. Built for iPad, used on site." },
            { label: "Intake", value: "Eight steps per project type. Autosaves on every keystroke and survives being interrupted." },
            { label: "Plan editor", value: "SVG, millimetres under the hood, shown in mm, cm, m, ft or in. Any rectilinear room, snapping, undo, live validation." },
            { label: "Concepts", value: "Gemini image models. Four views a run. Remodel mockup, ADU exterior, ADU interior. Revisions never overwrite the original." },
            { label: "Storage", value: "On device only. No backend, no analytics. Deleting a project deletes its files." },
          ]}
        />
        <Study
          id="agent-dashboard"
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
