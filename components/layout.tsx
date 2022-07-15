import React from "react";
import NavBar from "./NavBar";
import Ellipse from "../assets/images/Ellipse.svg";

type LayoutProps = {
    children: React.ReactNode,
};

export default function Layout ({ children }: LayoutProps) {
  return (
      <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
          <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
          <div className="pb-5 overflow-y-auto overflow-hidden z-50 mb-[10vh] w-full max-w-md ">
              {children}
          </div>
          <NavBar page = {"Home"}/>
      </div>
  );
}