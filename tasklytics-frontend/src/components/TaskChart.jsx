import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function TaskChart({ data }) {
    if (!data) return null;

    const completed = data.completed_tasks || 0;
    const total = data.total_tasks || 0;

    const chartData = [
        { name: "Completed", value: completed },
        { name: "Remaining", value: Math.max(total - completed, 0) }
    ];

    const COLORS = ["#4ade80", "#f97316"];

    return(
        <PieChart width={300} height={300}>
            <Pie
            data={chartData}
            dataKey="value"
            outerRadius={100}
            label
        >
            {chartData.map((entry, index) => (
                <Cell 
                key={`cell${index}`}
                fill={COLORS[index]} />
            ))}
        </Pie>

        <Tooltip />
        <Legend />
        </PieChart>
    );
}