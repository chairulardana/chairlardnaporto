import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { createFileRoute } from "@tanstack/react-router"
import BlurText from "@/components/BlurText/BlurText"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  const headerConfig = {
    delay: 500,
    animateBy: "words" as "words",
    direction: "top" as "top" | "bottom" | undefined,
  }

  const descriptionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        delay: 0.8,
      },
    },
  }

  const handleDownload = () => {
    window.open("/path-to-your-cv.pdf", "_blank")
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#021129] flex flex-col justify-center px-4 sm:px-6 md:px-16 lg:px-24">
      <div className="max-w-screen-xl mx-4 md:mx-8">
        {/* Name Section */}
        <BlurText
          text="Chairul Ardana"
          {...headerConfig}
          className="uppercase text-sm sm:text-base md:text-xl mb-3 font-normal tracking-[.15rem] sm:tracking-[.25rem] md:tracking-[.5rem] text-white ml-2 sm:ml-10 md:ml-20"
        />

        {/* Title Section */}
        <BlurText
          text="Fullstack Developer"
          {...headerConfig}
          className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white text-left ml-2 sm:ml-10 md:ml-20"
        />

        {/* Description Section */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
          className="mt-8 text-base sm:text-lg md:text-xl text-gray-300/80 max-w-[65ch] ml-2 sm:ml-10 md:ml-20 leading-relaxed font-light"
        >
          I'm a Full Stack Developer skilled in building websites and applications from database management and backend development to creating responsive and engaging frontends — with a focus on performance and user experience.
        </motion.p>

        {/* Enhanced Download Button */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="ml-2 sm:ml-10 md:ml-20 mt-8"
        >
          <Button
            onClick={handleDownload}
            size="lg"
            className="relative overflow-hidden group bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-cyan-400/10
                       border border-white/20 backdrop-blur-sm
                       hover:from-blue-500/20 hover:via-blue-400/20 hover:to-cyan-400/20
                       hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20
                       text-white transition-all duration-500
                       px-8 py-6 rounded-xl"
          >
            {/* Animated background shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Button content */}
            <div className="relative z-10 flex items-center gap-3">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ 
                  rotate: 5,
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <svg
                  className="w-6 h-6"
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
              <span className="font-medium tracking-wide">Unduh CV</span>
            </div>
          </Button>
        </motion.div>
      </div>
    </main>
  )
}

export { Button, buttonVariants }