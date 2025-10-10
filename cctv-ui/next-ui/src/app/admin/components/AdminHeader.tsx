"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
// import NotificationDropdown from "@/components/header/NotificationDropdown";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const AdminHeader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-9999 flex w-full border-b border-gray-200 bg-white md:max-h-[76px] dark:border-gray-800 dark:bg-gray-900">
      <div className="flex grow flex-row items-center justify-between px-6">
        <div className="flex w-full items-center justify-between gap-2 px-3 py-3 sm:gap-4 lg:justify-normal lg:px-0 lg:py-4 dark:border-gray-800">
          <Link href="/public" className="">
            <Image
              width={154}
              height={32}
              className="dark:hidden"
              src="./images/logo/logo.svg"
              alt="Logo"
            />
            <Image
              width={154}
              height={32}
              className="hidden dark:block"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>
        </div>
        <div
          className={`shadow-theme-md flex w-full items-center justify-end gap-4 px-5 py-4 lg:px-0 lg:shadow-none`}
        >
          <div className="2xsm:gap-3 flex items-center gap-2">
            {/* <!-- Dark Mode Toggler --> */}
            <ThemeToggleButton />
            {/* <!-- Dark Mode Toggler --> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
