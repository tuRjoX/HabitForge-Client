import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AddHabit from "../pages/Habits/AddHabit";
import MyHabits from "../pages/Habits/MyHabits";
import UpdateHabit from "../pages/Habits/UpdateHabit";
import BrowseHabits from "../pages/Habits/BrowseHabits";
import HabitDetails from "../pages/Habits/HabitDetails";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-habit",
        element: (
          <PrivateRoute>
            <AddHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-habits",
        element: (
          <PrivateRoute>
            <MyHabits />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-habit/:id",
        element: (
          <PrivateRoute>
            <UpdateHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-habits",
        element: <BrowseHabits />,
      },
      {
        path: "/habit/:id",
        element: (
          <PrivateRoute>
            <HabitDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
