import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, Users, Camera, Briefcase } from "lucide-react";

const EVENT_TYPES = [
  {
    icon: Users,
    label: "Private Gatherings",
    description: "Intimate dinners, birthday celebrations, or weekend brunch buy-outs for up to 60 guests.",
  },
  {
    icon: Camera,
    label: "Creative Shoots",
    description: "Editorial photography, brand campaigns, and film productions. Exclusive access, no public hours.",
  },
  {
    icon: Briefcase,
    label: "Corporate &amp; Offsites",
    description: "Morning strategy sessions, team lunches, or full-day workplace retreats with catered service.",
  },
];

const STEPS = ["About You", "Your Event", "Final Details"];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

interface FormData {
  name: string;
  email: string;
  eventType: string;
  date: string;
  guestCount: string;
  message: string;
}

export default function EventsPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    eventType: "",
    date: "",
    guestCount: "",
    message: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canAdvance = () => {
    if (step === 0) return form.name.trim() !== "" && form.email.trim() !== "";
    if (step === 1) return form.eventType !== "" && form.date !== "" && form.guestCount !== "";
    return true;
  };

  const handleSubmit = () => {
    if (canAdvance()) setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-white/15 py-4 text-white placeholder:text-white/25 text-sm font-sans font-light focus:outline-none focus:ring-0 focus:border-[#C05A46] transition-colors duration-300";

  const selectClass =
    "w-full bg-transparent border-0 border-b border-white/15 py-4 text-white text-sm font-sans font-light focus:outline-none focus:ring-0 focus:border-[#C05A46] transition-colors duration-300 appearance-none [&>option]:bg-[#0D0D0D]";

  return (
    <main className="w-full bg-[#0D0D0D] min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-[#0D0D0D]/20" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto pb-20 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={reveal} className="text-[10px] tracking-[0.35em] uppercase text-white/30 mb-6 font-sans">
              Private Hire
            </motion.p>
            <motion.h1
              variants={reveal}
              className="font-serif font-light text-white leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              Host Your<br />
              <span className="italic text-white/60">Event Here.</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-32 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
        >
          <motion.p variants={reveal} className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-8 font-sans">
            Available For
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05]">
            {EVENT_TYPES.map((type, i) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={i}
                  variants={reveal}
                  className="bg-[#0D0D0D] p-10 flex flex-col gap-6"
                >
                  <Icon className="w-5 h-5 text-[#C05A46]/60" />
                  <div>
                    <h3 className="font-serif font-light text-white text-xl mb-3"
                      dangerouslySetInnerHTML={{ __html: type.label }} />
                    <p className="text-sm text-white/35 font-sans font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: type.description }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Multi-step inquiry form */}
      <section className="py-24 pb-40 px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16"
        >
          <motion.p variants={reveal} className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-6 font-sans">
            Inquire
          </motion.p>
          <motion.h2
            variants={reveal}
            className="font-serif font-light text-white leading-[0.93] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
          >
            Start the<br /><span className="italic text-white/50">Conversation.</span>
          </motion.h2>
        </motion.div>

        {/* Step progress */}
        <div className="flex items-center gap-4 mb-16">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    backgroundColor: i <= step ? "#C05A46" : "rgba(255,255,255,0.08)",
                    borderColor: i <= step ? "#C05A46" : "rgba(255,255,255,0.12)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-6 h-6 rounded-full border flex items-center justify-center"
                >
                  <span className="text-[9px] font-sans text-white">{i + 1}</span>
                </motion.div>
                <span className={`text-[10px] tracking-[0.2em] uppercase font-sans hidden sm:block transition-colors duration-300 ${
                  i === step ? "text-white" : i < step ? "text-[#C05A46]/60" : "text-white/20"
                }`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 md:w-16 h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="py-20 flex flex-col gap-4"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C05A46]/70 font-sans mb-2">Inquiry Received</p>
            <h3
              className="font-serif font-light text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              We&apos;ll be in touch<br /><span className="italic text-white/50">within 24 hours.</span>
            </h3>
            <p className="text-sm text-white/35 font-sans font-light mt-4 max-w-sm">
              A member of our events team will reach out to {form.email} shortly to discuss availability and pricing.
            </p>
          </motion.div>
        ) : (
          <div>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        data-testid="input-events-name"
                        className={inputClass}
                        style={{ borderRadius: 0 }}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-px bg-[#C05A46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        data-testid="input-events-email"
                        className={inputClass}
                        style={{ borderRadius: 0 }}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-px bg-[#C05A46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-8"
                >
                  <div className="relative group">
                    <select
                      value={form.eventType}
                      onChange={(e) => update("eventType", e.target.value)}
                      data-testid="select-events-type"
                      className={`${selectClass} ${!form.eventType ? "text-white/25" : "text-white"}`}
                      style={{ borderRadius: 0 }}
                    >
                      <option value="" disabled>Type of Event</option>
                      <option value="private">Private Gathering</option>
                      <option value="shoot">Creative Shoot</option>
                      <option value="corporate">Corporate / Offsite</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[#C05A46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => update("date", e.target.value)}
                        data-testid="input-events-date"
                        className={`${inputClass} [color-scheme:dark]`}
                        style={{ borderRadius: 0 }}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-px bg-[#C05A46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                    <div className="relative group">
                      <select
                        value={form.guestCount}
                        onChange={(e) => update("guestCount", e.target.value)}
                        data-testid="select-events-guests"
                        className={`${selectClass} ${!form.guestCount ? "text-white/25" : "text-white"}`}
                        style={{ borderRadius: 0 }}
                      >
                        <option value="" disabled>Expected Guest Count</option>
                        <option value="1-15">1 – 15 guests</option>
                        <option value="16-30">16 – 30 guests</option>
                        <option value="31-60">31 – 60 guests</option>
                        <option value="60+">60+ guests</option>
                        <option value="crew-only">Crew only (production)</option>
                      </select>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-[#C05A46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-8"
                >
                  <div className="relative group">
                    <textarea
                      placeholder="Tell us more — what are you envisioning? Any dietary requirements, mood, or special considerations?"
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      data-testid="input-events-message"
                      className={`${inputClass} resize-none`}
                      style={{ borderRadius: 0 }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[#C05A46] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                  <div className="flex flex-col gap-1 py-4 border-t border-white/[0.06]">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-sans">Summary</p>
                    <p className="text-sm text-white/50 font-sans font-light mt-2">{form.name} &middot; {form.email}</p>
                    <p className="text-sm text-white/35 font-sans font-light">{form.eventType} &middot; {form.date} &middot; {form.guestCount}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-12">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  data-testid="btn-events-back"
                  className="text-[10px] tracking-[0.25em] uppercase font-sans text-white/30 hover:text-white/60 transition-colors"
                >
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => canAdvance() && setStep((s) => s + 1)}
                  data-testid="btn-events-next"
                  className={`flex items-center gap-3 bg-[#C05A46] text-white px-10 py-4 text-[10px] tracking-[0.22em] uppercase font-sans transition-all duration-300 ease-out ${
                    canAdvance() ? "opacity-100 hover:bg-[#C05A46]/85" : "opacity-30 cursor-not-allowed"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  data-testid="btn-events-submit"
                  className="flex items-center gap-3 bg-[#C05A46] hover:bg-[#C05A46]/85 text-white px-10 py-4 text-[10px] tracking-[0.22em] uppercase font-sans transition-all duration-300 ease-out"
                  style={{ borderRadius: 0 }}
                >
                  Send Inquiry <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
