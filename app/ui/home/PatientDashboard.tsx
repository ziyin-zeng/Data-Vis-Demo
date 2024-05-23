// React
import React, { useEffect, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { fetchPatients, selectPatients } from "@/app/home/PatientsSlice";

// In-Project
import PatientProfil from "./PatientProfil";

const PatientDashboard = () => {

    const dispatch = useAppDispatch();
    // select ALL patients
    const patients = useAppSelector(selectPatients);

    // we could define callback function right in the arguments
    // which tells the selector we want select the status of fecthPatients (Promise Object)
    const patientsStatus = useAppSelector(state => state.patients.status);

    useEffect(() => {
        // only start fetch when Promise Object is idle
        if (patientsStatus === 'idle') {
            // in the argument of [dispatch], [fetchPatients] is called directly
            // which means it will return an action type, as the argument of [dispatch]
            dispatch(fetchPatients());
        }
    }, [patientsStatus, dispatch]);

    if (patientsStatus === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-1/2 mx-auto text-center">
            {patients &&
                patients.map((p) => <PatientProfil key={p.id} patientProfil={p} />)}
        </div>
    )
}

export default PatientDashboard;