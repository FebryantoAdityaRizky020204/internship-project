import PublicPageView from "./view/PublicPageView";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CCTV | Public",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const locations = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    lat: -2.2232547,
    lng: 113.93104,
    name: "About You",
    link: "https://www.youtube.com/embed/tGv7CUutzqU?si=tSS6Mznm19Enl0B9",
    address:
      "AJL. DAMANG BATU NO.33, PANARUNG, KEC. PAHANDUT, KOTA PALANGKA RAYA, KALIMANTAN TENGAH 74874, INDONESIA",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    lat: -2.2194116,
    lng: 113.925804,
    name: "Joji - Glimpse of Us",
    link: "https://www.youtube.com/embed/FvOpPeKSf_4?si=gcdXJ0fzV2y3bINT",
    address: "JL. CEMPAKA INDUK NO 43",
  },
];

const Page = () => {
  return <PublicPageView locations={locations} />;
};

export default Page;
