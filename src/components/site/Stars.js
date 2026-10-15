/**
 * Still starfield and occasional shooting stars, taken from Nova1.
 * One fixed layer under the page. The streaks are CSS only.
 */
const STARS = [
  { x: 6, y: 12, angle: 28, len: 170, travel: 22, dur: 3.6, delay: 0 },
  { x: 92, y: 22, angle: 152, len: 150, travel: 18, dur: 4.4, delay: 14.5 },
  { x: 14, y: 88, angle: -54, len: 160, travel: 20, dur: 4.0, delay: 28.2 },
];

export default function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      <div className="stars__field" />
      {STARS.map((star, index) => (
        <span
          key={index}
          className="stars__star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            "--len": `${star.len}px`,
            "--angle": `${star.angle}deg`,
            "--travel": `${star.travel}vw`,
            "--dur": `${star.dur}s`,
            "--delay": `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
