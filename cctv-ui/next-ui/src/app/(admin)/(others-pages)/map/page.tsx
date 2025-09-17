// import { LeafletMap } from "@/components/maps/LeafletMap";
// "use client";

import { Metadata } from "next";
import React from "react";
import dynamic from "next/dynamic";

type MapProps = {
  center: { lat: number; lng: number };
  locations: { id: string; lat: number; lng: number }[];
};

const Map = dynamic<MapProps>(
  () =>
    import("@/components/maps/LeafletMap").then(
      (component) => component.LeafletMap,
    ),
  {},
);

export const metadata: Metadata = {
  title: "CCTV | Maps",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Maps() {
  const locations = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      lat: -2.2167865835407214,
      lng: 113.91585881388148,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      lat: -2.2145310118535635,
      lng: 113.92047211637917,
    },
  ];
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <Map center={{ lat: -1.605, lng: 113.914 }} locations={locations} />
      </div>
    </div>
  );
}
