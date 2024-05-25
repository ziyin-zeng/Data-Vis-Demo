// React
import React, { useState, useEffect } from "react";

// 3rd party library
import ReactEcharts from "echarts-for-react";

// Redux
import { selectStudyById, fetchStudies } from "@/app/detail/StudySlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";

interface GlucoseChartProps {
  studyId : string
}

const GlucoseChart = (props: GlucoseChartProps) => {
  const { studyId } = props;
  const [data, setData] = useState([5, 20, 30]);
  const dispatch = useAppDispatch();
  const studiesStatus = useAppSelector(state => state.studies.status);

  useEffect(() => {
    if(studiesStatus === 'idle') {
      dispatch(fetchStudies());
    }
  }, [studiesStatus, dispatch])

  // get the study by id just after studies are fetched from API
  const study = useAppSelector((state) => selectStudyById(state, studyId));

  if(!study) {
    return <div>There is no study data</div>
  };

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
      <div>{study.id}</div>
      <ReactEcharts option={option} />
      <button onClick={updateData}>Update</button>
    </>
  );
};

export default GlucoseChart;
