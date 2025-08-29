import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { createLazyFileRoute } from '@tanstack/react-router';
import Projects from '@/components/ProjectComponents/json/data.json';

// ProjectCard Component
function ProjectCard({ project, index, activeCategory, onCardClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>
      {project.category.includes(parseInt(activeCategory)) && (
        <motion.div 
          className="block cursor-pointer"
          onClick={() => onCardClick(project)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
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

ProjectCard.propTypes = {
  project: PropTypes.shape({
    category: PropTypes.arrayOf(PropTypes.number).isRequired,
    slug: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.arrayOf(PropTypes.string).isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  activeCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onCardClick: PropTypes.func.isRequired,
};

// MyProjects Page
export const Route = createLazyFileRoute('/MyProjects/')({
  component: MyProjects,
});

const category = {
  1: "Web Development",
  2: "AI & Machine Learning",
  9: "Other",
};

function MyProjects() {
  const [activeCategory, setActiveCategory] = useState("1");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const handleCardClick = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300); // Wait for the animation to complete
  };

  const nextImage = () => {
    if (selectedProject) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Handle swipe for mobile - FIXED VERSION
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diffX = touchStartX.current - touchEndX.current;
    
    // Minimum swipe distance to trigger navigation
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Left swipe - next image
        nextImage();
      } else {
        // Right swipe - previous image
        prevImage();
      }
    }
    
    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedProject]);

  return (
    <div className="min-h-screen bg-gray-900 py-8 md:py-10">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h1>
        
        <motion.div 
          className="flex justify-center mb-8 md:mb-10 gap-2 md:gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {Object.entries(category).map(([id, name]) => (
            <motion.button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full transition-colors text-sm md:text-base ${
                activeCategory === id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {name}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {Projects.Projects.map((project, index) => (
            <ProjectCard
              project={project}
              key={index}
              index={index}
              activeCategory={activeCategory}
              onCardClick={handleCardClick}
            />
          ))}
        </motion.div>
        
        {Projects.Projects.filter(project => project.category.includes(parseInt(activeCategory))).length === 0 && (
          <motion.div 
            className="text-center text-gray-400 mt-8 md:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>No projects found in this category.</p>
          </motion.div>
        )}
        
        {/* Project Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseModal}
            >
              <motion.div 
                className="bg-gray-800 rounded-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-gray-900 p-4 flex justify-between items-center rounded-t-xl z-10">
                  <h2 className="text-xl md:text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <motion.button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white text-2xl bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    &times;
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  {/* Image Carousel */}
                  <div className="relative mb-4 md:mb-6 rounded-lg overflow-hidden">
                    <div 
                      className="relative h-60 md:h-80 lg:h-96"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <motion.img
                        key={activeImageIndex}
                        src={selectedProject.images[activeImageIndex]}
                        alt={`${selectedProject.title} - Image ${activeImageIndex + 1}`}
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Navigation Arrows */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage();
                            }}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </motion.button>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage();
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                        {activeImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    </div>
                    
                    {/* Thumbnails */}
                    {selectedProject.images.length > 1 && (
                      <div className="flex overflow-x-auto space-x-2 mt-3 md:mt-4 pb-2">
                        {selectedProject.images.map((image, index) => (
                          <motion.img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-16 h-12 md:w-20 md:h-16 object-cover rounded cursor-pointer transition-all ${
                              index === activeImageIndex ? 'ring-2 ring-blue-500 opacity-100' : 'opacity-70'
                            }`}
                            onClick={() => setActiveImageIndex(index)}
                            whileHover={{ scale: 1.05 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Description</h3>
                      {selectedProject.desc.map((paragraph, index) => (
                        <p key={index} className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div>
                      <div className="bg-gray-700 p-3 md:p-4 rounded-lg mb-3 md:mb-4">
                        <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">Project Details</h3>
                        <p className="text-gray-300 text-sm md:text-base">
                          <span className="font-medium">Year:</span> {selectedProject.year}
                        </p>
                        {selectedProject.code && (
                          <p className="text-gray-300 text-sm md:text-base mt-1 md:mt-2">
                            <span className="font-medium">Code:</span>{" "}
                            <a
                              href={selectedProject.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              View Repository
                            </a>
                          </p>
                        )}
                      </div>

                      <div className="bg-gray-700 p-3 md:p-4 rounded-lg">
                        <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {selectedProject.tech.map((technology, index) => (
                            <motion.span
                              key={index}
                              className="px-2 py-0.5 md:px-3 md:py-1 bg-blue-600 text-white text-xs md:text-sm rounded-full"
                              whileHover={{ scale: 1.05 }}
                            >
                              {technology}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MyProjects;