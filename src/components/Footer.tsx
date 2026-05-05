import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="nav-gradient text-nav-foreground py-8 mt-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-80">© 2026 Loksewa Pro — Crafted with ❤️ by Dhiraj Shahi</p>
        <div className="flex gap-4 text-sm opacity-70">
          <a href="https://psc.gov.np" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">PSC Nepal</a>
          <a href="https://mocit.gov.np" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">MoCIT</a>
          <a href="https://nitc.gov.np" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">NITC</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
