import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setIsImageLoading,
  isImageLoading,
  isEditMode,
  className,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    // console.log(event.target.files, "event.target.files");

    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  async function uploadImageToCloudinary() {
    setIsImageLoading(true);
    const data = new FormData();

    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:4000/api/admin/products/upload-image",
      data,
    );

    // console.log(response.data.result.url, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setIsImageLoading(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className={`mx-auto mt-4 w-full max-w-md ${className}`}>
      <Label className="mb-4 block text-lg font-semibold">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-50" : ""} rounded-lg border border-dashed border-gray-400 p-4 shadow`}
      >
        <Input
          id="image_upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image_upload"
            className={`${isEditMode ? "cursor-not-allowed" : "cursor-pointer"} group mt-2 flex h-32 flex-col items-center justify-center`}
          >
            <UploadCloudIcon
              className={`${isEditMode ? "" : "group-hover:text-blue-600"} mb-2 h-10 w-10 text-gray-500`}
            />
            <span
              className={`${isEditMode ? "" : "group-hover:text-blue-600"}`}
            >
              Drag & drop or click to upload image
            </span>
          </Label>
        ) : isImageLoading ? (
          <Skeleton className="h-10 bg-gray-200" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex w-[90vw] items-center gap-1 overflow-hidden">
                <FileIcon className="h-9 w-10 text-blue-600" />
                <Label className="w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-blue-600">
                  {imageFile.name}
                </Label>
              </div>
              <Button
                className="text-blue-600 shadow-none hover:text-red-600"
                onClick={handleRemoveImage}
              >
                <XIcon size={40} strokeWidth={2.5} />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
