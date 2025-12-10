import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import invitationCard from "@assets/IMG_0500_1765228116324.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const eventDate = new Date("2025-12-12T18:00:00");
  const now = new Date();
  const difference = eventDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownUnit({ value, label, isPulsing = false }: { value: number; label: string; isPulsing?: boolean }) {
  return (
    <div className="flex flex-col items-center" data-testid={`countdown-${label.toLowerCase()}`}>
      <motion.div
        className="relative bg-card border-2 border-primary/30 rounded-md w-[72px] h-[80px] sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-36 lg:h-40 flex items-center justify-center overflow-hidden"
        animate={isPulsing ? {
          boxShadow: [
            "0 0 0 0 hsl(var(--primary) / 0)",
            "0 0 0 4px hsl(var(--primary) / 0.15)",
            "0 0 0 0 hsl(var(--primary) / 0)"
          ]
        } : {}}
        transition={isPulsing ? {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span
        className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm md:text-base text-muted-foreground"
        style={{ fontFamily: "'Amiri', 'Cairo', 'Tajawal', serif" }}
        dir="rtl"
      >
        {label}
      </span>
    </div>
  );
}

function Confetti() {
  const colors = ["#7D1F3C", "#8B2E48", "#D4AF37", "#F5F1E8"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.x}vw`, rotate: 0, opacity: 1 }}
          animate={{
            y: "110vh",
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute w-3 h-3"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
}

function FloralCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180",
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 opacity-20 pointer-events-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
        <path
          d="M0,0 Q30,15 50,50 Q15,30 0,0"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M10,0 Q35,20 55,55 Q20,35 10,0"
          fill="currentColor"
          opacity="0.4"
        />
        <circle cx="25" cy="25" r="8" fill="currentColor" opacity="0.5" />
        <circle cx="15" cy="15" r="4" fill="currentColor" opacity="0.7" />
      </svg>
    </div>
  );
}

function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6 sm:my-8">
      <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-primary/40" />
      <div className="w-2 h-2 rotate-45 bg-primary/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
      <div className="w-2 h-2 rotate-45 bg-primary/50" />
      <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  );
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isEventStarted, setIsEventStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsEventStarted(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {isEventStarted && <Confetti />}

      <FloralCorner position="top-left" />
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />
      <FloralCorner position="bottom-right" />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            hsl(var(--primary) / 0.1) 10px,
            hsl(var(--primary) / 0.1) 11px
          )`
        }} />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-medium mb-6 sm:mb-8 md:mb-10 text-center leading-relaxed"
          style={{ fontFamily: "'Amiri', 'Cairo', 'Tajawal', serif" }}
          dir="rtl"
          data-testid="text-blessing"
        >
          ببركة السيدة فاطمة و أولادها المعصومين (ع)
        </motion.h1>
        {/* <DecorativeDivider /> */}

        {!isEventStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-center"
          >
            <h2
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-6"
              style={{ fontFamily: "'Amiri', 'Cairo', 'Tajawal', serif" }}
              dir="rtl"
              data-testid="text-countdown-heading"
            >
              عقد القران بعد
            </h2>

            <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8" data-testid="countdown-timer">
              <CountdownUnit value={timeLeft.days} label="أيام" />
              <CountdownUnit value={timeLeft.hours} label="ساعات" />
              <CountdownUnit value={timeLeft.minutes} label="دقائق" />
              <CountdownUnit value={timeLeft.seconds} label="ثواني" isPulsing={true} />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-muted-foreground"
              style={{ fontFamily: "'Amiri', 'Cairo', 'Tajawal', serif" }}
              dir="rtl"
              data-testid="text-event-date"
            >
              الجمعة، ١٢ ديسمبر ٢٠٢٥ الساعة ٦:٠٠ مساءً
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-4"
              style={{ fontFamily: "'Amiri', 'Cairo', 'Tajawal', serif" }}
              dir="rtl"
              data-testid="text-celebration-heading"
            >
              لقد عقد القران شكرا لحضوركم
            </h2>
            <p
              className="text-lg sm:text-xl text-muted-foreground"
              style={{ fontFamily: "'Amiri', 'Cairo', 'Tajawal', serif" }}
              dir="rtl"
              data-testid="text-celebration-message"
            >
              أهلاً وسهلاً بكم في حفل خطوبتنا
            </p>
          </motion.div>
        )}

        <DecorativeDivider />

        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base text-muted-foreground/70 text-center"
          style={{ fontFamily: "'Amiri', 'Cairo', 'Tajawal', serif" }}
          dir="rtl"
          data-testid="text-footer"
        >
          نتطلع للاحتفال معكم
        </motion.p>

        <DecorativeDivider /> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 rounded-lg blur-sm" />
            <img
              src={invitationCard}
              alt="Engagement Invitation"
              className="relative w-full h-auto rounded-md shadow-xl"
              data-testid="img-invitation-card"
            />
          </div>
        </motion.div>

      </main>
    </div>
  );
}
