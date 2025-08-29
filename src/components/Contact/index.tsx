import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import contact from "@/assets/contact.jpg";
import TrueFocus from "../TrueFocus/TrueFocus";
import gihub from "@/assets/github.png";
import linkedin from "@/assets/linkedin.png";
import ig from "@/assets/ig.png";
import LogoLoop from "@/components/LogoLoop/LogoLoop";

function ContactSection() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const imageLogos = [
    { src: gihub, alt: "Github", href: "https://github.com/chairulardana" },
    { src: linkedin, alt: "Linkedin", href: "https://www.linkedin.com/in/chairul-ardana/" },
    { src: ig, alt: "Instagram", href: "https://www.instagram.com/chairlardnaa?igsh=MWIzanlkNzNuMmpnbQ==" },
  ];

  // Check if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  const imageHoverVariants: Variants = {
    normal: { 
      scale: 1,
      filter: "grayscale(0%)",
      transition: { duration: 0.5 }
    },
    grayscale: { 
      scale: 1,
      filter: "grayscale(100%)",
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      filter: "grayscale(0%)",
      transition: { duration: 0.3 }
    }
  };

  const emailVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-[#021129] relative overflow-hidden flex flex-col justify-start py-8 md:py-6"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-blue-500/10 rounded-full blur-[70px] md:blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-cyan-400/10 rounded-full blur-[70px] md:blur-[100px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20%" }}
        variants={containerVariants}
        className="container mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center mt-10 md:mt-12"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto mb-8 md:mb-10">
          {/* Image Section */}
          <motion.div
            className="relative order-first lg:order-last flex justify-center mb-6 md:mb-0"
            variants={itemVariants}
          >
            <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 mx-auto lg:mx-0">
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden border-2 border-blue-400/30 
                            shadow-2xl shadow-blue-500/20 backdrop-blur-sm w-full h-full"
                variants={imageHoverVariants}
                initial={isMobile ? "normal" : "grayscale"}
                animate={
                  isMobile 
                    ? "normal" 
                    : isImageHovered ? "hover" : "grayscale"
                }
                whileHover={isMobile ? undefined : "hover"}
                onHoverStart={isMobile ? undefined : () => setIsImageHovered(true)}
                onHoverEnd={isMobile ? undefined : () => setIsImageHovered(false)}
              >
                <img 
                  src={contact}
                  alt="Chairul Ardana - Fullstack Developer" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>
              {/* Decorative Glow on Image */}
              <div className="absolute -inset-2 md:-inset-3 -z-10">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-blue-500/20 rounded-full blur-[20px] md:blur-[30px]" />
                <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-cyan-400/20 rounded-full blur-[20px] md:blur-[30px]" />
              </div>
            </div>
          </motion.div>
          
          <div className="order-last lg:order-first space-y-5 md:space-y-8 flex flex-col items-center lg:items-start w-full mt-6 lg:mt-12">
            {/* Title Section */}
            <motion.div
              className="w-full flex justify-center lg:justify-start"
              variants={itemVariants}
            >
              <TrueFocus
                sentence="Get In Touch"
                manualMode={false}
                blurAmount={5}
                borderColor="#3b82f6"
                animationDuration={2}
                pauseBetweenAnimations={1}
                textColor="white"
              />
            </motion.div>

            {/* Description Section */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-gray-300/80 leading-relaxed max-w-xl text-center lg:text-left px-4 lg:px-0"
            >
              Feel free to contact me if you have any questions or just want to say hi.
            </motion.p>
            
            {/* Email Section */}
            <motion.a
              href="mailto:chairulardana06@gmail.com"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-3 text-cyan-400 group mt-6 mx-auto lg:mx-0"
            >
              <motion.div
                variants={emailVariants}
                className="p-2 bg-blue-900/30 rounded-full border border-cyan-400/30 group-hover:border-cyan-400/50 transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 md:h-6 md:w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </motion.div>
              <span className="text-sm sm:text-base md:text-lg font-medium group-hover:text-cyan-300 transition-colors">
                chairulardana06@gmail.com
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
      
      {/* Full-width LogoLoop Section - Positioned closer to content */}
      <div className="w-full relative z-10 mt-auto py-6 md:py-8 overflow-hidden">
        <LogoLoop
          logos={imageLogos}
          speed={80}
          direction="left"
          logoHeight={48}
          gap={60}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#021129"
          ariaLabel="Social media links"
        />
      </div>
    </section>
  );
}

export default ContactSection;