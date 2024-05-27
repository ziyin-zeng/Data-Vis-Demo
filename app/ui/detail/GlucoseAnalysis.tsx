// React
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

// In-Project
import { getAllGlucoseValue, averageGlucose } from "@/app/lib/glucoseCalculation";
import GlucoseDataType from '@/app/type/GlucoseDataType';
import GlucoseDataCard from './GlucoseDataCard'

interface GlucoseAnalysisProps {
    glucoseData: GlucoseDataType[];
}

export default function GlucoseAnalysis(props: GlucoseAnalysisProps) {
    const { glucoseData } = props;

    const avgGlucose = glucoseData.length ? averageGlucose(getAllGlucoseValue(glucoseData)) : 0;

    return (
        <React.Fragment>
            <div className='text-start'>
                <Typography variant="h4" gutterBottom>
                    Glucose Analysis Summary
                </Typography>
            </div>
            <div className='w-full flex flex-row justify-between p-8'>
                <Box sx={{ minWidth: 350 }}>
                    <Card variant="outlined"><GlucoseDataCard value={avgGlucose} text="Latest glucose data" type="latest"/></Card>
                </Box>
                <Box sx={{ minWidth: 350 }}>
                    <Card variant="outlined"><GlucoseDataCard value={avgGlucose} text="Average glucose in past 24h" type="average" /></Card>
                </Box>
                <Box sx={{ minWidth: 350 }}>
                    <Card variant="outlined"><GlucoseDataCard value={avgGlucose} text="Time in range (TIR)" type="TIR" /></Card>
                </Box>
            </div>
        </React.Fragment>
    );
}