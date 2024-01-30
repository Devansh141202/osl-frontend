import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, title }) => {
  console.log(data, title)
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (data) {
      const chartLabels = data.map((item) => item._id);
      const chartValues = data.map((item) => item.count);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Hours Worked",
            data: chartValues,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,0.5)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      <h2>{title}</h2>
      <Bar
        // data={{
        //   labels: ["Jun", "Jul", "Aug"],
        //   datasets: [
        //     {
        //       id: 1,
        //       label: "",
        //       data: [5, 6, 7],
        //     },
        //     {
        //       id: 2,
        //       label: "",
        //       data: [3, 2, 1],
        //     },
        //   ],
        // }}
 
      />
    </div>
  );
};

export default Chart;
