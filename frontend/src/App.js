import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DataCleaningPage from "./pages/DataCleaningPage";
import DataComparisonPage from "./pages/DataComparisonPage";
import KnowYourDataPage from "./pages/KnowYourDataPage";
import DataVisualizationPage from "./pages/DataVisualizationPage";


function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/profiling" />} />
          <Route path="/cleaning" element={<DataCleaningPage />} />
          <Route path="/comparison" element={<DataComparisonPage />} />
          <Route path="/profiling" element={<KnowYourDataPage />} />
          <Route path="/visualization" element={<DataVisualizationPage />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
