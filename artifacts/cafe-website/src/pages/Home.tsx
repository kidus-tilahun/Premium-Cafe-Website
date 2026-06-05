import { useState } from "react";
import { motion } from "framer-motion";
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="w-full bg-background text-foreground overflow-x-hidden">
      {/* Section 1: Hero */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-black/60">
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80')" }}
        />
        <div className="absolute top-0 w-full py-4 px-6 md:px-12 flex justify-between items-center text-primary-foreground/80 text-sm tracking-wide z-10">
          <span data-testid="utility-hours">Open Until 7 PM</span>
          <span data-testid="utility-location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> 4th & Main St, Austin TX
          </span>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center z-10 text-primary-foreground">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
              Specialty Coffee & <br /> House-Baked Pastries.
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-10 text-primary-foreground/90">
              Sourced from the world's finest small farms. Crafted with intention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a 
                href="#menu"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-medium tracking-wide text-sm transition-colors hover:bg-primary/90"
                data-testid="link-order-now"
              >
                Order Online Now
              </motion.a>
              <motion.a 
                href="#menu"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-md font-medium tracking-wide text-sm transition-colors hover:bg-primary-foreground/10"
                data-testid="link-view-menu"
              >
                View Menu & Hours
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Menu & Ordering */}
      <section id="menu" className="w-full py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground"
          >
            The Menu
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {MENU_CATEGORIES.map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.2 } } }}
              >
                <h3 className="text-2xl font-semibold mb-8 text-foreground/80 italic">{cat.name}</h3>
                <ul className="space-y-6">
                  {cat.items.map((item) => (
                    <li key={item.id}>
                      <button 
                        onClick={() => setSelectedItem(item)}
                        className="w-full text-left group flex justify-between items-baseline border-b border-border/50 pb-2 hover:border-primary transition-colors"
                        data-testid={`btn-menu-item-${item.id}`}
                      >
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{item.name}</span>
                        <span className="font-light text-muted-foreground">${item.price}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Lead Capture */}
      <section className="w-full py-32 bg-gradient-to-b from-background to-[#1A1A1A] text-primary-foreground flex justify-center text-center">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Become a member of the Reserve List.</h2>
            <p className="text-lg text-primary-foreground/70 mb-12 font-light max-w-xl mx-auto">
              Receive an invitation for a complimentary single-origin pour-over on your first visit, alongside exclusive small-batch drops.
            </p>
            
            {reserveStatus === "success" ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-serif italic text-primary" data-testid="msg-reserve-success">
                You're on the list.
              </motion.p>
            ) : (
              <form onSubmit={handleJoinReserve} className="flex max-w-md mx-auto items-end gap-4">
                <div className="relative flex-1 group">
                  <input 
                    type="email" 
                    required
                    placeholder="Email Address"
                    value={reserveEmail}
                    onChange={(e) => setReserveEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-primary-foreground/30 py-3 px-2 text-primary-foreground placeholder:text-primary-foreground/40 focus:ring-0 focus:outline-none focus:border-primary transition-colors peer"
                    data-testid="input-reserve-email"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 peer-focus:scale-x-100 transition-transform origin-left"></div>
                </div>
                <button 
                  type="submit"
                  className="flex items-center gap-2 text-primary font-medium pb-3 border-b border-transparent hover:border-primary transition-colors"
                  data-testid="btn-reserve-submit"
                >
                  Join <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Section 4: Social Proof */}
      <section className="w-full py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
          >
            What Our Guests Say
          </motion.h2>
          
          <div className="flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((test, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.1 } } }}
                className="snap-center shrink-0 w-80 md:w-96 bg-background p-8 rounded-lg shadow-sm border border-border flex flex-col justify-between"
              >
                <div className="flex gap-1 mb-6 text-primary">
                  {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-xl">★</span>)}
                </div>
                <p className="text-lg font-serif italic mb-6">"{test.quote}"</p>
                <p className="text-sm font-medium tracking-wide">— {test.author}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="max-w-2xl mx-auto mt-24 text-center"
          >
            <h3 className="text-2xl font-serif font-semibold mb-8">Host an Event or Private Catering</h3>
            <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="bg-background border border-border p-3 rounded-md focus:outline-none focus:border-primary transition-colors" data-testid="input-event-name" />
                <input type="email" placeholder="Email" className="bg-background border border-border p-3 rounded-md focus:outline-none focus:border-primary transition-colors" data-testid="input-event-email" />
              </div>
              <textarea placeholder="Message" rows={4} className="bg-background border border-border p-3 rounded-md focus:outline-none focus:border-primary transition-colors resize-none" data-testid="input-event-message"></textarea>
              <button type="submit" className="bg-foreground text-background py-3 rounded-md font-medium hover:bg-primary transition-colors self-end px-8 mt-2" data-testid="btn-event-submit">
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Footer */}
      <footer className="w-full bg-[#1A1A1A] text-primary-foreground py-16">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-light">
          <div>
            <h4 className="text-2xl font-serif font-bold text-primary mb-4">Driftwood.</h4>
            <p className="text-primary-foreground/70">A quiet, unhurried space for coffee obsessives.</p>
          </div>
          <div>
            <h5 className="font-medium mb-4 text-primary-foreground">Hours</h5>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>Mon – Fri: 7am – 7pm</li>
              <li>Sat – Sun: 8am – 6pm</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-4 text-primary-foreground">Location</h5>
            <p className="text-primary-foreground/70 mb-2">4th & Main St<br/>Downtown Austin, TX</p>
            <p className="text-xs text-primary-foreground/50 mt-4 italic">Complimentary 2-hour validated parking behind the building.</p>
          </div>
          <div>
            <h5 className="font-medium mb-4 text-primary-foreground">Social</h5>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="link-social-twitter"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-primary-foreground/10 text-xs text-primary-foreground/40 text-center">
          &copy; {new Date().getFullYear()} Driftwood Coffee. All rights reserved.
        </div>
      </footer>

      {/* Side Drawer for Menu Item */}
      <Drawer open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)} direction="right">
        <DrawerContent className="right-0 top-0 bottom-0 mt-0 w-full sm:w-[400px] h-full rounded-none border-l border-border bg-background">
          <DrawerHeader className="text-left mt-8">
            <DrawerTitle className="text-2xl font-serif text-foreground">{selectedItem?.name}</DrawerTitle>
            <DrawerDescription className="text-lg text-primary">${selectedItem?.price}</DrawerDescription>
          </DrawerHeader>
          
          <div className="p-6 space-y-8 flex-1 overflow-y-auto">
            {selectedItem?.id.startsWith('c') || selectedItem?.id.startsWith('t') ? (
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Milk Options</h4>
                <RadioGroup defaultValue="whole" className="space-y-2 text-foreground">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whole" id="r1" />
                    <Label htmlFor="r1">Whole Milk</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oat" id="r2" />
                    <Label htmlFor="r2">Oat Milk (+ $1.00)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="almond" id="r3" />
                    <Label htmlFor="r3">Almond Milk (+ $1.00)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="skim" id="r4" />
                    <Label htmlFor="r4">Skim Milk</Label>
                  </div>
                </RadioGroup>

                <div className="pt-6 flex items-center justify-between">
                  <Label htmlFor="extra-shot" className="font-medium text-foreground">Add Extra Espresso Shot (+ $2.00)</Label>
                  <Switch id="extra-shot" />
                </div>
              </div>
            ) : null}
          </div>

          <DrawerFooter className="border-t border-border p-6 bg-background">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg" data-testid="btn-add-to-order">
              Add to Order
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full" data-testid="btn-cancel-order">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
