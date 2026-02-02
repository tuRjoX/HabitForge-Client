import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiPlus,
  FiZap,
  FiCalendar,
} from "react-icons/fi";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Lottie from "lottie-react";
import confettiAnimation from "../../assets/confetti.json";

const categoryColors = {
  Morning: "bg-yellow-100 text-yellow-700",
  Work: "bg-blue-100 text-blue-700",
  Fitness: "bg-red-100 text-red-700",
  Evening: "bg-purple-100 text-purple-700",
  Study: "bg-green-100 text-green-700",
};

const MyHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchHabits();
  }, [user]);

  const fetchHabits = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/habits/user/${user.email}`,
      );
      setHabits(response.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
      toast.error("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Delete Habit?",
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/habits/${id}`);
        setHabits(habits.filter((h) => h._id !== id));
        toast.success("Habit deleted successfully");
      } catch (error) {
        console.error("Error deleting habit:", error);
        toast.error("Failed to delete habit");
      }
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/habits/${id}/complete`,
      );

      // Update local state
      setHabits(
        habits.map((h) => {
          if (h._id === id) {
            return {
              ...h,
              currentStreak: response.data.currentStreak,
              longestStreak: response.data.longestStreak,
              completionHistory: [...(h.completionHistory || []), new Date()],
            };
          }
          return h;
        }),
      );

      // Show confetti animation
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);

      toast.success(`Great job! ${response.data.currentStreak} day streak! 🔥`);
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("You already completed this habit today!");
      } else {
        toast.error("Failed to mark as complete");
      }
    }
  };

  const isCompletedToday = (habit) => {
    if (!habit.completionHistory || habit.completionHistory.length === 0)
      return false;
    const today = new Date().toISOString().split("T")[0];
    return habit.completionHistory.some(
      (date) => new Date(date).toISOString().split("T")[0] === today,
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Habits - HabitForge</title>
      </Helmet>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            className="w-full h-full max-w-lg"
          />
        </div>
      )}

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  My <span className="gradient-text">Habits</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your progress and stay consistent
                </p>
              </div>
              <Link
                to="/add-habit"
                className="btn-primary mt-4 md:mt-0 flex items-center gap-2 w-fit"
              >
                <FiPlus className="w-5 h-5" />
                Add New Habit
              </Link>
            </div>

            {/* Habits Table */}
            {habits.length > 0 ? (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Title
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Category
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                          Current Streak
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Created
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {habits.map((habit, index) => (
                        <motion.tr
                          key={habit._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  habit.image ||
                                  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=100"
                                }
                                alt={habit.title}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {habit.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                  {habit.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[habit.category] || "bg-gray-100 text-gray-700"}`}
                            >
                              {habit.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <FiZap className="w-4 h-4 text-accent-500" />
                              <span className="font-bold text-gray-900 dark:text-white">
                                {habit.currentStreak || 0}
                              </span>
                              <span className="text-sm text-gray-500">
                                days
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                              <FiCalendar className="w-4 h-4" />
                              {formatDate(habit.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                to={`/update-habit/${habit._id}`}
                                className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <FiEdit2 className="w-5 h-5" />
                              </Link>
                              <button
                                onClick={() =>
                                  handleDelete(habit._id, habit.title)
                                }
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleMarkComplete(habit._id)}
                                disabled={isCompletedToday(habit)}
                                className={`p-2 rounded-lg transition-colors ${
                                  isCompletedToday(habit)
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                                }`}
                                title={
                                  isCompletedToday(habit)
                                    ? "Completed today"
                                    : "Mark complete"
                                }
                              >
                                <FiCheckCircle className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card p-12 text-center"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Habits Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start your journey by creating your first habit!
                </p>
                <Link
                  to="/add-habit"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <FiPlus className="w-5 h-5" />
                  Create Your First Habit
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MyHabits;
