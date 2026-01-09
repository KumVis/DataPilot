import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const uploadAndCleanFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${BASE_URL}/api/v1/clean`,
    formData,
    {
      responseType: "blob",   // 🔑 important
    }
  );

  const summary = response.headers["x-summary"];

  return {
    blob: response.data,
    summary: summary ? JSON.parse(summary.replace(/'/g, '"')) : null,
  };
};
