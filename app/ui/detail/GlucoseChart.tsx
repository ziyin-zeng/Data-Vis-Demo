// React
import React from "react";

// 3rd party library
import ReactEcharts from "echarts-for-react";

// In-Project
import GlucoseDataType from "@/app/type/GlucoseDataType";
import StudyType from "@/app/type/StudyType";

interface GlucoseChartProps {
  study : StudyType;
  glucoseData: GlucoseDataType[];
}

const GlucoseChart = (props: GlucoseChartProps) => {
  const { study, glucoseData } = props;

  if (!study) {
    return <div>There is no study data</div>
  };

  const option = {
    title: {
      text: "Glucose Chart",
    },
    tooltip: {},
    xAxis: {
      data: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    },
    yAxis: {},
    series: [
      {
        name: "Sales",
        type: "bar",
        data: glucoseData.map(gd => gd.glucoseValue),
      },
    ],
  };

  return (
    <>
      <ReactEcharts option={option} />
    </>
  );
};

export default GlucoseChart;
