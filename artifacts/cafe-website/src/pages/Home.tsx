import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Instagram, Twitter, MapPin } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const MENU_CATEGORIES = [
  {
    name: "Coffee",
    items: [
      { id: "c1", name: "Single Origin Pour-Over", price: 6 },
      { id: "c2", name: "Oat Milk Latte", price: 7 },
      { id: "c3", name: "Espresso", price: 4 },
      { id: "c4", name: "Cortado", price: 5 },
      { id: "c5", name: "Cold Brew", price: 5 },
    ],
  },
  {
    name: "Tea",
    items: [
      { id: "t1", name: "Matcha Latte", price: 7 },
      { id: "t2", name: "Earl Grey", price: 4 },
      { id: "t3", name: "Chamomile", price: 4 },
      { id: "t4", name: "Iced Hibiscus", price: 5 },
    ],
  },
  {
    name: "House Pastries",
    items: [
      { id: "p1", name: "Butter Croissant", price: 5 },
      { id: "p2", name: "Almond Croissant", price: 6 },
      { id: "p3", name: "Morning Bun", price: 5 },
      { id: "p4", name: "Cardamom Knot", price: 5 },
    ],
  },
];

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

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string; price: number } | null>(null);
  const [reserveEmail, setReserveEmail] = useState("");
  const [reserveStatus, setReserveStatus] = useState<"idle" | "success">("idle");

  const handleJoinReserve = (e: React.FormEvent) => {
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
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80')" }}
        />
        {/* Multi-layered overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
        <div className="absolute inset-0 mix-blend-multiply bg-[#1A1A1A]/20" />

        {/* Utility bar */}
        <div className="absolute top-0 left-0 right-0 py-5 px-8 md:px-16 flex justify-between items-center z-20">
          <span
            data-testid="utility-hours"
            className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-sans"
          >
            Open Until 7 PM
          </span>
          <span
            data-testid="utility-location"
            className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/60 font-sans"
          >
            <MapPin className="w-3 h-3" />
            4th &amp; Main St, Austin TX
          </span>
        </div>

        {/* Hero content — bottom-left editorial layout */}
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-8 font-sans"
          >
            Downtown Austin, Texas
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
            className="font-serif font-light text-white leading-[0.92] tracking-tight mb-10"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9.5rem)" }}
          >
            Specialty Coffee<br />
            <span className="italic">&amp; House-Baked</span><br />
            Pastries.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-sm text-white/60 font-sans font-light tracking-wide mb-12 max-w-sm"
          >
            Sourced from the world&apos;s finest small farms.<br />Crafted with intention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#menu"
              data-testid="link-order-now"
              whileHover={{ letterSpacing: "0.12em", backgroundColor: "rgba(192,90,70,1)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-flex items-center justify-center bg-[#C05A46] text-white px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-medium"
              style={{ borderRadius: 0 }}
            >
              Order Online Now
            </motion.a>
            <motion.a
              href="#menu"
              data-testid="link-view-menu"
              whileHover={{ letterSpacing: "0.12em", backgroundColor: "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-flex items-center justify-center border border-white/30 text-white px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-medium"
              style={{ borderRadius: 0 }}
            >
              View Menu &amp; Hours
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Menu & Ordering ─── */}
      <section id="menu" className="w-full py-40 bg-[#F9F6F0]">
        <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">

          {/* Asymmetric header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="grid grid-cols-12 mb-24"
          >
            <div className="col-span-12 md:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-6 font-sans">Our Offerings</p>
              <h2
                className="font-serif font-light leading-[0.93] tracking-tight text-[#1A1A1A]"
                style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
              >
                The<br /><span className="italic">Menu.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-7 flex items-end">
              <p className="text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-xs">
                Each item is a deliberate decision. Nothing on this menu exists by accident.
              </p>
            </div>
          </motion.div>

          {/* Editorial category rows */}
          {MENU_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="mb-20"
            >
              {/* Category divider row */}
              <div className="grid grid-cols-12 items-baseline border-t border-[#1A1A1A]/10 pt-8 mb-10">
                <motion.p
                  variants={reveal}
                  className="col-span-12 md:col-span-3 text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-sans mb-4 md:mb-0"
                >
                  {String(i + 1).padStart(2, "0")} / {cat.name}
                </motion.p>
                <div className="col-span-12 md:col-span-9">
                  <ul className="space-y-0">
                    {cat.items.map((item) => (
                      <motion.li key={item.id} variants={reveal}>
                        <button
                          onClick={() => setSelectedItem(item)}
                          data-testid={`btn-menu-item-${item.id}`}
                          className="w-full text-left group grid grid-cols-8 items-baseline py-5 border-b border-[#1A1A1A]/08 hover:border-[#C05A46]/40 transition-colors duration-300"
                        >
                          <span
                            className="col-span-6 font-serif font-light text-[#1A1A1A] group-hover:text-[#C05A46] transition-colors duration-300"
                            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
                          >
                            {item.name}
                          </span>
                          <span className="col-span-2 text-right text-sm text-neutral-400 font-sans font-light tracking-wide">
                            ${item.price}.00
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Section 3: The Reserve List ─── */}
      <section className="w-full py-40 bg-[#0D0D0D] relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 80%, #C05A46 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C05A46 0%, transparent 50%)"
          }}
        />
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer}
            className="flex flex-col items-start"
          >
            <motion.p
              variants={reveal}
              className="text-[10px] tracking-[0.35em] uppercase text-[#C05A46]/70 mb-12 font-sans"
            >
              Membership
            </motion.p>

            <motion.h2
              variants={reveal}
              className="font-serif font-light text-white leading-[0.93] tracking-tight mb-12"
              style={{ fontSize: "clamp(2.8rem, 7vw, 7.5rem)" }}
            >
              Become a member<br />of the<br />
              <span className="italic text-white/70">Reserve List.</span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="text-sm text-white/40 font-sans font-light leading-relaxed max-w-md mb-16"
            >
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
                onSubmit={handleJoinReserve}
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
                    className="w-full bg-transparent border-0 border-b border-white/20 py-4 text-white placeholder:text-white/30 text-sm font-sans font-light tracking-wide focus:outline-none focus:ring-0 transition-colors peer"
                    style={{ borderRadius: 0 }}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-[#C05A46] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                <motion.button
                  type="submit"
                  data-testid="btn-reserve-submit"
                  whileHover={{ gap: "1.2rem", opacity: 0.85 }}
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

      {/* ─── Section 4: Social Proof ─── */}
      <section className="w-full py-40 bg-[#121212]">
        <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="mb-20"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/30 mb-6 font-sans">Guest Experience</p>
            <h2
              className="font-serif font-light text-white leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
            >
              What Our<br /><span className="italic text-white/50">Guests Say.</span>
            </h2>
          </motion.div>

          {/* Testimonial cards — horizontal scroll, glassmorphism */}
          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory mb-32">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                className="snap-center shrink-0 w-[320px] md:w-[380px] p-10 border border-white/[0.06] bg-white/[0.02] backdrop-blur-md flex flex-col justify-between"
                style={{ borderRadius: 0 }}
              >
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[#C05A46] text-sm">★</span>
                  ))}
                </div>
                <p className="font-serif font-light italic text-white/80 text-lg leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-sans">— {t.author}</p>
              </motion.div>
            ))}
          </div>

          {/* Private catering inquiry */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-12 gap-12"
          >
            <div className="col-span-12 md:col-span-4">
              <motion.p variants={reveal} className="text-[10px] tracking-[0.35em] uppercase text-white/30 mb-6 font-sans">Private Events</motion.p>
              <motion.h3
                variants={reveal}
                className="font-serif font-light text-white leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Host an Event<br /><span className="italic text-white/50">or Private Catering.</span>
              </motion.h3>
              <motion.p variants={reveal} className="text-sm text-white/30 font-sans font-light leading-relaxed">
                Driftwood is available for private hire on select evenings. Inquire below.
              </motion.p>
            </div>

            <motion.div
              variants={reveal}
              className="col-span-12 md:col-span-7 md:col-start-6 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  data-testid="input-event-name"
                  className="bg-transparent border-b border-white/15 py-4 text-white placeholder:text-white/25 text-sm font-sans font-light focus:outline-none focus:border-[#C05A46] transition-colors"
                  style={{ borderRadius: 0 }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  data-testid="input-event-email"
                  className="bg-transparent border-b border-white/15 py-4 text-white placeholder:text-white/25 text-sm font-sans font-light focus:outline-none focus:border-[#C05A46] transition-colors"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                data-testid="input-event-message"
                className="bg-transparent border-b border-white/15 py-4 text-white placeholder:text-white/25 text-sm font-sans font-light focus:outline-none focus:border-[#C05A46] transition-colors resize-none"
                style={{ borderRadius: 0 }}
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  type="button"
                  data-testid="btn-event-submit"
                  whileHover={{ letterSpacing: "0.14em", backgroundColor: "rgba(192,90,70,1)" }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#C05A46] text-white px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-sans font-medium"
                  style={{ borderRadius: 0 }}
                  onClick={(e) => e.preventDefault()}
                >
                  Send Inquiry
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 5: Footer ─── */}
      <footer className="w-full bg-[#0D0D0D] pt-24 pb-12">
        <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          {/* Large footer wordmark */}
          <div className="border-t border-white/[0.06] pt-16 mb-20">
            <p className="font-serif font-light text-white/10 leading-none tracking-tight select-none"
              style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}>
              Driftwood.
            </p>
          </div>

          {/* Footer columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5 font-sans">About</p>
              <p className="text-sm text-white/50 font-sans font-light leading-relaxed">
                A quiet, unhurried space for coffee obsessives in the heart of Downtown Austin.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5 font-sans">Hours</p>
              <ul className="space-y-3 text-sm text-white/50 font-sans font-light">
                <li>Mon &ndash; Fri: 7am &ndash; 7pm</li>
                <li>Sat &ndash; Sun: 8am &ndash; 6pm</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5 font-sans">Location</p>
              <p className="text-sm text-white/50 font-sans font-light leading-relaxed mb-3">
                4th &amp; Main St<br />Downtown Austin, TX
              </p>
              <a href="#" className="text-[10px] tracking-[0.2em] uppercase text-[#C05A46]/70 hover:text-[#C05A46] transition-colors font-sans">
                Get Directions
              </a>
              <p className="text-xs text-white/25 font-sans font-light mt-4 italic">
                Complimentary 2-hour validated parking behind the building.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5 font-sans">Follow</p>
              <div className="flex gap-5">
                <a
                  href="#"
                  data-testid="link-social-instagram"
                  className="text-white/30 hover:text-[#C05A46] transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  data-testid="link-social-twitter"
                  className="text-white/30 hover:text-[#C05A46] transition-colors duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-sans">
              &copy; {new Date().getFullYear()} Driftwood Coffee. All rights reserved.
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/15 font-sans">
              Specialty Coffee &amp; Pastries &mdash; Austin, TX
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Side Drawer ─── */}
      <Drawer open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)} direction="right">
        <DrawerContent className="right-0 top-0 bottom-0 mt-0 w-full sm:w-[420px] h-full rounded-none border-l border-white/[0.08] bg-[#0D0D0D]">
          <DrawerHeader className="text-left mt-10 px-8 pb-0">
            <DrawerTitle className="font-serif font-light text-white text-3xl mb-1">{selectedItem?.name}</DrawerTitle>
            <DrawerDescription className="text-[#C05A46] font-sans text-base font-light">${selectedItem?.price}.00</DrawerDescription>
          </DrawerHeader>

          <div className="p-8 space-y-10 flex-1 overflow-y-auto">
            {(selectedItem?.id.startsWith("c") || selectedItem?.id.startsWith("t")) && (
              <>
                <div className="space-y-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-sans">Milk Options</p>
                  <RadioGroup defaultValue="whole" className="space-y-4">
                    {["Whole Milk", "Oat Milk (+ $1.00)", "Almond Milk (+ $1.00)", "Skim Milk"].map((opt, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <RadioGroupItem value={opt.split(" ")[0].toLowerCase()} id={`r${i}`} className="border-white/20 text-[#C05A46]" />
                        <Label htmlFor={`r${i}`} className="text-white/60 font-sans font-light text-sm cursor-pointer">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.06] pt-8">
                  <Label htmlFor="extra-shot" className="text-sm text-white/60 font-sans font-light cursor-pointer">
                    Extra Espresso Shot<span className="text-white/30 ml-2">(+ $2.00)</span>
                  </Label>
                  <Switch id="extra-shot" />
                </div>
              </>
            )}
          </div>

          <DrawerFooter className="border-t border-white/[0.06] p-8 bg-[#0D0D0D] gap-3">
            <motion.div
              whileHover={{ opacity: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="w-full bg-[#C05A46] hover:bg-[#C05A46]/90 text-white py-6 text-xs tracking-[0.2em] uppercase font-sans font-medium rounded-none"
                data-testid="btn-add-to-order"
                style={{ borderRadius: 0 }}
              >
                Add to Order
              </Button>
            </motion.div>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full border-white/10 text-white/50 hover:text-white hover:bg-white/5 rounded-none text-xs tracking-[0.2em] uppercase font-sans py-5"
                data-testid="btn-cancel-order"
                style={{ borderRadius: 0 }}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
