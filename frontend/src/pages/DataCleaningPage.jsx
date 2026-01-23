import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Fade,
  Stack,
  Box
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";

import FileUpload from "../components/FileUpload";
import { uploadAndCleanFile } from "../api/dataCleaningApi";

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
    if (!fileBlob) return;

    const url = window.URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned_data";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card sx={{
          pt: 3,   // 🔽 smaller than before
          px: 2.5,
          pb: 4,
          borderRadius: 2,
          backgroundColor: "#FFFFFF",
          border: "1px solid #5917c4",
          
        }}>
      <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
      <Box>
        <Typography variant="h5" gutterBottom>
          Data Cleaning
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Upload CSV or Excel to remove duplicates, extra spaces, and special characters.
        </Typography>
      </Box>
      {/* Upload */}
      <FileUpload onFileSelect={handleUpload} />
      </Stack>

      {/* Loading */}
      {loading && (
        <Fade in>
          <Grid container direction="column" alignItems="center" mt={4}>
            <CircularProgress />
            <Typography mt={2} color="text.secondary">
              Cleaning your data, please wait…
            </Typography>
          </Grid>
        </Fade>
      )}

      {/* Results */}
      {summary && !loading && (
        <>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <Typography color="text.secondary">Original Rows</Typography>
                <Typography variant="h6">{summary.original_rows}</Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <Typography color="text.secondary">Cleaned Rows</Typography>
                <Typography variant="h6">{summary.cleaned_rows}</Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <Typography color="text.secondary">
                  Duplicates Removed
                </Typography>
                <Typography variant="h6">
                  {summary.removed_duplicates}
                </Typography>
              </Card>
            </Grid>
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
  );
}
