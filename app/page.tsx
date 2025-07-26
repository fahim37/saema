"use client"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Monitor,
  Settings,
  FileText,
  Brain,
  TestTube,
  MessageSquare,
  Code,
  Users,
  Cloud,
  Plus,
  Sparkles,
  Zap,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const textReveal = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
}

const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
}

const colorfulHover = {
  whileHover: {
    scale: 1.08,
    rotateY: 5,
    rotateX: 5,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  whileTap: { scale: 0.95 },
}

// Enhanced Interactive Heading Component with Click Effects
const InteractiveHeading = ({
  children,
  className = "",
  size = "large",
  gradient = "from-[#5F39BB] via-[#8B5CF6] to-[#D8B4FE]",
  delay = 0,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  size?: "small" | "medium" | "large" | "xlarge"
  gradient?: string
  delay?: number
  onClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const sizeClasses = {
    small: "text-lg md:text-xl",
    medium: "text-xl md:text-2xl",
    large: "text-3xl md:text-4xl lg:text-5xl",
    xlarge: "text-3xl md:text-4xl lg:text-5xl xl:text-7xl",
  }

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)
    onClick?.()
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} font-bold cursor-pointer relative inline-block ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, type: "spring", stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{
        scale: 1.02,
        textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
      }}
      whileTap={{
        scale: 0.95,
        rotate: [0, -2, 2, 0],
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
    >
      {/* Reduced animated background glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 blur-lg -z-10`}
        animate={{
          opacity: isHovered ? 0.1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Reduced particle effects on hover */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-0.5 h-0.5 bg-gradient-to-r ${gradient} rounded-full opacity-60`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 60],
                  y: [0, (Math.random() - 0.5) * 60],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full opacity-20 -z-10`}
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Text content with subtle hover effect */}
      <motion.span
        className={`relative z-10 ${
          isHovered ? `text-transparent bg-clip-text bg-gradient-to-r ${gradient}` : "text-white"
        } transition-all duration-300`}
        animate={{
          letterSpacing: isHovered ? "0.02em" : "0em",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Subtle underline animation */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${gradient} rounded-full opacity-60`}
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

// Enhanced AnimatedText with hover effects
const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  simple = false,
  interactive = false,
  gradient = "from-[#5F39BB] to-[#8B5CF6]",
}: {
  text: string
  className?: string
  delay?: number
  simple?: boolean
  interactive?: boolean
  gradient?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  if (simple) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={interactive ? { scale: 1.02, y: -2 } : {}}
      >
        {text}
      </motion.div>
    )
  }

  return (
    <motion.div className={className} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: "easeOut",
          }}
          whileHover={
            interactive
              ? {
                  scale: 1.2,
                  color: "#5F39BB",
                  textShadow: "0 0 10px rgba(95, 57, 187, 0.8)",
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }
              : {}
          }
          className="inline-block hover:cursor-pointer"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] rounded-full opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqData = [
    {
      question: "Was ist RPA und wie kann es meinem Unternehmen helfen?",
      answer:
        "Robotic Process Automation (RPA) ist eine Technologie, die Software-Roboter verwendet, um repetitive, regelbasierte Aufgaben zu automatisieren. RPA kann Ihrem Unternehmen helfen, Kosten zu senken, Fehler zu reduzieren, die Effizienz zu steigern und Mitarbeiter für wertvollere Tätigkeiten freizusetzen.",
      icon: Sparkles,
      gradient: "from-pink-500 to-purple-600",
    },
    {
      question: "Wie lange dauert die Implementierung einer RPA-Lösung?",
      answer:
        "Die Implementierungszeit variiert je nach Komplexität des Prozesses. Einfache Automatisierungen können in 2-4 Wochen implementiert werden, während komplexere Lösungen 2-6 Monate dauern können. Wir beginnen immer mit einem Pilotprojekt, um schnelle Ergebnisse zu erzielen.",
      icon: Zap,
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      question: "Welche Prozesse eignen sich am besten für RPA?",
      answer:
        "Ideal sind regelbasierte, repetitive Prozesse mit strukturierten Daten, wie Rechnungsverarbeitung, Datenübertragung, Berichtserstellung oder Kundenservice-Anfragen. Wir analysieren Ihre Prozesse und identifizieren die besten Kandidaten für Automatisierung.",
      icon: Settings,
      gradient: "from-emerald-400 to-teal-600",
    },
    {
      question: "Wie sicher sind RPA-Lösungen?",
      answer:
        "Sicherheit hat höchste Priorität. Unsere RPA-Lösungen folgen strengen Sicherheitsstandards, verwenden verschlüsselte Verbindungen, sichere Authentifizierung und detaillierte Audit-Trails. Alle Zugriffe werden protokolliert und überwacht.",
      icon: Star,
      gradient: "from-orange-400 to-red-600",
    },
    {
      question: "Bieten Sie Support und Wartung nach der Implementierung?",
      answer:
        "Ja, wir bieten umfassenden Support und Wartung. Dies umfasst 24/7-Monitoring, regelmäßige Updates, Performance-Optimierung und schnelle Fehlerbehebung. Unser Support-Team steht Ihnen jederzeit zur Verfügung.",
      icon: Users,
      gradient: "from-violet-500 to-purple-600",
    },
    {
      question: "Können bestehende Systeme integriert werden?",
      answer:
        "Absolut! RPA ist darauf ausgelegt, mit bestehenden Systemen zu arbeiten, ohne diese zu verändern. Wir können praktisch jede Anwendung automatisieren - von Legacy-Systemen bis hin zu modernen Cloud-Anwendungen.",
      icon: Cloud,
      gradient: "from-indigo-500 to-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <FloatingParticles />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-3 md:px-4 lg:px-6 py-2 bg-black/90 backdrop-blur-md border-b border-gray-800/50"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 2,
              filter: "drop-shadow(0 0 20px rgba(95, 57, 187, 0.6))",
            }}
            className="flex items-center"
          >
            <Image
              src="/images/saema-logo.png"
              alt="SAEMA Logo"
              width={160}
              height={50}
              className="h-8 md:h-10 lg:h-14 w-auto"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {[ "Contact"].map((item, index) => (
              <motion.div key={item}>
                <Link
                  href={item === "Contact" ? "/contact" : "#"}
                  className="relative group font-medium text-sm lg:text-base"
                >
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -2 }}
                    className="relative z-10 transition-colors duration-300 group-hover:text-white"
                  >
                    {item}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    whileHover={{ scale: 1.1 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] transition-all duration-300"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] transition-all duration-300"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] transition-all duration-300"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-gradient-to-r from-[#5F39BB]/10 to-[#8B5CF6]/10 backdrop-blur-md rounded-lg mt-4"
        >
          <div className="px-4 py-4 space-y-3">
            {[ "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item === "Contact" ? "/contact" : "#"}
                  className="block py-2 text-base hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5F39BB] hover:to-[#8B5CF6] transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-[720px] md:h-[750px] 2xl:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg.webp" alt="Hero Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5F39BB]/20 to-[#8B5CF6]/20" />
        </div>

        <div className="relative z-10 w-full h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center h-full">
            <motion.div className="space-y-4 md:space-y-6 lg:space-y-8 pt-16 md:pt-20 lg:pt-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] text-xs md:text-sm font-semibold tracking-wider uppercase"
              >
                <AnimatedText text="ARTIFICIAL INTELLIGENCE AND ROBOTICS" delay={0.5} />
              </motion.p>

              <div className="space-y-2 md:space-y-4">
                <InteractiveHeading size="xlarge" delay={0.8} onClick={() => console.log("Simplify clicked!")}>
                  Simplify.
                </InteractiveHeading>
                <InteractiveHeading
                  size="xlarge"
                  gradient="from-[#5F39BB] to-[#8B5CF6]"
                  delay={1.2}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6]"
                  onClick={() => console.log("Automate clicked!")}
                >
                  Automate.
                </InteractiveHeading>
                <InteractiveHeading size="xlarge" delay={1.6} onClick={() => console.log("Succeed clicked!")}>
                  Succeed.
                </InteractiveHeading>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
                className="text-base md:text-lg lg:text-xl text-gray-200 max-w-lg"
              >
                <AnimatedText
                  text="Digitale Lösungen, die begeistern – automatisiert, sicher, skalierbar."
                  delay={2.2}
                  simple={true}
                />
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(95, 57, 187, 0.4)",
                  background: "linear-gradient(45deg, #5F39BB, #8B5CF6, #A855F7)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] hover:from-[#5F39BB] hover:to-[#7C3AED] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base shadow-lg"
              >
                Get Started
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative h-full flex items-end justify-center lg:justify-end"
            >
              <motion.div
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-full flex items-end"
              >
                <Image
                  src="/images/robot-head.png"
                  alt="AI Robot Head"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain object-bottom drop-shadow-2xl"
                  priority
                />
                <motion.div
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 bg-gradient-to-r from-[#5F39BB]/20 via-[#8B5CF6]/20 to-[#A855F7]/20 rounded-full blur-3xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tapping Intelligence Section */}
      <section className="px-4 md:px-6 bg-black relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center py-12 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6 lg:space-y-8"
          >
            <InteractiveHeading
              size="large"
              onClick={() => console.log("Tapping Intelligence clicked!")}
              whileHover={{
                textShadow: "0 0 30px rgba(139, 92, 246, 0.8)",
                background: "linear-gradient(45deg, #5F39BB, #8B5CF6, #D8B4FE)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Tapping Intelligence
            </InteractiveHeading>
            <InteractiveHeading
              size="large"
              gradient="from-[#5F39BB] to-[#8B5CF6]"
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6]"
              delay={0.5}
              onClick={() => console.log("Through Talent clicked!")}
            >
              Through Talent.
            </InteractiveHeading>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base md:text-lg text-gray-300 leading-relaxed"
            >
              Nutzen Sie das volle Potenzial Ihrer Organisation durch den gezielten Einsatz von Talent und Technologie.
              Unsere erfahrenen Berater und Entwickler kombinieren ihre Expertise in RPA und KI, um maßgeschneiderte
              Lösungen zu schaffen, die Ihre Geschäftsprozesse revolutionieren.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="bg-gradient-to-br from-white via-gray-50 to-purple-50 p-6 md:p-8 lg:p-12 rounded-2xl shadow-2xl border border-purple-200"
          >
            <video src="/images/Saema_00.mp4" width={400} height={200} className="w-full h-auto" autoPlay muted loop>
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 md:mb-4">
              <AnimatedText text="WHAT WE OFFER" />
            </p>
            <InteractiveHeading size="large" onClick={() => console.log("We are intelligence in action clicked!")}>
              We are intelligence in action.
            </InteractiveHeading>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                icon: Monitor,
                title: "Robot Process Automation",
                description:
                  "Unsere erfahrenen RPA-Berater identifizieren die optimalen Prozesse für Automatisierungen in Ihrem Unternehmen. Anschließend konzipieren, entwickeln, integrieren und betreiben unsere RPA-Entwickler Ihre maßgeschneiderte RPA-Software und Infrastruktur.",
                gradient: "from-pink-500 via-purple-500 to-indigo-600",
                hoverGradient: "from-pink-400 via-purple-400 to-indigo-500",
              },
              {
                icon: Settings,
                title: "RPA meets KI",
                description:
                  "Möchten Sie RPA und künstliche Intelligenz (KI) zur Steigerung der Effizienz in Ihrem gesamten Unternehmen einsetzen? Haben Sie quantitative und qualitative Ziele definiert, die Sie durch Automatisierungen erreichen möchten?",
                gradient: "from-cyan-400 via-blue-500 to-purple-600",
                hoverGradient: "from-cyan-300 via-blue-400 to-purple-500",
              },
              {
                icon: FileText,
                title: "Document Understanding",
                description:
                  "Unsere fortschrittlichen KI-gesteuerten Software-Roboter revolutionieren die Verarbeitung Ihrer Dokumente. Sie lesen, verstehen und klassifizieren Rechnungen, Bestellungen, Quittungen und Aufträge automatisch.",
                gradient: "from-emerald-400 via-teal-500 to-cyan-600",
                hoverGradient: "from-emerald-300 via-teal-400 to-cyan-500",
              },
              {
                icon: Brain,
                title: "Machine Learning",
                description:
                  "Unsere Experten beraten Sie zu den verfügbaren Standardlösungen auf dem Markt, unterstützen Sie bei der Integration eigener KI-Modelle und zeigen Ihnen, worauf es beim Einsatz von KI-Technologien ankommt.",
                gradient: "from-orange-400 via-red-500 to-pink-600",
                hoverGradient: "from-orange-300 via-red-400 to-pink-500",
              },
              {
                icon: TestTube,
                title: "Pilotprojekt",
                description:
                  "Haben Sie viel über RPA gehört und gelesen und möchten die Möglichkeiten von RPA in Ihrem Unternehmen testen? Im Rahmen eines Pilotprojekts zeigen wir Ihnen, was Software-Roboter können.",
                gradient: "from-violet-500 via-purple-500 to-pink-600",
                hoverGradient: "from-violet-400 via-purple-400 to-pink-500",
              },
              {
                icon: MessageSquare,
                title: "Beratung",
                description:
                  "Unsere Beraterinnen und Berater stehen Ihnen entlang der gesamten Robotic Process Automation (RPA) Wertschöpfungskette zur Seite. Wir bieten umfassende Beratung in den verschiedensten Bereichen.",
                gradient: "from-indigo-500 via-purple-500 to-pink-600",
                hoverGradient: "from-indigo-400 via-purple-400 to-pink-500",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 8,
                  z: 50,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.4,
                }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90 group-hover:opacity-100 transition-all duration-500`}
                  whileHover={{
                    background: `linear-gradient(135deg, ${service.hoverGradient
                      .replace("from-", "")
                      .replace(" via-", "")
                      .replace(" to-", ", ")})`,
                    scale: 1.1,
                  }}
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 2,
                    }}
                  />
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/40 rounded-full"
                      animate={{
                        x: [0, Math.random() * 200 - 100],
                        y: [0, Math.random() * 200 - 100],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white/30 transition-all duration-300"
                    animate={{
                      rotate: 0,
                      scale: 1,
                    }}
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                  </motion.div>

                  <InteractiveHeading
                    size="medium"
                    className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white drop-shadow-lg"
                    onClick={() => console.log(`${service.title} clicked!`)}
                  >
                    {service.title}
                  </InteractiveHeading>

                  <motion.p
                    className="text-sm md:text-base text-white/90 leading-relaxed drop-shadow-sm flex-grow"
                    whileHover={{
                      textShadow: "0 0 10px rgba(255,255,255,0.5)",
                    }}
                  >
                    {service.description}
                  </motion.p>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`,
                    padding: "2px",
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-gradient-to-b from-gray-900/30 to-black relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 md:mb-4">
              <AnimatedText text="OUR VALUE" />
            </p>
            <InteractiveHeading size="large" onClick={() => console.log("The power of applied intelligence clicked!")}>
              The power of applied intelligence.
            </InteractiveHeading>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                icon: Code,
                title: "Implementierung",
                description:
                  "Sie bringen das Prozesswissen ein, das automatisiert werden soll, und wir setzen es um. Gemeinsam automatisieren wir Ihre ersten Prozesse.",
                gradient: "from-emerald-400 to-cyan-500",
                particles: "emerald",
              },
              {
                icon: Users,
                title: "Gemeinsam",
                description:
                  "Sie haben bereits RPA-Kompetenzen im Unternehmen aufgebaut? Wir ergänzen Ihr Team gezielt mit den RPA-Kompetenzen, die Ihnen noch fehlen oder in die Sie nicht investieren möchten.",
                gradient: "from-purple-500 to-pink-500",
                particles: "purple",
              },
              {
                icon: Cloud,
                title: "Alles aus einer Hand",
                description:
                  "Wir bieten Ihnen RPA als Managed Service an. Teilen Sie uns mit, welche Prozesse Sie in Ihrem Unternehmen starten möchten, und wir übernehmen die Installation und den Betrieb für Sie.",
                gradient: "from-orange-400 to-red-500",
                particles: "orange",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="text-center group relative"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <div className={`w-full h-full bg-gradient-to-r ${value.gradient} rounded-full blur-3xl`} />
                </motion.div>

                <motion.div
                  className={`relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${value.gradient} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500`}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(95, 57, 187, 0.2)",
                      "0 15px 40px rgba(139, 92, 246, 0.3)",
                      "0 10px 30px rgba(95, 57, 187, 0.2)",
                    ],
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: 15,
                    boxShadow: "0 20px 60px rgba(95, 57, 187, 0.4)",
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    },
                    hover: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: 0,
                      scale: 1,
                    }}
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 border-2 border-white/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                <InteractiveHeading
                  size="medium"
                  className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5F39BB] group-hover:to-[#8B5CF6] transition-all duration-300"
                  onClick={() => console.log(`${value.title} clicked!`)}
                >
                  {value.title}
                </InteractiveHeading>

                <motion.p
                  className="text-sm md:text-base text-gray-300 leading-relaxed max-w-sm mx-auto group-hover:text-gray-200 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {value.description}
                </motion.p>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${value.gradient} rounded-full`}
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${50 + Math.random() * 20 - 10}%`,
                        top: `${50 + Math.random() * 20 - 10}%`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              className=" mb-4"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.p
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F39BB] via-[#8B5CF6] to-[#A855F7] text-xs md:text-sm font-semibold tracking-wider uppercase"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                <AnimatedText text="Got Inquiries?" />
              </motion.p>
            </motion.div>

            <InteractiveHeading
              size="large"
              className="mb-6 bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] bg-clip-text text-transparent"
              onClick={() => console.log("FAQ heading clicked!")}
            >
              Frequently Asked Questions
            </InteractiveHeading>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              Our FAQ section offers clear answers to common concerns, helping you navigate our services with ease.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${faq.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-2xl`}
                />

                <motion.div
                  className="relative border border-gray-800 rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm group-hover:border-[#5F39BB]/50 transition-all duration-500"
                  whileHover={{
                    boxShadow: "0 20px 60px rgba(95, 57, 187, 0.3)",
                    borderColor: "rgba(95, 57, 187, 0.8)",
                  }}
                >
                  <motion.button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-6 text-left flex justify-between items-center group/button relative"
                    whileHover={{ backgroundColor: "rgba(95, 57, 187, 0.1)" }}
                  >
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${faq.gradient} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 10,
                        boxShadow: "0 10px 30px rgba(95, 57, 187, 0.4)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 5px 15px rgba(95, 57, 187, 0.2)",
                          "0 8px 25px rgba(139, 92, 246, 0.3)",
                          "0 5px 15px rgba(95, 57, 187, 0.2)",
                        ],
                      }}
                      transition={{
                        boxShadow: {
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                        },
                        hover: { type: "spring", stiffness: 400, damping: 10 },
                      }}
                    >
                      <faq.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <motion.span
                      className="text-lg font-semibold text-white group-hover/button:text-transparent group-hover/button:bg-clip-text group-hover/button:bg-gradient-to-r group-hover/button:from-[#5F39BB] group-hover/button:to-[#8B5CF6] transition-all duration-300 flex-grow"
                      whileHover={{ x: 5 }}
                    >
                      {faq.question}
                    </motion.span>

                    <motion.div
                      className={`w-10 h-10 bg-gradient-to-r ${faq.gradient} rounded-full flex items-center justify-center flex-shrink-0 ml-4 relative overflow-hidden`}
                      animate={{ rotate: openFAQ === index ? 45 : 0 }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 10px 30px rgba(95, 57, 187, 0.4)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Plus className="w-5 h-5 text-white relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ delay: 0.1 }}
                          className="px-6 pb-6 border-t border-gray-700/50 relative"
                        >
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-[#5F39BB]/5 to-[#8B5CF6]/5" />
                          <motion.div
                            className="pt-6 text-gray-300 leading-relaxed relative z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {faq.answer}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 md:py-12 px-4 md:px-6 bg-gradient-to-t from-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -5,
                filter: "drop-shadow(0 0 20px rgba(95, 57, 187, 0.6))",
              }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                hover: { type: "spring", stiffness: 400, damping: 10 },
              }}
            >
              <Image
                src="/images/saema-logo.png"
                alt="SAEMA Logo"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </motion.div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8 text-xs md:text-sm text-gray-400">
              {["Privacy Policy", "Terms of Service", "Contact"].map((item, index) => (
                <motion.div key={item} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={item === "Contact" ? "/contact" : "#"}
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5F39BB] hover:to-[#8B5CF6] transition-all duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="text-center text-gray-500 text-xs md:text-sm mt-6 md:mt-8">
            © 2024 SAEMA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
