import { SERVER_BASE_URL } from "../constants/constants.js";
import { CustomError, handleErrorAlert, showAlert } from "../utils/alert.ts";
import axios, { AxiosResponse } from "axios";

type UpdateType = "password" | "data";

interface UpdateUserData {
  name?: string;
  email?: string;
}

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

type UpdateData = UpdatePasswordData | UpdateUserData;

interface User {
  id: string;
  name: string;
  email: string;
}

interface UpdateResponse {
  status: "success" | "fail" | string;
  data: {
    user: User;
  };
}

/**
 * Update user settings
 * @param data The data to update
 * @param type The type of update, either "password" or "data"
 * @returns A promise that resolves to the updated User object if successful; otherwise, undefined
 */
const updateSettings = async (
  data: UpdateData,
  type: UpdateType,
): Promise<User | undefined> => {
  try {
    const url =
      type === "password"
        ? `${SERVER_BASE_URL}/api/v1/users/update-password`
        : `${SERVER_BASE_URL}/api/v1/users/update-me`;
    const token = localStorage.getItem("jwt");
    if (!token) {
      showAlert("error", "You are not logged in! Please log in to get access.");
      return;
    }
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response: AxiosResponse<UpdateResponse> = await axios.patch(
      url,
      data,
      options,
    );
    if (response.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
      return response.data.data.user;
    } else {
      showAlert("error", "Something went wrong! Please try again.");
    }
  } catch (err) {
    handleErrorAlert(err as CustomError);
  }
};
export { updateSettings };
