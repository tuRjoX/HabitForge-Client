import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | HabitForge</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 Text */}
            <div className="relative mb-8">
              <h1 className="text-[150px] md:text-[200px] font-bold text-gray-200 dark:text-gray-800 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                The page you're looking for seems to have wandered off on its
                own habit-building journey. Let's get you back on track!
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <FiHome className="w-5 h-5" />
                Go to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <FiArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </motion.div>

            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md max-w-sm mx-auto"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="text-primary-500 font-semibold">
                  Did you know?
                </span>{" "}
                It takes an average of 66 days to form a new habit. Start your
                journey today!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
