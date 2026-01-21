import { Box, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Data Profiling", path: "/profiling" },
  { label: "Data Cleaning", path: "/cleaning" },
  { label: "Data Comparison", path: "/comparison" },
  { label: "Data Visualization", path: "/visualization" },
];

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ mb: 3, color: "#7c3aed" }}
        >
          DataPilot
        </Typography>

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: "#ede9fe",
                  color: "#7c3aed",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        {children}

        {/* Footer */}
        <Box
          sx={{
            textAlign: "right",
            mt: 6,
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          Developed by Kumar Vishal
        </Box>
      </Box>
    </Box>
  );
}
