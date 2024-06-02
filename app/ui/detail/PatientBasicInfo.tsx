import React from "react";

// In-Project
import PatientAvatar from "../PatientAvatar";
import PatientType from "../../type/PatientType"

interface PatientBasicInfoProps {
    patient: PatientType | undefined,
}

const PatientBasicInfo = (props: PatientBasicInfoProps) => {
    const { patient } = props;

    if (!patient) {
        return <div className="no-patient">Nothing is here, please go back</div>
    }

    // only do destructuring assignment after [patient] variable is checked and exists
    const { name, gender } = patient;

    return (
        <div className="flex flex-col p-4 lg:flex-row lg:justify-between lg:p-8">
            <div className="flex items-center">
                <PatientAvatar name={name} />
                <div className="ml-2 flex flex-col items-start lg:ml-4">
                    <div className="text-xl">{name}</div>
                    <div>{gender === "male" ? "Male" : "Female"}</div>
                </div>
            </div>
            <PatientBasicInfoText patient={patient}/>
        </div>
    )
}

export default PatientBasicInfo;

// This component is only for [PatientBasicInfo]
interface PatientBasicInfoTextProps {
    patient: PatientType,
}

const PatientBasicInfoText = (props: PatientBasicInfoTextProps) => {
    const { createdAt } = props.patient;

    // [createdAt] has the ISO-8601 format : YYYY-MM-DDTHH:mm:ss.sssZ
    const timeString = new Date(createdAt).toDateString();

    return (
        <div className="flex flex-col items-end">
            <div>Updated on</div>
            <div>{timeString}</div>
        </div>
    )
}