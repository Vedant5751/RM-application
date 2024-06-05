import React from "react";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 bg-blue-200">Metric 1</div>
            <div className="col-span-1 bg-green-200">Metric 2</div>
            <div className="col-span-1 bg-yellow-200">Metric 3</div>
          </div>
          <div className=" mt-10 border border-black">
            Graph
          </div>
        </div>
      </div>
    </>
  );
}
