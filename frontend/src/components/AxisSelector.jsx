// src/components/AxisSelector.jsx
import { FormControl, MenuItem, Select, Stack } from "@mui/material";

export default function AxisSelector({
  columns,
  xAxis,
  yAxis,
  setXAxis,
  setYAxis,
}) {
  return (
    <Stack direction="row" spacing={2} mt={2}>
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <Select
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
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <Select
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
      </FormControl>
    </Stack>
  );
}
