"use client";

import PublicHeader from "@/layout/PublicHeader";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen xl:flex">
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <PublicHeader />
        {/* Page Content */}
        <div className="mx-auto max-w-(--breakpoint-2xl)">{children}</div>
      </div>
    </div>
  );
}
