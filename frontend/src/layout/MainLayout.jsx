import { Box, Container } from "@mui/material";

export default function MainLayout({ children }) {
  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">{children}</Container>
    </Box>
  );
}