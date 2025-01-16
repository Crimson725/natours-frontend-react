import axios, { AxiosResponse } from "axios";
import { SERVER_BASE_URL } from "../constants/constans.ts";

interface Tour {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface TourResponseData<T> {
  status: "success" | "error" | string;
  data: T;
  message?: string;
}

/**
 * Get all tours from the server
 * @returns A promise that resolves to an array of Tour objects if successful;
 * otherwise, false
 */
const getAllTours = async (): Promise<Tour[] | false> => {
  try {
    const response: AxiosResponse<TourResponseData<Tour[]>> = await axios.get(
      `${SERVER_BASE_URL}/api/v1/tours`,
    );
    if (response.data.status === "success") {
      return response.data.data;
    }
  } catch (err: unknown) {
    console.log(err);
    return false;
  }
};
/**
 * Get a single tour by its name
 * @param tourName The name of the tour to get
 * @returns A promise that resolves to the Tour object if successful; otherwise, false
 */
const getOneTour = async (tourName: string): Promise<Tour | false> => {
  try {
    const response: AxiosResponse<TourResponseData<Tour>> = await axios.get(
      `${SERVER_BASE_URL}/api/v1/tours/name/${tourName}`,
    );
    if (response.data.status === "success") {
      return response.data.data;
    }
  } catch (err: unknown) {
    console.log(err);
    return false;
  }
};
/**
 * Get all tours that the current user has booked
 * @returns A promise that resolves to an array of Tour objects if successful; otherwise, false
 */
const getBookedTours = async (): Promise<Tour[] | false> => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("No token found");
      return false;
    }
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response: AxiosResponse<TourResponseData<Tour[]>> = await axios.get(
      `${SERVER_BASE_URL}/api/v1/tours/my-tours`,
      options,
    );
    if (response.data.status === "success") {
      return response.data.data;
    }
  } catch (err: unknown) {
    console.log(err);
    return false;
  }
};

export { getAllTours, getOneTour, getBookedTours };
