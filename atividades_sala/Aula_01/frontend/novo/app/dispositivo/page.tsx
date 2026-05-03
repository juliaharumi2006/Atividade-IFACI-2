"use client"

import { useState } from "react"
import CriarDispositivo from "../components/CriarDispositivo"
import CardDispositivo from "../components/CardDispositivo"
import ListarDispositivo from "../components/ListarDispositivo"
import Sidebar from "../components/SideBar"
import ModalDispositivo from "../components/ModalDispositivo"

export default function PageDispositivo(){

  const [openModal, setOpenModal] = useState(false)
  return(
    <div className="bg-[#020617] min-h-screen text-white">

      {/* SIDEBAR */}
      <Sidebar/>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="ml-[16vw] flex flex-col">

        {/* HEADER */}
        <div className="w-full h-[80px] flex items-center justify-between px-6 border-b border-[#1E293B] bg-[#020617]">

          {/* TÍTULO */}
          <h1 className="text-xl font-bold">
            Dispositivos
          </h1>

          {/* AÇÕES */}
          <div className="flex items-center gap-4">

            {/* BOTÃO */}
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
          >
            + Novo Dispositivo
          </button>

          </div>

        </div>

        {/* CONTEÚDO */}
        <div className="flex gap-6 p-6 overflow-y-auto">

          <CardDispositivo/>
          <ListarDispositivo/>

        </div>

        <ModalDispositivo 
        open={openModal}
        onClose={() => setOpenModal(false)}
        />

      </div>

    </div>
  )
}