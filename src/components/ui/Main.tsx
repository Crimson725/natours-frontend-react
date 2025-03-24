import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Lazy load components
const AllTours = lazy(() => import("./Tours/AllTours.tsx"));
const BookedTours = lazy(() => import("./Tours/BookedTours.tsx"));
const SingleTour = lazy(() => import("./Tours/SingleTour.tsx"));
const UserProfile = lazy(() => import("../userprofiles/UserProfile.tsx"));

// Loading fallback component
const LoadingFallback = () => <div className="loading">Loading...</div>;

const Main = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<AllTours />} />
        <Route path="/my-tours" element={<BookedTours />} />
        <Route path="/me" element={<UserProfile />} />
        <Route path="/tour/:tour" element={<SingleTour />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Main;
