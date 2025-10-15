"use client";

import Input from "@/components/form/input/InputField";
import Radio from "@/components/form/input/Radio";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { PencilIcon, PlusIcon, TrashBinIcon } from "@/icons";
import React, { useState } from "react";

export default function TableView() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  const [selectedStatus, setSelectedStatus] = useState<string>("option2");
  const handleSelectedStatus = (value: string) => {
    setSelectedStatus(value);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 md:flex-row md:space-y-0 dark:bg-gray-900">
          <div>
            <Button size="sm" className="p-2" onClick={openModal}>
              <PlusIcon className={"text-lg font-black"} /> Add Map
            </Button>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Search for street"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Street Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {[
              {
                streetName: "Jl. Yos Sudarso",
                lat: -2.2145732323893963,
                lng: 113.9204322377771,
                description: "ansdm kansdjjam laiosjdkm aksndlkmas",
                status: "Active",
              },
            ].map((map, i) => (
              <tr
                key={i}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white"
                >
                  <div className="ps-3">
                    <div className="max-w-[300px] text-justify font-semibold text-wrap">
                      {map.streetName}
                    </div>
                    <div className="font-normal text-gray-500">
                      <span className="dark:text-blue-500">{map.lat}</span>,{" "}
                      <span className="dark:text-blue-300">{map.lng}</span>
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{map.description}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`me-2 h-2.5 w-2.5 rounded-full ${
                        map.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    {map.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="me-1 inline-flex h-fit items-center justify-center gap-x-1 rounded border border-blue-600 px-1.5 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:border-blue-500 dark:hover:border-white dark:hover:text-white"
                  >
                    <PencilIcon className="" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-fit items-center justify-center gap-x-1 rounded border border-red-600 px-1.5 py-1 text-sm font-medium text-red-600 hover:text-red-800 dark:border-red-500 dark:hover:border-white dark:hover:text-white"
                  >
                    <TrashBinIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <div className="no-scrollbar relative max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              <span className="text-blue-600">+</span> Add Map
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-fit overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-2">
                    <Label>CCTV Name</Label>
                    <Input type="text" defaultValue="Musharof" />
                  </div>

                  <div className="col-span-2 lg:col-span-2">
                    <Label>Description</Label>
                    <TextArea placeholder="Masukkan Deskripsi" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>LAT</Label>
                    <Input type="text" placeholder="3.1234" />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>LNG</Label>
                    <Input type="text" placeholder="-2.1234" />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Status</Label>
                    <div className="mt-2 flex flex-wrap items-center gap-8">
                      <Radio
                        id="radio1"
                        name="statusMap"
                        value="Active"
                        checked={selectedStatus === "Active"}
                        onChange={handleSelectedStatus}
                        label="Active"
                      />
                      <Radio
                        id="radio2"
                        name="statusMap"
                        value="NonActive"
                        checked={selectedStatus === "NonActive"}
                        onChange={handleSelectedStatus}
                        label="NonActive"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
