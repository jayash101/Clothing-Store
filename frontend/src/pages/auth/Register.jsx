import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/slice/authSlice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Success",
          description: data?.payload?.message,
          className: "bg-green-600 text-white",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Error",
          description: data?.payload?.message,
          className: "bg-red-600 text-white",
        });
      }
    });
  };

  // console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-purple-950">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            to="/auth/login"
            className="ml-2 font-medium text-purple-800 transition-all duration-300 hover:text-pink-800 hover:underline"
          >
            Login
          </Link>
        </p>

        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText={"Create new account"}
          variant={"admin"}
        />
      </div>
    </div>
  );
};

export default Register;
