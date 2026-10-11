import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import Approach from './components/Approach';
import Stack from './components/Stack';
import Education from './components/Education';
import Contact from './components/Contact';
import ProjectFrame from './components/ProjectFrame';
import projects from './data/projects';

function App() {
  // Lead the hero with the richest captured project.
  const lead = projects.find((p) => p.preview.desktop);

  return (
    <div className="min-h-screen bg-paper">
      <Nav />
      <main>
        <Hero projectCount={projects.length}>
          {lead && (
            <div className="mx-auto max-w-[1000px]">
              <ProjectFrame
                src={`${process.env.PUBLIC_URL}/projects/${lead.preview.desktop}`}
                alt={`Captured screenshot of the ${lead.name} website`}
                name={lead.name}
                variant="browser"
                accent="#0075de"
              />
            </div>
          )}
        </Hero>

        <Stack />
        <Work />
        <Approach />
        <Education />
      </main>
      <Contact />
    </div>
  );
}

export default App;
