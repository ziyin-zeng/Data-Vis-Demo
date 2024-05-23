"use client";

import Link from "next/link";
import PatientType from "@/app/type/PatientType";

import { addPatient } from "@/app/home/PatientsContext";
import { useDispatch } from "react-redux";

interface PatientProfilProps {
  patient: PatientType;
}

const PatientProfil = (props: PatientProfilProps) => {
  const { patient } = props;
  const dispatch = useDispatch();
  dispatch(addPatient(patient));

  const handleClick = () => {
    console.log("Clicked on Patient");
  };

  return (
    <Link href={{ pathname: "/detail", query: patient.id }}>
      <div
        suppressHydrationWarning
        className="border-2 border-rose-500 my-1"
        onClick={handleClick}
      >
        {patient.name}
      </div>
    </Link>
  );
};

export default PatientProfil;
