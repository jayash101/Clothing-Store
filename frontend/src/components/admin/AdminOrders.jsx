import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogTitle, DialogTrigger } from "../ui/dialog";
import AdminOrderDetails from "./AdminOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminOrderDetails,
  getAdminOrders,
  resetAdminOrderDetails,
} from "@/store/admin/orderSlice/orderSlice";
import { Badge } from "../ui/badge";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  const dispatch = useDispatch();

  const fetchOrderDetails = (currentId) => {
    dispatch(getAdminOrderDetails(currentId));
  };

  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  // console.log(orderList, "orderList");
  console.log(orderDetails, "orderDetails");

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-3xl">All Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-cyan-700">
                Order ID
              </TableHead>
              <TableHead className="font-bold text-cyan-700">
                Order Date
              </TableHead>
              <TableHead className="font-bold text-cyan-700">
                Order Status
              </TableHead>
              <TableHead className="font-bold text-cyan-700">
                Order Price
              </TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{orderItem?._id}</TableCell>

                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>

                    <TableCell>
                      <Badge
                        variant={`${
                          orderItem?.orderStatus === "delivered" ||
                          orderItem?.orderStatus === "confirmed"
                            ? "fulfilled"
                            : orderItem?.orderStatus === "pending"
                              ? "pending"
                              : orderItem?.orderStatus === "rejected"
                                ? "rejected"
                                : "default"
                        }`}
                        className={`capitalize`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>${orderItem?.totalAmount.toFixed(2)}</TableCell>

                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetAdminOrderDetails());
                        }}
                      >
                        <DialogTrigger asChild>
                          <DialogTitle>
                            <Button
                              variant="user"
                              onClick={() => fetchOrderDetails(orderItem?._id)}
                            >
                              View Details
                            </Button>
                          </DialogTitle>
                        </DialogTrigger>
                        <AdminOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
