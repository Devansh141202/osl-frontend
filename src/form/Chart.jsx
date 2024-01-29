import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data, title }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (data) {
      const chartLabels = data.map(item => item._id);
      const chartValues = data.map(item => item.count);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Hours Worked',
            data: chartValues,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;
