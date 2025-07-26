'use client'

import "../globals.css";
import { useMounted } from "../hooks/useMounted";
import Navbar from './components/nav/Navbar'
import Image from 'next/image'


export default function MippLayout({ children }) {
  const mounted = useMounted()
  if (!mounted) {
    return (
      <div className="loadingWheel">
        <Image 
            src={"/loading-wheel.gif"} 
            height={20} 
            width={20} 
            alt='Logo' 
            className="wheelGif"
            unoptimized
        />
      </div>  
    );
  }

  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
}
