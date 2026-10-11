import React from 'react';
import css from '../images/languages/css.png';
import firebase from '../images/languages/firebase.png';
import html from '../images/languages/html.png';
import js from '../images/languages/js.png';
import mysql from '../images/languages/mysql.png';
import node from '../images/languages/node.png';
import php from '../images/languages/php.png';
import python from '../images/languages/python.png';
import reactImg from '../images/languages/react.png';
import supabase from '../images/languages/supabase.png';
import swift from '../images/languages/swift.png';
import wordpress from '../images/languages/wordpress.png';

// Carried over from the previous site's technology wall.
const TECH = [
  { src: html, name: 'HTML' },
  { src: css, name: 'CSS' },
  { src: js, name: 'JavaScript' },
  { src: reactImg, name: 'React' },
  { src: node, name: 'Node.js' },
  { src: php, name: 'PHP' },
  { src: python, name: 'Python' },
  { src: mysql, name: 'MySQL' },
  { src: supabase, name: 'Supabase' },
  { src: firebase, name: 'Firebase' },
  { src: swift, name: 'Swift' },
  { src: wordpress, name: 'WordPress' },
];

/** Logo wall — logos are treated as typography: greyscale, no borders, no cards. */
function Stack() {
  return (
    <section id="stack" className="border-y border-hairline bg-white py-section">
      <div className="section-shell">
        <p className="text-center text-caption uppercase tracking-[0.12px] text-black/40">
          Building with expertise in
        </p>
        <ul className="mx-auto mt-10 grid max-w-[1100px] grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
          {TECH.map((t) => (
            <li key={t.name} className="flex flex-col items-center gap-3">
              <img
                src={t.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-10 w-auto object-contain opacity-60 grayscale transition duration-200 ease-out hover:opacity-100 hover:grayscale-0"
              />
              <span className="text-caption text-black/60">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Stack;
