import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import avatar3 from '@/assets/avatar3.jpg';
import avatar4 from '@/assets/avatar4.jpg'; 
import avatar5 from '@/assets/avatar5.jpg';

function Title() {
  return (
    <motion.div 
      className="flex flex-col items-center w-full mb-12 md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="relative inline-block">
        <h1 className="text-4xl md:text-5xl font-bold text-white relative z-10">
          Who Am I?
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-cyan-500/30 -z-0"></div>
      </div>
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mt-4 rounded-full"></div>
    </motion.div>
  );
}

export default function AboutAMi() {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section id="about" className="bg-[#021129] min-h-screen py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Title />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Gallery */}
          <motion.div 
            className="relative h-80 md:h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div 
              className="absolute top-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/10 z-20"
              whileHover={{ 
                scale: isMobile ? 1 : 1.03,
                boxShadow: isMobile ? "0 0 15px rgba(34, 211, 238, 0.2)" : "0 0 25px rgba(34, 211, 238, 0.3)",
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <img 
                src={avatar3} 
                alt="Chairul Ardana" 
                className={`w-full h-full object-cover ${isMobile ? '' : 'grayscale hover:grayscale-0'} transition-all duration-500`}
              />
            </motion.div>
            
            <motion.div 
              className="absolute top-1/4 right-0 w-1/2 h-2/5 rounded-2xl overflow-hidden border-2 border-blue-400/30 shadow-lg shadow-blue-500/10 z-10"
              whileHover={{ 
                scale: isMobile ? 1 : 1.03,
                boxShadow: isMobile ? "0 0 15px rgba(59, 130, 246, 0.2)" : "0 0 25px rgba(59, 130, 246, 0.3)",
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <img 
                src={avatar4} 
                alt="Web Development" 
                className={`w-full h-full object-cover ${isMobile ? '' : 'grayscale hover:grayscale-0'} transition-all duration-500`}
              />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-0 left-1/4 w-2/5 h-2/5 rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/10 z-30"
              whileHover={{ 
                scale: isMobile ? 1 : 1.03,
                boxShadow: isMobile ? "0 0 15px rgba(34, 211, 238, 0.2)" : "0 0 25px rgba(34, 211, 238, 0.3)",
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <img 
                src={avatar5} 
                alt="Full Stack Development" 
                className={`w-full h-full object-cover ${isMobile ? '' : 'grayscale hover:grayscale-0'} transition-all duration-500`}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Chairul <span className="text-cyan-400">Ardana</span>
            </motion.h2>
            
            <motion.div 
              className="space-y-4 text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <p>
              Hi, my name is Chairul Ardana. I come from Medan, North Sumatra. I graduated with a top honors degree in Basic Computer and Network Engineering and attended certified training at United Tractors School Jakarta. As a junior developer, I have the skills to implement features on websites and mobile applications. I also have a basic understanding of networking.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}