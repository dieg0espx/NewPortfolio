'use client';

import { useState } from 'react';

/**
 * A contact form with no backend behind it.
 *
 * The site is a static export, so there is nowhere to POST. Rather than pretend
 * — a fake success message would be a lie, and a dead POST loses the message —
 * this composes a mailto: with the fields filled in and hands it to the user's
 * mail client. What the button says is exactly what happens.
 */
const BUDGETS = ['Not sure yet', 'Under $5k', '$5k – $15k', '$15k+'];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [detail, setDetail] = useState('');

  const ready = name.trim() && detail.trim();

  const href = (() => {
    const subject = `Project enquiry${name.trim() ? ` from ${name.trim()}` : ''}`;
    const body = [
      `Name: ${name.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      `Budget: ${budget}`,
      '',
      detail.trim(),
    ]
      .filter((l) => l !== null)
      .join('\n');
    return `mailto:espinosa9mx@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  })();

  const field =
    'w-full rounded-buttons bg-white px-3.5 py-2.5 text-body text-ink placeholder:text-ink/30 transition-colors duration-200';

  return (
    <form
      className="card p-7"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) window.location.href = href;
      }}
    >
      <p className="eyebrow">Tell me about it</p>
      <h2 className="mt-3 text-heading-sm font-semibold text-ink/95">Start a project</h2>

      <div className="mt-6 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-body-sm font-medium text-ink/70">Name</span>
            <input
              className={field}
              style={{ border: '1px solid var(--hairline-strong)' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-body-sm font-medium text-ink/70">Email</span>
            <input
              type="email"
              className={field}
              style={{ border: '1px solid var(--hairline-strong)' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </label>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-body-sm font-medium text-ink/70">Rough budget</legend>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                aria-pressed={budget === b}
                className={`rounded-full px-3.5 py-1.5 text-body-sm font-medium transition-colors duration-200 ${
                  budget === b ? 'bg-ink text-white' : 'bg-paper text-ink/60 hover:text-ink'
                }`}
                style={budget === b ? undefined : { border: '1px solid var(--hairline)' }}
              >
                {b}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-1.5">
          <span className="text-body-sm font-medium text-ink/70">What are you building?</span>
          <textarea
            className={`${field} min-h-[120px] resize-y`}
            style={{ border: '1px solid var(--hairline-strong)' }}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="A booking site for a rental business, an admin dashboard, a rebuild of something that already exists…"
            required
          />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto" disabled={!ready}>
        Open this in my email app
        <span aria-hidden="true">→</span>
      </button>

      <p className="mt-3 text-caption leading-[1.5] text-ink/40">
        This fills in an email for you to send — nothing is submitted to a server, and no data
        leaves your device until you send it.
      </p>
    </form>
  );
}
