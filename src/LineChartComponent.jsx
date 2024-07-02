import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "react-responsive";
import MyWeatherContext from "./assets/context/MyContext";


const LineChartComponent = () => {
  const {datas} = useContext(MyWeatherContext)
  console.log(datas)
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  let margins = { top: 35, right: 30, left: 80, bottom: 5 };
  let tick = { fontSize: 14, fill: "#273362" };
  let fontSize = 40;
  if (isSmallScreen) {
    margins = { top: 2, right: 0, left: 0, bottom: 5 };
    tick = { fontSize: 10, fill: "#273362" };
    fontSize = 14;
  }
  return (
    <>
      <h1 className="title">
        Line chart showing relation of temperature and humidity
      </h1>

      <ResponsiveContainer
        className="lineChar-container"
        width="100%"
        height={400}
        padding={0}
      >
        <LineChart className="line-chart" data={datas} margin={margins}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={tick} // Customizes the font size and color
          />
          <YAxis
            tick={tick} // Customizes the font size and color
          />
          <Tooltip />

          <Legend
            verticalAlign="top" // Adjust alignment of legend
            height={36} // Optional: Adjust height of the legend
            margin={{ top: 2, bottom: 2 }} // Add margin to legend
            formatter={(value, entry) => (
              <span style={{ fontSize: fontSize }}>{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="tempmax"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="hum" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartComponent;
