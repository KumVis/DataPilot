import React, { useState } from "react";
import { uploadFileForCleaning } from "../api/dataCleaningApi";

const DataCleaningPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    try {
      setMessage("Processing...");
      const response = await uploadFileForCleaning(file);
      setMessage("File cleaned successfully");

      // optional: download link
      console.log(response);
    } catch (error) {
      setMessage("Error while cleaning file");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Data Cleaning</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Clean File
      </button>

      <p>{message}</p>
    </div>
  );
};

export default DataCleaningPage;
