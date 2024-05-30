import React from 'react'
import Sidebar from '../components/Sidebar'


export default function Home() {
  return (
    <>

      <div className="flex">
            <Sidebar />
            <div className="flex-1 p-10">
                {/* Main content goes here */}
                <h1 className="text-2xl font-bold">Main Content</h1>
            </div>
        </div>
    </>
  )
}
