// import { LeafletMap } from "@/components/maps/LeafletMap";
// "use client";

import { Metadata } from "next";
import React from "react";
import dynamic from "next/dynamic";

type MapProps = {
  center: { lat: number; lng: number };
  locations: {
    id: string;
    lat: number;
    lng: number;
    name: string; // Tambahkan properti nama
    address: string; // Tambahkan properti alamat
    phone: string; // Tambahkan properti telepon
  }[];
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
      lat: -2.2232547,
      lng: 113.93104,
      name: "EVA FAFERA",
      address:
        "AJL. DAMANG BATU NO.33, PANARUNG, KEC. PAHANDUT, KOTA PALANGKA RAYA, KALIMANTAN TENGAH 74874, INDONESIA",
      phone: "6281326048546",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      lat: -2.2194116,
      lng: 113.925804,
      name: "HESTY MAGHDALENA (IFT)",
      address: "JL. CEMPAKA INDUK NO 43",
      phone: "6283747367721",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      lat: -2.22961,
      lng: 113.93741,
      name: "ISNANIAH",
      address: "JL.TURI IV NO.29 RT02/RW07",
      phone: "6285249205222",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      lat: -2.2178006,
      lng: 113.935,
      name: "ROHANA (IFT)",
      address: "PALANGKARAYA JLN PILAU NO 18",
      phone: "6282152551450",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      lat: -2.2192783,
      lng: 113.93561,
      name: "KOMARUDIN (IFT)",
      address: "PILAU NO 32",
      phone: "6285389981577",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440005",
      lat: -2.2081835,
      lng: 113.937035,
      name: "BDB H. TAJUDIN",
      address:
        "JL. HALMAHERA, PAHANDUT, KEC. PAHANDUT, KOTA PALANGKA RAYA, KALIMANTAN TENGAH 73111",
      phone: "628125154735",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440006",
      lat: -2.2312894,
      lng: 113.9227,
      name: "SUHAIBATUL ASLAMIYAH",
      address: "JL. RTA MILONO 2,5",
      phone: "6281549257679",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440007",
      lat: -2.2256253,
      lng: 113.935715,
      name: "ALDIE YUSUF",
      address: "JALAN TURI NO. 17 (MASUK HALAMAN MESJID NURUL HIDAYAH)",
      phone: "6281251823292",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440008",
      lat: -2.2305882,
      lng: 113.93273,
      name: "(PLN-T) UMI KALSUM",
      address: "JL. HARUM MANIS V NO7D",
      phone: "6285828501256",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440009",
      lat: -2.220796,
      lng: 113.93924,
      name: "ALBERTUS ARYO ANDRIYANTO",
      address: "JL HALABAN NO 11",
      phone: "6282113514323",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000a",
      lat: -2.2061195,
      lng: 113.9357,
      name: "M RISKY RAMADANI",
      address: "JALAN SUMATERA PASAR",
      phone: "6281258488663",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000b",
      lat: -2.2357628,
      lng: 113.9367,
      name: "SEPTIA NINDIA PUTRI",
      address: "JL.TANGGARING 3",
      phone: "6283854674052",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000c",
      lat: -2.2303417,
      lng: 113.93956,
      name: "SYLVIANA ANGGRIANI (IFT)",
      address: "JLN RAMIN 4 NO 7",
      phone: "6285251048899",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000d",
      lat: -2.2270286,
      lng: 113.92012,
      name: "JUMAITI",
      address: "JALAN JUNJUNG BUIH 4 GANG GURU BLOK KEDUA NOMOR 4",
      phone: "6282350924238",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000e",
      lat: -2.2459679,
      lng: 113.92205,
      name: "RAHMAT APRIYANT",
      address:
        "PERUMAHAN CITRA MANDIRI, JALAN RTA MILONO, LANGKAI, PAHANDUT, PALANGKA RAYA CITY, CENTRAL KALIMANTAN, INDONESIA",
      phone: "6282175236613",
    },
    {
      id: "550e8400-e29b-41d4-a716-44665544000f",
      lat: -2.2289128,
      lng: 113.936325,
      name: "SUTOMO LUMBAN TORUAN",
      address: "JLN.TURI NO.08",
      phone: "85249017737",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440010",
      lat: -2.2587788,
      lng: 113.911354,
      name: "SULUH GLADIR",
      address: "TA MILONO JL TAMPUNG PENYANG 4",
      phone: "81349237682",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440011",
      lat: -2.246515,
      lng: 113.91641,
      name: "RUSLI (IFT)",
      address: "JL.SEPAKAT IV NO 92 G",
      phone: "6285249292662",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440012",
      lat: -2.2387018,
      lng: 113.944496,
      name: "SITI SOLEHA",
      address: "JLN MERANTI III.GG BAYAM NO 54",
      phone: "8979478100",
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
