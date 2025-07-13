import React from "react";

const Navbar = () => {
  return (
    <div className="m-4 flex h-[60px] flex-grow items-center justify-center gap-2 rounded-lg bg-white text-xl font-medium">
      <img src="/logos_firebase.svg" alt="" />
      <h1>Firebase Contact App</h1>
    </div>
  );
};

export default Navbar;
