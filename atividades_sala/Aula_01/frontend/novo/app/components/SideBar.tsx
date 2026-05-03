"use client"

import{useRouter} from 'next/navigation'

import {
  Wifi,
  LayoutDashboard,
  Radio,
  Users,
  Bell,
  Settings,
  Cog,
  User,
  LogOut
} from "lucide-react" //Icones

import Image from  'next/image' // é quem sobe as imagens

const estilosdoincone = {
    size: 24,
    color: "#fdf3f3",
    strokeWidth: 2.5
}

const linkImagem = "https://upload.wikimedia.org/wikipedia/commons/7/78/Toyota_Logo.svg" //um para cada um

export default function SideBar(){
     const router = useRouter()

     //Criar uma função e redirecionar

     return(
  <div className="w-[16vw] h-screen fixed left-0 top-0 bg-[#0F172A] text-white flex flex-col justify-between border-r border-[#1E293B]">

    {/* LOGO + TÍTULO */}
    <div className="flex flex-col items-center gap-2 px-4 py-6 border-b border-[#1E293B]">
      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
        <Wifi size={22} color="#fff" strokeWidth={2}/>
      </div>

      <div className="flex flex-col items-center leading-tight">
        <span className="text-lg font-bold">IoT Control</span>
        <span className="text-sm text-gray-400">Center</span>
      </div>
    </div>

    {/* MENU */}
    <div className="flex flex-col gap-2 px-3 py-4 flex-1">

      {/* Dashboard */}
      <span 
        onClick={()=>{router.push('/dashboard')}}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer bg-blue-600 text-white font-medium"
      >
        <LayoutDashboard size={20} color="#fff" strokeWidth={2}/>
        <p>Dashboard</p>
      </span>

      {/* Dispositivos */}
      <span 
        onClick={()=>{router.push('/dispositivo')}}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1E293B] text-gray-300 transition-all duration-200"
      >
        <Radio size={20} color="#94A3B8" strokeWidth={2}/>
        <p>Dispositivos</p>
      </span>

      {/* Usuários */}
      <span 
        onClick={()=>{router.push('/usuario')}}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1E293B] text-gray-300 transition-all duration-200"
      >
        <Users size={20} color="#94A3B8" strokeWidth={2}/>
        <p>Usuários</p>
      </span>

      {/* Eventos */}
      <span 
        onClick={()=>{router.push('/eventos')}}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1E293B] text-gray-300 transition-all duration-200"
      >
        <Bell size={20} color="#94A3B8" strokeWidth={2}/>
        <p>Eventos / Logs</p>
      </span>

      {/* Regras */}
      <span 
        onClick={()=>{router.push('/regras')}}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1E293B] text-gray-300 transition-all duration-200"
      >
        <Settings size={20} color="#94A3B8" strokeWidth={2}/>
        <p>Regras</p>
      </span>

      {/* Configurações */}
      <span 
        onClick={()=>{router.push('/configuracoes')}}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1E293B] text-gray-300 transition-all duration-200"
      >
        <Cog size={20} color="#94A3B8" strokeWidth={2}/>
        <p>Configurações</p>
      </span>

    </div>

    {/* RODAPÉ */}
    <div className="px-4 py-4 border-t border-[#1E293B]">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
          <User size={20} color="#fff" strokeWidth={2}/>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold">Admin</span>
          <span className="text-xs text-gray-400">admin@iot.com</span>
        </div>
      </div>

      {/* Logout */}
      <span 
        onClick={()=>{router.push('/login')}}
        className="flex items-center gap-3 mt-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-red-500/20 text-red-400 transition-all"
      >
        <LogOut size={18} color="#f87171" strokeWidth={2}/>
        <p>Sair</p>
      </span>

    </div>

  </div>
)
}