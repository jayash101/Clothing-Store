import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminContainer from "./AdminContainer";

const AdminLayout = () => {
  const [openSider, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSidebar open={openSider} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />
        {/* admin header */}
        <main className="flex flex-1 flex-col bg-slate-300 p-4 md:p-6">
          <AdminContainer>
            <Outlet />
          </AdminContainer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
