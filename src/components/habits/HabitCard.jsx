import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiUser, FiZap, FiArrowRight } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

const categoryColors = {
  Morning:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Work: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Fitness: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Evening:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Study: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const HabitCard = ({ habit }) => {
  const {
    _id,
    title,
    description,
    category,
    reminderTime,
    image,
    userName,
    userEmail,
    currentStreak,
    createdAt,
  } = habit;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <motion.div
        className="card group h-full flex flex-col"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop"
            }
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Category Badge */}
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[category] || "bg-gray-100 text-gray-700"}`}
          >
            {category}
          </span>

          {/* Streak Badge */}
          {currentStreak > 0 && (
            <div
              className="absolute top-3 right-3 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
              data-tooltip-id={`streak-${_id}`}
              data-tooltip-content={`${currentStreak} day streak!`}
            >
              <FiZap className="w-3 h-3" />
              {currentStreak}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Meta Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <FiClock className="w-4 h-4" />
              <span>Reminder: {reminderTime || "Not set"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <FiUser className="w-4 h-4" />
              <span className="truncate">{userName || "Anonymous"}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-400">
              {formatDate(createdAt)}
            </span>
            <Link
              to={`/habit/${_id}`}
              className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium text-sm group/link"
            >
              View Details
              <FiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>

      <Tooltip id={`streak-${_id}`} />
    </>
  );
};

export default HabitCard;
