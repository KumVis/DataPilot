import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});



export const analyzeVisualizationFile = async (file) => {
  const formData = new FormData();


  formData.append("file", file);

  const response = await api.post(
    "/visualization/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );


  return response.data;
};
