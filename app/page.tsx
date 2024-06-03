import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    // [group] is the trigger for hover animation, can not be re-named
    <div className="group w-3/4 h-[67vh] mx-auto text-center">
      <div className="relative mt-[33vh] text-9xl/[180px] z-20 animate-upAndDownEaseIn group-hover:animate-upAndDownEaseOut">Glucose Data</div>
      <div className="relative mt-[-120px] text-9xl/[180px] text-gray-700 z-10 animate-downAndUpEaseOut group-hover:animate-downAndUpEaseIn">Visualization</div>
      {/* start with opacity 0, since no hover is triggered */}
      {/* when hover is triggered, delay for a while and show the link */}
      <div className="mt-[30px] w-full flex flex-row justify-center items-center mx-auto text-gray-500 transition opacity-0 ease-in-out delay-500 duration-500 group-hover:opacity-100">
        <Image
          src="/circle-right-regular.svg"
          alt="Redirect icon"
          width={24}
          height={24}
          priority
        />
        <Link href="/detail">
          <div className="ml-2 underline text-xl">Explore</div>
        </Link>
      </div>
    </div>
  );
}
