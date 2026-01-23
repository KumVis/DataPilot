import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Grid,
  Box,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import { getColumns, compareWithPK } from "../api/dataComparisonApi";

export default function DataComparisonPage() {
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);

  const [columnsA, setColumnsA] = useState([]);
  const [columnsB, setColumnsB] = useState([]);

  const [pkA, setPkA] = useState("");
  const [pkB, setPkB] = useState("");

  const [result, setResult] = useState(null);
  const [activeView, setActiveView] = useState("changed");

  /* ---------------- File Handlers ---------------- */

  const handleFileA = async (file) => {
    setFileA(file);
    setPkA("");
    setResult(null);
    const cols = await getColumns(file);
    setColumnsA(cols);
  };

  const handleFileB = async (file) => {
    setFileB(file);
    setPkB("");
    setResult(null);
    const cols = await getColumns(file);
    setColumnsB(cols);
  };

  const handleCompare = async () => {
    const res = await compareWithPK(fileA, fileB, pkA, pkB);
    setResult(res);
    setActiveView("changed");
  };

  /* ---------------- Table Renderer ---------------- */

  const renderTable = (records, title) => {
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
        <Typography variant="h6" mt={4} sx={{ color: "#7c3aed" }}>
          {title}
        </Typography>

        <Table sx={{ mt: 2 }} size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col} sx={{ fontWeight: 600 }}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={col}>
                    {typeof row[col] === "object"
                      ? JSON.stringify(row[col])
                      : String(row[col])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  

  const renderChangedRecords = (records) => {
    if (!records || records.length === 0) {
      return (
        <Typography mt={2} color="text.secondary">
          No changed records found.
        </Typography>
      );
    }

    return (
      <Box mt={2}>
          {records.map((row, idx) => (
            <Card
                key={idx}
                sx={{
                  mb: 3,
                  p: 2,
                  borderLeft: "4px solid #7c3aed",
                  backgroundColor: "#faf5ff",
                }}
              >
                <Typography fontWeight={600} mb={1}>
                  Primary Key: {row.primary_key}
                </Typography>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: 8 }}>Column</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Old Value</th>
                      <th style={{ textAlign: "left", padding: 8 }}>New Value</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(row.changes).map(
                      ([col, diff]) => (
                        <tr key={col}>
                          <td style={{ padding: 8 }}>{col}</td>
                          <td style={{ padding: 8, color: "#dc2626" }}>
                            {String(diff.old)}
                          </td>
                          <td style={{ padding: 8, color: "#16a34a" }}>
                            {String(diff.new)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
            </Card>
          ))}
      </Box>

    );
  };

  return (
    <Card sx={{
          pt: 3,   // 🔽 smaller than before
          px: 2.5,
          pb: 4,
          borderRadius: 2,
          backgroundColor: "#FFFFFF",
          border: "1px solid #5917c4",
          
        }}>

      {/* ---------- HEADER ---------- */}
      <Typography variant="h5" gutterBottom>
        Data Comparison (With Primary Key)
      </Typography>

      <Typography color="text.secondary" mb={2}>
        Upload two files and compare them using primary keys.
      </Typography>

      {/* ---------- STEP 1 ---------- */}
{/* ---------- STEP 1 + STEP 2 (SIDE BY SIDE) ---------- */}
<Grid container spacing={3} mt={1} alignItems="stretch">

  {/* LEFT: STEP 1 */}
  <Grid item xs={12} md={8}>
    <Typography variant="subtitle1" fontWeight={600} mb={1}>
      Step 1: Upload files & select primary keys
    </Typography>

    <Grid container spacing={3}>
      {/* FILE A */}
      <Grid item xs={12} md={6}>
        <Card
          variant="outlined"
          sx={{
            p: 2.5,
            height: 190,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #5917c4",
          }}
        >
          <Typography fontWeight={600}>File A</Typography>

          <Stack spacing={1.5}>
            <Button variant="contained" component="label">
              Upload CSV / Excel
              <input
                hidden
                type="file"
                onChange={(e) => handleFileA(e.target.files[0])}
              />
            </Button>

            <Box sx={{ minHeight: 28 }}>
              {fileA && <Chip label={fileA.name} size="small" />}
            </Box>

            <FormControl size="small" sx={{ maxWidth: 220 }}>
              <Select
                displayEmpty
                value={pkA}
                onChange={(e) => setPkA(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Select Primary Key
                </MenuItem>
                {columnsA.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Card>
      </Grid>

      {/* FILE B */}
      <Grid item xs={12} md={6}>
        <Card
          variant="outlined"
          sx={{
            p: 2.5,
            height: 190,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #5917c4",
          }}
        >
          <Typography fontWeight={600}>File B</Typography>

          <Stack spacing={1.5}>
            <Button variant="contained" component="label">
              Upload CSV / Excel
              <input
                hidden
                type="file"
                onChange={(e) => handleFileB(e.target.files[0])}
              />
            </Button>

            <Box sx={{ minHeight: 28 }}>
              {fileB && <Chip label={fileB.name} size="small" />}
            </Box>

            <FormControl size="small" sx={{ maxWidth: 220 }}>
              <Select
                displayEmpty
                value={pkB}
                onChange={(e) => setPkB(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Select Primary Key
                </MenuItem>
                {columnsB.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  </Grid>

  {/* RIGHT: STEP 2 */}
  <Grid item xs={12} md={4}>
    <Typography variant="subtitle1" fontWeight={600} mb={1}>
      Step 2: Compare datasets
    </Typography>

    <Card
      variant="outlined"
      sx={{
        p: 3,
        height: 180,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa",
        border: "1px solid #5917c4",
      }}
    >
      <Button
        variant="contained"
        size="large"
        startIcon={<SwapHorizIcon />}
        disabled={!fileA || !fileB || !pkA || !pkB}
        onClick={handleCompare}
        sx={{ width: "100%", mb: 1 }}
      >
        Compare Files
      </Button>

      <Typography
        variant="caption"
        color="text.secondary"
        align="center"
      >
        Upload both files and select primary keys to enable comparison
      </Typography>
    </Card>
  </Grid>

</Grid>


      {/* ---------- RESULT SUMMARY ---------- */}
      {result && (
        <>
          <Grid container spacing={3} mt={4}>
            {[
              { key: "added", label: "Added Records", value: result.added.length },
              { key: "removed", label: "Removed Records", value: result.removed.length },
              { key: "changed", label: "Changed Records", value: result.changed.length },
            ].map((item) => (
              <Grid item xs={12} sm={4} key={item.key}>
                <Card
                  onClick={() => setActiveView(item.key)}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    border:
                      activeView === item.key
                        ? "2px solid #7c3aed"
                        : "1px solid #e5e7eb",
                    backgroundColor:
                      activeView === item.key ? "#f3e8ff" : "#ffffff",
                  }}
                >
                  <Typography>{item.label}</Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: "#7c3aed", fontWeight: 700 }}
                  >
                    {item.value}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* ---------- TABLE VIEW ---------- */}
          {activeView === "added" &&
            renderTable(result.added, "Added Records")}

          {activeView === "removed" &&
            renderTable(result.removed, "Removed Records")}

          {activeView === "changed" && (
          <>
            <Typography
              variant="h6"
              mt={4}
              mb={2}
              sx={{ color: "#7c3aed" }}
            >
              Changed Records
            </Typography>

            {renderChangedRecords(result.changed)}
          </>
        )}


        </>
      )}
    </Card>
  );
}
