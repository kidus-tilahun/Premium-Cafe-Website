import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CATEGORIES, MENU_ITEMS, type Category, type MenuItem } from "@/data/menu";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <main className="w-full bg-[#0D0D0D] min-h-screen">
      {/* Page header */}
      <section className="pt-40 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
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
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#C05A46]/80 font-sans mb-1.5">
                      {item.category}
                    </p>
                    <h3
                      className="font-serif font-light text-white leading-tight mb-1"
                      style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-white/45 font-sans font-light leading-relaxed hidden group-hover:block transition-all duration-300">
                      {item.description}
                    </p>
                    <p className="text-xs text-white/60 font-sans font-light mt-2">${item.price}.00</p>
                  </div>
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

      {/* Item modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative w-full max-w-[92%] sm:max-w-xl md:max-w-3xl max-h-[90vh] overflow-y-auto bg-neutral-900 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                data-testid="btn-close-modal"
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
                {/* Image */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#C05A46]/70 font-sans mb-2">
                      {selectedItem.category}
                    </p>
                    <h2 className="font-serif font-light text-white text-2xl md:text-3xl leading-tight">
                      {selectedItem.name}
                    </h2>
                    <p className="text-sm text-white/40 font-sans font-light mt-2 leading-relaxed">
                      {selectedItem.description}
                    </p>
                    <p className="text-[#C05A46] font-sans font-light mt-3 text-base">
                      ${selectedItem.price}.00
                    </p>
                  </div>

                  <div className="space-y-6">
                    {selectedItem.hasMilkOption && (
                      <div className="space-y-3">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-sans">Milk Options</p>
                        <RadioGroup defaultValue="whole" className="space-y-2">
                          {[
                            { value: "whole", label: "Whole Milk" },
                            { value: "oat", label: "Oat Milk", note: "+ $1.00" },
                            { value: "almond", label: "Almond Milk", note: "+ $1.00" },
                            { value: "skim", label: "Skim Milk" },
                          ].map((opt) => (
                            <div key={opt.value} className="flex items-center gap-3">
                              <RadioGroupItem value={opt.value} id={`milk-${opt.value}`} className="border-white/20" />
                              <Label
                                htmlFor={`milk-${opt.value}`}
                                className="text-white/55 font-sans font-light text-sm cursor-pointer flex gap-2 items-baseline"
                              >
                                {opt.label}
                                {opt.note && <span className="text-white/25 text-xs">{opt.note}</span>}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    {(selectedItem.category === "Signature Drinks" || selectedItem.category === "Slow Bar") && (
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                        <Label htmlFor="extra-shot" className="text-sm text-white/55 font-sans font-light cursor-pointer">
                          Extra Espresso Shot
                          <span className="text-white/25 ml-2 text-xs">(+ $2.00)</span>
                        </Label>
                        <Switch id="extra-shot" />
                      </div>
                    )}

                    <div className="flex flex-col gap-3 pt-2">
                      <Button
                        className="w-full bg-[#C05A46] hover:bg-[#C05A46]/85 text-white py-6 text-[10px] tracking-[0.22em] uppercase font-sans font-medium rounded-none"
                        data-testid="btn-add-to-order"
                      >
                        Add to Order
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedItem(null)}
                        className="w-full border-white/10 text-white/40 hover:text-white hover:bg-white/[0.03] rounded-none text-[10px] tracking-[0.22em] uppercase font-sans py-5"
                        data-testid="btn-cancel-order"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
