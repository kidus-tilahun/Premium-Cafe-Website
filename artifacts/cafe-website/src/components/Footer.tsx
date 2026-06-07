import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0D] pt-16 md:pt-24 pb-12">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="border-t border-white/[0.05] pt-10 md:pt-16 mb-12 md:mb-20 overflow-hidden">
          <p className="font-serif font-light text-white/[0.08] leading-none tracking-tight select-none text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem]">
            Driftwood.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-20">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5 font-sans">About</p>
            <p className="text-sm text-white/45 font-sans font-light leading-relaxed">
              A quiet, unhurried space for coffee obsessives in the heart of Downtown Austin.
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5 font-sans">Hours</p>
            <ul className="space-y-3 text-sm text-white/45 font-sans font-light">
              <li>Mon &ndash; Fri: 7am &ndash; 7pm</li>
              <li>Sat &ndash; Sun: 8am &ndash; 6pm</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5 font-sans">Location</p>
            <p className="text-sm text-white/45 font-sans font-light leading-relaxed mb-3">
              4th &amp; Main St<br />Downtown Austin, TX
            </p>
            <a href="#" className="text-[10px] tracking-[0.2em] uppercase text-[#C05A46]/60 hover:text-[#C05A46] transition-colors font-sans">
              Get Directions
            </a>
            <p className="text-xs text-white/22 font-sans font-light mt-4 italic">
              Complimentary 2-hour validated parking behind the building.
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5 font-sans">Follow</p>
            <div className="flex gap-5">
              <a href="#" data-testid="link-social-instagram" className="text-white/28 hover:text-[#C05A46] transition-colors duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" data-testid="link-social-twitter" className="text-white/28 hover:text-[#C05A46] transition-colors duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/18 font-sans">
            &copy; {new Date().getFullYear()} Driftwood Coffee. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/12 font-sans">
            Specialty Coffee &amp; Pastries &mdash; Austin, TX
          </p>
        </div>
      </div>
    </footer>
  );
}
