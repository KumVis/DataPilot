import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Fade,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";

import FileUpload from "../components/FileUpload";
import { uploadAndCleanFile } from "../api/dataCleaningApi";
import MainLayout from "../layout/MainLayout";

export default function DataCleaningPage() {
  const [summary, setSummary] = useState(null);
  const [fileBlob, setFileBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);
    setSummary(null);

    try {
      const res = await uploadAndCleanFile(file);
      setSummary(res.summary);
      setFileBlob(res.blob);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    const url = window.URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned_data";
    a.click();
  };

  return (
    <MainLayout>
      <Card sx={{ p: 4, boxShadow: 4 }}>
        <Typography variant="h5" gutterBottom>
          Data Cleaning
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Upload CSV or Excel to remove duplicates, extra spaces, and special characters.
        </Typography>

        <FileUpload onFileSelect={handleUpload} />

        {/* Loading State */}
        {loading && (
          <Fade in>
            <Grid
              container
              direction="column"
              alignItems="center"
              mt={4}
            >
              <CircularProgress />
              <Typography mt={2}>Processing file…</Typography>
            </Grid>
          </Fade>
        )}

        {/* Results */}
        {summary && !loading && (
          <>
            <Grid container spacing={2} mt={4}>
              {[
                ["Original Rows", summary.original_rows],
                ["Cleaned Rows", summary.cleaned_rows],
                ["Duplicates Removed", summary.removed_duplicates],
              ].map(([label, value]) => (
                <Grid item xs={12} sm={4} key={label}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <Typography color="text.secondary">{label}</Typography>
                    <Typography variant="h6">{value}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ mt: 4 }}
              onClick={downloadFile}
            >
              Download Cleaned File
            </Button>
          </>
        )}
      </Card>
    </MainLayout>
  );
}
