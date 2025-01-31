import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {

  const navigate = useNavigate()

  return (
    <Card className="flex flex-col py-4 px-6 gap-8">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center gap-4 text-4xl">
          Payment is successful!
        </CardTitle>
      </CardHeader>

      <Button variant="user" className="w-fit" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  );
};

export default PaymentSuccess;
