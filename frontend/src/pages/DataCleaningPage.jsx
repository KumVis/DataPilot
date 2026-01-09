import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";

import FileUpload from "../components/FileUpload";
import { uploadAndCleanFile } from "../api/dataCleaningApi";

export default function DataCleaningPage() {
  const [summary, setSummary] = useState(null);
  const [fileBlob, setFileBlob] = useState(null);

  const handleUpload = async (file) => {
    const res = await uploadAndCleanFile(file);
    setSummary(res.summary);
    setFileBlob(res.blob);
  };

  const downloadFile = () => {
    const url = window.URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned_data";
    a.click();
  };

  return (
    <Card sx={{ p: 4, maxWidth: 900, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Data Cleaning
      </Typography>

      <FileUpload onFileSelect={handleUpload} />

      {summary && (
        <>
          {/* Summary Cards */}
          <Grid container spacing={2} mt={3}>
            <Grid item xs={4}>
              <Card sx={{ p: 2 }}>
                <Typography>Original Rows</Typography>
                <Typography variant="h6">{summary.original_rows}</Typography>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ p: 2 }}>
                <Typography>Cleaned Rows</Typography>
                <Typography variant="h6">{summary.cleaned_rows}</Typography>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ p: 2 }}>
                <Typography>Duplicates Removed</Typography>
                <Typography variant="h6">{summary.removed_duplicates}</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Download */}
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={downloadFile}
          >
            Download Cleaned File
          </Button>
        </>
      )}
    </Card>
  );
}