import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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

// Variants for image animation
const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  })
};

function MyProjects() {
  const [activeCategory, setActiveCategory] = useState("1");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: no direction, 1: next, -1: prev
  
  const handleCardClick = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    setDirection(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  const nextImage = () => {
    setDirection(1);
    if (selectedProject) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    setDirection(-1);
    if (selectedProject) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Handle swipe for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Left swipe - next image
      nextImage();
    } else if (touchEnd - touchStart > 50) {
      // Right swipe - previous image
      prevImage();
    }
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
    <div className="min-h-screen bg-[#021129] py-8 md:py-10 pt-32 md:pt-40">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MY PROJECTS
        </motion.h1>
        
        <motion.div 
          className="flex justify-center mb-10 md:mb-14 gap-3 md:gap-5 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {Object.entries(category).map(([id, name]) => (
            <motion.button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`px-5 py-2 md:px-7 md:py-2.5 rounded-full transition-colors text-sm md:text-base font-medium ${
                activeCategory === id 
                  ? 'bg-blue-600 text-white shadow-lg' 
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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
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
            className="text-center text-gray-400 mt-10 md:mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg">No projects found in this category.</p>
          </motion.div>
        )}
        
        {/* Project Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
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
                <div className="sticky top-0 bg-gray-900 p-5 flex justify-between items-center rounded-t-xl z-10 border-b border-gray-700">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h2>
                  <motion.button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white text-3xl bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    &times;
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-5 md:p-8">
                  {/* Image Carousel */}
                  <div className="relative mb-6 md:mb-8 rounded-lg overflow-hidden bg-gray-900 p-2">
                    <div 
                      className="relative h-60 md:h-80 lg:h-96"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <AnimatePresence custom={direction} initial={false}>
                        <motion.img
                          key={activeImageIndex}
                          src={selectedProject.images[activeImageIndex]}
                          alt={`${selectedProject.title} - Image ${activeImageIndex + 1}`}
                          className="absolute inset-0 w-full h-full object-contain"
                          custom={direction}
                          variants={imageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            
                            if (swipe < -10000) {
                              // Swipe left - next image
                              nextImage();
                            } else if (swipe > 10000) {
                              // Swipe right - previous image
                              prevImage();
                            }
                          }}
                        />
                      </AnimatePresence>
                      
                      {/* Navigation Arrows */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <motion.button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all z-10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </motion.button>
                          <motion.button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all z-10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm md:text-base z-10">
                        {activeImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    </div>
                    
                    {/* Thumbnails */}
                    {selectedProject.images.length > 1 && (
                      <div className="flex overflow-x-auto space-x-3 mt-4 pb-2 px-1">
                        {selectedProject.images.map((image, index) => (
                          <motion.img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-20 h-16 md:w-24 md:h-20 object-cover rounded cursor-pointer transition-all ${
                              index === activeImageIndex ? 'ring-3 ring-blue-500 opacity-100' : 'opacity-70 hover:opacity-90'
                            }`}
                            onClick={() => {
                              setDirection(index > activeImageIndex ? 1 : -1);
                              setActiveImageIndex(index);
                            }}
                            whileHover={{ scale: 1.05 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2">
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-5 border-b border-gray-700 pb-2">Description</h3>
                      <div className="space-y-4">
                        {selectedProject.desc.map((paragraph, index) => (
                          <p key={index} className="text-gray-300 text-base md:text-lg leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-5 md:space-y-6">
                      <div className="bg-gray-700 p-4 md:p-5 rounded-lg">
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 border-b border-gray-600 pb-2">Project Details</h3>
                        <div className="space-y-2">
                          <p className="text-gray-300 text-base md:text-lg">
                            <span className="font-medium">Year:</span> {selectedProject.year}
                          </p>
                          {selectedProject.code && (
                            <p className="text-gray-300 text-base md:text-lg">
                              <span className="font-medium">Code:</span>{" "}
                              <a
                                href={selectedProject.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline break-all"
                              >
                                View Repository
                              </a>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-700 p-4 md:p-5 rounded-lg">
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 border-b border-gray-600 pb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {selectedProject.tech.map((technology, index) => (
                            <motion.span
                              key={index}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm md:text-base rounded-full"
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