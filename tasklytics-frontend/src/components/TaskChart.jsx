import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function TaskChart({ data }) {
    if (!data) return null;

    const chartData = [
        {
            name: "Completed",
            value: data.completed_task || 0
        },
        {
            name: "Remaining",
            value: (data.total_tasks - data.completed_tasks) || 0
        }
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