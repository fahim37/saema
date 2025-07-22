"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  simple = false,
}: { text: string; className?: string; delay?: number; simple?: boolean }) => {
  if (simple) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.5, ease: "easeOut" }}
        className={className}
      >
        {text}
      </motion.div>
    )
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
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 bg-black/90 backdrop-blur-md border-b border-gray-800/50"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/images/saema-logo.png"
                alt="SAEMA Logo"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </motion.div>
          </Link>
          <Link href="/" className="flex items-center space-x-2 text-[#6559FF] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#6559FF] text-sm font-semibold tracking-wider uppercase mb-4"
            >
              <AnimatedText text="GET IN TOUCH" />
            </motion.p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <AnimatedText text="Contact" delay={0.5} />
              <br />
              <AnimatedText text="Us" className="text-[#6559FF]" delay={0.8} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8">
                <AnimatedText text="Let's Start a Conversation" delay={0.2} />
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Whether you're looking to automate your first process or scale your existing RPA implementation, our
                team of experts is here to help. We offer comprehensive consultation and can guide you through every
                step of your automation journey.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "hello@saema.dev",
                  description: "Send us an email and we'll respond within 24 hours",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+49 (0) 123 456 789",
                  description: "Mon-Fri from 9am to 6pm CET",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "Berlin, Germany",
                  description: "Schedule a meeting at our office",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-[#6559FF]/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#6559FF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#6559FF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-[#6559FF] font-medium mb-1">{item.content}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold mb-8">
              <AnimatedText text="Send us a Message" delay={0.6} />
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-[#6559FF] focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-[#6559FF] focus:outline-none transition-colors"
                    placeholder="your.email@company.com"
                  />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-[#6559FF] focus:outline-none transition-colors"
                  placeholder="Your company name"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-[#6559FF] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project and how we can help..."
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(101, 89, 255, 0.4)",
                  background: "linear-gradient(45deg, #6559FF, #7c6aff)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#6559FF] hover:bg-[#5449ee] px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            <AnimatedText text="Ready to Get Started?" />
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the growing number of companies that have transformed their operations with SAEMA's intelligent
            automation solutions. Let's discuss your specific needs and create a customized roadmap for your digital
            transformation journey.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(101, 89, 255, 0.4)",
                background: "linear-gradient(45deg, #6559FF, #7c6aff)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#6559FF] hover:bg-[#5449ee] px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Explore Our Services
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div className="mb-4 md:mb-0">
              <Image src="/images/saema-logo.png" alt="SAEMA Logo" width={120} height={40} className="h-10 w-auto" />
            </div>
            <div className="flex space-x-8 text-sm text-gray-400">
              <Link href="#" className="hover:text-[#6559FF] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#6559FF] transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-[#6559FF] transition-colors">
                Contact
              </Link>
            </div>
          </motion.div>
          <div className="text-center text-gray-500 text-sm mt-8">© 2024 SAEMA. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
