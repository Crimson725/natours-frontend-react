import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBookedTours } from "../../../api/tours";
import { setPageTitle } from "../../../utils/pageHead";
import { getQueryParam } from "../../../utils/url";
import { showAlert } from "../../../utils/alert";
import Skeleton from "../Skeleton/Skeleton";
import TourCard from "./TourCard";
import ToursOverview from "./ToursOverview";
import { Tour } from "../../../types/Tour";

const BookedTours = () => {
  const [allBookings, setAllBookings] = useState<Tour[]>([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    const bookedTour = getQueryParam(search, "booking");
    if (bookedTour) showAlert("success", "Tour Booked successfully");

    (async () => {
      const bookedTours = await getBookedTours();

      setTimeout(() => setLoadingTours(false), 1000);
      if (bookedTours) setAllBookings(bookedTours);
    })();
  }, [search]);

  useEffect(() => setPageTitle("Natours | My Bookings"), []);

  return (
    <ToursOverview>
      {loadingTours === true ? (
        <Skeleton totalSkeletons={3} height="50rem" />
      ) : (
        allBookings.map((tour) => <TourCard key={tour.id} tourData={tour} />)
      )}
    </ToursOverview>
  );
};

export default BookedTours;
