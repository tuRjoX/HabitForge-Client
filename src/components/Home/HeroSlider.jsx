import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "Build Habits That Stick",
    subtitle:
      "Transform your daily routines into powerful habits with our intuitive tracking system",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1920&q=80",
    features: ["Track Daily Progress", "Build Streaks", "Stay Motivated"],
  },
  {
    id: 2,
    title: "Track Your Progress",
    subtitle:
      "Visualize your journey with detailed analytics and streak tracking to stay motivated every day",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1920&q=80",
    features: ["Visual Analytics", "Weekly Reports", "Goal Insights"],
  },
  {
    id: 3,
    title: "Achieve Your Goals",
    subtitle:
      "Join thousands of users who have transformed their lives through consistent habit building",
    image:
      "https://images.unsplash.com/photo-1552581234-26160f608093?w=1920&q=80",
    features: ["Set Clear Goals", "Daily Reminders", "Celebrate Success"],
  },
];

const HeroSlider = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[600px] md:h-[700px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />

              {/* Content */}
              <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-6">
                      ✨ Start Building Better Habits Today
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                      {slide.subtitle}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {slide.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-200"
                        >
                          <FiCheckCircle className="text-primary-400" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/register"
                        className="btn-primary flex items-center gap-2 group"
                      >
                        Get Started Free
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/browse-habits"
                        className="btn-outline border-white text-white hover:bg-white hover:text-gray-900"
                      >
                        Browse Habits
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Typewriter Effect Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent py-8 z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white text-lg md:text-xl">
            I want to build habits for{" "}
            <span className="text-primary-400 font-semibold">
              <Typewriter
                words={[
                  "Better Health",
                  "More Productivity",
                  "Mental Wellness",
                  "Personal Growth",
                  "Financial Success",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
