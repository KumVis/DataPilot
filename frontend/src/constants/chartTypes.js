// src/constants/chartTypes.js
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import GridOnIcon from "@mui/icons-material/GridOn";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";


export const CHART_TYPES = [
  {
    id: "bar",
    label: "Bar Chart",
    icon: BarChartIcon,
  },
  {
    id: "line",
    label: "Line Chart",
    icon: ShowChartIcon,
  },
  {
    id: "pie",
    label: "Pie Chart",
    icon: PieChartIcon,
  },
  {
    id: "scatter",
    label: "Scatter Plot",
    icon: ScatterPlotIcon,
  },
    {
    id: "heatmap",          // ⭐ NEW
    label: "Heatmap",
    icon: GridOnIcon,
  },
  {
    id: "boxplot",          // ⭐ NEW
    label: "Box Plot",
    icon: StackedBarChartIcon,
  },
];
