"use client";

// Next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// In-Project
import GlucoseChart from "../ui/detail/GlucoseChart";
import PatientBasicInfo from "../ui/detail/PatientBasicInfo";

export default function Page() {
  const searchParams = useSearchParams();
  // searchParams returns a string | null, so I have to give [patientId] by defaut a value
  const patientId = searchParams.get("pid") || "";
  return (
    <div className="mx-auto text-center">
      <Link href="/home">
        <div
          suppressHydrationWarning
          className="w-3/4 mx-auto bg-blue-200 text-center"
        >
          Back to Home Page
        </div>
      </Link>
      <PatientBasicInfo patientId={patientId}/>
      <div
        suppressHydrationWarning
        className="w-3/4 h-screen mx-auto bg-white text-black"
      >
        <GlucoseChart />
      </div>
    </div>
  );
}
