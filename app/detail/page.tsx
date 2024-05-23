"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import GlucoseChart from "../ui/detail/GlucoseChart";

export default function Page() {
  const router = useRouter();
  const { patientId } = router.query;
  return (
    <>
      <Link href="/home">
        <div
          suppressHydrationWarning
          className="w-3/4 mx-auto bg-blue-200 text-center"
        >
          Back to Home Page {patientId}
        </div>
      </Link>
      <div
        suppressHydrationWarning
        className="w-3/4 h-screen mx-auto bg-white text-center text-black"
      >
        <GlucoseChart />
      </div>
    </>
  );
}
