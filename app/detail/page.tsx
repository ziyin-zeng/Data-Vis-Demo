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
import { useRouter } from 'next/navigation';

// Redux
import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectPatientById, getPatientListLength, setCurrentPatientId, selectCurrentPatientId, fetchPatients, setFetchPatientStatus } from "@/app/home/PatientSlice";
import { fetchStudies, setFetchStudyStatus, selectStudies } from "@/app/detail/StudySlice";
import { selectGlucoseData, fetchGlucoseData, setFetchGlucoseStatus } from "@/app/detail/GlucoseSlice";
import { selectToken } from '../login/TokenSlice';

// In-Project
import GlucoseChart from "../ui/detail/GlucoseChart";
import PatientBasicInfo from "../ui/detail/PatientBasicInfo";
import GlucoseAnalysis from "../ui/detail/GlucoseAnalysis";
import SideBarPatientList from '../ui/detail/SideBarPatientList';

export default function Page() {
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);
  if(!accessToken) {
    router.push('/');
  }

  // this is for multiple study scenario, user could choose between studyIds
  const [studyId, setStudyId] = useState<number>();
  const [isStudyFetched, setIsStudyFetched] = useState<boolean>(false);
  const [isPatientFetched, setIsPatientFetched] = useState<boolean>(false);

  const currentPatientId = useAppSelector(selectCurrentPatientId);
  // use the [patientId] from URL to select patient object
  const patient = useAppSelector((state) => selectPatientById(state, currentPatientId));
  const patientNumber = useAppSelector(getPatientListLength);     // total number of patients in redux store

  const dispatch = useAppDispatch();

  // This is important, cause a re-fetch after reload on this page
  dispatch(setFetchPatientStatus('idle'));

  dispatch(setCurrentPatientId(currentPatientId));

  // get the study by id just after studies are fetched from API
  const study = useAppSelector(selectStudies);

  // get glucose data no matter if study exists
  const glucoseData = useAppSelector(selectGlucoseData);

  // Each time the page is reloaded, reset the status to idle, then it will cause a re-fetch
  dispatch(setFetchStudyStatus('idle'));

  // we could define callback function right in the arguments
  // which tells the selector we want select the status of fecthPatients (Promise Object)
  const patientsStatus = useAppSelector(state => state.patients.status);
  const studiesStatus = useAppSelector(state => state.studies.status);
  const glucoseDataStatus = useAppSelector(state => state.glucoseData.status);

  useEffect(() => {
    if (patientsStatus === 'idle' && !isPatientFetched) {
      // doesn't really help for now, but if someday a purge to the storage is needed, use this snippet
      // persistor.purge();

      // in the argument of [dispatch], [fetchPatients] is called directly
      // which means it will return an action type, as the argument of [dispatch]
      dispatch(fetchPatients(accessToken))
        .then(response => {
          setIsPatientFetched(true);
          dispatch(setFetchPatientStatus('idle'));
        });
    }
    if (studiesStatus === 'idle' && !isStudyFetched) {
      dispatch(fetchStudies({ currentPatientId, accessToken }))
        .then(response => {
          if (!isStudyFetched) {
            if(!response.payload) {
              return;
            }
            setStudyId(response.payload[0]?.id)
            setIsStudyFetched(true);
            dispatch(setFetchGlucoseStatus('idle'));    // make sure glucose data will be fetched immediately after study is fetched
          }
        });
    }
    if (glucoseDataStatus === 'idle' && studyId) {
      dispatch(fetchGlucoseData({ studyId, accessToken }));
    }
  }, [patientsStatus, studiesStatus, glucoseDataStatus, studyId, currentPatientId, isPatientFetched, isStudyFetched, dispatch]);

  const handleStudyClick = (id: number) => {
    if (id !== studyId) {
      setStudyId(id);
      dispatch(setFetchGlucoseStatus('idle'));    // fetch glucose data after switch study
    }
  }

  const handlePatientNavButtonClick = (direction: string) => {
    setIsStudyFetched(false);   // need to set isStudyFetched to false, since we do need to re-fetch study after another patient is rendered

    if (direction === 'previous') {
      dispatch(setCurrentPatientId(currentPatientId - 1 > 0 ? currentPatientId - 1 : 1));
    } else if (direction === 'next') {
      dispatch(setCurrentPatientId(currentPatientId + 1 <= patientNumber ? currentPatientId + 1 : patientNumber));
    }
  }

  const getButtonTailwindStyleById = (id: number) => {
    return `w-[20%] xl:w-[10%] px-2 mr-2 border rounded-2xl border-neutral-50 border-solid ${studyId === id ? 'bg-[#AC0BF8]' : 'bg-gray-500'}`
  }

  const handleSideBarClick = (selectedId: number) => {
    dispatch(setCurrentPatientId(selectedId));
    setIsStudyFetched(false);   // need to set isStudyFetched to false, since we do need to re-fetch study after another patient is rendered
  }

  return accessToken && (
    <div className='w-full h-screen flex flex-row md:grid md:grid-cols-[20%_auto] md:grid-rows-[100%] md:gap-[8px] md:p-[8px]'>
      <SideBarPatientList handleClickCallback={handleSideBarClick} />
      <div className="w-full mx-auto text-center overflow-y-auto">
        <div className="w-full px-4 pt-4 lg:px-8 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            {currentPatientId - 1 > 0 &&
              <button className="mr-2 w-full border px-2 rounded-2xl bg-gray-500"
                onClick={() => handlePatientNavButtonClick('previous')}
              >
                <CustomWidthTooltip title={"Previous patient"} placement="bottom" arrow>
                  <NavigateBeforeIcon />
                </CustomWidthTooltip>
              </button>}
            {currentPatientId + 1 <= patientNumber &&
              <button className="w-full border px-2 rounded-2xl bg-gray-500"
                onClick={() => handlePatientNavButtonClick('next')}
              >
                <CustomWidthTooltip title={"Next patient"} placement="bottom" arrow>
                  <NavigateNextIcon />
                </CustomWidthTooltip>
              </button>}
          </div>
          <Link href="/" className="border px-4 rounded-2xl bg-gray-500">
            <HomeIcon />
          </Link>
        </div>
        {patient ? <PatientBasicInfo patient={patient} /> : <div>There is no patient data</div>}
        <div className='text-start pl-8'>{study.map(s => <button className={getButtonTailwindStyleById(s.id)} key={s.id} onClick={() => handleStudyClick(s.id)}>{"Study No." + s.id}</button>)}</div>
        <GlucoseAnalysis glucoseData={glucoseData} glucoseDataStatus={glucoseDataStatus} />
        <GlucoseChart glucoseData={glucoseData} glucoseDataStatus={glucoseDataStatus} />
      </div>
    </div>
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