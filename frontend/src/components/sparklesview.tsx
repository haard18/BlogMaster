"use client";

import { useNavigate } from "react-router-dom";
import { SparklesCore } from "../components/ui/sparkles";
// import Navbar from "./Navbar";

export function SparklesPreview() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div> */}

      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden mobile:mt-[50%] laptop:mt-[30%] desktop:mt-[10%]">
        <div className="flex flex-col items-center justify-center mt-[10%] mobile:mt-[20%] laptop:mt-[15%] desktop:mt-[5%]">
          <h1 className="text-3xl mobile:text-6xl laptop:text-7xl desktop:text-9xl font-bold text-center text-white relative z-10">
            BlogMaster
          </h1>
          <div className=" flex flex-col mobile:space-y-2 mt-[-5%] laptop:space-y-4 mt-[0%] desktop:space-y-6">
            <div className="w-full h-40 relative mt-8 z-10">
              {/* Gradients */}
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-[90%] max-w-[1200px] mx-auto blur-sm z-0" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-[90%] max-w-[1200px] mx-auto z-0" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-[70%] max-w-[1200px] mx-auto blur-sm z-0" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-[70%] max-w-[1200px] mx-auto z-0" />


              <div className="mt-10 flex flex-row items-center gap-4 mobile:gap-5 laptop:gap-4 desktop:gap-9">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md relative z-20"
                  onClick={() => handleNavigation("/createblog")}
                >
                  Create a Blog
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md relative z-20"
                  onClick={() => handleNavigation("/allblogs")}
                >
                  Read a Blog
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={400}
          className="w-full h-full z-0"
          particleColor="#FFFFFF"
        />
      </div>
    </>
  );
}
