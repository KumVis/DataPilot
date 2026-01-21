import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Cell,
} from "recharts";

export default function ChartCanvas({ data, chartType, xAxis, yAxis }) {
  if (!data || !data.length) return null;

  /* ---------- HEATMAP PREPROCESS ---------- */
  const heatmapData =
    chartType === "heatmap"
      ? data.map((d) => ({
          x: d[xAxis],
          y: d[yAxis],
          value: Number(d[yAxis]),
        }))
      : [];

  /* ---------- BOX PLOT PREPROCESS ---------- */
  const values =
    chartType === "boxplot"
      ? data.map((d) => Number(d[yAxis])).filter((v) => !isNaN(v))
      : [];

  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q2 = sorted[Math.floor(sorted.length * 0.5)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  return (
    <ResponsiveContainer width="100%" height={400}>
      {/* ---------- BAR ---------- */}
      {chartType === "bar" && xAxis && yAxis && (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yAxis} fill="#7c3aed" />
        </BarChart>
      )}

      {/* ---------- LINE ---------- */}
      {chartType === "line" && xAxis && yAxis && (
        <LineChart data={data}>
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Line dataKey={yAxis} stroke="#7c3aed" />
        </LineChart>
      )}

      {/* ---------- PIE ---------- */}
      {chartType === "pie" && xAxis && yAxis && (
        <PieChart>
          <Tooltip />
          <Pie data={data} dataKey={yAxis} nameKey={xAxis} fill="#7c3aed" />
        </PieChart>
      )}

      {/* ---------- SCATTER ---------- */}
      {chartType === "scatter" && xAxis && yAxis && (
        <ScatterChart>
          <XAxis dataKey={xAxis} />
          <YAxis dataKey={yAxis} />
          <Tooltip />
          <Scatter data={data} fill="#7c3aed" />
        </ScatterChart>
      )}

      {/* ---------- HEATMAP ---------- */}
      {chartType === "heatmap" && xAxis && yAxis && (
        <ScatterChart>
          <XAxis dataKey="x" />
          <YAxis dataKey="y" />
          <Tooltip />
          <Scatter data={heatmapData}>
            {heatmapData.map((entry, index) => (
              <Cell
                key={index}
                fill={`rgba(124,58,237,${entry.value / max || 0.3})`}
              />
            ))}
          </Scatter>
        </ScatterChart>
      )}

      {/* ---------- BOX PLOT ---------- */}
      {chartType === "boxplot" && values.length > 0 && (
        <ComposedChart
          data={[
            {
              min,
              q1,
              q2,
              q3,
              max,
            },
          ]}
        >
          <YAxis />
          <Tooltip />
          <Bar dataKey="q3" fill="#ddd" />
          <Bar dataKey="q2" fill="#7c3aed" />
          <Bar dataKey="q1" fill="#ddd" />
        </ComposedChart>
      )}
    </ResponsiveContainer>
  );
}
