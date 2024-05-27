import React from "react";

// In-Project
import PatientAvatar from "../PatientAvatar";
import PatientType from "../../type/PatientType"

interface PatientBasicInfoProps {
    patient: PatientType | undefined,
}

// To show the initial character of a name
const getFirstChar = (name: string) => {
    return name ? name[0] : "@";
}

const PatientBasicInfo = (props: PatientBasicInfoProps) => {
    const { patient } = props;

    if (!patient) {
        return <div className="no-patient">Nothing is here, please go back</div>
    }

    // only do destructuring assignment after [patient] variable is checked and exists
    const { name, gender } = patient;

    return (
        <div className="flex justify-between p-8">
            <div className="flex items-center">
                <PatientAvatar initialChar={getFirstChar(name)} />
                <div className="ml-4 flex flex-col items-start">
                    <div className="text-xl">{name}</div>
                    <div>{gender === "male" ? "Male" : "Female"}</div>
                </div>
            </div>
            <PatientBasicInfoText patient={patient} />
        </div>
    )
}

export default PatientBasicInfo;

// This component is only for [PatientBasicInfo]
interface PatientBasicInfoTextProps {
    patient: PatientType;
}

const PatientBasicInfoText = (props: PatientBasicInfoTextProps) => {
    const { name, createdAt, studyId, gender } = props.patient;
    // [createdAt] has the ISO-8601 format : YYYY-MM-DDTHH:mm:ss.sssZ
    const timeString = new Date(createdAt).toDateString();

    return (
        <div className="flex flex-col items-end">
            <div>Study : {studyId}</div>
            <div>Created at {timeString}</div>
        </div>
    )
}