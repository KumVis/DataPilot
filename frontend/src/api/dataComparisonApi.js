import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const getColumns = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    `${BASE_URL}/api/v1/compare/columns`,
    formData
  );
  return res.data.columns;
};

export const compareWithPK = async (
  fileOld,
  fileNew,
  pkOld,
  pkNew
) => {
  const formData = new FormData();
  formData.append("file_old", fileOld);
  formData.append("file_new", fileNew);
  formData.append("pk_old", pkOld);
  formData.append("pk_new", pkNew);

  const res = await axios.post(
    `${BASE_URL}/api/v1/compare/with-pk`,
    formData
  );
  return res.data;
};
