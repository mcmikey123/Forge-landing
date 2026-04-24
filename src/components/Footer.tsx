import { BrandMark, Wordmark } from "./icons";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot-grid">
        <div className="foot-left">
          <a className="brand" href="#top">
            <BrandMark />
            <Wordmark />
          </a>
        </div>
        <div className="foot-mid">Personal trainer software built around how you coach.</div>
        <div className="foot-right">
          A product of <a href="#">Luma Digital</a> · © 2026
        </div>
      </div>
    </footer>
  );
}
