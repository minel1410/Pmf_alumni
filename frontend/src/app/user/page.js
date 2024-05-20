"use client"

import { useState } from "react";


export default function Test2(){
   return(
      <div className="border-2 border-gray-200 rounded-lg flex justify-between items-center p-4">

      <div className="flex gap-2 items-center">
         <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" className="w-20 h-20 rounded-full"></img>
         <div>
            <p className="font-bold text-md">Jack Adams</p>
            <p className="text-gray-400">Prodcust Designer</p>
            <p className="text-gray-400">Los Angeles</p>
         </div>
      </div>
      <button className="px-4 py-1 border-2 border-gray-300 rounded-md">Edit</button>
      
    </div>
   )
}
