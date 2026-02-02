import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FiArrowRight, FiClock, FiUser, FiCalendar } from "react-icons/fi";
import HabitCard from "../habits/HabitCard";
import LoadingSpinner from "../shared/LoadingSpinner";

const FeaturedHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedHabits = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/habits/featured`,
        );
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching featured habits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedHabits();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (loading) {
    return <LoadingSpinner fullScreen={false} />;
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-4">
            Featured Habits
          </span>
          <h2 className="section-title">
            Discover Popular <span className="gradient-text">Habits</span>
          </h2>
          <p className="section-subtitle">
            Explore the newest public habits from our community and get inspired
            to start your own journey
          </p>
        </motion.div>

        {/* Habits Grid */}
        {habits.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {habits.map((habit) => (
              <motion.div key={habit._id} variants={itemVariants}>
                <HabitCard habit={habit} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No habits found. Be the first to create one!
            </p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/browse-habits"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Browse All Habits
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedHabits;
