"use client"
import Sidebar from "./components/SideBar"

import { useRouter } from "next/navigation"

export default function Home(){
  const router = useRouter()
  return(
    <div>
      <div className="flex ml-[15vw] gap-4 p-4">
        <Sidebar/>
      </div>
    </div>
  )
}