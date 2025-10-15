import type { Metadata } from "next";
import React from "react";
import TableView from "../views/TableView";

export const metadata: Metadata = {
  title: "CCTV Palangka Raya",
  description: "CCTV Di Lingkungan Palangka Raya",
};

export default function TablePage() {
  return (
    <>
      <TableView />
    </>
  );
}
