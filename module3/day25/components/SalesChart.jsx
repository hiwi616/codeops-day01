"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function SalesChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-slate-500 text-sm">No sales data available.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Category Sales Volume
        </h2>
        <p className="text-slate-500 text-xs">
          Total revenue breakdown by Ethiopian dish category in ETB.
        </p>
      </div>

      {/* Accessible visual chart container */}
      <div className="w-full h-72" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              stroke="#64748B"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#64748B"
              fontSize={12}
            />
            <Tooltip
              formatter={(value) => [`${value} ETB`, "Revenue"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="revenue" fill="#1B4D8E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Screen-reader accessible table fallback */}
      <table className="sr-only">
        <caption>Category Sales Data Summary</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Revenue (ETB)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.category}>
              <td>{item.category}</td>
              <td>{item.revenue} ETB</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
