import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/slice/authSlice";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center justify-between border-b border-cyan-950 bg-cyan-900 px-4 py-4">
      <Button
        className="bg-white text-cyan-900 sm:block lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu />
        <span className="sr-only">ToggleMenu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} variant="admin">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
