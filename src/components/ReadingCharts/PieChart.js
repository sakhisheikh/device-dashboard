import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';
import { CHART_DATA } from '../../utils/Constants';

function ReadingPieChart({
  value,
  unit,
  dy = 6,
  fontSize = 12,
  chartData = CHART_DATA.circle(true),
}) {
  return (
    <PieChart width={100} height={100}>
      <Pie
        data={chartData}
        dataKey="value"
        cx="50%"
        cy="50%"
        fill="#8884d8"
        startAngle={-180}
        endAngle={180}
        innerRadius="90%"
        outerRadius="100%"
        paddingAngle={5}
        stroke="none"
        isAnimationActive={false}
      >
        <Cell />
      </Pie>
      <g>
        <text
          x="50%"
          y="50%"
          dy={dy}
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
  dy: PropTypes.number,
};

export default ReadingPieChart;
