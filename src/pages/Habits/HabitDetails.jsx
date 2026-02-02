import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiClock,
  FiUser,
  FiZap,
  FiCheckCircle,
  FiCalendar,
  FiAward,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Lottie from "lottie-react";
import confettiAnimation from "../../assets/confetti.json";
import { useAuth } from "../../providers/AuthProvider";

const categoryColors = {
  Morning:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Work: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Fitness: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Evening:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Study: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const HabitDetails = () => {
  const [habit, setHabit] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchHabitDetails();
  }, [id]);

  const fetchHabitDetails = async () => {
    try {
      const [habitRes, statsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/habits/${id}`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/habits/${id}/stats`),
      ]);
      setHabit(habitRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching habit:", error);
      toast.error("Failed to load habit details");
      navigate("/browse-habits");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/habits/${id}/complete`,
      );

      // Update local state
      setStats((prev) => ({
        ...prev,
        currentStreak: response.data.currentStreak,
        longestStreak: response.data.longestStreak,
        totalCompletions: prev.totalCompletions + 1,
        completionsLast30Days: prev.completionsLast30Days + 1,
        completionPercentage: Math.round(
          ((prev.completionsLast30Days + 1) / 30) * 100,
        ),
      }));

      setHabit((prev) => ({
        ...prev,
        currentStreak: response.data.currentStreak,
        longestStreak: response.data.longestStreak,
        completionHistory: [...(prev.completionHistory || []), new Date()],
      }));

      // Show confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);

      toast.success(`Awesome! ${response.data.currentStreak} day streak! 🔥`);
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("You already completed this habit today!");
      } else {
        toast.error("Failed to mark as complete");
      }
    }
  };

  const isCompletedToday = () => {
    if (!habit?.completionHistory || habit.completionHistory.length === 0)
      return false;
    const today = new Date().toISOString().split("T")[0];
    return habit.completionHistory.some(
      (date) => new Date(date).toISOString().split("T")[0] === today,
    );
  };

  const isOwner = () => {
    return user?.email === habit?.userEmail;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStreakBadge = (streak) => {
    if (streak >= 100)
      return { label: "Legend", color: "bg-yellow-500", icon: "👑" };
    if (streak >= 50)
      return { label: "Master", color: "bg-purple-500", icon: "⭐" };
    if (streak >= 30)
      return { label: "Expert", color: "bg-blue-500", icon: "🏆" };
    if (streak >= 14)
      return { label: "Committed", color: "bg-green-500", icon: "💪" };
    if (streak >= 7)
      return { label: "Starter", color: "bg-accent-500", icon: "🔥" };
    return null;
  };

  if (loading) return <LoadingSpinner />;

  if (!habit) return null;

  const streakBadge = getStreakBadge(stats?.currentStreak || 0);

  return (
    <>
      <Helmet>
        <title>{habit.title} - HabitForge</title>
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
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-6 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back
            </button>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Image */}
                <div className="card overflow-hidden">
                  <img
                    src={
                      habit.image ||
                      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800"
                    }
                    alt={habit.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>

                {/* Details Card */}
                <div className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[habit.category]}`}
                      >
                        {habit.category}
                      </span>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {habit.title}
                      </h1>
                    </div>

                    {streakBadge && (
                      <div
                        className={`${streakBadge.color} text-white px-4 py-2 rounded-lg flex items-center gap-2`}
                      >
                        <span>{streakBadge.icon}</span>
                        <span className="font-semibold">
                          {streakBadge.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {habit.description}
                  </p>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <FiClock className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Reminder
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {habit.reminderTime || "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                        <FiCalendar className="w-5 h-5 text-secondary-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Created
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {formatDate(habit.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Creator
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {habit.userName || "Anonymous"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creator Info */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Creator Info
                  </h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        habit.userPhoto ||
                        "https://i.ibb.co/0jZ1Z1Z/default-avatar.png"
                      }
                      alt={habit.userName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {habit.userName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {habit.userEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Actions */}
              <div className="space-y-6">
                {/* Progress Card */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Progress (Last 30 Days)
                  </h3>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Completion
                      </span>
                      <span className="font-semibold text-primary-500">
                        {stats?.completionPercentage || 0}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${stats?.completionPercentage || 0}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {stats?.completionsLast30Days || 0} of 30 days completed
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FiZap className="w-5 h-5 text-accent-500" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats?.currentStreak || 0}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Current Streak
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <FiAward className="w-5 h-5 text-yellow-500" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats?.longestStreak || 0}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Best Streak
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats?.totalCompletions || 0}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Completions
                    </p>
                  </div>
                </div>

                {/* Mark Complete Button */}
                {isOwner() && (
                  <button
                    onClick={handleMarkComplete}
                    disabled={isCompletedToday()}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      isCompletedToday()
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "btn-primary"
                    }`}
                  >
                    <FiCheckCircle className="w-5 h-5" />
                    {isCompletedToday() ? "Completed Today ✓" : "Mark Complete"}
                  </button>
                )}

                {/* Streak Badge Info */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Streak Badges
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span>🔥</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Starter: 7+ days
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>💪</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Committed: 14+ days
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>🏆</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Expert: 30+ days
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>⭐</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Master: 50+ days
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>👑</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Legend: 100+ days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HabitDetails;
