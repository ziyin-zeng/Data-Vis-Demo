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
        return `flex flex-row items-center p-2 my-2 ml-2 border rounded-xl border-neutral-50 border-solid ${+currentPatientId === id ? 'bg-sky-500' : 'bg-gray-500'}`
    }

    return (
        <div className='overflow-auto visible max-md:hidden md:border md:rounded-[8px] md:h-full md:overflow-y-auto'>
            <div className="text-xl">
                <RecentActorsIcon />
                Patient list
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