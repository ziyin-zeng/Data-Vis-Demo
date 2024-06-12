// React
import React from "react";
import RecentActorsIcon from '@mui/icons-material/RecentActors';

// Redux
import { useAppSelector } from "@/app/store/hook";
import { selectCurrentPatientId, selectPatients } from "../../home/PatientSlice";

// In-Project
import PatientAvatar from "../PatientAvatar";

interface SideBarPatientListProps {
    handleClickCallback: (selectedId: number) => void
}

const SideBarPatientList = (props: SideBarPatientListProps) => {
    const { handleClickCallback } = props;

    const currentPatientId = useAppSelector(selectCurrentPatientId);
    const patientsList = useAppSelector(selectPatients);

    const getButtonTailwindStyleById = (id: number) => {
        return `w-full flex flex-row items-center p-2 my-2 rounded-[8px] ${+currentPatientId === id ? 'bg-[#AC0BF8]' : 'bg-[#121212]'}`
    }

    return (
        <div className='overflow-auto visible max-md:hidden md:border md:border-zinc-700 md:rounded-[8px] md:h-full md:overflow-y-auto'>
            <div className="sticky top-0 bg-[#121212] z-10 h-1/6">
                <div className="flex flex-col items-center justify-end text-xl h-full">
                    <span>Glucose Data Visualization</span>
                    <div className="h-1/2 pt-[8px] flex flex-row items-center justify-center">
                        <RecentActorsIcon />
                        <span className="pl-[8px]">Patient list</span>
                    </div>
                </div>
            </div>
            {patientsList.map(p => {
                return (
                    <button key={p.id} className={getButtonTailwindStyleById(p.id)} onClick={() => handleClickCallback(p.id)}>
                        <PatientAvatar name={p.name} />
                        <div className="ml-2 text-sm">{p.name}</div>
                    </button>
                )
            })}
        </div>
    )
};

export default SideBarPatientList;