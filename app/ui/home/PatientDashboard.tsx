// React
import React, { useEffect, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { fetchPatients, selectPatients, setFetchStatus } from "@/app/home/PatientSlice";

// 3rd party library
import _ from "lodash";
import axios from "axios";

// In-Project
import PatientProfil from "./PatientProfil";
import { emptyGlucoseData } from "@/app/detail/GlucoseSlice";

const PatientDashboard = () => {
    const dispatch = useAppDispatch();
    
    // Empty the state of glucose data after go back to home page
    dispatch(emptyGlucoseData());

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

    // Use lodash, built-in function [debounce]
    const addPatient = _.debounce(() => {
        axios.post("https://664e4e1afafad45dfadfbc58.mockapi.io/api/patients", {
            "name": "Fabien ZENG",
            "studyId": "84",
            "createdAt": "2024-05-24T04:38:18.490Z",
            "gender": "male",
          })
        .then(response => {
            // set fetch status to 'idle', in order to cause [patientsStatus] change, thus cause useEffect to re-get from API & re-render
            dispatch(setFetchStatus('idle'));
        })
        .catch(error => {
            console.error(error);
        });
    }, 2000);

    const handleClick = () => {
        addPatient();
    }

    return (
        <div className="w-1/2 mx-auto text-center">
            {patients.length
                ? patients.map((p) => <PatientProfil key={p.id} patientId={p.id} />)
                : <div>There is no data for now, you might want to add some</div>}
            <button className="p-8" onClick={handleClick}>Add Patient</button>
        </div>
    )
}

export default PatientDashboard;