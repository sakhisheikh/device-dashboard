import React from 'react';
import { PieChart, Pie } from 'recharts';
import { withStyles } from '@material-ui/core/styles';

const chartData = [{ name: 'score', value: 100, fill: 'orange' }];

const styles = {
  animate: {
    animation: 'fade-in 2000ms infinite',
  },
};

function Circle({ value, unit = '', fontSize = 15 }) {
  return (
    <PieChart width={150} height={100}>
      <Pie
        data={chartData}
        dataKey="value"
        cx="50%"
        cy="50%"
        startAngle={0}
        endAngle={360}
        innerRadius="100%"
        outerRadius="110%"
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

export default withStyles(styles)(Circle);
