"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/footer";

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

// Enhanced Interactive Heading Component
const InteractiveHeading = ({
  children,
  className = "",
  size = "large",
  gradient = "from-[#5F39BB] via-[#8B5CF6] to-[#D8B4FE]",
  delay = 0,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  gradient?: string;
  delay?: number;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const sizeClasses = {
    small: "text-lg md:text-xl",
    medium: "text-xl md:text-2xl lg:text-3xl",
    large: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    xlarge: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl",
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onClick?.();
  };

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
      {/* Animated background glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 blur-lg -z-10`}
        animate={{
          opacity: isHovered ? 0.1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Particle effects on hover */}
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

      {/* Text content with hover effect */}
      <motion.span
        className={`relative z-10 ${
          isHovered
            ? `text-transparent bg-clip-text bg-gradient-to-r ${gradient}`
            : "text-white"
        } transition-all duration-300`}
        animate={{
          letterSpacing: isHovered ? "0.02em" : "0em",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Underline animation */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${gradient} rounded-full opacity-60`}
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

// Enhanced AnimatedText with hover effects
const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  simple = false,
  interactive = false,
  gradient = "from-[#5F39BB] to-[#8B5CF6]",
}: {
  text: string;
  className?: string;
  delay?: number;
  simple?: boolean;
  interactive?: boolean;
  gradient?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
    );
  }

  return (
    <motion.div
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
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
  );
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
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
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 2,
                filter: "drop-shadow(0 0 20px rgba(95, 57, 187, 0.6))",
              }}
            >
              <Image
                src="/images/saema-logo.png"
                alt="SAEMA Logo"
                width={160}
                height={50}
                className="h-8 md:h-10 lg:h-14 w-auto"
              />
            </motion.div>
          </Link>

          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#5F39BB]/10 to-[#8B5CF6]/10 border border-[#5F39BB]/20 group-hover:border-[#5F39BB]/50 transition-all duration-300"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 text-[#5F39BB] group-hover:text-white transition-colors" />
              <span className="hidden sm:inline text-[#5F39BB] group-hover:text-white transition-colors font-medium">
                Back to Home
              </span>
              <span className="sm:hidden text-[#5F39BB] group-hover:text-white transition-colors font-medium">
                Back
              </span>
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5F39BB]/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] text-xs md:text-sm font-semibold tracking-wider uppercase mb-4 md:mb-6"
            >
              <AnimatedText text="GET IN TOUCH" />
            </motion.p>

            <div className="space-y-2 md:space-y-4">
              <InteractiveHeading
                size="xlarge"
                delay={0.5}
                onClick={() => console.log("Contact clicked!")}
              >
                Contact
              </InteractiveHeading>
              <InteractiveHeading
                size="xlarge"
                gradient="from-[#5F39BB] to-[#8B5CF6]"
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6]"
                delay={0.8}
                onClick={() => console.log("Us clicked!")}
              >
                Us
              </InteractiveHeading>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mt-6 md:mt-8"
            >
              <AnimatedText
                text="Ready to transform your business with intelligent automation? Let's discuss your project and explore the possibilities together."
                delay={1.4}
                simple={true}
              />
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-12"
          >
            <div>
              <InteractiveHeading
                size="large"
                className="mb-6 md:mb-8"
                onClick={() => console.log("Let's Start clicked!")}
              >
                Let's Start a Conversation
              </InteractiveHeading>
              <motion.p
                className="text-base md:text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Whether you're looking to automate your first process or scale
                your existing RPA implementation, our team of experts is here to
                help. We offer comprehensive consultation and can guide you
                through every step of your automation journey.
              </motion.p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6 md:space-y-8"
            >
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "hello@saema.dev",
                  description:
                    "Send us an email and we'll respond within 24 hours",
                  gradient: "from-pink-500 to-purple-600",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+49 (0) 123 456 789",
                  description: "Mon-Fri from 9am to 6pm CET",
                  gradient: "from-cyan-400 to-blue-600",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "Berlin, Germany",
                  description: "Schedule a meeting at our office",
                  gradient: "from-emerald-400 to-teal-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(95, 57, 187, 0.2)",
                  }}
                  className="group relative overflow-hidden p-6 md:p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-[#5F39BB]/50 transition-all duration-500 cursor-pointer"
                >
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex items-start space-x-4 md:space-x-6">
                    <motion.div
                      className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
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
                      }}
                    >
                      <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3
                        className="text-lg md:text-xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5F39BB] group-hover:to-[#8B5CF6] transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {item.title}
                      </motion.h3>
                      <p
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} font-medium mb-1 text-sm md:text-base`}
                      >
                        {item.content}
                      </p>
                      <p className="text-gray-400 text-xs md:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${item.gradient} rounded-full`}
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl border border-gray-800 relative overflow-hidden"
              whileHover={{
                borderColor: "rgba(95, 57, 187, 0.5)",
                boxShadow: "0 20px 60px rgba(95, 57, 187, 0.2)",
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#5F39BB]/5 to-[#8B5CF6]/5 opacity-0 hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(95, 57, 187, 0.05), rgba(139, 92, 246, 0.05))",
                    "linear-gradient(45deg, rgba(139, 92, 246, 0.05), rgba(168, 85, 247, 0.05))",
                    "linear-gradient(45deg, rgba(95, 57, 187, 0.05), rgba(139, 92, 246, 0.05))",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="relative z-10">
                <InteractiveHeading
                  size="medium"
                  className="mb-6 md:mb-8"
                  onClick={() => console.log("Send us a Message clicked!")}
                >
                  Send us a Message
                </InteractiveHeading>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-gray-300"
                      >
                        Name *
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-[#5F39BB] focus:outline-none focus:ring-2 focus:ring-[#5F39BB]/20 transition-all duration-300"
                        placeholder="Your full name"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-gray-300"
                      >
                        Email *
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-[#5F39BB] focus:outline-none focus:ring-2 focus:ring-[#5F39BB]/20 transition-all duration-300"
                        placeholder="your.email@company.com"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Company
                    </label>
                    <motion.input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-[#5F39BB] focus:outline-none focus:ring-2 focus:ring-[#5F39BB]/20 transition-all duration-300"
                      placeholder="Your company name"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Message *
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-[#5F39BB] focus:outline-none focus:ring-2 focus:ring-[#5F39BB]/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project and how we can help..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(95, 57, 187, 0.4)",
                      background:
                        "linear-gradient(45deg, #5F39BB, #8B5CF6, #A855F7)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] hover:from-[#5F39BB] hover:to-[#7C3AED] px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Sending...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-gray-900/30 to-black relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <InteractiveHeading
            size="large"
            className="mb-6 md:mb-8"
            onClick={() => console.log("Ready to Get Started clicked!")}
          >
            Ready to Get Started?
          </InteractiveHeading>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Join the growing number of companies that have transformed their
            operations with SAEMA's intelligent automation solutions. Let's
            discuss your specific needs and create a customized roadmap for your
            digital transformation journey.
          </motion.p>

          <Link href="/">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(95, 57, 187, 0.4)",
                background: "linear-gradient(45deg, #5F39BB, #8B5CF6, #A855F7)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] hover:from-[#5F39BB] hover:to-[#7C3AED] px-8 md:px-12 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 relative overflow-hidden"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="relative z-10"
              >
                Explore Our Services
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
