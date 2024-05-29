import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
// import fileUpload from "../../../../../../../public/file-upload-states.png";
import { useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { countryList } from "@/SharedComponents/CountryList";

const plainOptions = [
  "New Construction",
  "Property Resale",
  "Long Term Rental",
  "Holidays Rentals",
];
const facilities = [
  "24/7 Security + CCTV",
  "Accessibility",
  "Air Conditioning",
  "Bills Included",
  "Central Heating",
  "Cleaning Service",
  "Communal Games Room",
  "Communal Kitchen",
  "Emergency",
  "Fully-Furnished",
  "Laundry",
  "On-Site Cinema Room",
  "On-Site Gym",
  "On-Site Maintenance",
  "Parking",
  "Pet Friendly",
  "Secure Bike Storage",
  "Social Area",
  "Study Rooms",
  "Swimming Pool",
  "Wi-Fi",
];
export default function SchoolInformation({
  formData,
  setFormData,
  isLoading,
  isSubmitting,
  handleInputChange,
  selectedData,
  imageFiles,
  setImageFiles,
  hasProcessedImages,
  setHasProcessedImages,
}) {
  const action = useSearchParams().get("action");
  const [imageBase64, setImageBase64] = useState("");
  useEffect(() => {
    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    async function fetchImagesGenerator(image) {
      try {
        const response = await fetch(image);
        const data = await response.blob();
        const fileName = image?.substring(image?.lastIndexOf("/") + 1);
        const imageFile = new File([data], fileName, { type: data?.type });

        const base64Image = await fileToBase64(imageFile);
        return base64Image;
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    async function processImages() {
      if (
        formData &&
        formData?.info?.image &&
        typeof formData?.info?.image === "string"
      ) {
        const imageFiles = [];
        const imageGenerator = await fetchImagesGenerator(formData.info.image);
        imageFiles.push(imageGenerator);
        if (imageFiles?.length >= 1)
          setFormData({
            ...formData,
            info: { ...formData.info, image: imageFiles },
          });
        setHasProcessedImages(true);
        console.log("All images processed:", imageFiles);
      }
    }
    processImages();
  }, [selectedData]);

  const handleImageUpload = (e) => {
    setHasProcessedImages(true);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageBase64(reader.result);
      if (formData?.info?.image) {
        const tempData = { ...formData };
        tempData.info.image = [reader.result];
        setFormData(tempData);
      } else {
        const tempData = { ...formData, info: { ...formData.info, image: [] } };
        tempData.info.image.push(reader.result);
        setFormData(tempData);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSpaceImage = (itemIndex, type) => {
    if (type === "new") {
      const filteredImages = formData.info.image.filter(
        (image, index) => index !== itemIndex
      );
      setFormData({
        ...formData,
        info: { ...formData.info, image: filteredImages },
      });
    } else if (type === "existing") {
      const filteredImages = formData.info.image.filter(
        (image, index) => index !== itemIndex
      );
      setFormData({
        ...formData,
        info: { ...formData.info, image: filteredImages },
      });
    }
  };
  const returnCountryCode = (value) => {
    return countryList.find((data) => data.name === value)?.code;
  };
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const handleChange = (event) => {
    setSelectedFacilities(event.target.value);
    setFormData({
      ...formData,
      info: { ...formData.info, facilities: event.target.value },
    });
  };

  return (
    <section className="">
      <div className="items-start flex flex-col py-1 max-md:px-4 max-w-screen-lg">
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
          <label
            htmlFor="title"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Title
            </p>
            {!isLoading ? (
              <input
                id="title"
                name="title"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.title}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label htmlFor="type" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Property Type
            </p>
            {!isLoading ? (
              <select
                id="type"
                name="type"
                disabled={action === "view" || isSubmitting}
                value={formData?.info?.type}
                onChange={(e) => handleInputChange(e, "info")}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              >
                <option value="">Select Property Type</option>
                {plainOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label htmlFor="location" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Location
            </p>
            {!isLoading ? (
              <select
                id="location"
                name="location"
                disabled={action === "view" || isSubmitting}
                value={formData?.info?.location}
                onChange={(e) => handleInputChange(e, "info")}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              >
                <option value="">Select Location</option>
                {countryList.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label
            htmlFor="indoorSpace"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Indoor Space
            </p>
            {!isLoading ? (
              <input
                id="indoorSpace"
                name="indoorSpace"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.indoorSpace}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter Indoor Space"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label
            htmlFor="outdoorSpace"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Outdoor Space
            </p>
            {!isLoading ? (
              <input
                id="outdoorSpace"
                name="outdoorSpace"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.outdoorSpace}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter Outdoor Space"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label
            htmlFor="floor"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Floor
            </p>
            {!isLoading ? (
              <input
                id="floor"
                name="floor"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.floor}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter Floor"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label
            htmlFor="beds"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Bedrooms
            </p>
            {!isLoading ? (
              <input
                id="beds"
                name="beds"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.beds}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter Bedrooms"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label
            htmlFor="baths"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Bathrooms
            </p>
            {!isLoading ? (
              <input
                id="baths"
                name="baths"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.baths}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter Bathrooms"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label
            htmlFor="garage"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Garage
            </p>
            {!isLoading ? (
              <input
                id="garage"
                name="garage"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.garage}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter Garage"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="elevator" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Elevator
            </p>
            {!isLoading ? (
              <select
                id="elevator"
                name="elevator"
                disabled={action === "view" || isSubmitting}
                value={formData?.info?.elevator}
                onChange={(e) => handleInputChange(e, "info")}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label htmlFor="pool" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Pool
            </p>
            {!isLoading ? (
              <select
                id="pool"
                name="pool"
                disabled={action === "view" || isSubmitting}
                value={formData?.info?.pool}
                onChange={(e) => handleInputChange(e, "info")}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label
            htmlFor="yearBuilt"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Year Built
            </p>
            {!isLoading ? (
              <input
                id="yearBuilt"
                name="yearBuilt"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.yearBuilt}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter Year Built"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>

        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label
            htmlFor="energyCertificate"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Energy Certificate
            </p>
            {!isLoading ? (
              <input
                id="energyCertificate"
                name="energyCertificate"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.energyCertificate}
                onChange={(e) => handleInputChange(e, "info")}
                type="text"
                placeholder="Enter Energy Certificate"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label
            htmlFor="price"
            className="text-neutral-400 text-sm flex grow basis-1/2 flex-col"
          >
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Price
            </p>
            {!isLoading ? (
              <input
                id="price"
                name="price"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.price}
                onChange={(e) => handleInputChange(e, "info")}
                type="number"
                placeholder="Enter Price"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
          <label htmlFor="facilities" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Facilities
            </p>
            {!isLoading ? (
              <Select
                variant="outlined"
                sx={{
                  width: 324,
                  height: 48,
                  marginTop: "4px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "0.375rem",

                  color: "rgb(115 115 115)",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  "&:focus , &:hover": {
                    borderColor: "none",
                    outline: "none",
                  },
                }}
                multiple
                value={selectedFacilities}
                placeholder="Select facility"
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 250,
                      overflow: "auto",
                    },
                  },
                }}
              >
                {facilities.map((facility) => (
                  <MenuItem key={facility} value={facility} sx={{ height: 30 }}>
                    <Checkbox
                      checked={selectedFacilities.indexOf(facility) > -1}
                    />
                    <ListItemText primary={facility} />
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="propertyStatus" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Property status
            </p>
            {!isLoading ? (
              <select
                id="propertyStatus"
                name="propertyStatus"
                disabled={action === "view" || isSubmitting}
                value={formData?.info?.propertyStatus}
                onChange={(e) => handleInputChange(e, "info")}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              >
                <option value="">Select Property Status</option>
                <option value="Completed">Completed</option>
                <option value="Offplan">Offplan</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Sold">Sold</option>
                <option value="Rent">Rent</option>
              </select>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>

          <label htmlFor="propertySubType" className="grow basis-1/2">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              Property Sub Type
            </p>
            {!isLoading ? (
              <select
                id="propertySubType"
                name="propertySubType"
                disabled={action === "view" || isSubmitting}
                value={formData?.info?.propertySubType}
                onChange={(e) => handleInputChange(e, "info")}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              >
                <option value="">Select Property Sub Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Villa">Villa</option>
              </select>
            ) : (
              <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
          </label>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <label htmlFor="description" className="grow">
            <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
              ABOUT Property (a brief information about the Property)
            </p>
            {!isLoading ? (
              <textarea
                id="description"
                maxLength={1000}
                name="description"
                disabled={action == "view" || isSubmitting}
                value={formData?.info?.description}
                onChange={(e) => handleInputChange(e, "info")}
                rows={8}
                placeholder="Enter here"
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
              />
            ) : (
              <div className="w-full p-[23px] h-[188px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
            )}
            <p className="text-stone-500/90 text-xs ml-auto w-max leading-4">
              1000 Characters
            </p>
          </label>
        </div>
        <main className="my-2">
          <ul className="flex flex-row align-center gap-2 flex-wrap">
            {hasProcessedImages &&
            formData?.info?.image &&
            !(typeof formData?.info?.image === "string")
              ? formData.info?.image?.map((image, index) => (
                  <li
                    key={index}
                    className="relative cursor-pointer p-20 h-[150px] w-[170px] overflow-hidden"
                  >
                    {action !== "view" && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSpaceImage(index, "new")}
                        className="absolute top-0 right-0 bg-white p-1 z-[1]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    <Image
                      fill
                      src={image}
                      className="rounded-lg"
                      alt={`space ${index}`}
                    />
                  </li>
                ))
              : action &&
                action === "update" &&
                hasProcessedImages === false &&
                Array.from({ length: 1 }).map((_, item, index) => (
                  <li
                    key={index}
                    className="rounded-lg h-[150px] w-[170px] bg-neutral-200 animate-pulse"
                  />
                ))}
            {action !== "view" && (
              <div className="flex flex-col gap-2">
                <h3 className="text-[rgba(60,60,60,1)] text-xs">IMAGE</h3>
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer p-20 h-[200px] w-[270px] border-dashed border-[1.5px] rounded-2xl  border-[#DEDEDE] flex br-5 items-center justify-center flex-col"
                >
                  {/* <Image
                    src={fileUpload}
                    width={500}
                    height={500}
                    alt="file upload"
                    className="!h-[3.5rem] !w-[3.5rem] object-contain !max-w-none"
                  /> */}
                  <div className="flex flex-col absolute bottom-6">
                    <p className="text-[#98A2B3] text-xs text-[rgba(255,69,18,1)] text-center">
                      Click to upload{" "}
                      <span className="text-[#475367]">or drag and drop</span>
                    </p>
                    <p className="text-[#98A2B3] text-xs text-center">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                  <input
                    disabled={isSubmitting ? true : false}
                    accept="image/*"
                    onChange={handleImageUpload}
                    type="file"
                    id="image-upload"
                    className="invisible"
                  />
                </label>
              </div>
            )}
          </ul>
        </main>
      </div>
    </section>
  );
}
