import React from 'react';
import { PieChart, Pie } from 'recharts';

function ReadingPieChart({ value, unit }) {
  const max = 360 - Math.abs(value);
  const chartData = [
    { name: 'score', value: Math.abs(value), fill: 'orange' },
    { name: 'max', value: max, max: '#eee' },
  ];
  return (
    <PieChart width={150} height={100}>
      <Pie
        data={chartData}
        dataKey="value"
        cx="50%"
        cy="50%"
        animationDuration={5000}
        startAngle={-180}
        endAngle={180}
        innerRadius="95%"
        outerRadius="105%"
        stroke="none"
      />
      <g>
        <text x="50%" y="50%" dy={8} textAnchor="middle" fill="#4e6a87">
          {value} {unit}
        </text>
      </g>
    </PieChart>
  );
}

export default ReadingPieChart;
