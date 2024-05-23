import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactEcharts from "echarts-for-react";

const GlucoseChart = () => {
  const [data, setData] = useState([5, 20, 30]);

  const updateData = () => {
    setData(data.map((d) => d + Math.floor(Math.random() * 10)));
  };

  const option = {
    title: {
      text: "Glucose Chart",
    },
    tooltip: {},
    xAxis: {
      data: ["A", "B", "C"],
    },
    yAxis: {},
    series: [
      {
        name: "Sales",
        type: "bar",
        data: data,
      },
    ],
  };

  return (
    <>
      <ReactEcharts option={option} />
      <button onClick={updateData}>Update</button>
    </>
  );
};

export default GlucoseChart;
