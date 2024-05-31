// React
import React, { useEffect, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { fetchPatients, selectPatients, setFetchPatientStatus } from "@/app/home/PatientSlice";

// 3rd party library
import _ from "lodash";
import axios from "axios";

// In-Project
import PatientProfil from "./PatientProfil";
import { emptyGlucoseData } from "@/app/detail/GlucoseSlice";
import { mockGlucose } from "@/app/lib/glucoseCalculation";
import GlobalLoading from "../GlobalLoading";

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
        return <GlobalLoading/>;
    }

    // Use lodash, built-in function [debounce]
    const addPatient = _.debounce(() => {
        axios.put("https://5kzf0lo9ee.execute-api.eu-west-3.amazonaws.com/study", [
            {
              "createdAt": "2024-05-25T00:12:05.747Z",
              "id": 1,
                "patientId" : 1
            },
            {
              "createdAt": "2024-05-25T17:30:21.805Z",
              "id": 2,
              "patientId" : 1
            },
            {
              "createdAt": "2024-05-25T04:16:01.176Z",
              "id": 3,
              "patientId" : 2
            },
            {
              "createdAt": "2024-05-24T23:26:31.379Z",
              "id": 4,
              "patientId" : 2
            },
            {
              "createdAt": "2024-05-25T15:04:17.738Z",
              "id": 5,
              "patientId" : 3
            },
            {
              "createdAt": "2024-05-24T22:53:41.070Z",
              "id": 6,
              "patientId" : 3
            },
            {
              "createdAt": "2024-05-25T02:42:26.653Z",
              "id": 7,
              "patientId" : 4
            },
            {
              "createdAt": "2024-05-24T19:26:02.154Z",
              "id": 8,
              "patientId" : 5
            },
            {
              "createdAt": "2024-05-25T11:51:24.203Z",
              "id": 9,
              "patientId" : 6
            },
            {
              "createdAt": "2024-05-25T17:40:19.339Z",
              "id": 10,
              "patientId" : 7
            }
          ], {headers : {'Content-Type': 'application/json'}})
        .then(response => {
            // set fetch status to 'idle', in order to cause [patientsStatus] change, thus cause useEffect to re-get from API & re-render
            dispatch(setFetchPatientStatus('idle'));
        })
        .catch(error => {
            console.error(error);
        });
    }, 2000);

    // const db = mockGlucose();
    // // Use lodash, built-in function [debounce]
    // const addToAWS = _.debounce(() => {
    //     axios.put("https://e3gx8ahiw2.execute-api.eu-west-3.amazonaws.com/glucoseData", db, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         }
    //       })
    //     .then(response => {
    //         // set fetch status to 'idle', in order to cause [patientsStatus] change, thus cause useEffect to re-get from API & re-render
    //         dispatch(setFetchPatientStatus('idle'));
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // }, 2000);

    const handleClick = () => {
      // addToAWS();
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