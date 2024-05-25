"use client";

// Next
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { Suspense } from "react";

// Redux
import { useAppSelector } from "../store/hook";
import { selectPatientById } from "../home/PatientSlice";

// In-Project
import GlucoseChart from "../ui/detail/GlucoseChart";
import PatientBasicInfo from "../ui/detail/PatientBasicInfo";

export default function Page() {
  const searchParams = useSearchParams();
  // searchParams returns a string | null, so I have to give [patientId] by defaut a value
  const patientId = searchParams.get("pid") || "";
  // use the [patientId] from URL to select patient object
  const patient = useAppSelector((state) => selectPatientById(state, patientId));
  // get the [studyId] from the patient object
  const studyId = patient ? patient.studyId : "";

  return (
    // When I try to build, an error comes up tell me to wrap useSearchParams() with Supense boudary
    // <Suspense>
    <div className="mx-auto text-center">
      <Link href="/home">
        <div
          suppressHydrationWarning
          className="w-3/4 mx-auto bg-blue-200 text-center"
        >
          Back to Home Page
        </div>
      </Link>
      <PatientBasicInfo patient={patient} />
      <div
        suppressHydrationWarning
        className="w-3/4 h-screen mx-auto bg-white text-black"
      >
        <GlucoseChart studyId={studyId} />
      </div>
    </div>
    // </Suspense>
  );
}
