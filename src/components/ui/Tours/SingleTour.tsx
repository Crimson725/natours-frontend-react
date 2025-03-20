import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa";
import { getOneTour } from "../../../api/tours";
import TourOverviewBox from "./TourOverviewBox";
import TourReviewCard from "./TourReviewCard";
import TourMap from "./TourMap";
import TourCta from "./TourCTA";
import { SERVER_BASE_URL } from "../../../constants/Constants";
import { setPageTitle } from "../../../utils/pageHead";
import type { Tour } from "../../../types/Tour";

const SingleTour = () => {
  const { tour: tourName } = useParams();
  const [tour, setTour] = useState<Tour>({} as Tour);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (!tourName) return;
      setIsLoading(true);

      const tourData = await getOneTour(tourName);

      if (tourData) {
        setTour(tourData);
        setPageTitle(`Natours | ${tourData.name}`);
      }
      setIsLoading(false);
    })();
  }, [tourName]);

  const tourDate =
    tour.startDates && tour.startDates.length > 0
      ? new Date(tour.startDates[0]).toLocaleString("en-us", {
          month: "long",
          year: "numeric",
        })
      : "Not available";

  if (isLoading || Object.keys(tour).length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`${SERVER_BASE_URL}/img/tours/${tour.imageCover}`}
            alt={`${tour.name}`}
          />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name} Tour</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <FaRegClock className="heading-box__icon" />
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <FaMapMarkerAlt className="heading-box__icon" />
              <span className="heading-box__text">
                {tour.startLocation?.description || "Location not specified"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <TourOverviewBox label="Next Date" text={tourDate} icon="date" />
              <TourOverviewBox
                label="Difficulty"
                text={tour.difficulty}
                icon="difficulty"
              />
              <TourOverviewBox
                label="Participants"
                text={`${tour.maxGroupSize} people`}
                icon="participants"
              />
              <TourOverviewBox
                label="Rating"
                text={`${tour.ratingsAverage} / 5`}
                icon="rating"
              />
            </div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides &&
                tour.guides.map((guide) => (
                  <div className="overview-box__detail" key={guide._id}>
                    <img
                      className="overview-box__img"
                      src={`${SERVER_BASE_URL}/img/users/${guide.photo}`}
                      alt={guide.name}
                    />
                    <span className="overview-box__label">
                      {guide.role === "lead-guide" ? "Lead Guide" : "Guide"}
                    </span>
                    <span className="overview-box__text">{guide.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About {tour.name} tour</h2>
          {tour.description &&
            tour.description.split("\n").map((paragraph, i) => (
              <p className="description__text" key={i}>
                {paragraph}
              </p>
            ))}
        </div>
      </section>

      <section className="section-pictures">
        {tour.images &&
          tour.images.map((picture, i) => (
            <div className="picture-box" key={i}>
              <img
                src={`${SERVER_BASE_URL}/img/tours/${picture}`}
                alt={`${tour.name} ${i + 1}`}
                className={`picture-box__img picture-box__img--${i + 1}`}
              />
            </div>
          ))}
      </section>

      <section className="section-map">
        {tour.locations && tour.locations.length > 0 && (
          <TourMap locationData={tour.locations} mapId={"map"} />
        )}
      </section>

      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews &&
            tour.reviews.map((review) => (
              <TourReviewCard
                review={{
                  id: review._id,
                  review: review.review,
                  rating: review.rating,
                  user: review.user,
                }}
                key={review._id}
              />
            ))}
        </div>
      </section>

      {tour.images && tour.id && (
        <TourCta tourImages={tour.images} tourId={tour.id} />
      )}
    </>
  );
};

export default SingleTour;
