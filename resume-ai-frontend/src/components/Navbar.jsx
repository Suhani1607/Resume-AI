import React from "react";
import { Link } from "react-router-dom";
import { FaBrain } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#111214]/95 backdrop-blur-md">
      <div className="w-full px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D85B9B]/15 text-[#D85B9B] transition-all duration-300 group-hover:bg-[#D85B9B]/25 group-hover:scale-105">
              <FaBrain className="text-xl" />
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              Resume<span className="text-[#D85B9B]">AI</span>
            </span>
          </Link>

          {/* Login Button - UI Only */}
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-[#17181C] px-6 py-3 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-[#D85B9B]/40 hover:bg-[#211A36] hover:text-white"
          >
            Login
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;