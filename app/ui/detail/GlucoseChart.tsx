// React
import React from "react";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

// 3rd party library
import ReactEcharts from "echarts-for-react";

// In-Project
import GlucoseDataType from "@/app/type/GlucoseDataType";
import { getAllGlucoseValueAndDate } from "@/app/lib/glucoseCalculation";

interface GlucoseChartProps {
  glucoseData: GlucoseDataType[];
}

const GlucoseChart = (props: GlucoseChartProps) => {
  const { glucoseData } = props;

  let data = getAllGlucoseValueAndDate(glucoseData); 

  // let base = +new Date(2024, 4, 28);
  // let fiveMin = 5 * 60 * 1000;

  // let data: [[number, number | null]] = [[base, 5.2]];

  // for (let i = 1; i < 20000; i++) {
  //   let now = +new Date((base += fiveMin));

  //   let lastData = (data[i - 1][1] ? data[i - 1][1] : data[i - 2][1]) as number;
  //   let nextData: number = +((Math.random() - 0.5) * 2 + lastData).toFixed(1);
  //   if (nextData >= 15) {
  //     data.push([now, 15]);
  //   } else if (nextData <= 3 || !nextData) {
  //     data.push([now, 3]);
  //   } else if (Math.round(Math.random() * 100) > 95) {
  //     data.push([now, null]);
  //   } else {
  //     data.push([now, nextData]);
  //   }
  // }

  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any[]) {
        return [pt[0], '5%'];
      }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%'],
      splitLine: {
        show: false
      },
      splitArea: {
        show: true,
        areaStyle : {
          color: ['rgba(0,0,0,0.3)','rgba(200,200,200,0.3)']
        }
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Glucose value',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: data
      }
    ]
  };

  return (
    <div className="text-start">
      <div className="p-4 flex flex-col items-start justify-between xl:flex-row xl:items-end xl:p-8">
        <Typography variant="h4" gutterBottom>
          Continous Glucose Monitoring History
        </Typography>
        <CustomWidthTooltip title={breakPointsExplaination} placement="top" arrow>
          <Typography sx={{color:"#696969"}} gutterBottom>
            <TipsAndUpdatesOutlinedIcon sx={{marginRight : "5px", marginBottom : "5px"}}/>Why am I seeing break points ?
          </Typography>
        </CustomWidthTooltip>
      </div>
      <div className="p-4 lg:p-10">
        <ReactEcharts option={option} />
      </div>
    </div>
  );
};

export default GlucoseChart;

// this is for a larger tooltip
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 600,
  },
});

const breakPointsExplaination = `This is due to the device's intermittent data transmission, 
                                  calibration processes, and possible signal interruptions. 
                                  These factors cause gaps in the continuous data stream, 
                                  leading to periods without recorded glucose values.`