import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";



export default function Home() {

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
        <div className="mt-10 border border-black h-screen">
          <iframe
            title="Resourcify"
            width="100%"
            height="100%"
            src="https://app.powerbi.com/view?r=eyJrIjoiZTdhMTlhODQtMzU4My00NjE3LTgzYmUtYWJlMzI0NDRiMmU4IiwidCI6Ijk3ZjdmY2JkLWU2NDItNGJlOC1iODRmLWZjMmNkN2Y4ZDZmZiJ9"
            frameborder="0"
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
