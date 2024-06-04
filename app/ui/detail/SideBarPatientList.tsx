// React
import React from "react";

// Redux
import { useAppSelector } from "@/app/store/hook";
import { selectCurrentPatientId, selectPatients } from "../../home/PatientSlice";

// In-Project
import PatientAvatar from "../PatientAvatar";

interface SideBarPatientListProps {
    handleClickCallback : (selectedId: number) => void
}

const SideBarPatientList = (props : SideBarPatientListProps) => {
    const { handleClickCallback } = props;

    const currentPatientId = useAppSelector(selectCurrentPatientId);
    const patientsList = useAppSelector(selectPatients);

    const getButtonTailwindStyleById = (id: number) => {
        return `flex flex-row items-center p-2 my-2 ml-2 border rounded-xl border-neutral-50 border-solid ${+currentPatientId === id ? 'bg-sky-500' : 'bg-gray-500'}`
    }

    return (
        <div className='visible max-md:invisible md:fixed md:top-0 md:bottom-0 md:border md:rounded-2xl md:w-1/5 md:h-screen md:overflow-y-auto'>
            {patientsList.map(p => {
                return (
                    <button className={getButtonTailwindStyleById(p.id)} onClick={() => handleClickCallback(p.id)}>
                        <PatientAvatar name={p.name} />
                        <div className="ml-2 text-sm">{p.name}</div>
                    </button>
                )
            })}
        </div>
    )
};

export default SideBarPatientList;