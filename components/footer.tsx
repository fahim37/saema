import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      {" "}
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
              }}
            >
              <Image
                src="/images/footer-logo.png"
                alt="SAEMA Logo"
                width={120}
                height={60}
                className="h-10 md:h-14 w-auto"
              />
            </motion.div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8 text-xs md:text-sm text-gray-400">
              {["Contact"].map((item, index) => (
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
            © 2025 SAEMA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
