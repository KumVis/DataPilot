import { useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

import FileUpload from "../components/FileUpload";
import { profileData } from "../api/knowYourDataApi";

export default function KnowYourDataPage() {
  const [data, setData] = useState(null);

  const qualityColor = (percent) => {
    if (percent === 0) return "success.main";
    if (percent < 20) return "warning.main";
    return "error.main";
  };

  const handleUpload = async (file) => {
    const result = await profileData(file);
    setData(result);
  };

  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h5">Know Your Data</Typography>
      <Typography color="text.secondary" mb={3}>
        Upload CSV or Excel to understand structure and data quality.
      </Typography>

      <FileUpload onFileSelect={handleUpload} />

      {data && (
        <>
          {/* Summary */}
          <Grid container spacing={2} mt={4}>
            {[
                ["Rows", data.rows],
                ["Columns", data.columns],
                ["Duplicates %", `${data.duplicate_percent}%`],
                ["Null Cells %", `${data.null_cell_percent}%`],
            ].map(([label, value]) => (
                <Grid item xs={12} sm={3} key={label}>
                <Card
                    sx={{
                    p: 2,
                    textAlign: "center",
                    "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                    }}
                >
                    <Typography color="text.secondary">{label}</Typography>
                    <Typography variant="h6">{value}</Typography>
                </Card>
                </Grid>
            ))}
            </Grid>


          {/* Column Details */}
          <Typography variant="h6" mt={5}>
            Column Summary
          </Typography>

          <Table stickyHeader sx={{ mt: 3 }}>
            <TableHead>
                <TableRow>
                <TableCell>Column</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Null %</TableCell>
                <TableCell>Unique</TableCell>
                <TableCell>Quality</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {Object.entries(data.column_summary).map(([col, info]) => (
                <TableRow key={col} hover>
                    <TableCell>{col}</TableCell>
                    <TableCell>{info.dtype}</TableCell>
                    <TableCell>{info.null_percent}%</TableCell>
                    <TableCell>{info.unique_values}</TableCell>
                    <TableCell>
                    <Typography sx={{ color: qualityColor(info.null_percent) }}>
                        {info.null_percent === 0
                        ? "Good"
                        : info.null_percent < 20
                        ? "Warning"
                        : "Bad"}
                    </Typography>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>

            <Button
                variant="outlined"
                sx={{ mt: 3 }}
                onClick={() => {
                    const blob = new Blob(
                    [JSON.stringify(data, null, 2)],
                    { type: "application/json" }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "data_profile.json";
                    a.click();
                }}
                >
                Export Profiling Report
                </Button>


        </>
      )}
    </Card>
  );
}
