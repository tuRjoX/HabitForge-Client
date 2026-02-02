import { motion } from "framer-motion";
import {
  FiPlusCircle,
  FiCheckSquare,
  FiBarChart2,
  FiAward,
} from "react-icons/fi";

const steps = [
  {
    id: 1,
    icon: FiPlusCircle,
    title: "Create Your Habit",
    description:
      "Define what habit you want to build, set a category, and choose your daily reminder time.",
    color: "bg-primary-500",
  },
  {
    id: 2,
    icon: FiCheckSquare,
    title: "Complete Daily",
    description:
      "Mark your habit complete each day to build momentum and maintain your streak.",
    color: "bg-secondary-500",
  },
  {
    id: 3,
    icon: FiBarChart2,
    title: "Track Progress",
    description:
      "View your completion history, analyze patterns, and see your improvement over time.",
    color: "bg-accent-500",
  },
  {
    id: 4,
    icon: FiAward,
    title: "Celebrate Success",
    description:
      "Earn streak badges, reach milestones, and celebrate your consistency achievements.",
    color: "bg-blue-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle">
            Get started in minutes with our simple four-step process to building
            lasting habits
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  {/* Step Number */}
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Step Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span
                      className={`inline-block w-8 h-8 ${step.color} text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md`}
                    >
                      {step.id}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (for non-last items on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <motion.svg
                      className="w-8 h-8 text-gray-300 dark:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </motion.svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
