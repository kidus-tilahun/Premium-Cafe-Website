import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Category = "All" | "Signature Drinks" | "Slow Bar" | "House Pastries" | "Kitchen";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Exclude<Category, "All">;
  description: string;
  image: string;
  hasMilkOption?: boolean;
}

const CATEGORIES: Category[] = ["All", "Signature Drinks", "Slow Bar", "House Pastries", "Kitchen"];

const MENU_ITEMS: MenuItem[] = [
  {
    id: "s1", name: "Oat Milk Latte", price: 7, category: "Signature Drinks",
    description: "House-pulled espresso, steamed oat milk, a whisper of cane.",
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80",
    hasMilkOption: true,
  },
  {
    id: "s2", name: "Iced Matcha", price: 7, category: "Signature Drinks",
    description: "Ceremonial grade matcha, cold oat milk, lightly sweetened.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    hasMilkOption: true,
  },
  {
    id: "s3", name: "Cardamom Rose Latte", price: 8, category: "Signature Drinks",
    description: "Espresso, whole milk, cardamom syrup, dried rose.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    hasMilkOption: true,
  },
  {
    id: "s4", name: "Cold Brew Tonic", price: 7, category: "Signature Drinks",
    description: "18-hour cold brew over tonic water, orange peel.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
  },
  {
    id: "b1", name: "Single Origin Pour-Over", price: 6, category: "Slow Bar",
    description: "Rotating single-origin selection, brewed to order on the Kalita Wave.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  },
  {
    id: "b2", name: "Espresso", price: 4, category: "Slow Bar",
    description: "A precise 28g shot, pulled from our seasonal house blend.",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80",
  },
  {
    id: "b3", name: "Cortado", price: 5, category: "Slow Bar",
    description: "Equal parts espresso and warm milk. Nothing hidden.",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=80",
    hasMilkOption: true,
  },
  {
    id: "b4", name: "Aeropress Single", price: 6, category: "Slow Bar",
    description: "Immersion-brewed for full body and clarity. Served black.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80",
  },
  {
    id: "p1", name: "Butter Croissant", price: 5, category: "House Pastries",
    description: "72-hour laminated dough. Shatteringly crisp. Deeply buttery.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
  },
  {
    id: "p2", name: "Almond Croissant", price: 6, category: "House Pastries",
    description: "Day-old croissant soaked in syrup, filled with frangipane.",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&q=80",
  },
  {
    id: "p3", name: "Morning Bun", price: 5, category: "House Pastries",
    description: "Brioche dough, cinnamon-orange sugar, rolled and baked to order.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  },
  {
    id: "p4", name: "Cardamom Knot", price: 5, category: "House Pastries",
    description: "Scandinavian-style, heavy on the cardamom, light on the glaze.",
    image: "https://images.unsplash.com/photo-1568471173242-461f0a730452?w=600&q=80",
  },
  {
    id: "k1", name: "Avocado Toast", price: 14, category: "Kitchen",
    description: "Sourdough, whipped ricotta, smashed avocado, chili flake, microgreens.",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&q=80",
  },
  {
    id: "k2", name: "Grain Bowl", price: 16, category: "Kitchen",
    description: "Farro, roasted seasonal vegetables, tahini, soft egg, dukkah.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: "k3", name: "Smoked Salmon Bagel", price: 15, category: "Kitchen",
    description: "House-baked bagel, whipped cream cheese, capers, dill, shallot.",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80",
  },
  {
    id: "k4", name: "Seasonal Soup", price: 12, category: "Kitchen",
    description: "Ask your server. Changes weekly with what's best at the market.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filtered = activeCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <main className="w-full bg-[#0D0D0D] min-h-screen">
      {/* Page header */}
      <section className="pt-40 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={reveal} className="text-[10px] tracking-[0.35em] uppercase text-white/30 mb-6 font-sans">
            Driftwood Coffee
          </motion.p>
          <motion.h1
            variants={reveal}
            className="font-serif font-light text-white leading-[0.92] tracking-tight mb-8"
            style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
          >
            The<br /><span className="italic text-white/60">Menu.</span>
          </motion.h1>
          <motion.p variants={reveal} className="text-sm text-white/35 font-sans font-light max-w-sm">
            Everything here is made with care and sourced with intention. Click any item to customise and add to your order.
          </motion.p>
        </motion.div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="flex gap-0 overflow-x-auto hide-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`relative shrink-0 px-6 py-5 text-[10px] tracking-[0.25em] uppercase font-sans transition-colors duration-300 ${
                    active ? "text-white" : "text-white/30 hover:text-white/70"
                  }`}
                >
                  {cat}
                  {active && (
                    <motion.span
                      layoutId="filter-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#C05A46]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-16 pb-32">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: "easeOut" }}
                className={`group cursor-pointer ${i % 7 === 0 || i % 7 === 4 ? "md:col-span-1 row-span-1" : ""}`}
                onClick={() => setSelectedItem(item)}
                data-testid={`card-menu-item-${item.id}`}
              >
                {/* Image container */}
                <div
                  className={`relative overflow-hidden bg-[#1A1A1A] ${
                    (i + 1) % 5 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Bottom gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Card text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#C05A46]/80 font-sans mb-1.5">
                      {item.category}
                    </p>
                    <h3 className="font-serif font-light text-white leading-tight mb-1"
                      style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)" }}>
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-white/45 font-sans font-light leading-relaxed hidden group-hover:block transition-all duration-300">
                      {item.description}
                    </p>
                    <p className="text-xs text-white/60 font-sans font-light mt-2">${item.price}.00</p>
                  </div>

                  {/* Hover overlay hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 border border-[#C05A46]/30 pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Item drawer */}
      <Drawer open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)} direction="right">
        <DrawerContent className="right-0 top-0 bottom-0 mt-0 w-full sm:w-[420px] h-full rounded-none border-l border-white/[0.07] bg-[#0D0D0D]">
          {selectedItem && (
            <>
              <div className="relative h-56 overflow-hidden shrink-0">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/20 to-transparent" />
              </div>
              <DrawerHeader className="text-left px-8 pt-6 pb-0">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#C05A46]/70 font-sans mb-2">
                  {selectedItem.category}
                </p>
                <DrawerTitle className="font-serif font-light text-white text-3xl leading-tight">
                  {selectedItem.name}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-white/40 font-sans font-light mt-2 leading-relaxed">
                  {selectedItem.description}
                </DrawerDescription>
                <p className="text-[#C05A46] font-sans font-light mt-3 text-base">${selectedItem.price}.00</p>
              </DrawerHeader>

              <div className="p-8 space-y-8 flex-1 overflow-y-auto">
                {selectedItem.hasMilkOption && (
                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-sans">Milk Options</p>
                    <RadioGroup defaultValue="whole" className="space-y-3">
                      {[
                        { value: "whole", label: "Whole Milk" },
                        { value: "oat", label: "Oat Milk", note: "+ $1.00" },
                        { value: "almond", label: "Almond Milk", note: "+ $1.00" },
                        { value: "skim", label: "Skim Milk" },
                      ].map((opt) => (
                        <div key={opt.value} className="flex items-center gap-4">
                          <RadioGroupItem value={opt.value} id={`milk-${opt.value}`} className="border-white/20" />
                          <Label htmlFor={`milk-${opt.value}`} className="text-white/55 font-sans font-light text-sm cursor-pointer flex gap-2 items-baseline">
                            {opt.label}
                            {opt.note && <span className="text-white/25 text-xs">{opt.note}</span>}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {(selectedItem.category === "Signature Drinks" || selectedItem.category === "Slow Bar") && (
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
                    <Label htmlFor="extra-shot" className="text-sm text-white/55 font-sans font-light cursor-pointer">
                      Extra Espresso Shot
                      <span className="text-white/25 ml-2 text-xs">(+ $2.00)</span>
                    </Label>
                    <Switch id="extra-shot" />
                  </div>
                )}
              </div>

              <DrawerFooter className="border-t border-white/[0.06] p-8 bg-[#0D0D0D] gap-3">
                <Button
                  className="w-full bg-[#C05A46] hover:bg-[#C05A46]/85 text-white py-6 text-[10px] tracking-[0.22em] uppercase font-sans font-medium rounded-none"
                  data-testid="btn-add-to-order"
                  style={{ borderRadius: 0 }}
                >
                  Add to Order
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 text-white/40 hover:text-white hover:bg-white/[0.03] rounded-none text-[10px] tracking-[0.22em] uppercase font-sans py-5"
                    data-testid="btn-cancel-order"
                    style={{ borderRadius: 0 }}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </main>
  );
}
