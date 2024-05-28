"use client";

// React
import React, { useEffect } from 'react';
// import { Suspense } from "react";

// Next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Redux
import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectPatientById } from "../home/PatientSlice";
import { selectStudyById, fetchStudies } from "@/app/detail/StudySlice";
import { selectGlucoseData, fetchGlucoseData, setFetchGlucoseStatus } from "@/app/detail/GlucoseSlice";

// In-Project
import GlucoseChart from "../ui/detail/GlucoseChart";
import PatientBasicInfo from "../ui/detail/PatientBasicInfo";
import GlucoseAnalysis from "../ui/detail/GlucoseAnalysis";

export default function Page() {
  const searchParams = useSearchParams();
  // searchParams returns a string | null, so I have to give [patientId] by defaut a value
  const patientId = searchParams.get("pid") || "";
  // use the [patientId] from URL to select patient object
  const patient = useAppSelector((state) => selectPatientById(state, patientId));
  // get the [studyId] from the patient object
  const studyId = patient ? patient.studyId : "";

  const dispatch = useAppDispatch();
  const studiesStatus = useAppSelector(state => state.studies.status);
  // Each time the page is reloaded, reset the status to idle, then it will cause a re-fetch
  dispatch(setFetchGlucoseStatus("idle"));
  const glucoseDataStatus = useAppSelector(state => state.glucoseData.status);

  useEffect(() => {
    if (studiesStatus === 'idle') {
      dispatch(fetchStudies());
    }
    if (glucoseDataStatus === 'idle') {
      dispatch(fetchGlucoseData(studyId));
    }
  }, [studiesStatus, glucoseDataStatus, dispatch]);

  // get the study by id just after studies are fetched from API
  const study = useAppSelector((state) => selectStudyById(state, studyId));

  // get glucose data no matter if study exists
  const glucoseData = useAppSelector(selectGlucoseData);

  if (!study) {
    return <div>There is no study data</div>
  };

  return (
    // When I try to build, an error comes up tell me to wrap useSearchParams() with Supense boudary
    // <Suspense>
    <div className="w-3/4 mx-auto text-center">
      <Link href="/home">
        <div
          suppressHydrationWarning
          className="mx-auto bg-blue-200"
        >
          Back to Home Page
        </div>
      </Link>
      <PatientBasicInfo patient={patient} />
      <GlucoseAnalysis glucoseData={glucoseData} />
      <GlucoseChart study={study} glucoseData={glucoseData} />
    </div>
    // </Suspense>
  );
}
