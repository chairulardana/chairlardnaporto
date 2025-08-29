import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiCode, FiSmartphone, FiDatabase, FiServer } from "react-icons/fi";

const skillCategories = {
  web: {
    title: "Web Development",
    icon: FiCode,
    description: "Building modern, responsive web applications",
    languages: [
      "HTML",
      "CSS",
      "C#",
      "ASP.NET",
      "JavaScript",
      "TypeScript",
      "PHP",
      "Python",
      "React",
      "NextJS",
      "TailwindCSS",
      "Bootstrap",
      "NodeJS",
      "Laravel",
      "Firebase"
    ],
    tools: ["Visual Studio Code", "Visual Studio 2022", "Git", "Github", "Figma", "Vite", "Docker", "Postman"],
  },
  mobile: {
    title: "Mobile Development",
    icon: FiSmartphone,
    description: "Cross-platform mobile app development",
    languages: [
      "React Native",
      "JavaScript",
      "TypeScript",
    ],
    tools: [
      "Android Studio",
    ],
  },
};

function SkillCard({ skill, isSelected, onClick }) {
  const Icon = skill.icon;

  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer group p-6 rounded-2xl backdrop-blur-lg border-2 transition-all duration-300 ${
        isSelected
          ? "bg-blue-500/20 border-cyan-400 shadow-lg shadow-cyan-500/30"
          : "bg-blue-900/20 border-cyan-400/30 hover:bg-blue-800/30 hover:border-cyan-400/50"
      }`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Glow effect for selected state */}
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-md" />
      )}

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div
          className={`p-4 rounded-xl transition-all duration-300 ${
            isSelected 
              ? "bg-cyan-500/20 text-cyan-400" 
              : "bg-blue-800/30 text-cyan-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-400"
          }`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className={`font-semibold text-lg mb-2 ${
            isSelected ? "text-cyan-400" : "text-white"
          }`}>
            {skill.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {skill.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SkillDetails({ selectedSkill }) {
  if (!selectedSkill) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-12 space-y-8"
    >
      {/* Languages & Frameworks */}
      <motion.div
        className="backdrop-blur-lg bg-blue-900/30 border-2 border-cyan-400/30 rounded-2xl p-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
          Languages & Frameworks
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {selectedSkill.languages.map((lang, index) => (
            <motion.span
              key={lang}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                         border border-cyan-400/30 rounded-full text-cyan-300 font-medium
                         backdrop-blur-sm hover:scale-105 transition-transform cursor-default
                         hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30
                         hover:text-white hover:border-cyan-400/50"
            >
              {lang}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Tools */}
      <motion.div
        className="backdrop-blur-lg bg-blue-900/30 border-2 border-cyan-400/30 rounded-2xl p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
          Tools & Technologies
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {selectedSkill.tools.map((tool, index) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
                         border border-cyan-400/30 rounded-full text-cyan-300 font-medium
                         backdrop-blur-sm hover:scale-105 transition-transform cursor-default
                         hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-cyan-500/30
                         hover:text-white hover:border-cyan-400/50"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("web");
  
  return (
    <section id="skills" className="bg-[#021129] min-h-screen py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore my technical skills across different domains. Click on any
            category to see the specific technologies and tools I work with.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(skillCategories).map(([key, skill], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <SkillCard
                skill={skill}
                isSelected={selectedCategory === key}
                onClick={() => setSelectedCategory(key)}
              />
            </motion.div>
          ))}
        </div>

        {/* Skill Details */}
        <AnimatePresence mode="wait">
          <SkillDetails selectedSkill={skillCategories[selectedCategory]} />
        </AnimatePresence>
      </div>
    </section>
  );
}