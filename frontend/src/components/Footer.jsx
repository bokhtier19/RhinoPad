import React from "react";

const Footer = ({ darkMode }) => {
    return (
        <>
            <div>
                <footer className={`flex flex-col md:flex-row justify-around py-4 text-sm text-center text-white  ${darkMode ? "bg-blue-500" : "bg-[#202124]"}`}>
                    <p>&copy; 2025 RhinoPad. All rights reserved.</p>
                    <p>Made with ❤️ by Bokhtier</p>
                </footer>
            </div>
        </>
    );
};

export default Footer;
