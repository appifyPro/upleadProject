import React, { useEffect, useState } from "react";
import api from "@/redux/api";
import DashboardPage from "../index";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import usePagination from "@mui/material/usePagination";
import TableLoader from "@/SharedComponents/TableLoader";
import ErrorBlock from "@/SharedComponents/ErrorBlock";
import DeleteModal from "@/SharedComponents/DeleteModal";
import { List } from "@mui/material";
import { useSearchParams } from "next/navigation";
const index = () => {
  const [searchData, setSearchData] = useState({
    name: "",
  });
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const {
    data: searchQueries,
    isLoading,
    isFetching,
    isError,
    error,
  } = api.adminApis.useGetUserSearchQueriesQuery(userId);
  console.log("searchQueries", searchQueries);

  const handleFilterTextInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };
  const filterData = (searchQueries, searchQuery) => {
    if (!searchQuery) return searchQueries;
    return searchQueries.filter((user) => {
      const searchString = `${user.query} ${user.date} `.toLowerCase();
      return searchString.includes(searchQuery.toLowerCase());
    });
  };

  const [page, setPage] = useState(1);
  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  const rowsPerPage = 6;
  const { items } = usePagination({
    count: Math.ceil(searchQueries?.length / rowsPerPage),
    onChange: (event, page) => handleChange(event, page),
    page: page,
  });
  return (
    <DashboardPage>
      <main className="p-3 md:p-3 lg:p-4 xl:p-6">
        <section className="flex flex-row gap-3  max-md:flex-wrap">
          <div className="right flex flex-col gap-3 lg:gap-4 w-full">
            <div className="flex w-full flex-col lg:flex-row gap-x-4 md:gap-3  lg:gap-4 h-max lg:items-center justify-between">
              <label htmlFor="name" className="lg:w-full relative max-h-max">
                <span className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="rgba(129, 129, 129, 1)"
                    className={
                      searchData.name === ""
                        ? "w-6 h-6 absolute left-3 my-auto top-0 bottom-0"
                        : "!hidden"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <input
                    id="name"
                    name="name"
                    value={searchData.name}
                    onChange={handleFilterTextInput}
                    type="text"
                    placeholder="Search User"
                    className="text-neutral-500 w-full text-md leading-5 placeholder:text-sm placeholder:!px-6 placeholder:text-neutral-400 whitespace-nowrap border border-stone-300 focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 py-3.5 rounded-md items-start"
                  />
                </span>
              </label>
            </div>

            <div className="flex w-full flex-row gap-x-4 md:gap-3 lg:gap-4 h-max"></div>
          </div>
        </section>
        <section className="mt-5">
          <div className="table_container max-w-[1030px] relative max-h-[calc(100vh-210px)]">
            <TableContainer component={Paper}>
              <Table className="w-full" cellPadding={14}>
                <TableHead className="w-full sticky top-0 border-b bg-white border-y-zinc-200">
                  <TableRow className="grid grid-cols-3 w-full md:table-row text-stone-600 font-[700]">
                    <TableCell className="text-stone-600 font-semibold">
                      S/N
                    </TableCell>
                    <TableCell className="text-stone-600 font-semibold">
                      Query
                    </TableCell>
                    <TableCell className="text-stone-600 font-semibold">
                      Date
                    </TableCell>
                    <TableCell className="text-stone-600 font-semibold">
                      Time
                    </TableCell>
                  </TableRow>
                </TableHead>
                {isFetching ? (
                  <TableLoader cols={5} />
                ) : (
                  <TableBody>
                    {filterData(searchQueries, searchData.name)
                      ?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                      .map((each, index) => (
                        <TableRow
                          key={index}
                          className="text-slate-500  font-semi-bold"
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="text-zinc-600 tracking-wide font-medium">
                            {each.query}
                          </TableCell>
                          <TableCell className="text-zinc-600 tracking-wide font-medium">
                            {new Date(each.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-zinc-600 tracking-wide font-medium">
                            {new Date(each.date).toLocaleTimeString()}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <div className=" !w-full">
              <List className="!flex-1 first-letter:flex items-center max-md:max-w-[calc(100vw-2.2rem)] w-[500px] bottom-4 bg-white mb-4 ml-auto  md:max-w-max rounded-md  mt-8 p-1">
                {items.map(({ page, type, selected, ...item }, index) => {
                  let children = null;

                  if (type === "start-ellipsis" || type === "end-ellipsis") {
                    children = "…";
                  } else if (type === "page") {
                    children = (
                      <button
                        type="button"
                        style={{
                          fontWeight: selected ? "bold" : undefined,
                          padding: "0.5rem 1rem",
                          width: "100%",
                        }}
                        {...item}
                      >
                        {page}
                      </button>
                    );
                  } else {
                    children =
                      type === "previous" ? (
                        <button
                          {...item}
                          disabled={item.disabled}
                          className={`${selected ? "font-bold" : undefined} ${
                            item.disabled === false
                              ? "text-stone-700"
                              : "text-stone-300"
                          } border md:mr-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-3 pr-4 max-md:pl-2 max-md:pr-3 py-1`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                          </svg>
                          {type}
                        </button>
                      ) : (
                        <button
                          {...item}
                          disabled={item.disabled}
                          className={`${selected ? "font-bold" : undefined} ${
                            item.disabled === false
                              ? "text-stone-700"
                              : "text-stone-300"
                          }  border md:ml-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-4 pr-3 max-md:pl-3 max-md:pr-2 py-1`}
                        >
                          {type}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                      );
                  }

                  return <div key={index}>{children}</div>;
                })}
              </List>
            </div>

            {!(isLoading || isFetching) && searchQueries?.length === 0 && (
              <div className="px-2 py-4 text-center">
                <h2 className="text-xl font-semibold">No result found</h2>
              </div>
            )}
            <ErrorBlock error={error} />
          </div>
        </section>
      </main>
    </DashboardPage>
  );
};

export default index;
