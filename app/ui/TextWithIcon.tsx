import Typography from '@mui/material/Typography';
import React from 'react';


const TextWithIcon = ({ children }: { children: React.ReactNode }) => {
    return (
        <Typography sx={{ color: "#696969" }} gutterBottom>
            {children} What is a study ?
        </Typography>
    )
};

export default TextWithIcon;