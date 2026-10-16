import { useState } from "react";
import { Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { EMAIL, EMAILS, PHONES } from "../../data/site";

export default function Close() {
  const [status, setStatus] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAILS.map((item) => item.address).join("\n"));
      setStatus("Copied.");
    } catch {
      setStatus("Clipboard is blocked in this browser. The addresses are espinosa9de@gmail.com and espinosa9mx@gmail.com.");
    }
  }

  return (
    <>
      <section className="close" id="contact" aria-labelledby="contact-title">
        <div className="close-copy">
          <p className="eyebrow">Open to full-time roles</p>
          <h2 id="contact-title">Bocholt.</h2>
        </div>
        <ul className="hub">
          <li className="hub-card">
            <span className="hub-icon" aria-hidden="true">
              <Mail size={18} strokeWidth={1.75} />
            </span>
            <span className="hub-label">Email</span>
            <span className="hub-lines">
              {EMAILS.map((item) => (
                <a key={item.address} className="hub-value" href={`mailto:${item.address}`}>
                  <span className="hub-flag" aria-hidden="true">{item.flag}</span>
                  {item.address}
                </a>
              ))}
            </span>
            <button type="button" className="close-copy-btn" onClick={copyEmail}>
              <Copy size={14} strokeWidth={1.75} aria-hidden="true" />
              Copy
            </button>
          </li>
          <li className="hub-card">
            <span className="hub-icon" aria-hidden="true">
              <Phone size={18} strokeWidth={1.75} />
            </span>
            <span className="hub-label">Phone</span>
            <span className="hub-lines">
              {PHONES.map((phone) => (
                <a key={phone.href} className="hub-value" href={phone.href}>
                  <span className="hub-flag" aria-hidden="true">{phone.flag}</span>
                  {phone.label}
                </a>
              ))}
            </span>
          </li>
          <li>
            <a className="hub-card" href="https://www.linkedin.com/in/devdiegoe/" target="_blank" rel="noreferrer">
              <span className="hub-icon" aria-hidden="true">
                <Linkedin size={18} strokeWidth={1.75} />
              </span>
              <span className="hub-label">LinkedIn</span>
              <span className="hub-value">devdiegoe</span>
            </a>
          </li>
          <li>
            <a className="hub-card" href="https://github.com/dieg0espx" target="_blank" rel="noreferrer">
              <span className="hub-icon" aria-hidden="true">
                <Github size={18} strokeWidth={1.75} />
              </span>
              <span className="hub-label">GitHub</span>
              <span className="hub-value">dieg0espx</span>
            </a>
          </li>
        </ul>
        <p className="status" role="status">
          {status}
        </p>
      </section>
      <footer className="site-footer">
        <div className="footer-lockup">
          <a className="footer-mark" href="#top">
            <img
              className="footer-portrait"
              src={`${process.env.PUBLIC_URL}/portrait.webp`}
              width="715"
              height="826"
              alt="Diego Espinosa"
            />
            <span className="footer-copy">
              <span className="display footer-name">
                Diego
                <br />
                Espinosa
              </span>
              <span className="footer-line">I build the systems that do the work.</span>
            </span>
          </a>
        </div>
        <nav className="footer-rail" aria-label="Footer">
          <a href="#work">Plan &amp; Place</a>
          <a href="#agent-dashboard">Agent Dashboard</a>
          <a href="#takeoff">AI Takeoff</a>
          <a href="#record">Record</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href="https://www.linkedin.com/in/devdiegoe/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/dieg0espx" target="_blank" rel="noreferrer">GitHub</a>
          <a href="tel:+4915213451741">+49 152 13451741</a>
        </nav>
        <p className="footer-note">Work is permitted. Family reunification. Bocholt, Germany.</p>
      </footer>
    </>
  );
}
