// React
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

// In-Project
import { getAllGlucoseValue, averageGlucose, tirGlucose } from "@/app/lib/glucoseCalculation";
import GlucoseDataType from '@/app/type/GlucoseDataType';
import GlucoseDataCard from './GlucoseDataCard'

interface GlucoseAnalysisProps {
    glucoseData: GlucoseDataType[];
}

export default function GlucoseAnalysis(props: GlucoseAnalysisProps) {
    const { glucoseData } = props;

    // without the [0], on first load, the Card component doesn't have anything to show
    const glucoseValue = glucoseData.length ? getAllGlucoseValue(glucoseData) : [0];

    const avgGlucose = glucoseData.length ? averageGlucose(glucoseValue) : '0';

    const tir = glucoseData.length ? tirGlucose(glucoseValue) : '0';

    return (
        <React.Fragment>
            <div className='text-start'>
                <Typography variant="h4" gutterBottom>
                    Glucose Analysis Summary
                </Typography>
            </div>
            <div className='w-full flex flex-row justify-between p-8'>
                <Box sx={{ minWidth: 350 }}>
                    <Card variant="outlined"><GlucoseDataCard value={''+glucoseValue[glucoseValue.length - 1]} text="Latest glucose data" type="latest"/></Card>
                </Box>
                <Box sx={{ minWidth: 350 }}>
                    <Card variant="outlined"><GlucoseDataCard value={avgGlucose} text="Average glucose in past 24h" type="average" /></Card>
                </Box>
                <Box sx={{ minWidth: 350 }}>
                    <Card variant="outlined"><GlucoseDataCard value={tir} text="Time in range (TIR)" type="TIR" /></Card>
                </Box>
            </div>
        </React.Fragment>
    );
}