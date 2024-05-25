"use client";
import React, { useState } from "react";
import api from "@/redux/api";
import DashboardPage from "../index";
import Link from "next/link";

export default function DashboardSubscription() {
  const [searchQuery, setSearchQuery] = useState("");
  const loggedInUser =
    typeof window != "undefined" &&
    JSON.parse(localStorage.getItem("userToken"));

  const {
    isFetching,
    data: getAllUsers,
    isLoading,
    error,
  } = api.adminApis.useGetAllUsersQuery("");
  const [
    saveSearchQuery,
    { isSearchFetching, data: searchData, isSearchLoading, isSearcherror },
  ] = api.adminApis.useSaveSearchQueryMutation("");
  const users = getAllUsers?.users.filter(
    (user) => user.subscription.toLowerCase() === "free trial"
  );

  const handleSearchButtonClick = async () => {
    if (searchQuery) {
      try {
        await saveSearchQuery({
          userId: loggedInUser?._id,
          query: searchQuery,
        }).unwrap();
      } catch (error) {
        console.error("Error saving search query:", error);
      }
    }
  };

  return (
    <DashboardPage className="flex justify-center items-center">
      <main className="p-3 md:p-3 lg:p-4 xl:p-6">
        <section className="flex flex-row gap-3 max-md:flex-wrap">
          <div className="flex w-full flex-col lg:flex-row gap-x-4 md:gap-3 lg:gap-4 h-max lg:items-center justify-between">
            <label htmlFor="search" className="lg:w-[80%] relative max-h-max">
              <span className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="rgba(129, 129, 129, 1)"
                  className={
                    searchQuery === ""
                      ? "w-6 h-6 absolute left-3 my-auto top-0 bottom-0"
                      : "hidden"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  id="search"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search User"
                  className="text-neutral-500 w-full text-md leading-5 placeholder:text-sm placeholder:!px-6 placeholder:text-neutral-400 whitespace-nowrap border border-stone-300 focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center  px-3 py-3 rounded-md items-start"
                />
              </span>
            </label>
            <div className="">
              <button
                onClick={handleSearchButtonClick}
                className="bg-[#FF4512] max-w-max  flex flex-row font-medium items-center gap-1.5 rounded-lg px-6 py-3 shadow-md text-white"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                >
                  <path d="M13.818 16.646c-1.273.797-2.726 1.256-4.202 1.354l-.537-1.983c2.083-.019 4.132-.951 5.49-2.724 2.135-2.79 1.824-6.69-.575-9.138l-1.772 2.314-1.77-6.469h6.645l-1.877 2.553c3.075 2.941 3.681 7.659 1.423 11.262l7.357 7.357-2.828 2.828-7.354-7.354zm-11.024-1.124c-1.831-1.745-2.788-4.126-2.794-6.522-.005-1.908.592-3.822 1.84-5.452 1.637-2.138 4.051-3.366 6.549-3.529l.544 1.981c-2.087.015-4.142.989-5.502 2.766-2.139 2.795-1.822 6.705.589 9.154l1.774-2.317 1.778 6.397h-6.639l1.861-2.478z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </section>
      </main>
    </DashboardPage>
  );
}
