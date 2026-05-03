"use client"

import {useState, ChangeEvent} from "react"
import SideBar from "./SideBar"

type Props = {
  open: boolean
  onClose: () => void
}

export default function ModalNovoDispositivo({ open, onClose }: Props){

  if(!open) return null

  const [novoDispositivo, setNovoDispositivo] = useState({
          nome_dispositivo: "",
          id_dispositivo: "",
      })
  
      const pegaInfo = (e: ChangeEvent<HTMLInputElement>, where: string)=>{
           const value = e.target.value
  
          if (where === "nome") {
              setNovoDispositivo({
                  ...novoDispositivo,
                  nome_dispositivo: value
              })
          }
          else {
              setNovoDispositivo({
                  ...novoDispositivo,
                  id_dispositivo: value
              })
          }
      }
  
      const criarDispositivo = async ()=>{
          //Promise -> Promessa
          const url = 'http://localhost:8080/novoDispositivo'
          try{
              const resposta = await fetch(url, {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(novoDispositivo)
              })
              const resposta_json = await resposta.json()
              console.log(resposta_json)
              alert("Dispositivo Criado com Sucesso!")
          }
          catch(error){
              console.log(error)
          }
          
      }

  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-[#0F172A] p-6 rounded-2xl w-[400px] border border-[#1E293B] shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Novo Dispositivo</h2>

          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-3">

          <input
                type="text"
                placeholder="Nome do Dispositivo"
                value = {novoDispositivo.nome_dispositivo}
                onChange={(e)=>{pegaInfo(e, "nome")}}
                className="bg-[#020617] border border-[#1E293B] p-2 rounded-lg outline-none"
            />

          <input
            type="text"
            placeholder="ID do dispositivo"
            value = {novoDispositivo.id_dispositivo}
            onChange={(e)=>{pegaInfo(e, "id")}}
            className="bg-[#020617] border border-[#1E293B] p-2 rounded-lg outline-none"
          />

          <div className="flex gap-2 mt-4">

            <input
                type="submit"
                value="Enviar"
                onClick={criarDispositivo}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl w-full"
            />

            <button 
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-xl w-full"
            >
              Cancelar
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}