import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddress,
  updateAddress,
} from "@/store/shop/addressSlice/addressSlice";
import AddressCard from "./AddressCard";
import { useToast } from "@/hooks/use-toast";

const initialAddressForm = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
const ShoppingAddress = ({
  className,
  setCurrentSelectedAddress,
  selectedId,
  titleSize,
}) => {
  const [formData, setFormData] = useState(initialAddressForm);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);

  const { toast } = useToast();

  const handleAddress = (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressForm);
      toast({
        title: "Error",
        description: "You can add max 3 address",
        className: "bg-red-500 text-white",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          updateAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressForm);
            toast({
              title: "Success!",
              description: "Product updated successfully",
              className: "bg-blue-600 text-white",
            });
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            // console.log(data);
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              setFormData(initialAddressForm);
              toast({
                title: "Success!",
                description: "Product added successfully",
                className: "bg-green-600 text-white",
              });
            }
          },
        );
  };

  const handleDeleteAddress = (currentAddress) => {
    console.log(currentAddress);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: currentAddress._id }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast({
          title: "Success!",
          description: "Product deleted successfully",
          className: "text-white bg-red-700",
        });
      }
    });
  };

  const handleUpdateAddress = (currentAddress) => {
    setCurrentEditedId(currentAddress?._id);
    setFormData({
      ...formData,
      address: currentAddress?.address,
      city: currentAddress?.city,
      pincode: currentAddress?.pincode,
      phone: currentAddress?.phone,
      notes: currentAddress?.notes,
    });

    return () => {
      isEdited(false);
    };
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };
  
  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  // console.log(addressList);


  return (
    <Card className={`bg-white ${className}`}>
      <div className="mb-5 grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 md:grid-cols-3">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem, index) => (
              <AddressCard
                addressInfo={addressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleUpdateAddress={handleUpdateAddress}
                key={index}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                addressItem={addressItem}
                selectedId={selectedId}
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle className={`text-${titleSize}`}>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>

        <CardContent>
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            variant="user"
            onSubmit={handleAddress}
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ShoppingAddress;
