import { useState, useEffect } from "react";
import { getAllTours } from "../../../api/tours";
import { setPageTitle } from "../../../utils/pageHead";
import Skeleton from "../Skeleton/Skeleton";
import TourCard from "./TourCard";
import ToursOverview from "./ToursOverview";
import { Tour } from "../../../types/Tour";

const AllTours = () => {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [loadingTours, setLoadingTours] = useState(true);

  useEffect(() => {
    // Set page title
    setPageTitle("Natours | All Tours");

    // Get all tours
    (async () => {
      const tours = await getAllTours();

      setTimeout(() => setLoadingTours(false), 1000);
      if (tours) setAllTours(tours);
    })();
  }, []);

  return (
    <ToursOverview>
      {loadingTours === true ? (
        <Skeleton totalSkeletons={3} height="50rem" />
      ) : (
        allTours.map((tour) => <TourCard key={tour.id} tourData={tour} />)
      )}
    </ToursOverview>
  );
};

export default AllTours;
