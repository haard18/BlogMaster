"use client";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
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

      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden mt-[5%]">
        <div className="flex flex-col mt-[10%]">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-10">
          BlogMaster
        </h1>
        <div className="mt-4 flex space-x-4"></div>
        <div className="w-full h-40 relative mt-8 z-10">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm z-0" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4 z-0" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm z-0" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4 z-0" />

          <div className="mt-10 flex justify-center gap-9">
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
