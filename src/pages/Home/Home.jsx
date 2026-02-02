import { Helmet } from "react-helmet-async";
import HeroSlider from "../../components/Home/HeroSlider";
import FeaturedHabits from "../../components/Home/FeaturedHabits";
import WhyBuildHabits from "../../components/Home/WhyBuildHabits";
import HowItWorks from "../../components/Home/HowItWorks";
import Testimonials from "../../components/Home/Testimonials";
import CallToAction from "../../components/Home/CallToAction";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>HabitForge - Build Better Habits, Transform Your Life</title>
        <meta
          name="description"
          content="Create, track, and manage daily habits to build streaks and boost productivity with HabitForge."
        />
      </Helmet>

      <HeroSlider />
      <FeaturedHabits />
      <WhyBuildHabits />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Home;
