// import React from "react";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-svh flex flex-col justify-center items-center border-2">
      <h1>Welcome to Image Employee Portal</h1>
      <button
        className=" bg-zinc-700 text-white rounded-lg w-48 p-2 mt-2 "
        onClick={() => {
          navigate("/login");
        }}
      >
        Login Portal
      </button>
    </div>
  );
};

export default Home;
