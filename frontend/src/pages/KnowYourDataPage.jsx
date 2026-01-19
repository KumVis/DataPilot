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
  Button,
} from "@mui/material";

import FileUpload from "../components/FileUpload";
import { profileData } from "../api/knowYourDataApi";

export default function KnowYourDataPage() {
  const [data, setData] = useState(null);
  const [activeView, setActiveView] = useState("columns");
  const VIOLET = "#7C4DFF"; // orchid/violet

  // ---------- UI helpers ----------
  const qualityColor = (percent) => {
    if (percent === 0) return "success.main";
    if (percent < 20) return "warning.main";
    return "error.main";
  };

  // ---------- Records table renderer ----------
  const renderRecordsTable = (records, title) => {
    if (!records || records.length === 0) {
      return (
        <Typography mt={3} color="text.secondary">
          No records found.
        </Typography>
      );
    }

    const columns = Object.keys(records[0]);

    return (
      <>
        <Typography variant="h6" mt={4}>
          {title}
        </Typography>

        <Table stickyHeader sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((row, idx) => (
              <TableRow key={idx} hover>
                {columns.map((col) => (
                  <TableCell key={col}>
                    {row[col] === null ? "NULL" : String(row[col])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  // ---------- Column summary renderer ----------
  const renderColumnSummary = () => (
    <>
      <Typography variant="h6" mt={4}>
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
    </>
  );

  // ---------- Dynamic view selector ----------
  const renderTable = () => {
    if (activeView === "rows") {
      return renderRecordsTable(data.top_rows, "Top 5 Records");
    }
    if (activeView === "duplicates") {
      return renderRecordsTable(
        data.duplicates,
        "Duplicate Records (Including First)"
      );
    }
    if (activeView === "nulls") {
      return renderRecordsTable(
        data.null_records,
        "Records with Null Values"
      );
    }
    return renderColumnSummary();
  };

  // ---------- Upload handler ----------
  const handleUpload = async (file) => {
    const result = await profileData(file);
    setData(result);
    setActiveView("columns");
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
          {/* ---------- KPI Cards ---------- */}
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} sm={3}>
              <Card
                onClick={() => setActiveView("rows")}
                sx={{
                    cursor: "pointer",
                    p: 2,
                    textAlign: "center",
                    border:
                    activeView === "rows" ? `2px solid ${VIOLET}` : "1px solid #e0e0e0",
                    backgroundColor:
                    activeView === "rows" ? "#F3EEFF" : "white",
                    transition: "all 0.2s ease",
                }}
                >
                <Typography
                    color={activeView === "rows" ? VIOLET : "text.secondary"}
                >
                    Rows
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: activeView === "rows" ? VIOLET : "inherit" }}
                >
                    {data.rows}
                </Typography>
                </Card>

            </Grid>

            <Grid item xs={12} sm={3}>
              <Card
                onClick={() => setActiveView("columns")}
                sx={{
                    cursor: "pointer",
                    p: 2,
                    textAlign: "center",
                    border:
                    activeView === "columns" ? `2px solid ${VIOLET}` : "1px solid #e0e0e0",
                    backgroundColor:
                    activeView === "columns" ? "#F3EEFF" : "white",
                    transition: "all 0.2s ease",
                }}
                >
                <Typography
                    color={activeView === "columns" ? VIOLET : "text.secondary"}
                >
                    Columns
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: activeView === "columns" ? VIOLET : "inherit" }}
                >
                    {data.columns}
                </Typography>
                </Card>

            </Grid>

            <Grid item xs={12} sm={3}>
              <Card
                onClick={() => setActiveView("duplicates")}
                sx={{
                    cursor: "pointer",
                    p: 2,
                    textAlign: "center",
                    border:
                    activeView === "duplicates"
                        ? `2px solid ${VIOLET}`
                        : "1px solid #e0e0e0",
                    backgroundColor:
                    activeView === "duplicates" ? "#F3EEFF" : "white",
                    transition: "all 0.2s ease",
                    "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                    },
                }}
                >
                <Typography
                    sx={{
                    color:
                        activeView === "duplicates" ? VIOLET : "text.secondary",
                    fontWeight: 500,
                    }}
                >
                    Duplicates %
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                    color: activeView === "duplicates" ? VIOLET : "inherit",
                    fontWeight: 600,
                    }}
                >
                    {data.duplicate_percent}%
                </Typography>
                </Card>

            </Grid>

            <Grid item xs={12} sm={3}>
              <Card
                onClick={() => setActiveView("nulls")}
                sx={{
                    cursor: "pointer",
                    p: 2,
                    textAlign: "center",
                    border:
                    activeView === "nulls"
                        ? `2px solid ${VIOLET}`
                        : "1px solid #e0e0e0",
                    backgroundColor:
                    activeView === "nulls" ? "#F3EEFF" : "white",
                    transition: "all 0.2s ease",
                    "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                    },
                }}
                >
                <Typography
                    sx={{
                    color:
                        activeView === "nulls" ? VIOLET : "text.secondary",
                    fontWeight: 500,
                    }}
                >
                    Null Cells %
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                    color: activeView === "nulls" ? VIOLET : "inherit",
                    fontWeight: 600,
                    }}
                >
                    {data.null_cell_percent}%
                </Typography>
                </Card>

            </Grid>
          </Grid>

          {/* ---------- Dynamic Drill-down View ---------- */}
          {renderTable()}

          {/* ---------- Export ---------- */}
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
