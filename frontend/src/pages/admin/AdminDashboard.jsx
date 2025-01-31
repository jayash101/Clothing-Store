import ProductImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { addFeaturedImage, getFeaturedImage } from "@/store/common/commonSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const dispatch = useDispatch();

  const { featuredImageList } = useSelector((state) => state.commonFeature);

  // console.log(uploadedImageUrl, "uploadedImage");

  const handleUploadFeatureImage = () => {
    dispatch(addFeaturedImage(uploadedImageUrl)).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        dispatch(getFeaturedImage());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  useEffect(() => {
    dispatch(getFeaturedImage());
  }, [dispatch]);

  // console.log(featuredImageList, "featuredImage");

  return (
    <div className="">
      <div className="flex flex-col items-center gap-10 pt-4">
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setIsImageLoading={setIsImageLoading}
          isImageLoading={isImageLoading}
          className="max-w-md scale-110 p-8"
          // isEditMode={currentEditedId !== null}
        />

        <Button
          variant="admin"
          className="mb-4 w-[26rem]"
          onClick={handleUploadFeatureImage}
        >
          Upload
        </Button>
      </div>
      <div className="h-[]100vh mt-5 flex w-[80vw] flex-col gap-4 overflow-hidden">
        {featuredImageList && featuredImageList.length > 0
          ? featuredImageList.map((featuredImage, index) => (
              <img
                key={index}
                src={featuredImage?.image}
                alt="Featured Image"
                className="h-full w-full rounded-md object-cover"
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
