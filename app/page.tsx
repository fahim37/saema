"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const textReveal = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  simple = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  simple?: boolean;
}) => {
  if (simple) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <motion.div className={className}>
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
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 p-3 md:p-4 lg:p-6 bg-black/90 backdrop-blur-md border-b border-gray-800/50"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link href="/">
              <Image
                src="/images/saema-logo.png"
                alt="SAEMA Logo"
                width={160}
                height={50}
                className="h-10 md:h-12 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {["Contact"].map((item, index) => (
              <motion.div key={item}>
                <Link
                  href={item === "Contact" ? "/contact" : "#"}
                  className="hover:text-[#6559FF] transition-colors duration-300 font-medium text-sm lg:text-base"
                >
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    {item}
                  </motion.span>
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
              animate={
                isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
              }
              className="w-5 h-0.5 bg-white transition-all duration-300"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-white transition-all duration-300"
            />
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
              className="w-5 h-0.5 bg-white transition-all duration-300"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={
            isMobileMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md"
        >
          <div className="px-4 py-4 space-y-3">
            {["Services", "About", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isMobileMenuOpen
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item === "Contact" ? "/contact" : "#"}
                  className="block py-2 text-base hover:text-[#6559FF] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section - 70vh on larger screens */}
      <section className="relative h-screen md:h-[80vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.webp"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay - fully black at top, gradually revealing background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/40" />
        </div>

        <div className="relative z-10 w-full h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center h-full">
            <motion.div className="space-y-4 md:space-y-6 lg:space-y-8 pt-16 md:pt-20 lg:pt-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[#6559FF] text-xs md:text-sm font-semibold tracking-wider uppercase"
              >
                <AnimatedText
                  text="ARTIFICIAL INTELLIGENCE AND ROBOTICS"
                  delay={0.5}
                />
              </motion.p>

              <div className="space-y-2 md:space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <AnimatedText
                    text="Simplify."
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight block"
                    delay={0.8}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <AnimatedText
                    text="Automate."
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight block text-[#6559FF]"
                    delay={1.2}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <AnimatedText
                    text="Succeed."
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight block"
                    delay={1.6}
                  />
                </motion.div>
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
                  boxShadow: "0 10px 30px rgba(101, 89, 255, 0.4)",
                  background: "linear-gradient(45deg, #6559FF, #7c6aff)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#6559FF] hover:bg-[#5449ee] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base"
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
                {/* Glowing effect */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 bg-gradient-to-r from-[#6559FF]/20 to-blue-500/20 rounded-full blur-3xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tapping Intelligence Section - Remove top padding to eliminate gap */}
      <section className="px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center py-12 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6 lg:space-y-8"
          >
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <AnimatedText text="Tapping Intelligence" className="block" />
              <AnimatedText
                text="Through Talent."
                className="block text-[#6559FF]"
                delay={0.5}
              />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base md:text-lg text-gray-300 leading-relaxed"
            >
              Nutzen Sie das volle Potenzial Ihrer Organisation durch den
              gezielten Einsatz von Talent und Technologie. Unsere erfahrenen
              Berater und Entwickler kombinieren ihre Expertise in RPA und KI,
              um maßgeschneiderte Lösungen zu schaffen, die Ihre
              Geschäftsprozesse revolutionieren. Entdecken Sie, wie die richtige
              Mischung aus menschlichem Talent und intelligenter Automatisierung
              Ihre Effizienz steigern und nachhaltigen Erfolg sichern kann.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 md:p-8 lg:p-12 rounded-2xl"
          >
            <video
              src="/images/Saema_00.mp4"
              width={400}
              height={200}
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[#6559FF] text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 md:mb-4">
              <AnimatedText text="WHAT WE OFFER" />
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <AnimatedText text="We are intelligence in action." delay={0.3} />
            </h2>
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
              },
              {
                icon: Settings,
                title: "RPA meets KI",
                description:
                  "Möchten Sie RPA und künstliche Intelligenz (KI) zur Steigerung der Effizienz in Ihrem gesamten Unternehmen einsetzen? Haben Sie quantitative und qualitative Ziele definiert, die Sie durch Automatisierungen erreichen möchten?",
              },
              {
                icon: FileText,
                title: "Document Understanding",
                description:
                  "Unsere fortschrittlichen KI-gesteuerten Software-Roboter revolutionieren die Verarbeitung Ihrer Dokumente. Sie lesen, verstehen und klassifizieren Rechnungen, Bestellungen, Quittungen und Aufträge automatisch.",
              },
              {
                icon: Brain,
                title: "Machine Learning",
                description:
                  "Unsere Experten beraten Sie zu den verfügbaren Standardlösungen auf dem Markt, unterstützen Sie bei der Integration eigener KI-Modelle und zeigen Ihnen, worauf es beim Einsatz von KI-Technologien ankommt.",
              },
              {
                icon: TestTube,
                title: "Pilotprojekt",
                description:
                  "Haben Sie viel über RPA gehört und gelesen und möchten die Möglichkeiten von RPA in Ihrem Unternehmen testen? Im Rahmen eines Pilotprojekts zeigen wir Ihnen, was Software-Roboter können.",
              },
              {
                icon: MessageSquare,
                title: "Beratung",
                description:
                  "Unsere Beraterinnen und Berater stehen Ihnen entlang der gesamten Robotic Process Automation (RPA) Wertschöpfungskette zur Seite. Wir bieten umfassende Beratung in den verschiedensten Bereichen.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                {...scaleOnHover}
                className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-[#6559FF]/50 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 md:w-16 md:h-16 bg-[#6559FF]/20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#6559FF]/30 transition-colors"
                >
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-[#6559FF]" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 group-hover:text-[#6559FF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[#6559FF] text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 md:mb-4">
              <AnimatedText text="OUR VALUE" />
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <AnimatedText
                text="The power of applied intelligence."
                delay={0.3}
              />
            </h2>
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
              },
              {
                icon: Users,
                title: "Gemeinsam",
                description:
                  "Sie haben bereits RPA-Kompetenzen im Unternehmen aufgebaut? Wir ergänzen Ihr Team gezielt mit den RPA-Kompetenzen, die Ihnen noch fehlen oder in die Sie nicht investieren möchten.",
              },
              {
                icon: Cloud,
                title: "Alles aus einer Hand",
                description:
                  "Wir bieten Ihnen RPA als Managed Service an. Teilen Sie uns mit, welche Prozesse Sie in Ihrem Unternehmen starten möchten, und wir übernehmen die Installation und den Betrieb für Sie.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                {...scaleOnHover}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-[#6559FF]/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-[#6559FF]/30 transition-colors"
                >
                  <value.icon className="w-8 h-8 md:w-10 md:h-10 text-[#6559FF]" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-[#6559FF] transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-sm mx-auto">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div>
              <Image
                src="/images/saema-logo.png"
                alt="SAEMA Logo"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8 text-xs md:text-sm text-gray-400">
              <Link href="#" className="hover:text-[#6559FF] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#6559FF] transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-[#6559FF] transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
          <div className="text-center text-gray-500 text-xs md:text-sm mt-6 md:mt-8">
            © 2024 SAEMA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
