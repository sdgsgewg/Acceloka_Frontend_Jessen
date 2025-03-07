import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ClipLoader size={50} color="#2563eb" />
      <p className="mt-4 text-2xl text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
