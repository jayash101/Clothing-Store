import {
  House,
  LogOut,
  Menu,
  Search,
  Shirt,
  ShoppingCart,
  User,
} from "lucide-react";

import React, { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { DB_NAME } from "../../../../backend/src/constant.js";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet.jsx";

import { Button } from "../ui/button.jsx";

import { useDispatch, useSelector } from "react-redux";

import { shoppingHeaderMenuItems } from "@/config/index.js";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { Avatar, AvatarFallback } from "../ui/avatar.jsx";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu.jsx";

import { logoutUser } from "@/store/slice/authSlice.js";

import CartWrapper from "./CartWrapper.jsx";

import { fetchCartItems } from "@/store/shop/cartSlice/cartSlice.js";

import { Label } from "../ui/label.jsx";

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.shoppingCart);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="user"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItems.items ? (
            <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-1 text-[0.5rem] text-white">
              {cartItems.items.length}
            </span>
          ) : null}
          <span className="sr-only">User Cart</span>
        </Button>

        <CartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-teal-900">
            <AvatarFallback className="cursor-pointer bg-slate-700 font-bold text-white hover:bg-cyan-600">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          className="mr-8 w-56 bg-white [box-shadow:0_0_0.5vw_gray]"
        >
          <DropdownMenuLabel className="font-normal">
            Logged in as <span className="font-bold">{user?.userName}</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer hover:bg-teal-500 hover:text-white"
            onClick={() => navigate("/shop/account")}
          >
            <User className="mr-2 h-6 w-6" />
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer hover:bg-teal-500 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-6 w-6" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = (currentMenuItem) => {
    sessionStorage.removeItem("filters");

    const currentFilter =
      currentMenuItem.id !== "home" &&
      currentMenuItem.id !== "products" &&
      currentMenuItem.id !== "search"
        ? {
            category: [currentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("products") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${currentMenuItem.id}`))
      : navigate(currentMenuItem.path);
  };

  return (
    <nav className="mb-3 flex flex-col gap-6 lg:mb-0 lg:flex-row lg:items-center">
      {shoppingHeaderMenuItems.map((item) => (
        <Label
          onClick={() => handleNavigate(item)}
          key={item.id}
          className="cursor-pointer py-2 indent-2 font-medium hover:bg-teal-800 hover:text-white lg:py-0 lg:indent-0 lg:text-sm lg:hover:bg-slate-100 lg:hover:text-teal-800 lg:hover:underline lg:hover:underline-offset-4 lg:hover:[transition:all_0.3s_ease]"
        >
          {item.label === "Search" ? <Search size={20} /> : item.label}
        </Label>
      ))}
    </nav>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-slate-100">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          to="/shop/home"
          className="group flex items-center gap-1 font-bold"
        >
          <span className="font-mono text-2xl italic text-teal-500 [text-shadow:0.15vw_0_0.2vw] hover:[text-shadow:#0f766e] group-hover:text-teal-700">
            {DB_NAME}
          </span>
          <Shirt className="h-6 w-6 text-teal-500 group-hover:text-teal-700" />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="user" size="icon" className="lg:hidden">
              <span className="sr-only">Toggle header menu</span>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-xs bg-white">
            <SheetHeader className="mb-4 h-12 border-b-2 border-black">
              <SheetTitle>
                <Link
                  to="/shop/home"
                  className="flex items-center gap-2 font-bold"
                >
                  <House className="h-6 w-6" />
                  <span>{DB_NAME}</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {isAuthenticated ? (
          <div className="hidden lg:block">
            <HeaderRightContent className="h-6 w-6" />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default ShoppingHeader;
