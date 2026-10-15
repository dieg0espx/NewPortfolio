import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ShineBorder } from "../ui/shine-border";

export default function Study({ id, title, lede, body, shots, facts, links, stack = [], terminal = null }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState({});
  const shot = shots[index];

  useEffect(() => {
    if (reduce || shots.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % shots.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [reduce, shots.length, index]);

  function move(event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + shots.length) % shots.length;
    setIndex(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  return (
    <section className="section study" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap study-split">
        <div className="study-stage">
          <div className="tabs" role="tablist" aria-label={`${title} screens`} onKeyDown={move}>
            {shots.map((item, itemIndex) => (
              <button
                key={item.id}
                id={`${id}-tab-${itemIndex}`}
                type="button"
                className="tab"
                role="tab"
                aria-selected={itemIndex === index}
                aria-controls={`${id}-panel`}
                tabIndex={itemIndex === index ? 0 : -1}
                onClick={() => setIndex(itemIndex)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="shot" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${index}`}>
            {shots.map((item, itemIndex) =>
              failed[item.src] ? null : (
                <img
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  width={item.w}
                  height={item.h}
                  className={itemIndex === index ? "is-on" : undefined}
                  aria-hidden={itemIndex !== index}
                  onError={() => setFailed((current) => ({ ...current, [item.src]: true }))}
                />
              )
            )}
            {failed[shot.src] ? (
              <p className="shot-fallback">This capture did not load. The notes under the controls are the record.</p>
            ) : null}
            <ShineBorder
              shineColor={["var(--glow)", "var(--foreground)", "var(--silver)"]}
              aria-hidden="true"
            />
          </div>
          {stack.length ? (
            <ul className="shot-stack" aria-label={`${title} stack`}>
              {stack.map((item) => (
                <li key={item.src}>
                  <img
                    src={`${process.env.PUBLIC_URL}/stack/${item.src}`}
                    alt=""
                    width="48"
                    height="48"
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="shot-note">{shot.note}</p>
        </div>
        <div className="study-scroll">
          <h2 id={`${id}-title`}>{title}</h2>
          <p className="lede">{lede}</p>
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {terminal ? <div className="study-terminal">{terminal}</div> : null}
          <dl className="spec">
            {facts.map((fact) => (
              <div className="spec-card" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          {links?.length ? (
            <div className="link-row">
              {links.map((link) => (
                <a key={link.href} className="btn-outline" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
