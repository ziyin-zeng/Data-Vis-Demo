// React
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

// In-Project
import { getAllGlucoseValue, averageGlucose, tirGlucose } from "@/app/lib/glucoseCalculation";
import GlucoseDataType from '@/app/type/GlucoseDataType';
import GlucoseDataCard from './GlucoseDataCard'

interface GlucoseAnalysisProps {
    glucoseData: GlucoseDataType[],
}

export default function GlucoseAnalysis(props: GlucoseAnalysisProps) {
    const { glucoseData } = props;

    // without the [0], on first load, the Card component doesn't have anything to show
    const glucoseValue = glucoseData.length ? getAllGlucoseValue(glucoseData) : [0];

    const avgGlucose = glucoseData.length ? averageGlucose(glucoseValue) : '0';

    const tir = glucoseData.length ? tirGlucose(glucoseValue) : '0';

    return (
        <React.Fragment>
            <div className='text-start p-4 flex flex-col items-start justify-between xl:flex-row xl:items-end xl:p-8'>
                <Typography variant="h4" gutterBottom>
                    Glucose Analysis Summary
                </Typography>
                <CustomWidthTooltip title={studyExplaination} placement="top" arrow>
                    <Typography sx={{ color: "#696969" }} gutterBottom>
                        <TipsAndUpdatesOutlinedIcon sx={{ marginRight: "5px", marginBottom: "5px" }} />What is a study ?
                    </Typography>
                </CustomWidthTooltip>
            </div>
            <div className='p-4 flex flex-col items-center lg:justify-between lg:flex-row lg:p-10'>
                <Box className="w-[80%] lg:min-w-[25%] lg:max-w-[33%]">
                    <Card variant="outlined"><GlucoseDataCard value={'' + glucoseValue[glucoseValue.length - 1]} text="Latest glucose data" type="latest" /></Card>
                </Box>
                <Box className="w-[80%] lg:min-w-[25%] lg:max-w-[33%]">
                    <Card variant="outlined"><GlucoseDataCard value={avgGlucose} text="Average glucose in past 24h" type="average" /></Card>
                </Box>
                <Box className="w-[80%] lg:min-w-[25%] lg:max-w-[33%]">
                    <Card variant="outlined"><GlucoseDataCard value={tir} text="Time in range (TIR)" type="TIR" /></Card>
                </Box>
            </div>
        </React.Fragment>
    );
}

// this is for a larger tooltip
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 400,
    },
});

const studyExplaination = `A study in diabetes treatment is a research investigation 
                            designed to evaluate the efficacy, safety, and potential 
                            side effects of new treatments or interventions for diabetes.`