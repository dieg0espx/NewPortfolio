import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Projects" },
  { href: "#record", label: "Work" },
  { href: "#education", label: "Education" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const ids = [...links.map((link) => link.href.slice(1)), "contact"];
    const mark = () => {
      const line = window.scrollY + 120;
      let current = "";
      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = `#${id}`;
      });
      setActive(current);
    };
    mark();
    window.addEventListener("scroll", mark, { passive: true });
    return () => window.removeEventListener("scroll", mark);
  }, []);

  return (
    <>
    <header className="site-nav fade-in" style={{ "--delay": "600ms" }}>
      <div className="nav-bar">
        <a className="logo" href="#top">
          <img
            className="avatar"
            src={`${process.env.PUBLIC_URL}/portrait.webp`}
            width="715"
            height="826"
            alt=""
          />
          Diego Espinosa
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? "is-active" : undefined}
              aria-current={active === link.href ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            className={active === "#contact" ? "nav-cta is-active" : "nav-cta"}
            href="#contact"
            aria-current={active === "#contact" ? "true" : undefined}
          >
            Contact
          </a>
        </nav>
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
    </header>
      <nav
        id="mobile-nav"
        className={open ? "nav-overlay open" : "nav-overlay"}
        aria-label="Mobile"
        hidden={!open}
      >
        <div className="nav-overlay-bar">
          <a className="logo" href="#top" onClick={() => setOpen(false)}>
            <img
              className="avatar"
              src={`${process.env.PUBLIC_URL}/portrait.webp`}
              width="715"
              height="826"
              alt=""
            />
            Diego Espinosa
          </a>
          <button type="button" className="menu-button" onClick={() => setOpen(false)}>
            <X size={22} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? "is-active" : undefined}
            aria-current={active === link.href ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          className={active === "#contact" ? "nav-cta is-active" : "nav-cta"}
          href="#contact"
          aria-current={active === "#contact" ? "true" : undefined}
          onClick={() => setOpen(false)}
        >
          Contact
        </a>
      </nav>
    </>
  );
}
