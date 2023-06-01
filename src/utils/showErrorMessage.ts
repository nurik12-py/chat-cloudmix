import { message } from "antd";
import axios from "axios";

const showErrorMessage = (error: any, defaultMessage = "An error occurred") => {
  let errorMessage = defaultMessage;

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data.message || defaultMessage;
  }

  message.error(errorMessage);
};

export default showErrorMessage;
