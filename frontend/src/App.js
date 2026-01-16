import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DataCleaningPage from "./pages/DataCleaningPage";
import DataComparisonPage from "./pages/DataComparisonPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/cleaning" />} />
          <Route path="/cleaning" element={<DataCleaningPage />} />
          <Route path="/comparison" element={<DataComparisonPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
