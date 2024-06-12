// React
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

// Next
import Image from 'next/image';

// In-Project
import latestGlucose from '../../public/latest-glucose.svg';
import averageGlucose from '../../public/past-24h-glucose.svg';
import TIRGlucose from '../../public/TIR-glucose.svg';

// this is where custom styles are defined
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface ExplainationPopupProps {
    type: string;
}

export default function ExplainationPopup(props: ExplainationPopupProps) {
    const [open, setOpen] = React.useState(false);
    const { type } = props;
    let title;
    let img;
    let explainContent;

    switch (type) {
        case "latest":
            title = "How the latest glucose data is calculated ?";
            img = <Image
                src={latestGlucose}
                alt="latest glucose data image"
                width={300}
            />
            explainContent = `The CGM sensor measures interstitial fluid glucose levels every few minutes. 
                                These readings are sent to the receiver, where they are processed using 
                                calibration algorithms to provide an accurate glucose level.`;
            break;
        case "average":
            title = "How the average glucose data is calculated ?";
            img = <Image
                src={averageGlucose}
                alt="average glucose data image"
                width={300}
            />
            explainContent = `The CGM takes glucose readings at regular intervals (e.g., every 5 minutes). 
                                To calculate the average glucose over the past 24 hours, it sums all the 
                                glucose readings taken in that period and divides by the total number of readings.`;
            break;
        case "TIR":
            title = "How the TIR glucose data is calculated ?";
            img = <Image
                src={TIRGlucose}
                alt="TIR glucose data image"
                width={300}
            />
            explainContent = `TIR is the percentage of time glucose levels are within a target range (e.g., 70-180 mg/dL). 
                                The CGM tracks the duration of time glucose levels stay within this range over a specific period 
                                (e.g., 24 hours) and calculates the percentage based on the total monitored time.`;
            break;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <button className='w-[50%] xl:w-[37%] my-2 text-[#AC0BF8] border rounded-2xl border-[#AC0BF8] border-solid hover:bg-gray-100' onClick={handleClickOpen}>Learn More</button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent dividers>
                    <div className='flex flex-row justify-between'>
                        {img}
                        <Typography gutterBottom>
                            {explainContent}
                        </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className='text-[#AC0BF8] p-2' onClick={handleClose}>OK, got it</button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
