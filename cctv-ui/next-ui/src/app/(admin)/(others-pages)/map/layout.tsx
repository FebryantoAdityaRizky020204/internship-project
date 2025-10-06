// app/maps/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CCTV | Maps",
  description:
    "This is a Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function MapsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
