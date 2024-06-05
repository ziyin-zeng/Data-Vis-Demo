import CircularProgress from '@mui/material/CircularProgress';

const GlobalLoading = () => {
    return (
        <div className="flex flex-row justify-center items-center h-screen">
            <div className="w-1/2 text-center flex flex-col justify-between items-center h-[15vh]">
                <CircularProgress size={50} />
                {"Loading ..."}
            </div>
        </div>
    )
};

export default GlobalLoading;