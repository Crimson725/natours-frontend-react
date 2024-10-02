interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const hideAlert = (): void => {
  const el = document.querySelector<HTMLElement>(".alert");
  if (el && el.parentElement) {
    el.parentElement.removeChild(el);
  }
};
/**
 * Display alert message on the screen
 * @param type The type of the alert, either "success" or "error"
 * @param msg The message to display inside the alert
 * @param time Duration in seconds before the alert is automatically hidden
 */
const showAlert = (
  type: "success" | "error",
  msg: string,
  time: number = 5,
): void => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.body.insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};
/**
 * Handles error objects and displays an appropriate error alert based on
 * the environment mode
 * @param err The error object to handle
 */
const handleErrorAlert = (err: CustomError): void => {
  let errMsg: string = "";
  if (import.meta.env.MODE === "development") {
    errMsg = err.response?.data?.message || err.message;
  }
  if (import.meta.env.MODE === "production") {
    errMsg = err.response?.data?.message || "Something went wrong!";
  }
  showAlert("error", errMsg);
};
export { showAlert, handleErrorAlert, CustomError };
