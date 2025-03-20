import { Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";

import Login from "../components/auth/LoginForm.tsx";
import Signup from "../components/auth/SignupForm.tsx";
import AllTours from "../components/ui/Tours/AllTours.tsx";
import SingleTour from "../components/ui/Tours/SingleTour.tsx";

const LoginSignup = () => {
  return (
    <Routes>
      <Route path="/" element={<AllTours />} />
      <Route path="/tour/:tour" element={<SingleTour />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<ErrorPage message="404 Page not found" />} />
    </Routes>
  );
};

export default LoginSignup;
