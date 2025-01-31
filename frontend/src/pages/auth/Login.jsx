import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/slice/authSlice";
import { toast, useToast } from "@/hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Success!",
          description: data?.payload?.message,
          className: "bg-green-600 text-white",
        });
      } else {
        toast({
          title: "Error!",
          description: data?.payload?.message,
          className: "bg-red-500 text-white",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-purple-950">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            to="/auth/register"
            className="ml-2 font-medium text-purple-800 transition-all duration-300 hover:text-pink-800 hover:underline"
          >
            Register
          </Link>
        </p>

        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText={"Sign Up"}
          variant={"admin"}
        />
      </div>
    </div>
  );
};

export default Login;
