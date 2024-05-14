"use client"

import { useState } from "react";

export default function Test( {}) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <html>
      <body className="w-full h-screen bg-red-500 grid grid-cols-6">
        {/* Sidebar */}
        <div className={`col-span-1 xl:col-span-1 bg-blue-500 overflow-hidden transition-all duration-500 ${showSidebar ? "w-100" : "w-0"}`}>
          Sidebar
        </div>
        
        {/* Content */}
        <div className="col-span-6 xl:col-span-5 bg-green-500">Content</div>

        {/* Button to toggle sidebar */}
        <button 
          className="fixed bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
        </button>
      </body>
    </html>
  );
}
