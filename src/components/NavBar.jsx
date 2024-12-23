import { Bell, House, ListCheck, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const NavItem = ({ activeItem, setActiveItem }) => {
  const navItems = ["routine", "todo", "about us"];
  return (
    <ul className="flex gap-6">
      {navItems.map((item) => (
        <li
          className={`group relative cursor-pointer select-none overflow-hidden rounded-xl px-6 py-2.5 font-medium transition-all duration-300 hover:bg-accent/5
            ${activeItem === item 
              ? "bg-accent text-white shadow-lg shadow-accent/25" 
              : "text-dark hover:text-accent"
            }`}
          key={item}
          onClick={() => setActiveItem(item)}
        >
          <span className="relative z-10 capitalize">{item}</span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-accent to-blue opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
        </li>
      ))}
    </ul>
  );
};


const NavItemMobile = ({ activeItem, setActiveItem }) => {
  const navItems = [
    { icon: <House />, label: "routine" },
    { icon: <ListCheck />, label: "todo" },
    { icon: <User />, label: "about us" },
  ];

  return (
    <div className="fixed bottom-6 w-full px-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur-lg">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <li
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`group relative cursor-pointer rounded-xl p-3 transition-all duration-300
                  ${isActive ? "bg-accent/10" : "hover:bg-gray-50"}`}
              >
                <div className="flex flex-col items-center gap-1">
                  {React.cloneElement(item.icon, {
                    size: 20,
                    color: isActive ? "#F84178" : "#252539",
                    className: "transition-transform duration-300 group-hover:scale-110"
                  })}
                  {/* <span className={`text-xs ${isActive ? "text-accent" : "text-dark/70"}`}>
                    {item.label}
                  </span> */}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};


const NavBar = ({ activeItem, setActiveItem }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative border-b border-gray-100 font-poppins shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4 md:px-6">
        {/* Left - User Details */}
        <div className="flex items-center gap-4">
          <div className="group relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-300 hover:scale-105">
            <div className="h-full w-full bg-card-2" />
            <div className="absolute inset-0 rounded-full shadow-sm transition-shadow duration-300 group-hover:shadow-md" />
          </div>
          <div className="space-y-0.5">
            <div className="font-semibold text-dark">Hi, Ganesh</div>
            <div className="text-sm text-dark/70">Computer Science, L4CG3</div>
          </div>
        </div>

        <div>

       
        {!isMobile && (
          <div className="flex-1 text-center">
            <NavItem activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
        )}
        </div>
        {/* Right - Notifications */}
        <button
          className="group relative rounded-full bg-card-1/50 p-3 transition-all duration-300 hover:scale-105 hover:bg-card-1 hover:shadow-md active:scale-95"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-white">
            3
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
          <div className="flex-1 text-center">
            <NavItemMobile activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
        )}
    </nav>
  );
};

export default NavBar;
