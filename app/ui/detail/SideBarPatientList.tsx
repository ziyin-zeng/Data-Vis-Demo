// React
import React from "react";

// Redux
import { useAppSelector } from "@/app/store/hook";
import { selectPatients } from "../../home/PatientSlice";

// In-Project
import PatientAvatar from "../PatientAvatar";

interface SideBarPatientListProps {
    currentPatient: string
}

const SideBarPatientList = (props: SideBarPatientListProps) => {
    const { currentPatient } = props;
    const patientsList = useAppSelector(selectPatients);

    const getButtonTailwindStyleById = (id: number) => {
        return `flex flex-row items-center p-2 my-2 ml-2 border rounded-2xl border-neutral-50 border-solid ${+currentPatient === id ? 'bg-sky-500' : 'bg-gray-500'}`
    }

    const handleClick = (selectedId: number) => {

    }

    return (
        <div className='md:fixed md:top-0 md:bottom-0 md:border md:rounded-2xl md:w-1/10 md:w-1/5 h-screen overflow-y-auto'>
            {patientsList.map(p => {
                return (
                    <button className={getButtonTailwindStyleById(p.id)} onClick={() => handleClick(p.id)}>
                        <PatientAvatar name={p.name} />
                        <div className="ml-2 text-xl">{p.name}</div>
                    </button>
                )
            })}
        </div>
    )
};

export default SideBarPatientList;