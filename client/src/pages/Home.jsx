import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";


export default function Home() {

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 bg-blue-200">Metric 1</div>
          <div className="col-span-1 bg-green-200">Metric 2</div>
          <div className="col-span-1 bg-yellow-200">Metric 3</div>
        </div>
        <div className="mt-10 border border-black h-screen">
          <iframe
            title="resourcify_dashboard"
            height="100%"
            width="100%"
            src="https://app.powerbi.com/reportEmbed?reportId=88612be8-585f-4641-a145-e5b7805eeb82&autoAuth=true&ctid=813e6569-4e44-4d95-88a0-16a97bd5277c"
            frameborder="0"
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
