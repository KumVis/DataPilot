import { Card, Grid, Typography, Box } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import GridOnIcon from "@mui/icons-material/GridOn";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";

const chartTypes = [
  { id: "bar", label: "Bar Chart", icon: <BarChartIcon fontSize="large" /> },
  { id: "pie", label: "Pie Chart", icon: <PieChartIcon fontSize="large" /> },
  // {
  //   id: "heatmap",
  //   label: "Heatmap",
  //   icon: <GridOnIcon fontSize="large" />,
  // },
  // {
  //   id: "boxplot",
  //   label: "Box Plot",
  //   icon: <StackedBarChartIcon fontSize="large" />,
  // },
  { id: "line", label: "Line Chart", icon: <ShowChartIcon fontSize="large" /> },
  {
    id: "scatter",
    label: "Scatter Plot",
    icon: <ScatterPlotIcon fontSize="large" />,
  },
];

export default function ChartTypePanel({ selected, onSelect }) {
  return (
      <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography fontWeight={600} mb={2}>
        Chart Type
      </Typography>

      <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", // 🔑 EXACTLY 2 PER ROW
        gap: 2,
      }}
    >
      {chartTypes.map((c) => (
        <Card
          key={c.id}
          onClick={() => onSelect(c.id)}
          sx={{
            height: 90,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: 2,
            border:
              selected === c.id
                ? "2px solid #7c3aed"
                : "1px solid #e5e7eb",
            backgroundColor:
              selected === c.id ? "#f3e8ff" : "#ffffff",
          }}
        >
          <Box
            sx={{
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 0.5,
            }}
          >
            {c.icon}
          </Box>

          <Typography fontSize={13}>
            {c.label}
          </Typography>
        </Card>
      ))}
    </Box>

    </Card>
  );
}