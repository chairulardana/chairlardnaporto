import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import avatar from '@/assets/avatar2.png';
import TrueFocus from "../../TrueFocus/TrueFocus";

function AboutSection() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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
        delayChildren: 0.2
      }
    }
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
        duration: 0.8
      }
    }
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
  const handleNavigate = () => {
    navigate({ to: "/aboutme" });
  };

  return (
    <section id="about" className="min-h-screen bg-[#021129] relative overflow-hidden flex items-center py-12 md:py-8">
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
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
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
                    src={avatar}
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
          <div className="order-last lg:order-first space-y-5 md:space-y-8 flex flex-col items-center lg:items-start w-full">
            {/* Title Section */}
            <motion.div 
              className="w-full flex justify-center lg:justify-start"
              variants={itemVariants}
            >
               <TrueFocus 
                  sentence="About Me"
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
             A brief introduction about me and my interest.
            </motion.p>

            {/* Navigate Button */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex justify-center lg:justify-start w-full"
            >
              <Button
                onClick={handleNavigate}
                size="lg"
                className="group relative overflow-hidden 
                           bg-gradient-to-r from-blue-500/20 to-cyan-400/20
                           hover:from-blue-500/30 hover:to-cyan-400/30
                           border border-white/20 backdrop-blur-sm
                           hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20
                           text-white transition-all duration-300
                           px-5 py-4 sm:px-6 sm:py-5 rounded-xl text-sm sm:text-base"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                
                <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <motion.div
                    whileHover={{ 
                      rotate: 5,
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                   <span className="font-medium">Learn More</span>
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;