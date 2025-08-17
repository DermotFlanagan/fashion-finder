"use client";
import React from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/locate/Map"), { ssr: false });

function Locate() {
  return (
    <div className="h-screen">
      <Map />
    </div>
  );
}

export default Locate;
