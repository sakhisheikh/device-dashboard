import React from 'react';
import { PieChart, Pie } from 'recharts';
import PropTypes from 'prop-types';
import { CHART_DATA } from '../../utils/Constants';

function ReadingPieChart({
  value,
  unit,
  fontSize = 15,
  chartData = CHART_DATA.circle,
}) {
  return (
    <PieChart width={150} height={100}>
      <Pie
        data={chartData}
        dataKey="value"
        cx="50%"
        cy="50%"
        startAngle={-180}
        endAngle={180}
        innerRadius="95%"
        outerRadius="105%"
        stroke="none"
      />
      <g>
        <text
          x="50%"
          y="50%"
          dy={8}
          style={{
            fontSize,
          }}
          textAnchor="middle"
          fill="#4e6a87"
        >
          {value % 1 === 0 ? Number && value : Number(value).toFixed(2)} {unit}
        </text>
      </g>
    </PieChart>
  );
}

ReadingPieChart.propTypes = {
  unit: PropTypes.any,
  value: PropTypes.any,
  chartData: PropTypes.array,
  fontSize: PropTypes.number,
};

export default ReadingPieChart;
