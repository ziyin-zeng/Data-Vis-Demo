"use client";

import Link from "next/link";

// Redux
import { useAppSelector } from "@/app/store/hook";
import { selectPatientById } from "@/app/home/PatientSlice";

interface PatientProfilProps {
  patientId: number;
}

const PatientProfil = (props: PatientProfilProps) => {
  const { patientId } = props;
  // It seems like a callback function works for this kind of situation
  const patientProfil = useAppSelector(state => selectPatientById(state, patientId));

  return (
    // query could accept an object, and useSearchParams could get the value by property name
    <Link href={{ pathname: "/detail", query: { pid: patientId } }}>
      {patientProfil && <div
        suppressHydrationWarning
        className="border-2 border-rose-500 my-2"
      >
        {patientProfil.name}
      </div>}
    </Link>
  );
};

export default PatientProfil;
