"use client"
import CardDispositivo from "./components/CardDispositivo"
import CriarDispositivo from "./components/CriarDispositivo"
import ListarDispositivo from "./components/ListarDispositivo"
import Sidebar from "./components/SideBar"

import { useRouter } from "next/navigation"

export default function Home(){
  const router = useRouter()
  return(
    <div>
      <div className="flex ml-[15vw] gap-4 p-4">
        <Sidebar/>
        <CardDispositivo/>
        <CriarDispositivo/>
        <ListarDispositivo/>
      </div>
    </div>
  )
}