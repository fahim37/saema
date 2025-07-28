"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Make sure to import ArrowLeft

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactPage, setIsContactPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check if current page is contact page
    setIsContactPage(window.location.pathname === "/contact");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 px-3 md:px-4 lg:px-6 py-2 ${
          isScrolled ? "bg-black/90 backdrop-blur-md " : "bg-transparent"
        } transition-all duration-300`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href={"/"} className="flex items-center">
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
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {isContactPage ? (
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
            ) : (
              <motion.div>
                <Link
                  href="/contact"
                  className="relative group font-medium text-sm lg:text-base"
                >
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ y: -2 }}
                    className={`relative z-10 transition-colors duration-300 ${
                      isScrolled ? "text-white" : "text-white/90"
                    } group-hover:text-white`}
                  >
                    Contact
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    whileHover={{ scale: 1.1 }}
                  />
                </Link>
              </motion.div>
            )}
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
              className={`w-5 h-0.5 ${
                isScrolled
                  ? "bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6]"
                  : "bg-white/90"
              } transition-all duration-300`}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-5 h-0.5 ${
                isScrolled
                  ? "bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6]"
                  : "bg-white/90"
              } transition-all duration-300`}
            />
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
              className={`w-5 h-0.5 ${
                isScrolled
                  ? "bg-gradient-to-r from-[#5F39BB] to-[#8B5CF6]"
                  : "bg-white/90"
              } transition-all duration-300`}
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
          className="md:hidden overflow-hidden bg-gradient-to-r from-[#5F39BB]/10 to-[#8B5CF6]/10 backdrop-blur-md rounded-lg mt-4"
        >
          <div className="px-4 py-4 space-y-3">
            {isContactPage ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isMobileMenuOpen
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/"
                  className="flex items-center space-x-2 py-2 text-base hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5F39BB] hover:to-[#8B5CF6] transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isMobileMenuOpen
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/contact"
                  className="block py-2 text-base hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5F39BB] hover:to-[#8B5CF6] transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
