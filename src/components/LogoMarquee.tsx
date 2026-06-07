import appleLogo from "/apple_logo.svg";
import yaleLogo from "/yale_logo.svg";
import dukeLogo from "/duke_logo.svg";
import vanguardLogo from "/vanguard_logo.svg";
import kenshoLogo from "/kensho_logo.webp";
import ycLogo from "/YC-withname.webp";

// Each logo has a different aspect ratio / visual weight, so tweak `height`
// (in px) per-logo until the row looks balanced. Mobile scales these down
// proportionally via the --marquee-scale factor in App.css.
// Add an optional `label` to render the company name next to an icon-only mark.
const logos = [
  { src: yaleLogo, alt: "Yale University", height: 27 },
  { src: kenshoLogo, alt: "Kensho by S&P Global", height: 28 },
  { src: appleLogo, alt: "Apple", height: 28, label: "Apple" },
  { src: dukeLogo, alt: "Duke", height: 30 },
  { src: vanguardLogo, alt: "Vanguard", height: 22 },
  { src: ycLogo, alt: "Y Combinator", height: 30 },
];

function LogoMarquee() {
  // Duplicate the list so the track can loop seamlessly.
  const track = [...logos, ...logos];

  return (
    <section
      className="marquee"
      aria-label="Where our team has studied and worked"
    >
      <p className="marquee-label">Built by a team from</p>
      <div className="marquee-viewport">
        <div className="marquee-track">
          {track.map((logo, i) => (
            <div
              className="marquee-item"
              key={i}
              aria-hidden={i >= logos.length}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="marquee-logo"
                style={{
                  height: `calc(${logo.height}px * var(--marquee-scale, 1))`,
                }}
              />
              {logo.label && (
                <span className="marquee-wordmark">{logo.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoMarquee;
