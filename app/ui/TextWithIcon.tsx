// React
import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


const TextWithIcon = ({ children, explaination, content }: { children: React.ReactNode, explaination: string, content: string }) => {
    return (
        <CustomWidthTooltip title={explaination} placement="top" arrow>
            <Typography sx={{ color: "#696969" }} gutterBottom>
                {children}{content}
            </Typography>
        </CustomWidthTooltip>
    )
};

export default TextWithIcon;

// this is for a larger tooltip
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 400,
        fontSize: "1rem"
    },
});