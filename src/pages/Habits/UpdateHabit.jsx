import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FiSave,
  FiUpload,
  FiClock,
  FiTag,
  FiFileText,
  FiImage,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];

const UpdateHabit = () => {
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabit();
  }, [id]);

  const fetchHabit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/habits/${id}`,
      );
      setHabit(response.data);
      setImagePreview(response.data.image);
    } catch (error) {
      console.error("Error fetching habit:", error);
      toast.error("Failed to load habit");
      navigate("/my-habits");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData,
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;
    const imageFile = form.image.files[0];
    const isPublic = form.isPublic.checked;

    try {
      let imageUrl = habit.image;
      if (imageFile) {
        const uploadedUrl = await uploadToImgBB(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const updatedHabit = {
        title,
        description,
        category,
        reminderTime,
        image: imageUrl,
        isPublic,
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/habits/${id}`,
        updatedHabit,
      );

      toast.success("Habit updated successfully!");
      navigate("/my-habits");
    } catch (error) {
      console.error("Error updating habit:", error);
      toast.error("Failed to update habit. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!habit) return null;

  return (
    <>
      <Helmet>
        <title>Update Habit - HabitForge</title>
      </Helmet>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
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

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Update <span className="gradient-text">Habit</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Modify your habit details
              </p>
            </div>

            {/* Form */}
            <div className="card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiFileText className="w-4 h-4" />
                    Habit Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={habit.title}
                    className="input-field"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiFileText className="w-4 h-4" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    defaultValue={habit.description}
                    className="input-field resize-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiTag className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    defaultValue={habit.category}
                    className="input-field"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reminder Time */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiClock className="w-4 h-4" />
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    name="reminderTime"
                    defaultValue={habit.reminderTime}
                    className="input-field"
                  />
                </div>

                {/* Current Image */}
                {imagePreview && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Current Image
                    </label>
                    <img
                      src={imagePreview}
                      alt="Current habit"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiImage className="w-4 h-4" />
                    Change Image{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                    >
                      <FiUpload className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">
                        Click to upload a new image
                      </span>
                    </label>
                  </div>
                </div>

                {/* Public Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isPublic"
                    id="isPublic"
                    defaultChecked={habit.isPublic}
                    className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label
                    htmlFor="isPublic"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Make this habit public
                  </label>
                </div>

                {/* User Info (Read-only) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                      User Name
                    </label>
                    <input
                      type="text"
                      value={habit.userName || user?.displayName || ""}
                      readOnly
                      className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                      User Email
                    </label>
                    <input
                      type="email"
                      value={habit.userEmail || user?.email || ""}
                      readOnly
                      className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Update Habit
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default UpdateHabit;
