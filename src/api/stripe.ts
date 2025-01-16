import axios, { AxiosResponse } from "axios";
import { SERVER_BASE_URL } from "../constants/constans.ts";
import { CustomError, handleErrorAlert } from "../utils/alert.ts";

interface BookingResponse {
  status: "success" | "fail" | string;
  sessionUrl?: string;
}

type BookTourResult = string | undefined;
/**
 * Book a tour
 * @param tourId The ID of the tour to book
 * @returns A promise that resolves to the URL of the checkout session if
 * successful; otherwise, undefined
 */
const bookTour = async (
  tourId: string,
): Promise<BookTourResult | undefined> => {
  try {
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response: AxiosResponse<BookingResponse> = await axios.get(
      `${SERVER_BASE_URL}/api/v1/bookings/checkout-session/${tourId}`,
      options,
    );
    const { data } = response;
    if (data.status === "success" && data.sessionUrl) {
      return data.sessionUrl;
    }
    throw new Error("Something went wrong!");
  } catch (err) {
    handleErrorAlert(err as CustomError);
    return undefined;
  }
};
export { bookTour };
