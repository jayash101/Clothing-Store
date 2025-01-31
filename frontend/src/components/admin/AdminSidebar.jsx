import { ChartNoAxesCombined } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Shirt, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },

  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },

  {
    id: "Orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <Shirt />,
  },

  // {
  //   id: "features",
  //   label: "Features",
  //   path: "/admin/features",
  // },
];

const MenuItems = () => {
  const navigate = useNavigate();
  return (
    <nav className="mt-12 flex flex-col gap-4">
      {adminSidebarMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(item.path);
          }}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-lg transition-all duration-300 hover:bg-blue-600/70 hover:transition-all hover:duration-300 ${
            window.location.pathname.includes(item.path) &&
            "bg-white font-bold text-cyan-900"
          } `}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [navigate]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 flex-col border-r border-r-gray-400 bg-cyan-900 p-6 text-white"
        >
          <div>
            <SheetHeader
              className="border-b"
              onClick={() => navigate("/admin/dashboard")}
            >
              <SheetTitle className="mt-12 flex items-center gap-2 py-2">
                <ChartNoAxesCombined strokeWidth={2.5} size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>

            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r border-r-gray-400 bg-cyan-900 p-6 text-white lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-default items-center gap-2 py-1"
        >
          <ChartNoAxesCombined strokeWidth={2.5} size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>

        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
