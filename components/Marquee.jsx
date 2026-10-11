import Image from 'next/image';

const STACK = [
  ['react', 'React'],
  ['js', 'JavaScript'],
  ['node', 'Node.js'],
  ['supabase', 'Supabase'],
  ['python', 'Python'],
  ['php', 'PHP'],
  ['mysql', 'MySQL'],
  ['firebase', 'Firebase'],
  ['html', 'HTML'],
  ['css', 'CSS'],
  ['swift', 'Swift'],
  ['wordpress', 'WordPress'],
];

/**
 * Logo wall as an infinite marquee. Logos are treated as typography:
 * desaturated, no cards, no borders. Duplicated once so the -50% loop is seamless.
 */
export default function Marquee() {
  const row = [...STACK, ...STACK];

  return (
    <section className="border-y bg-white py-14" aria-label="Technologies">
      <p className="eyebrow shell text-center">Building with</p>
      <div className="mask-edges mt-9 overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-14 pr-14 motion-reduce:animate-none">
          {row.map(([file, label], i) => (
            <li key={`${file}-${i}`} className="flex shrink-0 items-center gap-3">
              <Image
                src={`/stack/${file}.png`}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="h-7 w-7 object-contain opacity-50 grayscale"
              />
              <span className="whitespace-nowrap text-body-sm font-medium text-ink/55">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
