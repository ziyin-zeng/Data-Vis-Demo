// React
import React from "react";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { Skeleton } from '@mui/material';

// 3rd party library
import ReactEcharts from "echarts-for-react";

// In-Project
import GlucoseDataType from "@/app/type/GlucoseDataType";
import { getAllGlucoseValueAndDate, getSevenDaysGlucoseValueAndDate } from "@/app/lib/glucoseCalculation";
import TextWithIcon from '../TextWithIcon';

interface GlucoseChartProps {
  glucoseData: GlucoseDataType[],
  glucoseDataStatus: string,
}

const GlucoseMultiChart = (props: GlucoseChartProps) => {
  const { glucoseData, glucoseDataStatus } = props;

  let data = getSevenDaysGlucoseValueAndDate(getAllGlucoseValueAndDate(glucoseData));

  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any[]) {
        return [pt[0], '5%'];
      }
    },
    // color: "#FFFFFF",
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      // type: 'time',
      // boundaryGap: false
      type: 'category',
      boundaryGap: true,
      data: ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45',
        '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45']
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%'],
      splitLine: {
        show: false
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(0,0,0,0.3)', 'rgba(200,200,200,0.3)']
        }
      }
    },
    legend: {
      data: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    },
    series: [
      // {
      //   name: 'Stacked Glucose value',
      //   type: 'line',
      //   smooth: true,
      //   symbol: 'none',
      //   data: data
      // }
      {
        name: 'Day 1',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'Total',
        data: data[0]
      },
      {
        name: 'Day 2',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'Total',
        data: data[1]
      },
      {
        name: 'Day 3',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'Total',
        data: data[2]
      },
      {
        name: 'Day 4',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'Total',
        data: data[3]
      },
      {
        name: 'Day 5',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'Total',
        data: data[4]
      },
      {
        name: 'Day 6',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'Total',
        data: data[5]
      },
      {
        name: 'Day 7',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'Total',
        data: data[6]
      }
    ]
  };

  return (
    <div className="text-start">
      <div className="p-4 flex flex-col items-start justify-between xl:flex-row xl:items-end xl:p-8">
        <Typography variant="h4" gutterBottom>
          Stacked Glucose History of the recent 7 days {glucoseDataStatus === 'loading' ? <CircularProgress size={30} /> : ""}
        </Typography>
        <TextWithIcon explaination={breakPointsExplaination} content="Why am I seeing break points ?">
          <TipsAndUpdatesOutlinedIcon sx={{ marginRight: "5px", marginBottom: "5px" }} />
        </TextWithIcon>
      </div>
      {glucoseDataStatus === 'loading'
        ? <Skeleton variant="rectangular" width={"75%"} height={"200px"} sx={{ marginLeft: "12%", marginTop: "5%", background: "#6b728052", borderRadius: "30px" }} />
        : <div className="px-4 pb-2 lg:px-10 lg:pb-8">
          <ReactEcharts option={option} />
        </div>}
    </div>
  );
};

export default GlucoseMultiChart;

const breakPointsExplaination = `This is due to the device's intermittent data transmission, 
                                  calibration processes, and possible signal interruptions. 
                                  These factors cause gaps in the continuous data stream, 
                                  leading to periods without recorded glucose values.`