import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const experiences = [
  {
    id: 1,
    startDate: "Oktober 2022",
    endDate: "Februari 2023",
    company: "PT Micro Mulia Agung Sentosa",
    position: "IT Support",
    location: "Medan, Indonesia",
    type: "Field practice",
    description:
      "Troubleshooting Security on LAN Networks, Configuring Mikrotik, Lan Network Maintenance, Server Room Maintenance.",
    skills: ["Mentoring", "Teamwork", "Mikrotik", "Troubleshooting"],
  },
  {
    id: 2,
    startDate: "Maret 2025",
    endDate: "Juli 2025",
    company: "PT United Tractors Tbk",
    position: "Full Stack Web Developer",
    type: "Work From Office",
    location: "Jakarta, Indonesia",
    description:
      "Financial Monitoring Website Creation (Fullstack Web Developer), Wiki Project Creation and Management.",
    skills: ["React JS", "ShadCN UI", "Vite", "SQL Server", "ASP .NET Core", "C#", "Material UI"],
  },
];

function Title() {
  return (
    <div className="flex flex-col justify-center items-center w-full mb-12">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Professional Experience
      </motion.h1>
      <motion.div 
        className="h-1 w-20 bg-cyan-400 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      ></motion.div>
    </div>
  );
}

function TimelineCard({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-gradient-to-r from-cyan-900/70 to-blue-900/70 text-white px-6 py-4 rounded-xl shadow-lg shadow-cyan-500/20 border border-cyan-400/30 mb-6"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="text-sm font-bold">{experience.startDate}</div>
          <div className="text-xs text-cyan-300">Start</div>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-cyan-500/50"></div>
        
        <div className="text-center">
          <div className="text-sm font-bold">{experience.endDate}</div>
          <div className="text-xs text-cyan-300">End</div>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-cyan-500/50"></div>
        
        <div className="text-center md:text-right">
          <div className="text-sm font-medium text-cyan-300">{experience.location}</div>
          <div className="text-xs text-cyan-300">Location</div>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceCard({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
      className="bg-blue-900/30 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:bg-blue-800/40 transition-all duration-300 mb-8"
    >
      {/* Company & Position */}
      <div className="mb-5">
        <h3 className="font-bold text-xl text-cyan-400 mb-1">{experience.company}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-medium text-lg text-white">{experience.position}</h4>
          <span className="text-sm font-normal text-cyan-300">• {experience.type}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-justify leading-relaxed mb-5">{experience.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-cyan-900/50 hover:bg-cyan-800/60 border border-cyan-400/40 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);

  return (
    <section id="experience" className="bg-[#021129] min-h-screen py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Title />
        
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {displayedExperiences.map((experience, index) => (
              <div key={experience.id} className="relative mb-12">
                {/* Timeline period card */}
                <TimelineCard experience={experience} index={index} />

                {/* Experience content card */}
                <ExperienceCard experience={experience} index={index} />
              </div>
            ))}
          </AnimatePresence>
          
          {/* Expand/Collapse button */}
          {experiences.length > 2 && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/30 flex items-center gap-2"
              >
                {showAll ? (
                  <>
                    Show Less
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    View More Experience
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}