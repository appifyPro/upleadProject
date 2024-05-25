"use client";

import { useEffect, useState } from "react";
import SchoolInformation from "./_components/SchoolInformation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { roomInformationInitialState, roomInitialState } from "./data";
import SchoolImages from "./_components/Images";
import api from "@/redux/api";
import LoadingButton from "@/SharedComponents/LoadingButton";
import ErrorBlock from "@/SharedComponents/ErrorBlock";

export default function AddRooms() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const id = searchParams.get("id");

  const views = ["Add Property"];
  const [currentView, setCurrentView] = useState("Add Property");

  const [formData, setFormData] = useState(roomInformationInitialState);
  const [schoolFormData, setSchoolFormData] = useState(roomInitialState);
  const [imageFiles, setImageFiles] = useState([]);
  const [hasProcessedImages, setHasProcessedImages] = useState(false);

  const [
    addSchool,
    {
      isLoading: isSubmitting,
      isSuccess: submitSuccess,
      data: submitData,
      error: submitError,
      reset,
    },
  ] =
    action === "update"
      ? api.adminApis.useUpdatePropertyMutation()
      : api.adminApis.useAddPropertyMutation();
  const [getSchoolTrigger, { isLoading, data }] =
    api.adminApis.useLazyGetAllPropertyQuery();

  let selectedData = {
    info: {
      image: [],
      price: "",
      title: "",
      location: "",
      beds: "",
      indoorSpace: "",
      outdoorSpace: "",
      floor: "",
      elevator: "",
      pool: "",
      baths: "",
      facilities: [],
      garage: "",
      energyCertificate: "",
      propertySubType:"",
      propertyStatus:"",
      yearBuilt: "",
      type: "",
      description: "",
      _id: "",
      __v: "",
    },
  };

  selectedData.info = data?.data?.find((each) => each?._id === id);

  if (
    isLoading === false &&
    (selectedData?.info?._id || selectedData?.info?.__v)
  ) {
    const { _id, __v, ...restOfInfo } = selectedData.info;
    selectedData.info = restOfInfo;
  }

  useEffect(() => {
    if (["view", "update"].includes(action)) {
      getSchoolTrigger("");
    }
  }, []);

  useEffect(() => {
    if (selectedData && !isSubmitting === null) {
      setFormData({
        info: selectedData.info,
      });
    } else if (selectedData && !isSubmitting !== null) {
      setFormData({
        info: selectedData.info,
      });
    }
  }, [data]);

  useEffect(() => {
    if (submitSuccess) {
      if (action !== "update") {
        setFormData(roomInformationInitialState);
        setSchoolFormData(roomInitialState);
        setCurrentView("Add Property");
      } else {
        const exitPageTimeout = setTimeout(() => {
          cancelForm();
          clearTimeout(exitPageTimeout);
        }, 1000);
      }
    }
  }, [submitSuccess]);

  const handleInputChange = (e, property) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [property]: {
        ...formData[property],
        [name]: value,
      },
    });
    setSchoolFormData({
      ...schoolFormData,
      [property]: {
        ...schoolFormData[property],
        [name]: value,
      },
    });
    if (submitSuccess) reset();
  };

  const handleCheckBox = (event, property) => {
    const { name, checked } = event.target;

    setFormData({
      ...formData,
      [property]: {
        ...formData[property],
        [name]: checked,
      },
    });

    setSchoolFormData({
      ...schoolFormData,
      [property]: {
        ...schoolFormData[property],
        [name]: checked,
      },
    });
    if (submitSuccess) reset();
  };

  const handleNumericInputChange = (e, property) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [property]: {
        // @ts-ignore
        ...formData[property],
        [name]: Number(value.replace(/,/g, "").replace(/[^0-9]/gi, "")),
      },
    });
    setSchoolFormData({
      ...formData,
      [property]: {
        // @ts-ignore
        ...schoolFormData[property],
        [name]: Number(value.replace(/,/g, "").replace(/[^0-9]/gi, "")),
      },
    });
    if (submitSuccess) reset();
  };

  const handleFlatArrayInputChange = (e, index, property, nestedProperty) => {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [property]: {
        ...prevFormData[property],
        // @ts-ignore
        [nestedProperty]: prevFormData[property][nestedProperty].map(
          // @ts-ignore
          (sponsor, i) => (i === index ? value : sponsor)
        ),
      },
    }));

    if (submitSuccess) reset();
  };

  const cancelForm = () => {
    router.back();
  };

  const convertStateToFormData = (state) => {
    const formData = new FormData();

    const appendFields = (data, parentKey = "") => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          // Construct field name with hierarchy for nested objects
          const fieldName =
            parentKey !== "[info]" ? `${parentKey}[${key}]` : key;

          if (value instanceof Array) {
            // Special handling for image arrays or general arrays
            value.forEach((item, index) => {
              // If it's an array of files/images, just append them without index
              if (item instanceof File || fieldName === "images") {
                formData.append(fieldName, item);
              } else if (typeof item === "object") {
                // For nested objects within arrays, call recursively
                appendFields(item, `${fieldName}[${index}]`);
              } else {
                // Append other array values with indices
                formData.append(`${fieldName}[${index}]`, item?.toString());
              }
            });
          } else if (value instanceof FileList) {
            // Append all files from a FileList
            for (let i = 0; i < value.length; i++) {
              formData.append(fieldName, value[i]);
            }
          } else if (value instanceof Object) {
            // Recursively process nested objects
            appendFields(value, fieldName);
          } else {
            // Append non-object and non-array values directly
            if (value !== "") formData.append(fieldName, value?.toString());
          }
        }
      }
    };

    appendFields(state);
    return formData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addSchool(
      ["view", "update"].includes(action)
        ? {
            title: formData.info?.title,
            price: formData.info?.price,
            location: formData.info?.location,
            beds: formData.info?.beds,
            indoorSpace: formData.info?.indoorSpace,
            outdoorSpace: formData.info?.outdoorSpace,
            facilities: formData.info?.facilities,
            floor: formData.info?.floor,
            elevator: formData.info?.elevator,
            pool: formData.info?.pool,
            baths: formData.info?.baths,
            garage: formData.info?.garage,
            energyCertificate: formData.info?.energyCertificate,
            yearBuilt: formData.info?.yearBuilt,
            type: formData.info?.type,
            description: formData.info?.description,
            propertySubType: formData.info?.propertySubType,
            propertyStatus: formData.info?.propertyStatus,
            ...(formData.info?.image && formData.info?.image.length > 0
              ? { image: formData.info?.image[0] }
              : {}),
          }
        : {
            title: schoolFormData.info?.title,
            price: schoolFormData.info?.price,
            location: schoolFormData.info?.location,
            beds: schoolFormData.info?.beds,
            indoorSpace: schoolFormData.info?.indoorSpace,
            outdoorSpace: schoolFormData.info?.outdoorSpace,
            facilities: schoolFormData.info?.facilities,
            floor: schoolFormData.info?.floor,
            elevator: formData.info?.elevator,
            pool: formData.info?.pool,
            baths: formData.info?.baths,
            garage: formData.info?.garage,
            energyCertificate: formData.info?.energyCertificate,
            yearBuilt: formData.info?.yearBuilt,
            type: formData.info?.type,
            description: formData.info?.description,
            propertySubType: formData.info?.propertySubType,
            propertyStatus: formData.info?.propertyStatus,
            ...(schoolFormData.info?.image &&
            schoolFormData.info?.image.length > 0
              ? { image: schoolFormData.info?.image[0] }
              : {}),
          }
    );
  };

  var the = convertStateToFormData(formData);

  for (const [key, value] of the.entries()) {
    console.log(`${key}: ${value}`);
  }
  var the = convertStateToFormData(schoolFormData);
  for (const [key, value] of the.entries()) {
    console.log(`${key}: ${value}`);
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-3 lg:p-4 xl:p-6">
      <section className="flex flex-col my-4">
        <button
          onClick={cancelForm}
          type="button"
          className="text-stone-600 w-max flex font-medium flex-row items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Go Back
        </button>
        {action !== "view" && (
          <div className="flex flex-row items-center gap-3 mt-3 ml-auto">
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              sucess={submitSuccess}
              successText="Sucessful!"
              className="rounded-md bg-[#FF4512] px-6 font-medium shadow-md py-1.5  text-white"
            >
              Save
            </LoadingButton>
            <button
              onClick={cancelForm}
              type="button"
              className="rounded-md px-6 font-medium shadow-md py-1.5 bg-zinc-200 text-zinc-600"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
      <section className="">
        <div className="overflow-x-auto no-scrollbar grid">
          <ul className="grid gap-x-2 lg:gap-x-3 2xl:gap-x-4 grid-flow-col w-max">
            {views.map((view, index) => (
              <li
                key={index}
                className={`border-b-[3px] duration-300 ${
                  view === currentView
                    ? "border-b-[#FF4512] text-[#FF4512]"
                    : "border-b-white text-stone-600"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setCurrentView(view)}
                  className="font-normal min-w-max outline-none px-1 py-1.5 capitalize"
                >
                  {view.replace(/-/g, " ")}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className=" mb-14">
          {currentView === "Add Property" ? (
            <SchoolInformation
              formData={
                ["view", "update"].includes(action) ? formData : schoolFormData
              }
              setFormData={
                ["view", "update"].includes(action)
                  ? setFormData
                  : setSchoolFormData
              }
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              handleInputChange={handleInputChange}
              selectedData={selectedData}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              hasProcessedImages={hasProcessedImages}
              setHasProcessedImages={setHasProcessedImages}
            />
          ) : currentView === "Image" ? (
            <SchoolImages
              formData={schoolFormData}
              setFormData={setSchoolFormData}
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              handleFlatArrayInputChange={handleFlatArrayInputChange}
              selectedData={selectedData}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              hasProcessedImages={hasProcessedImages}
              setHasProcessedImages={setHasProcessedImages}
            />
          ) : (
            "hello"
          )}
        </div>
        <ErrorBlock
          error={submitError}
          className="w-full mt-4 max-w-screen-md"
        />
      </section>
    </form>
  );
}
