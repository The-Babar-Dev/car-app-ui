"use client";

import Link from "next/link";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { deleteUserSession } from "@/utils/sessionManager";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteUserSession();
    router.push("/login");
  };

  return (
    <header className="bg-gray-100 px-5 md:px-7 p-2">
      <nav className="flex justify-between items-center">
        {/* Left */}
        <div className="flex">
          <Link href="/" className="-m-1.5 p-1.5">
            <img className="h-16 w-16" src="/next.svg" alt="logo" />
          </Link>
        </div>

        {/* Right */}
        <div>
          <CiLogout
            className="text-2xl hover:text-[#28A887] hover:cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
