"use client";

import Link from "next/link";
import PatientType from "@/app/type/PatientType";

interface PatientProfilProps {
  patientProfil: PatientType;
}

const PatientProfil = (props: PatientProfilProps) => {
  const { patientProfil } = props;

  const handleClick = () => {
    console.log("Clicked on Patient");
  };

  return (
    <Link href={{ pathname: "/detail", query: patientProfil.id }}>
      <div
        suppressHydrationWarning
        className="border-2 border-rose-500 my-1"
        onClick={handleClick}
      >
        {patientProfil.name}
      </div>
    </Link>
  );
};

export default PatientProfil;
