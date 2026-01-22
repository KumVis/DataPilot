import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
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
