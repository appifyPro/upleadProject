import Image from "next/image";
import { roomInformationInitialState } from "../data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// import fileUpload from "../../../../../../../public/file-upload-states.png";

export default function SchoolImages({
  formData,
  setFormData,
  isLoading,
  isSubmitting,
  selectedData,
  handleFlatArrayInputChange,
  imageFiles,
  setImageFiles,
  hasProcessedImages,
  setHasProcessedImages,
}) {
  const action = useSearchParams().get("action");

  const [newImageFiles, setNewImageFiles] = useState([]);
  // const [ hasProcessedImages, setHasProcessedImages ] = useState<boolean>(false);

  /* Effect to transform file obtained from requiest to Local File Object */
  useEffect(() => {
    async function* fetchImagesGenerator(images) {
      for (const image of images) {
        try {
          const response = await fetch(image?.url);
          const data = await response.blob();
          const fileName = image?.url.substring(
            image?.url.lastIndexOf("/") + 1
          );
          const imageFile = new File([data], fileName, { type: data?.type });
          yield imageFile;
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }

    async function processImages() {
      if (formData && formData?.images) {
        const imageFiles = [];
        const imageGenerator = fetchImagesGenerator(formData.images);

        for await (const imageFile of imageGenerator) {
          imageFiles.push(imageFile);
        }
        setImageFiles(imageFiles);
        if (imageFiles?.length >= 1)
          setFormData({ ...formData, images: imageFiles });
        setHasProcessedImages(true);
        console.log("All images processed:", imageFiles);
      }
    }
    processImages();
  }, [selectedData, formData]);

  const handleImageUpload = (e) => {
    if (formData?.images) {
      const tempData = { ...formData };
      tempData.images = [...formData?.images, ...e.target.files];
      tempData.info.images = [...formData?.info?.images, ...e.target.files];
      setFormData(tempData);
    } else {
      const tempData = {
        ...formData,
        images: [],
        info: { ...formData.info, images: [] },
      };
      tempData.images.push(...e.target.files);
      tempData.info.images.push(...e.target.files);
      setFormData(tempData);
    }
  };

  const handleRemoveSpaceImage = (itemIndex, type) => {
    if (type === "new") {
      const filteredImages = formData.images.filter(
        (image, index) => index !== itemIndex
      );
      setFormData({ ...formData, images: filteredImages });
    } else if (type === "existing") {
      const filteredImages = formData.IMAGES.filter(
        (image, index) => index !== itemIndex
      );
      setFormData({ ...formData, IMAGES: filteredImages });
    }
  };
  console.log(formData.images);
  console.log(imageFiles);
  console.log(hasProcessedImages);

  console.log(formData?.images?.length);
  console.log(formData);
  return (
    <main className="my-2">
      <ul className="flex flex-row align-center gap-2 flex-wrap">
        {hasProcessedImages && formData?.images
          ? formData?.images?.map((image, index) => (
              <li
                key={index}
                className="relative cursor-pointer p-20 h-[150px] w-[170px] overflow-hidden"
              >
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
                <Image
                  fill
                  src={!image?.url ? URL.createObjectURL(image) : ""}
                  className="rounded-lg"
                  alt={`space ${index}`}
                />
              </li>
            ))
          : action &&
            action === "update" &&
            Array.from({ length: 1 }).map((_, item) => (
              <li
                key={item}
                className="rounded-lg h-[150px] w-[170px] bg-neutral-200 animate-pulse"
              />
            ))}
        {action !== "update" && (
          <div className="flex flex-col gap-2">
            <h3 className="text-[rgba(60,60,60,1)] text-xs">IMAGE</h3>
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer p-20 h-[200px] w-[270px] border-dashed border-[1.5px] rounded-2xl  border-[#DEDEDE] flex br-5 items-center justify-center flex-col"
            >
              {/* <Image
                src={fileUpload}
                width={1000}
                height={1000}
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
  );
}
