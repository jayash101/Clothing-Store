import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminOrderDetails,
  getAdminOrders,
  updateOrderStatus,
} from "@/store/admin/orderSlice/orderSlice";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};

const AdminOrderDetails = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);

  const { user } = useSelector((state) => state.auth);
  // console.log(user, "user");
  // console.log(orderDetails, "orderDetails");

  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    console.log(formData);

    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status }),
    ).then((data) => {
      console.log(data), "data";

      if (data?.payload?.success) {
        dispatch(getAdminOrderDetails(orderDetails?._id));
        dispatch(getAdminOrders());
        setFormData(initialFormData);
        toast({
          title: "Success!",
          description: data?.payload?.message,
          className: "bg-blue-500 text-white",
        });
      }
    });
  };

  return (
    <DialogContent className="sm-max-w-[60vw] bg-white">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="mt-8 flex items-center justify-between">
            <p className="font-bold text-teal-900">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Order Status</p>
            <Badge
              variant={`${
                orderDetails?.orderStatus === "delivered" ||
                orderDetails?.orderStatus === "confirmed"
                  ? "fulfilled"
                  : orderDetails?.orderStatus === "pending"
                    ? "pending"
                    : orderDetails?.orderStatus === "rejected"
                      ? "rejected"
                      : "default"
              }`}
              className={`capitalize`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Order Price</p>
            <Label className="text-base font-semibold">
              ${orderDetails?.totalAmount.toFixed(2)}
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Payment Status</p>
            <Label className="capitalize">{orderDetails?.paymentStatus}</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-teal-900">Payment Method</p>
            <Label className="capitalize">{orderDetails?.paymentMethod}</Label>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-lg font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems?.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li
                      className="flex items-center justify-between"
                      key={index}
                    >
                      <span>
                        {item?.title} [{item?.quantity}]
                      </span>
                      <span>${Number(item?.price).toFixed(2)}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-lg font-medium">Shipping Info</div>
            <ul className="grid gap-1 text-slate-700">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
            </ul>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
            variant={"admin"}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
