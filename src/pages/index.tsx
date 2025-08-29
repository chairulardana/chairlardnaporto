import { createFileRoute } from "@tanstack/react-router";
import BlurText from "@/components/BlurText/BlurText";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import avatar from '@/assets/avatar.png';
import { useState, useEffect, useRef } from "react";
import AboutSection from "@/components/aboutComponents/AboutSection";
import MyProjectSection from "@/components/MyProject";
import ContactSection from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const headerConfig = {
    delay: 500,
    animateBy: "words" as "words",
    direction: "top" as "top" | "bottom" | undefined,
  };

  const [isImageHovered, setIsImageHovered] = useState(false);
  const homeSectionRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCvAvailable, setIsCvAvailable] = useState(true);

  // Check if CV file is available
  useEffect(() => {
    const checkCvAvailability = async () => {
      try {
        const response = await fetch('/cv.pdf', { method: 'HEAD' });
        setIsCvAvailable(response.ok);
      } catch (error) {
        console.error('CV file not found:', error);
        setIsCvAvailable(false);
      }
    };

    checkCvAvailability();
  }, []);

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

  // Animation variants for sections
  const sectionVariants: Variants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: 0.2
      }
    }
  };

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

  const handleDownload = () => {
    if (!isCvAvailable) {
      alert('CV file is currently unavailable. Please try again later or contact me directly.');
      return;
    }

    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'CVChairulArdana.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Optimized scroll handling with Intersection Observer
  useEffect(() => {
    const homeSection = homeSectionRef.current;
    if (!homeSection) return;

    const handleScroll = () => {
      const sectionTop = homeSection.getBoundingClientRect().top;
      const sectionBottom = homeSection.getBoundingClientRect().bottom;

      if (sectionTop < window.innerHeight && sectionBottom >= 0) {
        homeSection.classList.add("animate");
      } else {
        homeSection.classList.remove("animate");
      }
    };

    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", optimizedScroll);
    };
  }, []);

  // Add CSS for smooth scrolling on mobile
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      body {
        overflow-x: hidden;
      }
      .scroll-container {
        -webkit-overflow-scrolling: touch;
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
      * {
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#021129] overflow-x-hidden scroll-container">
      {/* Home Section */}
      <section 
        ref={homeSectionRef} 
        id="home" 
        className="min-h-screen relative flex items-center py-4 md:py-4"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-blue-500/10 rounded-full blur-[70px] md:blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-cyan-400/10 rounded-full blur-[70px] md:blur-[100px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          variants={containerVariants}
          className="container mx-auto px-4 md:px-4 relative z-10 w-full"
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 items-center max-w-6xl mx-auto w-full">
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
                {/* Image Decorative Glow */}
                <div className="absolute -inset-2 md:-inset-3 -z-10">
                  <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-blue-500/20 rounded-full blur-[20px] md:blur-[30px]" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-cyan-400/20 rounded-full blur-[20px] md:blur-[30px]" />
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="order-last lg:order-first space-y-4 md:space-y-6 flex flex-col items-center lg:items-start w-full">
              {/* Name Section */}
              <motion.div 
                className="w-full flex justify-center lg:justify-start"
                variants={itemVariants}
              >
                <BlurText
                  text="Chairul Ardana"
                  {...headerConfig}
                  className="inline-block uppercase text-lg sm:text-xl md:text-2xl tracking-[0.15em] sm:tracking-[0.2em] text-white/90 font-light text-center lg:text-left"
                />
              </motion.div>

              {/* Title Section */}
              <motion.div 
                className="w-full flex justify-center lg:justify-start"
                variants={itemVariants}
              >
                <BlurText
                  text="Fullstack Developer"
                  {...headerConfig}
                  className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-center lg:text-left"
                />
              </motion.div>

              {/* Description Section */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base md:text-lg text-gray-300/80 leading-relaxed max-w-xl text-center lg:text-left"
              >
                I'm a Junior Full Stack Developer skilled in building websites and applications from database management 
                and backend development to creating responsive and engaging frontends — with a focus on performance 
                and user experience.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="pt-2 flex justify-center lg:justify-start w-full"
              >
                <Button
                  onClick={handleDownload}
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
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </motion.div>
                    <span className="font-medium">Download CV</span>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <AboutSection />
      </motion.div>

      {/* Projects Section */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <MyProjectSection />
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <ContactSection />
      </motion.div>
    </div>
  );
}

export default RouteComponent;