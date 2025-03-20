interface Location {
  description: string;
  type: string;
  coordinates: number[];
  day?: number;
}

interface StartLocation extends Location {
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
  description?: string;
  imageCover: string;
  images?: string[];
  startDates: Date[];
  startLocation: StartLocation;
  locations: Location[];
}

export interface TourCardProps {
  tourData: Tour;
} 