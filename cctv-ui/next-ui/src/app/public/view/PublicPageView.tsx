"use client";

import React, { useState } from "react";
import { Menu, TextWrap } from "@/icons";
import Sidebar from "./sidebar";
import { TypeLocation } from "../type";
import MapView from "../components/Map";

type PublicPageViewProps = {
  locations: TypeLocation[];
};

const PublicPageView = ({ locations }: PublicPageViewProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const [locationSelected, setLocationSelected] = useState<
    TypeLocation | undefined
  >(undefined);

  return (
    <>
      <div
        className={`grid max-h-[calc(100vh-76px)] min-h-[calc(100vh-76px)] grid-cols-3 grid-rows-6 gap-2 overflow-hidden md:grid-cols-5`}
      >
        {/* Sidebar */}
        {sidebarOpen && (
          <Sidebar
            setVideoSelected={setVideoSelected}
            videoSelected={videoSelected}
            locationSelected={locationSelected}
            setLocationSelected={setLocationSelected}
            locationList={locations}
          />
        )}
        {/* End Sidebar */}

        <div
          className={` ${!sidebarOpen && !videoSelected ? "col-span-3 md:col-span-5" : ""} ${sidebarOpen && !videoSelected ? "col-span-3 row-span-4 md:col-span-2 md:col-start-4" : ""} ${sidebarOpen && videoSelected ? "col-span-3 row-span-2 row-start-1" : ""} transition-all duration-300 ease-in-out md:row-span-6`}
        >
          {/* Toggle button */}
          <div className="absolute z-999 rounded-tl-sm rounded-br-sm border-gray-800 bg-white p-1 dark:border-gray-900 dark:bg-gray-900">
            <button
              className="flex w-fit items-center gap-2 rounded-sm border-none p-1 text-sm font-medium text-gray-600 dark:text-gray-300"
              title="Toggle sidebar"
              aria-label="Toggle sidebar"
              onClick={() => {
                setSidebarOpen((prev) => !prev);
                setVideoSelected(false);
                setLocationSelected(undefined);
              }}
            >
              {sidebarOpen ? <TextWrap /> : <Menu />}
              <span>DETAIL</span>
            </button>
          </div>

          {/* Map */}
          <div className="relative h-full w-full flex-initial rounded-sm border border-gray-200 bg-white p-5 lg:p-2 dark:border-gray-800 dark:bg-white/[0.03]">
            <MapView
              locations={locations}
              locationSelected={locationSelected}
              setLocationSelected={setLocationSelected}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setVideoSelected={setVideoSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicPageView;
