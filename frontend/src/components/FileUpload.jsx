import { Button } from "@mui/material";

export default function FileUpload({ onFileSelect }) {
  return (
    <Button variant="contained" component="label">
      Upload CSV / Excel
      <input
        type="file"
        hidden
        accept=".csv,.xlsx,.xls"
        onChange={(e) => onFileSelect(e.target.files[0])}
      />
    </Button>
  );
}
