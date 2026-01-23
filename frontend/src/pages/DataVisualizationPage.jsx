import { useState } from "react";
import {
  Card,
  Typography,
  Stack,
  Select,
  MenuItem,
  Button,
  Divider,
  Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import html2canvas from "html2canvas";

import FileUpload from "../components/FileUpload";
import ChartTypePanel from "../components/ChartTypePanel";
import ChartCanvas from "../components/ChartCanvas";
import { analyzeVisualizationFile } from "../api/dataVisualizationApi";

export default function DataVisualizationPage() {
  const [columns, setColumns] = useState([]);
  const [rawData, setRawData] = useState([]);

  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  /* ---------- Upload ---------- */
  const handleUpload = async (file) => {
    const res = await analyzeVisualizationFile(file);
    setColumns(res.columns || []);
    setRawData(res.sample_data || []);
    setXAxis("");
    setYAxis("");
  };

  /* ---------- Export CSV ---------- */
  const handleExportCSV = () => {
    if (!rawData.length) return;

    const headers = Object.keys(rawData[0]).join(",");
    const rows = rawData.map((r) => Object.values(r).join(",")).join("\n");

    const blob = new Blob([`${headers}\n${rows}`], {
      type: "text/csv",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chart_data.csv";
    link.click();
  };

  /* ---------- Export PNG (FIXED) ---------- */
  const handleExportPNG = async () => {
    const element = document.getElementById("chart-export-area");
    if (!element) {
      alert("Chart not found");
      return;
    }

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
      <Box
        sx={{
          minHeight: "80vh",
          borderRadius: 2,
          background: `
            linear-gradient(
              180deg,
              #ffffffe0 0%,
              #ffffffe0 0%
            )
          `,
          border: "1px solid #5917c4",
          p: 3,
        }}
      >
      {/* ===== HEADER ===== */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            Data Visualization
          </Typography>
          <Typography color="text.secondary">
            Upload data and create interactive charts
          </Typography>
        </Box>

        <FileUpload onFileSelect={handleUpload} />
      </Stack>

      {/* ===== MAIN LAYOUT (SIDEBAR + CHART) ===== */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        {/* ===== LEFT SIDEBAR ===== */}
        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            
          }}
        > 
          <Stack spacing={14}>
            <Card variant="outlined" sx={{border: "1px solid #5917c4",}}>
            <ChartTypePanel
              selected={chartType}
              onSelect={setChartType}
            />
             </Card>

            <Card variant="outlined" sx={{ p: 3 ,border: "1px solid #5917c4",}}>
              <Typography fontWeight={600} mb={2}>
                Axis Mapping
              </Typography>

              <Stack spacing={2}>
                <Select
                  size="small"
                  value={xAxis}
                  displayEmpty
                  onChange={(e) => setXAxis(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    X Axis
                  </MenuItem>
                  {columns.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>

                <Select
                  size="small"
                  value={yAxis}
                  displayEmpty
                  onChange={(e) => setYAxis(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    Y Axis
                  </MenuItem>
                  {columns.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Card>
          </Stack>
        </Box>

        {/* ===== RIGHT CHART PREVIEW ===== */}
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Card variant="outlined" sx={{ p: 3,border: "1px solid #5917c4", }}>
            <Typography fontWeight={600} mb={2}>
              Chart Preview
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* 🔑 EXPORT AREA */}
            <Box
              id="chart-export-area"
              sx={{ width: "100%", height: 420 }}
            >
              <ChartCanvas
                data={rawData}
                chartType={chartType}
                xAxis={xAxis}
                yAxis={yAxis}
              />
            </Box>

            <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportPNG}
                disabled={!rawData.length}
              >
                Export PNG
              </Button>


            </Stack>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
