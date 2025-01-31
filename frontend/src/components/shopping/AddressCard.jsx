import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleUpdateAddress,
  setCurrentSelectedAddress,
  addressItem,
  selectedId,
}) => {
  return (
    <Card
      className={`cursor-pointer bg-white ${selectedId?._id === addressInfo?._id ? "shadow-inner shadow-black" : "border-black"}`}
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressItem)
          : null
      }
    >
      <CardContent className={`grid gap-4 p-4`}>
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>

      <CardFooter className="flex gap-4 p-4">
        <Button variant="user" onClick={() => handleUpdateAddress(addressInfo)}>
          Edit
        </Button>

        <Button variant="user" onClick={() => handleDeleteAddress(addressInfo)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
