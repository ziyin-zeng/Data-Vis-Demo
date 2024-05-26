// React
import React, { useState, useEffect } from "react";

// 3rd party library
import ReactEcharts from "echarts-for-react";

// Redux
import { selectStudyById, fetchStudies } from "@/app/detail/StudySlice";
import { selectGlucoseData, fetchGlucoseData, setFetchStatus } from "@/app/detail/GlucoseSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";

// In-Project
import { getAllGlucoseValue, averageGlucose } from "@/app/lib/glucoseCalculation";

interface GlucoseChartProps {
  studyId: string
}

const GlucoseChart = (props: GlucoseChartProps) => {
  const { studyId } = props;
  const dispatch = useAppDispatch();
  const studiesStatus = useAppSelector(state => state.studies.status);
  // Each time the page is reloaded, reset the status to idle, then it will cause a re-fetch
  dispatch(setFetchStatus("idle"));
  const glucoseDataStatus = useAppSelector(state => state.glucoseData.status);

  useEffect(() => {
    if (studiesStatus === 'idle') {
      dispatch(fetchStudies());
    }
    if (glucoseDataStatus === 'idle') {
      dispatch(fetchGlucoseData(studyId));
    }
  }, [studiesStatus, glucoseDataStatus, dispatch]);

  // get the study by id just after studies are fetched from API
  const study = useAppSelector((state) => selectStudyById(state, studyId));

  // get glucose data no matter if study exists
  const glucoseData = useAppSelector(selectGlucoseData);

  const avgGlucose = glucoseData.length ? averageGlucose(getAllGlucoseValue(glucoseData)) : "Loading";

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
      <div>{avgGlucose}</div>
      <ReactEcharts option={option} />
    </>
  );
};

export default GlucoseChart;
