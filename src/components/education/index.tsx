import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faTrophy, faAward, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import skul from '@/assets/skul.jpg';
import skul1 from '@/assets/skul1.jpg';
import skul2 from '@/assets/skul2.jpg';
import skul3 from '@/assets/utschool.jpg';
import skul4 from '@/assets/utschool1.jpg';
import skul5 from '@/assets/utschool3.jpg';

function Wrapper({ children }) {
  return (
    <div className="mx-auto container gap-10 p-10 grid grid-cols-1 my-10 max-w-screen-xl">
      <motion.div
        className="flex justify-center items-start flex-col mb-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Education() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const achievementsByYear = {
    2025: [
      { icon: faMedal, title: 'UT School Graduates', date: 'Aug 2025', color: 'from-amber-600 to-yellow-600' },
      { icon: faMedal, title: 'ASTRAtech Training Test Certificate', date: 'Aug 2025', color: 'from-amber-600 to-yellow-600' },
    ],
    2024: [
      { icon: faTrophy, title: 'Best Student In The Department Basic Computer And Networking Techiques', date: 'Mei 2024', color: 'from-yellow-400 to-orange-500' },
    ],
    2023: [
      { icon: faAward, title: 'Certificate of Competence', date: 'Mar 2023', color: 'from-blue-500 to-purple-600' },
    ],
    2022: [
      { icon: faMedal, title: 'Sutomo World Education Expo 2022 (Robotic)', date: 'Sept 2022', color: 'from-amber-600 to-yellow-600' },
      { icon: faMedal, title: 'Cargo Transporter Loader', date: 'Nov 2022', color: 'from-amber-600 to-yellow-600' },
    ],
  };

  const allAchievements = Object.entries(achievementsByYear)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .flatMap(([year, achievements]) => achievements.map((achievement) => ({ ...achievement, year })));

  const visibleAchievements = isExpanded ? allAchievements : allAchievements.slice(0, 6);
  const hasMoreAchievements = allAchievements.length > 6;

  return (
    <Wrapper>
      <section className="grid gap-8 md:gap-12 bg-[#021129] min-h-screen text-white">
        {/* Header */}
        <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">Education</h1>
          <p className="text-white/70 max-w-[800px] mx-auto">
            Get to know more about my educational background.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Section - Left */}
          <motion.div
            className="px-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="font-medium text-lg mb-4 text-white">2023</div>
            <div>
              <h2 className="font-semibold text-xl text-white">SMKS IMELDA MEDAN</h2>
              <h3 className="text-md font-normal mb-3 text-white/80">BASIC COMPUTER AND NETWORKING TECHNIQUES</h3>
              <div className="gap-4 mb-4 flex items-stretch md:h-[300px] xl:h-[400px]">
                <div className="flex-[1] transition-all duration-300 ease-in-out group">
                  <img
                    src={skul}
                    width={400}
                    height={225}
                    alt="University"
                    className="rounded-lg w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  />
                </div>
                <div className="flex-[1] transition-all duration-300 ease-in-out group">
                  <img
                    src={skul1}
                    width={400}
                    height={225}
                    alt="University"
                    className="rounded-lg w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  />
                </div>
                <div className="flex-[1] transition-all duration-300 ease-in-out group">
                  <img
                    src={skul2}
                    width={400}
                    height={225}
                    alt="University"
                    className="rounded-lg w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
            </div>
            <div className="font-medium text-lg mb-4 text-white">2025</div>
            <div>
              <h2 className="font-semibold text-xl text-white">UNITED TRACTORS SCHOOL</h2>
              <h3 className="text-md font-normal mb-3 text-white/80">IT PROGRAMMER</h3>
              <div className="gap-4 mb-4 flex items-stretch md:h-[300px] xl:h-[400px]">
                <div className="flex-[1] transition-all duration-300 ease-in-out group">
                  <img
                    src={skul3}
                    width={400}
                    height={225}
                    alt="University"
                    className="rounded-lg w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  />
                </div>
                <div className="flex-[1] transition-all duration-300 ease-in-out group">
                  <img
                    src={skul4}
                    width={400}
                    height={225}
                    alt="University"
                    className="rounded-lg w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  />
                </div>
                <div className="flex-[1] transition-all duration-300 ease-in-out group">
                  <img
                    src={skul5}
                    width={400}
                    height={225}
                    alt="University"
                    className="rounded-lg w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements Section - Right */}
          <motion.div
            className="flex flex-col justify-start px-5 md:px-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-semibold text-xl mt-7 text-white">Achievements</h2>
            <p className="text-md font-normal mb-3 md:mb-6 text-white/80">
              Some of my achievements during my study.
            </p>
            <div className="relative">
              <div className="space-y-4">
                <AnimatePresence>
                  {visibleAchievements.map((achievement, index) => (
                    <motion.div
                      key={`${achievement.year}-${index}`}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      {index === 0 || visibleAchievements[index - 1]?.year !== achievement.year ? (
                        <div className="flex items-center gap-3 mb-3 mt-2">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{achievement.year}</span>
                          </div>
                          <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
                        </div>
                      ) : null}

                      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300 hover:shadow-xl grayscale-0">
                        <div className="flex items-center gap-4">
                          <div
                            className={`aspect-square w-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-primary-foreground transition-all duration-300`}
                          >
                            <FontAwesomeIcon icon={achievement.icon} className="text-white h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{achievement.title}</h3>
                            <div className="text-xs text-white/70 mt-1">{achievement.date}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {!isExpanded && hasMoreAchievements && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/30 via-white/70 to-transparent pointer-events-none hidden md:block"></div>
              )}
              {hasMoreAchievements && (
                <motion.div className="flex justify-center mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/40 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl text-white"
                  >
                    <span>{isExpanded ? `Show Less` : `Show ${allAchievements.length - 4} More`}</span>
                    <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="h-3 w-3 transition-transform duration-300 text-white" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Wrapper>
  );
}