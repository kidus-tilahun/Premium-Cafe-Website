import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Twitter, MapPin } from "lucide-react";

const TESTIMONIALS = [
  { quote: "The best pour-over I've had outside of Tokyo. Driftwood is a destination.", author: "Maria T." },
  { quote: "The pastries alone are worth the trip. The croissant is transcendent.", author: "James K." },
  { quote: "Quiet, intentional, and delicious. My favorite office away from the office.", author: "Priya S." },
  { quote: "Single-origin Ethiopian was a revelation. The staff clearly love what they do.", author: "Chris M." },
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const [reserveEmail, setReserveEmail] = useState("");
  const [reserveStatus, setReserveStatus] = useState<"idle" | "success">("idle");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (reserveEmail) {
      setReserveStatus("success");
      setReserveEmail("");
    }
  };

  return (
    <main className="w-full overflow-x-hidden bg-[#F9F6F0] text-[#1A1A1A]">

      {/* ─── Section 1: Hero ─── */}
      <section className="relative w-full h-[100dvh] flex flex-col justify-end pb-20 md:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
        <div className="absolute inset-0 mix-blend-multiply bg-[#1A1A1A]/20" />

        <div className="absolute top-0 left-0 right-0 py-5 px-8 md:px-16 flex justify-between items-center z-20">
          <span data-testid="utility-hours" className="text-[10px] tracking-[0.3em] uppercase text-white/55 font-sans">
            Open Until 7 PM
          </span>
          <span data-testid="utility-location" className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/55 font-sans">
            <MapPin className="w-3 h-3" /> 4th &amp; Main St, Austin TX
          </span>
        </div>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p variants={reveal} className="text-[10px] tracking-[0.35em] uppercase text-white/45 mb-8 font-sans">
              Downtown Austin, Texas
            </motion.p>
            <motion.h1
              variants={reveal}
              className="font-serif font-light text-white leading-[0.92] tracking-tight mb-10"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9.5rem)" }}
            >
              Specialty Coffee<br />
              <span className="italic">&amp; House-Baked</span><br />
              Pastries.
            </motion.h1>
            <motion.p variants={reveal} className="text-sm text-white/55 font-sans font-light tracking-wide mb-12 max-w-sm">
              Sourced from the world&apos;s finest small farms.<br />Crafted with intention.
            </motion.p>
            <motion.div variants={reveal} className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <motion.span
                  whileHover={{ letterSpacing: "0.12em" }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center justify-center bg-[#C05A46] text-white px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-medium cursor-pointer"
                  style={{ borderRadius: 0 }}
                  data-testid="link-order-now"
                >
                  Order Online Now
                </motion.span>
              </Link>
              <Link href="/menu">
                <motion.span
                  whileHover={{ letterSpacing: "0.12em", backgroundColor: "rgba(255,255,255,0.08)" }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center justify-center border border-white/30 text-white px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-medium cursor-pointer"
                  style={{ borderRadius: 0 }}
                  data-testid="link-view-menu"
                >
                  View Menu &amp; Hours
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Editorial Philosophy ─── */}
      <section className="py-40 bg-[#F9F6F0]">
        <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="col-span-12 md:col-span-5"
            >
              <motion.p variants={reveal} className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-8 font-sans">
                Our Philosophy
              </motion.p>
              <motion.h2
                variants={reveal}
                className="font-serif font-light leading-[0.93] tracking-tight text-[#1A1A1A] mb-10"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
              >
                A quiet place<br />to think<br /><span className="italic text-neutral-400">clearly.</span>
              </motion.h2>
              <motion.p variants={reveal} className="text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-xs mb-10">
                We designed every corner of Driftwood with one question: what does it feel like to finally slow down? The coffee is the answer. So is the silence.
              </motion.p>
              <motion.div variants={reveal}>
                <Link href="/menu">
                  <motion.span
                    whileHover={{ letterSpacing: "0.14em" }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase font-sans text-[#C05A46] cursor-pointer"
                    data-testid="link-explore-menu"
                  >
                    Explore The Menu <ArrowRight className="w-3.5 h-3.5" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="col-span-12 md:col-span-6 md:col-start-7 aspect-[3/4] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80"
                alt="Driftwood interior"
                className="w-full h-full object-cover"
                style={{ mixBlendMode: "multiply" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: The Reserve List ─── */}
      <section className="w-full py-40 bg-[#0D0D0D] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, #C05A46 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C05A46 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="flex flex-col items-start"
          >
            <motion.p variants={reveal} className="text-[10px] tracking-[0.35em] uppercase text-[#C05A46]/65 mb-12 font-sans">
              Membership
            </motion.p>
            <motion.h2
              variants={reveal}
              className="font-serif font-light text-white leading-[0.93] tracking-tight mb-12"
              style={{ fontSize: "clamp(2.8rem, 7vw, 7.5rem)" }}
            >
              Become a member<br />of the<br />
              <span className="italic text-white/65">Reserve List.</span>
            </motion.h2>
            <motion.p variants={reveal} className="text-sm text-white/38 font-sans font-light leading-relaxed max-w-md mb-16">
              Receive an invitation for a complimentary single-origin pour-over on your first visit,
              alongside exclusive small-batch drops before they reach the bar.
            </motion.p>

            {reserveStatus === "success" ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                data-testid="msg-reserve-success"
                className="font-serif italic text-2xl text-[#C05A46]"
              >
                You&apos;re on the list.
              </motion.p>
            ) : (
              <motion.form
                variants={reveal}
                onSubmit={handleJoin}
                className="flex items-end gap-6 w-full max-w-lg"
              >
                <div className="relative flex-1 group">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={reserveEmail}
                    onChange={(e) => setReserveEmail(e.target.value)}
                    data-testid="input-reserve-email"
                    className="w-full bg-transparent border-0 border-b border-white/18 py-4 text-white placeholder:text-white/28 text-sm font-sans font-light tracking-wide focus:outline-none focus:ring-0 transition-colors peer"
                    style={{ borderRadius: 0 }}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-[#C05A46] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                <motion.button
                  type="submit"
                  data-testid="btn-reserve-submit"
                  whileHover={{ gap: "1.2rem", opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 text-[#C05A46] text-xs tracking-[0.25em] uppercase font-sans pb-4 border-b border-transparent"
                >
                  Join <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Testimonials ─── */}
      <section className="w-full py-40 bg-[#121212]">
        <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="mb-20"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-6 font-sans">Guest Experience</p>
            <h2
              className="font-serif font-light text-white leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
            >
              What Our<br /><span className="italic text-white/45">Guests Say.</span>
            </h2>
          </motion.div>

          <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory mb-20">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                className="snap-center shrink-0 w-[300px] md:w-[360px] p-10 border border-white/[0.05] bg-white/[0.02] backdrop-blur-md flex flex-col justify-between"
                style={{ borderRadius: 0 }}
              >
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => <span key={s} className="text-[#C05A46] text-sm">&#9733;</span>)}
                </div>
                <p className="font-serif font-light italic text-white/75 text-lg leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/28 font-sans">&mdash; {t.author}</p>
              </motion.div>
            ))}
          </div>

          {/* Events CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            className="border-t border-white/[0.06] pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          >
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4 font-sans">Private Hire</p>
              <h3
                className="font-serif font-light text-white leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)" }}
              >
                Host your next event<br />
                <span className="italic text-white/45">at Driftwood.</span>
              </h3>
            </div>
            <Link href="/events">
              <motion.span
                whileHover={{ letterSpacing: "0.14em" }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-3 bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-10 py-4 text-[10px] tracking-[0.22em] uppercase font-sans cursor-pointer transition-colors"
                style={{ borderRadius: 0 }}
                data-testid="link-events-cta"
              >
                Inquire Now <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="w-full bg-[#0D0D0D] pt-24 pb-12">
        <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="border-t border-white/[0.05] pt-16 mb-20">
            <p
              className="font-serif font-light text-white/08 leading-none tracking-tight select-none"
              style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}
            >
              Driftwood.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
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
    </main>
  );
}
