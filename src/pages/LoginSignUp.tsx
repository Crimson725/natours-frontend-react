import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load components
const ErrorPage = lazy(() => import("./ErrorPage.tsx"));
const Login = lazy(() => import("../components/auth/LoginForm.tsx"));
const Signup = lazy(() => import("../components/auth/SignupForm.tsx"));
const AllTours = lazy(() => import("../components/ui/Tours/AllTours.tsx"));
const SingleTour = lazy(() => import("../components/ui/Tours/SingleTour.tsx"));

// Loading fallback component
const LoadingFallback = () => <div className="loading">Loading...</div>;

const LoginSignup = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<AllTours />} />
        <Route path="/tour/:tour" element={<SingleTour />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage message="404 Page not found" />} />
      </Routes>
    </Suspense>
  );
};

export default LoginSignup;
