"use client";

// React
import React, { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
// import { Suspense } from "react";

// Next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Redux
import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectPatientById, getPatientListLength } from "../home/PatientSlice";
import { fetchStudies, setFetchStudyStatus, selectStudies } from "@/app/detail/StudySlice";
import { selectGlucoseData, fetchGlucoseData, setFetchGlucoseStatus } from "@/app/detail/GlucoseSlice";

// In-Project
import GlucoseChart from "../ui/detail/GlucoseChart";
import PatientBasicInfo from "../ui/detail/PatientBasicInfo";
import GlucoseAnalysis from "../ui/detail/GlucoseAnalysis";
import SideBarPatientList from '../ui/detail/SideBarPatientList';

export default function Page() {
  // this is for multiple study scenario, user could choose between studyIds
  const [studyId, setStudyId] = useState<number>();
  const [isStudyFetched, setIsStudyFetched] = useState<boolean>(false);

  const searchParams = useSearchParams();
  // searchParams.get returns a string | null, since it's unpredictable
  const patientId = searchParams.get("pid");

  if (!patientId) {
    return <div>Invalid URL, please provide patientId</div>
  }

  // use the [patientId] from URL to select patient object
  const patient = useAppSelector((state) => selectPatientById(state, +patientId));
  const patientNumber = useAppSelector(getPatientListLength);     // total number of patients in redux store

  const dispatch = useAppDispatch();

  // get the study by id just after studies are fetched from API
  const study = useAppSelector(selectStudies);

  // get glucose data no matter if study exists
  const glucoseData = useAppSelector(selectGlucoseData);

  // Each time the page is reloaded, reset the status to idle, then it will cause a re-fetch
  dispatch(setFetchStudyStatus('idle'));
  const studiesStatus = useAppSelector(state => state.studies.status);
  const glucoseDataStatus = useAppSelector(state => state.glucoseData.status);

  useEffect(() => {
    if (studiesStatus === 'idle' && !isStudyFetched) {
      dispatch(fetchStudies(+patientId))
        .then(response => {
          if (!isStudyFetched) {
            setStudyId(response.payload[0]?.id)
            setIsStudyFetched(true);
            dispatch(setFetchGlucoseStatus('idle'));    // make sure glucose data will be fetched immediately after study is fetched
          }
        });
    }
    if (glucoseDataStatus === 'idle' && studyId) {
      dispatch(fetchGlucoseData(studyId));
    }
  }, [studiesStatus, glucoseDataStatus, studyId, patientId, dispatch]);

  const handleClick = (id: number) => {
    setStudyId(id);
    dispatch(setFetchGlucoseStatus('idle'));    // fetch glucose data after switch study
  }

  const handlePatientIdClick = () => {
    setIsStudyFetched(false);   // need to set isStudyFetched to false, since we do need to re-fetch study after another patient is rendered
  }

  const getButtonTailwindStyleById = (id: number) => {
    return `w-[20%] xl:w-[10%] px-2 mr-2 border rounded-2xl border-neutral-50 border-solid ${studyId === id ? 'bg-sky-500' : 'bg-gray-500'}`
  }

  return (
    // When I try to build, an error comes up tells me to wrap useSearchParams() with Supense boudary
    // <Suspense>
    <div className='w-full flex flex-row'>
      <SideBarPatientList currentPatient={patientId}/>
      <div className="absolute md:left-[20%] w-full md:w-4/5 mx-auto text-center">
        <div className="w-full px-4 pt-4 lg:px-8 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            {+patientId - 1 > 0 && <Link href={{ pathname: "/detail", query: { pid: +patientId - 1 > 0 ? +patientId - 1 : 1 } }}
              className="mr-2 w-full border px-2 rounded-2xl bg-gray-500"
              onClick={handlePatientIdClick}
            >
              <CustomWidthTooltip title={"Previous patient"} placement="top" arrow>
                <NavigateBeforeIcon />
              </CustomWidthTooltip>
            </Link>}
            {+patientId + 1 <= patientNumber && <Link href={{ pathname: "/detail", query: { pid: +patientId + 1 <= patientNumber ? +patientId + 1 : patientNumber } }}
              className="w-full border px-2 rounded-2xl bg-gray-500"
              onClick={handlePatientIdClick}
            >
              <CustomWidthTooltip title={"Next patient"} placement="top" arrow>
                <NavigateNextIcon />
              </CustomWidthTooltip>
            </Link>}
          </div>
          <Link href="/home" className="border px-4 rounded-2xl bg-gray-500">
            <HomeIcon />
          </Link>
        </div>
        {patient ? <PatientBasicInfo patient={patient} /> : <div>There is no patient data</div>}
        <div className='text-start pl-8'>{study.map(s => <button className={getButtonTailwindStyleById(s.id)} key={s.id} onClick={() => handleClick(s.id)}>{"Study No." + s.id}</button>)}</div>
        <GlucoseAnalysis glucoseData={glucoseData} glucoseDataStatus={glucoseDataStatus} />
        <GlucoseChart glucoseData={glucoseData} glucoseDataStatus={glucoseDataStatus} />
      </div>
    </div>
    // </Suspense>
  );
}

// this is for a larger tooltip
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 600,
  },
});