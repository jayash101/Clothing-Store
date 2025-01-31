import React, { useState } from "react";

import coverImage from "../../assets/coverimage.jpg";

import { Tabs } from "@/components/ui/tabs";

import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import ShoppingOrders from "@/components/shopping/ShoppingOrders";

import ShoppingAddress from "@/components/shopping/ShoppingAddress";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

import { useSelector } from "react-redux";

const Account = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="relative flex flex-col">
      {/* Cover Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={coverImage}
          alt="cover image"
          className="aspect-video h-full w-full object-cover"
        />
      </div>

      {/* Account Tabs */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="mx-auto flex w-2/3 flex-col rounded-lg border bg-slate-200 p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="mb-4 flex w-fit rounded bg-teal-900 px-2 py-2 font-bold">
              <TabsTrigger
                value="orders"
                className="bg-teal-900 px-4 py-2 text-white data-[state=active]:bg-white data-[state=active]:text-teal-900"
              >
                Orders
              </TabsTrigger>

              <TabsTrigger
                value="address"
                className="bg-teal-900 px-4 py-2 text-white data-[state=active]:bg-white data-[state=active]:text-teal-900"
              >
                Address
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>

            <TabsContent value="address">
              <ShoppingAddress />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
