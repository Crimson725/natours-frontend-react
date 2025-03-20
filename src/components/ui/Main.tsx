import { Navigate, Route, Routes } from "react-router-dom";
import AllTours from "./Tours/AllTours.tsx";
import BookedTours from "./Tours/BookedTours.tsx";
import SingleTour from "./Tours/SingleTour.tsx";
import UserProfile from "../userprofiles/UserProfile.tsx";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<AllTours />} />
      <Route path="/my-tours" element={<BookedTours />} />
      <Route path="/me" element={<UserProfile />} />
      <Route path="/tour/:tour" element={<SingleTour />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Main;
