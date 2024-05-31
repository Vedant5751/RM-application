import React from 'react'

export default function Employee() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold">Main Content</h1>
        </div>
      </div>
    </>
  );
}
