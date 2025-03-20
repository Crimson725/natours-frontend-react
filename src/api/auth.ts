import axios, { AxiosResponse } from "axios";
import { SERVER_BASE_URL } from "../constants/Constants.js";
import { handleErrorAlert, showAlert, CustomError } from "../utils/alert.ts";
import { User } from "../types/User";

interface AuthResponseData<T> {
  status: "success" | "error" | "fail";
  token?: string;
  data?: T;
  message?: string;
}

/**
 * Sign up a new user
 * @param formData The signup form data as FormData
 * @returns A promise that resolves to the created User object if
 * successful; otherwise, undefined
 */
const userSignup = async (formData: FormData): Promise<User | undefined> => {
  try {
    const response: AxiosResponse<
      AuthResponseData<{
        user: User;
      }>
    > = await axios.post(`${SERVER_BASE_URL}/api/v1/users/signup`, formData);
    const signupData = response.data;
    if (
      signupData.status === "success" &&
      signupData.token &&
      signupData.data?.user
    ) {
      showAlert("success", "Signup successful! Redirecting...");
      localStorage.setItem("jwt", signupData.token);
      return signupData.data.user;
    } else {
      showAlert("error", signupData.message || "Something went wrong!");
    }
  } catch (err) {
    handleErrorAlert(err as CustomError);
  }
};

/**
 * Log in a user
 * @param email The email of the user
 * @param password The password of the user
 * @returns A promise that resolves to the logged in User object if
 * successful, otherwise undefined
 */
const userLogin = async (
  email: string,
  password: string,
): Promise<User | undefined> => {
  try {
    const response: AxiosResponse<
      AuthResponseData<{
        user: User;
      }>
    > = await axios.post(`${SERVER_BASE_URL}/api/v1/users/login`, {
      email,
      password,
    });
    const loginData = response.data;
    if (
      loginData.status === "success" &&
      loginData.token &&
      loginData.data?.user
    ) {
      showAlert("success", "Login successful! Redirecting...");
      localStorage.setItem("jwt", loginData.token);
      return loginData.data.user;
    } else {
      showAlert("error", loginData.message || "Something went wrong!");
    }
  } catch (err) {
    handleErrorAlert(err as CustomError);
  }
};

const userLogout = async (): Promise<boolean | undefined> => {
  try {
    const response: AxiosResponse<AuthResponseData<null>> = await axios.get(
      `${SERVER_BASE_URL}/api/v1/users/logout`,
    );
    const data = response.data;
    if (data.status === "success") {
      showAlert("success", "Logout successful! Redirecting...");
      localStorage.removeItem("jwt");
      return true;
    } else {
      showAlert("error", data.message || "Something went wrong!");
    }
  } catch (err) {
    handleErrorAlert(err as CustomError);
  }
};

export { userSignup, userLogin, userLogout };
