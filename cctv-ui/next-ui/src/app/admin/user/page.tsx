import type { Metadata } from "next";
import React from "react";
import UserView from "../views/UserView";

export const metadata: Metadata = {
  title: "CCTV Palangka Raya",
  description: "CCTV Di Lingkungan Palangka Raya",
};

export default function UserPage() {
  return (
    <>
      <UserView />
    </>
  );
}
