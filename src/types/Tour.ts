import { User } from "./User";

export interface Location {
  description: string;
  type: string;
  coordinates: number[];
  day?: number;
}

export interface StartLocation extends Location {
  address: string;
}

export interface Tour {
  id: string;
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
  startDates: Date[];
  startLocation: StartLocation;
  locations: Location[];
  guides: Array<{
    _id: string;
    name: string;
    role: string;
    photo: string;
  }>;
  reviews: Array<{
    _id: string;
    review: string;
    rating: number;
    user: User;
  }>;
}

export interface TourReview {
  id: string;
  review: string;
  rating: number;
  user: User;
}

export interface TourReviewCardProps {
  review: TourReview;
}


export interface TourCardProps {
  tourData: Tour;
} 