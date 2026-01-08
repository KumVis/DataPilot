import { useState } from "react";
import { Card, Typography, CircularProgress } from "@mui/material";
import FileUpload from "../components/FileUpload";
import { uploadAndCleanFile } from "../api/dataCleaningApi";

export default function DataCleaning() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const response = await uploadAndCleanFile(file);
      setSummary(response.summary);
    } catch (err) {
      setError("Failed to clean data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Data Cleaning
      </Typography>

      <FileUpload onFileSelect={handleFileUpload} />

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {summary && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(summary, null, 2)}
        </pre>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Card>
  );
}