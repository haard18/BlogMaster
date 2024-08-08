
// ./components/Pages/Home.tsx
import React from 'react';
import { SparklesPreview } from '../sparklesview';
import Navbar from '../Navbar';

export const Home = () => {
  return (
    <div>
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden ">
      <Navbar></Navbar>
      </div>
      <div className="sparkles z-0">
      <SparklesPreview></SparklesPreview>
      </div>
    </div>
  );
};