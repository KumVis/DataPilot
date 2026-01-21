import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

export default function FileUpload({ onFileSelect }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);     // ✅ store file name
    onFileSelect(file);         // existing logic
  };

  return (
    <Box textAlign="left">
      <Button variant="contained" component="label">
        Upload CSV / Excel
        <input
          type="file"
          hidden
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
        />
      </Button>

      {/* ✅ FILE NAME DISPLAY */}
      {fileName && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Selected file: <strong>{fileName}</strong>
        </Typography>
      )}
    </Box>
  );
}
