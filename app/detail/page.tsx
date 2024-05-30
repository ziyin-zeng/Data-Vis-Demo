"use client";

// React
import React, { useEffect, useState } from 'react';
// import { Suspense } from "react";

// Next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Redux
import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectPatientById } from "../home/PatientSlice";
import { fetchStudies, setFetchStudyStatus, selectStudies } from "@/app/detail/StudySlice";
import { selectGlucoseData, fetchGlucoseData, setFetchGlucoseStatus } from "@/app/detail/GlucoseSlice";

// In-Project
import GlucoseChart from "../ui/detail/GlucoseChart";
import PatientBasicInfo from "../ui/detail/PatientBasicInfo";
import GlucoseAnalysis from "../ui/detail/GlucoseAnalysis";

export default function Page() {
  // this is for multiple study scenario, user could choose between studyIds
  const [studyId, setStudyId] = useState<number>();
  const [isStudyFetched, setIsStudyFetched] = useState<boolean>(false);

  const searchParams = useSearchParams();
  // searchParams.get returns a string | null, since it's unpredictable
  const patientId = searchParams.get("pid");

  if(!patientId) {
    return <div>Invalid URL, please provide patientId</div>
  }

  // use the [patientId] from URL to select patient object
  const patient = useAppSelector((state) => selectPatientById(state, +patientId));

  const dispatch = useAppDispatch();

  // get the study by id just after studies are fetched from API
  const study = useAppSelector(selectStudies);

  // get glucose data no matter if study exists
  const glucoseData = useAppSelector(selectGlucoseData);

  if (!study) {
    return <div>There is no study data</div>
  };

  // Each time the page is reloaded, reset the status to idle, then it will cause a re-fetch
  dispatch(setFetchGlucoseStatus('idle'));
  dispatch(setFetchStudyStatus('idle'));
  const studiesStatus = useAppSelector(state => state.studies.status);
  const glucoseDataStatus = useAppSelector(state => state.glucoseData.status);

  useEffect(() => {
    if (studiesStatus === 'idle') {
      dispatch(fetchStudies(+patientId))
        .then(response => {
          if(!isStudyFetched) {
            setStudyId(response.payload[0]?.id)
            setIsStudyFetched(true);
          }
        });
    }
    if (glucoseDataStatus === 'idle' && studyId) {
      dispatch(fetchGlucoseData(studyId));
    }
  }, [studiesStatus, glucoseDataStatus, studyId, dispatch]);

  const handleClick = (id: number) => {
    setStudyId(id);
  }

  return (
    // When I try to build, an error comes up tell me to wrap useSearchParams() with Supense boudary
    // <Suspense>
    <div className="w-full mx-auto text-center md:w-3/4">
      <Link href="/home">
        <div
          suppressHydrationWarning
          className="mx-auto bg-blue-200"
        >
          Back to Home Page
        </div>
      </Link>
      {patient ? <PatientBasicInfo patient={patient}/> : <div>There is no patient data</div>}
      <div>Study : {study.map(s => <button key={s.id} onClick={() => handleClick(s.id)}>{s.id + "~"}</button>)}</div>
      {glucoseData && studyId ? <GlucoseAnalysis glucoseData={glucoseData} studyId={studyId} /> : <div>There is no glucose data</div>}
      {glucoseData && studyId ? <GlucoseChart glucoseData={glucoseData} /> : <div>There is no glucose data</div>}
    </div>
    // </Suspense>
  );
}
