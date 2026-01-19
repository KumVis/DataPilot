import { Card, Typography, Box } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function DataVisualizationPage() {
  return (
    <Card sx={{ p: 6, textAlign: "center" }}>
      <Box mb={2}>
        <BarChartIcon sx={{ fontSize: 60, color: "#7c3aed" }} />
      </Box>

      <Typography variant="h5" gutterBottom>
        Data Visualization
      </Typography>

      <Typography color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
        Interactive charts, dashboards, and visual insights are coming soon.
        You’ll be able to visualize trends, distributions, and comparisons
        directly from your datasets.
      </Typography>

      <Box mt={4}>
        <Typography
          sx={{
            display: "inline-block",
            px: 2,
            py: 0.8,
            borderRadius: 2,
            backgroundColor: "#ede9fe",
            color: "#7c3aed",
            fontWeight: 600,
          }}
        >
          🚧 Coming Soon
        </Typography>
      </Box>
    </Card>
  );
}
