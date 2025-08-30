import { motion } from "framer-motion";
import { useState } from "react";

interface Project {
  category: number[];
  slug: string;
  thumbnail: string;
  year: string | number;
  title: string;
  desc: string[];
  tech: string[];
  images: string[];
  code?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  activeCategory: string;
  onCardClick: (project: Project) => void;
}

function ProjectCard({ project, index, activeCategory, onCardClick }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <>
      {project.category.includes(parseInt(activeCategory)) && (
        <motion.div 
          className="block cursor-pointer"
          onClick={() => onCardClick(project)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <motion.div
            className="z-10 relative flex justify-center items-start flex-col mb-5 md:px-10 w-full h-auto bg-gray-800 group/tes py-12 md:py-2 px-5 aspect-video rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title || "Project image"}
                className={`w-full h-full object-cover bg-slate-950 opacity-30 group-hover/tes:opacity-100 transition-all ease duration-500 ${
                  !imageLoaded ? "blur-md" : "blur-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                style={{
                  transition: "filter 0.5s ease",
                }}
              />
            </div>
            <div className="absolute top-0 left-0 bg-blue-600 px-3 py-1 md:px-4 md:py-2">
              <h4 className="text-white text-xs md:text-sm">{project.year}</h4>
            </div>
            <div className="transition-all ease duration-500 opacity-100 content text-center group-hover/tes:opacity-0 z-10">
              <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white">{project.title}</h1>
              <p className="text-gray-300 text-sm md:text-base">
                {project.desc[0].length > 125
                  ? `${project.desc[0].slice(0, 125)}...`
                  : project.desc[0]}
              </p>
              <div className="flex justify-center items-center flex-row mt-3 md:mt-5 flex-wrap">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span
                    key={i}
                    className="m-1 px-2 py-0.5 md:px-3 md:py-1 bg-gray-700 text-white text-xs rounded-full"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="m-1 px-2 py-0.5 md:px-3 md:py-1 bg-gray-700 text-white text-xs rounded-full">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default ProjectCard;