import { User } from "./User";

export interface Location {
  description: string;
  type: string;
  coordinates: number[];
  day?: number;
  _id?: string;
  id?: string;
}

export interface StartLocation extends Location {
  address: string;
}

export interface Tour {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[];
  startLocation: StartLocation;
  locations: Location[];
  guides: Array<{
    _id: string;
    name: string;
    email?: string;
    role: string;
    photo: string;
  }>;
  reviews: Array<{
    _id: string;
    review: string;
    rating: number;
    user: {
      _id: string;
      name: string;
      photo: string;
    };
    tour?: string;
    createdAt?: string;
    id?: string;
  }>;
  secretTour?: boolean;
  durationWeeks?: number;
}

export interface TourReview {
  id: string;
  review: string;
  rating: number;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
}

export interface TourReviewCardProps {
  review: TourReview;
}


export interface TourCardProps {
  tourData: Tour;
} 