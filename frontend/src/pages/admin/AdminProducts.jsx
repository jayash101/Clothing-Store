import ProductImageUpload from "@/components/admin/ImageUpload";

import AdminProductList from "@/components/admin/AdminProductList";

import CommonForm from "@/components/common/Form";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { addProductFormElements } from "@/config";

import { useToast } from "@/hooks/use-toast";

import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice/productSlice";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  // Product form dialog
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProduct);
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          }),
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            // fetch all products
            dispatch(fetchAllProducts());

            // clear form
            setFormData(initialFormData);

            // close the dialog
            setOpenCreateProductsDialog(false);

            // reset current ID
            setCurrentEditedId(null);

            // toast notification
            toast({
              title: "Success!",
              description: data?.payload?.message,
              className: "bg-green-600 text-white",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          }),
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            // fetch all products
            dispatch(fetchAllProducts());

            // close the dialog
            setOpenCreateProductsDialog(false);

            // clear form
            setImageFile(null);
            setFormData(initialFormData);

            // toast notification
            toast({
              title: "Success!",
              description: data?.payload?.message,
              className: " bg-green-600 text-white",
            });
          }
        });
  };

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());

        // toast notification
        toast({
          title: "Success!",
          description: data?.payload?.message,
          className: "bg-green-600 text-white",
        });
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="flex w-full justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          variant="admin"
        >
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((item) => (
              <AdminProductList
                key={item.title}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={item}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setIsImageLoading={setIsImageLoading}
            isImageLoading={isImageLoading}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? "Edit Product" : "Add New Product"
              }
              formControls={addProductFormElements}
              variant="admin"
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
