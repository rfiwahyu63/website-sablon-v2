"use client"
import {useState} from "react";
import {Search} from "lucide-react";


export default function SearchBar (){
  const [keyword, setKeyword] = useState ("");

  return (
    <div className="flex items-center w-md mt-4  ml-auto lg:mx-auto bg-transparent rounded-md px-2 py-1 shadow-[2px_2px_5px_rgba(0,0,0,0.2)]">

      <Search className=" text-black" />

      <input
      value={keyword}
      onChange={(e) => setKeyword (e.target.value)}
      placeholder="Search ?"
      className="w-full border text-gray-800 italic border-gray-300 rounded-md cursor-text px-2 mx-2 outline-none"
      >
      </input>
      
    </div>
  )
}