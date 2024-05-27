// React
import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// In-Project
import ExplainationPopup from '../ExplainationPopup';

interface ContentProps {
    value: number;
    text: string;
    type: string;
}

const GlucoseDataCard = (props: ContentProps) => {
    const { value, text, type } = props;

    return (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                    {text}
                </Typography>
                <Typography sx={{ fontSize: 34 }} color="text.secondary">
                    {value}
                </Typography>
            </CardContent>
            <ExplainationPopup type={type}/>
        </React.Fragment>
    );
}

export default GlucoseDataCard;