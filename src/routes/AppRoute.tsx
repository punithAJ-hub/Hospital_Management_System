import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import HomePage from "../pages/HomePage/HomePage";
import Dashboard from "../components/Dashboard/Dashboard";
import Patients from "../components/Patients/Patients";
import PatientForm from "../components/PatientForm/PatientForm";
import Beds from "../components/Beds/Beds";
import UserCard from "../components/UserCard/UserCard";
import Schedule from "../pages/Schedule/Schecule";
import Analytics from "../pages/Analytics/Analytics";

const AppRoute = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "HomePage",
          element: <HomePage children={<Dashboard />} />,
        },
        {
          path: "patients",
          element: <HomePage children={<Patients />} />,
        },
        {
          path: "dashboard",
          element: <HomePage children={<Dashboard />} />,
        },
        {
          path: "beds",
          element: <HomePage children={<Beds />} />,
        },
        {
          path: "patientInformation",
          element: <HomePage children={<PatientForm />} />,
        },
        {
          path: "manageAccounts",
          element: <HomePage children={<UserCard />} />,
        },
        {
          path: "schedule",
          element: <HomePage children={<Schedule />} />,
        },
        {
          path: "analytics",
          element: <HomePage children={<Analytics />} />,
        },
      ],
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default AppRoute;
