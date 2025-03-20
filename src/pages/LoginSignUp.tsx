import { Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";

import Login from "../components/auth/LoginForm";
import Signup from "../components/auth/SignupForm";
import AllTours from "../components/ui/Tours/AllTours";
import SingleTour from "../components/ui/Tours/SingleTour";

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
