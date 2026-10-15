import { moreWork } from "../../data/site";

function Cards({ copy }) {
  return moreWork.map((site) => (
    <div
      key={`${site.title}${copy ? "-copy" : ""}`}
      className="reel-card"
      aria-hidden={copy ? true : undefined}
    >
      <span className="reel-shot">
        <img
          src={site.src}
          alt={copy ? "" : `${site.title} website`}
          width={site.w}
          height={site.h}
          style={{ "--pan": `${site.pan}s` }}
          decoding="async"
        />
      </span>
    </div>
  ));
}

export default function MoreWork() {
  return (
    <section className="more" aria-labelledby="more-work">
      <div className="wrap more-head">
        <h2 id="more-work">More work</h2>
      </div>
      <div className="wrap">
        <div className="reel">
          <div className="reel-track">
            <Cards />
            <Cards copy />
          </div>
        </div>
      </div>
    </section>
  );
}
