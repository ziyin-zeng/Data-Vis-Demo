import React from "react";

// Redux
import { useAppSelector } from "@/app/store/hook";
import { selectPatientById } from "@/app/home/PatientsSlice";

interface PatientBasicInfoProps {
    patientId: string,
}

const PatientBasicInfo = (props : PatientBasicInfoProps) => {
    const { patientId } = props;
    const patient = useAppSelector(state => selectPatientById(state, patientId))
    return <div className="pbi">sth</div>
}

export default PatientBasicInfo;