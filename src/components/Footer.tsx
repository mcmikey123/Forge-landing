import { BrandMark } from "./icons";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot-grid">
        <div className="foot-left">
          <a className="brand" href="#top">
            <BrandMark />
            Forgept
          </a>
        </div>
        <div className="foot-mid">Software that adapts to you, not the other way round.</div>
        <div className="foot-right">
          A product of <a href="#">Luma Digital</a> · © 2026
        </div>
      </div>
    </footer>
  );
}
