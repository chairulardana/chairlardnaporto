import { motion } from "framer-motion";
import { useIntersectionObserver } from "./useIntersectionObserver";
import "./style.css";

function Wrapper({ children }) {
  return (
    <div className="min-h-[80vh] mx-auto container p-10 grid grid-cols-1 mt-10 bg-[#021129]">
      <motion.div
        className="flex justify-center items-center flex-col mb-5"
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.6,
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Quote() {
  const text1 = '"There is nothing impossible in this world. Keep learning'.split(" ");
  const text2 = 'and never stop dreaming as high as the sky until you fall among the stars."'.split(" ");
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <Wrapper>
      <div ref={ref} className="text-center">
        <h3 className="text-[2rem] text-white">
          {text1.map((word, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(4px)",
                scale: 0.92,
              }}
              animate={{
                opacity: isIntersecting ? 1 : 0,
                filter: isIntersecting ? "blur(0px)" : "blur(4px)",
                scale: isIntersecting ? 1 : 0.92,
              }}
              transition={{
                delay: isIntersecting ? index * 0.1 : 0,
                duration: 0.5,
              }}
              className="text-white"
            >
              {word}{" "}
            </motion.span>
          ))}
        </h3>
        <h3 className="text-xl text-white">
          {text2.map((word, index) => (
            <motion.span
              key={index + text1.length}
              initial={{
                opacity: 0,
                filter: "blur(4px)",
                scale: 0.92,
              }}
              animate={{
                opacity: isIntersecting ? 1 : 0,
                filter: isIntersecting ? "blur(0px)" : "blur(4px)",
                scale: isIntersecting ? 1 : 0.92,
              }}
              transition={{
                delay: isIntersecting ? (text1.length + index) * 0.1 : 0,
                duration: 0.5,
              }}
              className="text-white"
            >
              {word}{" "}
            </motion.span>
          ))}
        </h3>
      </div>
    </Wrapper>
  );
}