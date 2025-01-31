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

import { Dialog } from "../ui/dialog";

import ShoppingOrderDetails from "./ShoppingOrderDetails";

import { useDispatch, useSelector } from "react-redux";

import {
  getOrderDetails,
  getUserOrders,
  resetOrderDetails,
} from "@/store/shop/orderSlice/orderSlice";

import { Badge } from "../ui/badge";

import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector(
    (state) => state.shoppingOrder,
  );

  const fetchOrderDetails = (id) => {
    dispatch(getOrderDetails(id));
  };

  useEffect(() => {
    dispatch(getUserOrders(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  // console.log(
  //   orderList[0]?._id,
  //   orderList[0]?.orderDate,
  //   orderList[0]?.orderStatus,
  //   "$" + orderList[0]?.totalAmount,
  //   "orderList",
  // );

  // console.log(orderDetails, "orderDetails");

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-3xl">Order History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-slate-700">
                Order ID
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Order Date
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Order Status
              </TableHead>
              <TableHead className="font-bold text-slate-700">
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
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <DialogTitle>
                          <Button
                            variant="user"
                            onClick={() => fetchOrderDetails(orderItem?._id)}
                          >
                            View Details
                          </Button>
                          <ShoppingOrderDetails orderDetails={orderDetails} />
                        </DialogTitle>
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

export default ShoppingOrders;
