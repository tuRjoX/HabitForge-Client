import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import axios from "axios";
import HabitCard from "../../components/habits/HabitCard";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const categories = ["all", "Morning", "Work", "Fitness", "Evening", "Study"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "streak", label: "Highest Streak" },
  { value: "title", label: "Alphabetical" },
];

const BrowseHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetchHabits();
  }, [search, category, sort]);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category !== "all") params.append("category", category);
      params.append("sort", sort);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/habits/public?${params}`,
      );
      setHabits(response.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHabits();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Helmet>
        <title>Browse Public Habits - HabitForge</title>
      </Helmet>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Browse Public <span className="gradient-text">Habits</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover habits from our community and get inspired to start
                your own journey
              </p>
            </div>

            {/* Filters Section */}
            <div className="card p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search habits by title..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="input-field pl-12 pr-4"
                    />
                  </div>
                </form>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <FiFilter className="text-gray-400 w-5 h-5 hidden sm:block" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-field min-w-[150px]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="input-field min-w-[150px]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary-500 text-white"
                        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-primary-500 text-white"
                        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {(search || category !== "all") && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {search && (
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm flex items-center gap-1">
                      "{search}"
                      <button
                        onClick={() => setSearch("")}
                        className="ml-1 hover:text-primary-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {category !== "all" && (
                    <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 rounded-full text-sm flex items-center gap-1">
                      {category}
                      <button
                        onClick={() => setCategory("all")}
                        className="ml-1 hover:text-secondary-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Results */}
            {loading ? (
              <LoadingSpinner fullScreen={false} />
            ) : habits.length > 0 ? (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Showing {habits.length} habit{habits.length !== 1 ? "s" : ""}
                </p>

                <motion.div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {habits.map((habit) => (
                    <motion.div key={habit._id} variants={itemVariants}>
                      <HabitCard habit={habit} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card p-12 text-center"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Habits Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                    setSort("newest");
                  }}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BrowseHabits;
