import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { MdModeNight } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { GiRhinocerosHorn } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode, fetchNotes, searchTerm, setSearchTerm }) => {
    return (
        <>
            <div className={`sticky top-0 z-50 flex flex-col md:flex-row gap-1 md:gap-4 items-center justify-around py-1 md:py-4 text-white shadow-md ${darkMode ? "bg-blue-500" : "bg-[#202124]"}`}>
                <div className="flex items-center gap-2">
                    <GiRhinocerosHorn size={20} />
                    <p className="text-2xl font-bold uppercase">RhinoPad</p>
                </div>
                <div className="flex items-center gap-2 px-2 text-black bg-white rounded-2xl">
                    <input
                        type="text"
                        className="px-6 py-1 text-black border-none rounded outline-none md:py-2"
                        placeholder="search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch size={20} />
                </div>
                <div className="flex items-center gap-4 ">
                    <button onClick={fetchNotes} className="hover:cursor-pointer">
                        <IoMdRefresh size={20} />
                    </button>
                    <button className="hover:cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <MdModeNight size={20} /> : <GoSun size={20} />}
                    </button>

                    <button className="flex items-center gap-1">
                        <p>Bokhtier</p>
                        <CgProfile size={20} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
