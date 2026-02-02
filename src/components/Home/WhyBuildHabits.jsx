import { motion } from "framer-motion";
import { FiZap, FiHeart, FiTarget, FiTrendingUp } from "react-icons/fi";

const benefits = [
  {
    id: 1,
    icon: FiZap,
    title: "Better Focus",
    description:
      "Develop laser-sharp concentration through consistent daily practices that train your mind to stay present and productive.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: FiHeart,
    title: "Reduced Stress",
    description:
      "Build calming routines that help manage anxiety and create a sense of control over your daily life and wellbeing.",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 3,
    icon: FiTarget,
    title: "Clear Goals",
    description:
      "Transform vague aspirations into concrete, achievable daily actions that compound into remarkable long-term results.",
    color: "from-primary-500 to-green-500",
  },
  {
    id: 4,
    icon: FiTrendingUp,
    title: "Consistent Growth",
    description:
      "Experience steady personal development as small daily improvements accumulate into transformative life changes.",
    color: "from-purple-500 to-violet-500",
  },
];

const WhyBuildHabits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-full text-sm font-medium mb-4">
            Why Habits Matter
          </span>
          <h2 className="section-title">
            Why Build <span className="gradient-text">Habits</span>?
          </h2>
          <p className="section-subtitle">
            Discover how building consistent habits can transform every aspect
            of your life
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="card p-6 text-center group cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${benefit.color} 
                              flex items-center justify-center transform group-hover:scale-110 
                              transition-transform duration-300 shadow-lg`}
              >
                <benefit.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>

              {/* Decorative element */}
              <div
                className={`mt-6 h-1 w-12 mx-auto rounded-full bg-gradient-to-r ${benefit.color} 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { number: "10K+", label: "Active Users" },
            { number: "50K+", label: "Habits Created" },
            { number: "1M+", label: "Days Tracked" },
            { number: "98%", label: "Success Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md"
            >
              <motion.p
                className="text-3xl md:text-4xl font-bold gradient-text"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBuildHabits;
