"use client"
import { useState } from "react"

export default function DeviceCard(){

  const [sensores, setSensores] = useState({
    temperatura: 25,
    umidade: 60,
    pressao: 1.2,
    presenca: true
  })

  const [editando, setEditando] = useState(false)

  const [tempInput, setTempInput] = useState(sensores.temperatura)
  const [umidadeInput, setUmidadeInput] = useState(sensores.umidade)
  const [pressaoInput, setPressaoInput] = useState(sensores.pressao)

  // UPDATE (editar sensores)
  const salvarSensores = () => {
    setSensores({
      temperatura: tempInput,
      umidade: umidadeInput,
      pressao: pressaoInput,
      presenca: sensores.presenca
    })
    setEditando(false)
  }

  // DELETE (resetar sensores)
  const resetarSensores = () => {
    setSensores({
      temperatura: 0,
      umidade: 0,
      pressao: 0,
      presenca: false
    })
  }

  // TOGGLE presença (simulação IoT)
  const togglePresenca = () => {
    setSensores(prev => ({
      ...prev,
      presenca: !prev.presenca
    }))
  }

  return(
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 w-[320px] flex flex-col gap-4 shadow-lg">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold">Dispositivo 01</h2>
          <p className="text-sm text-gray-400">ID: #A1023</p>
        </div>

        <span className="text-green-400 bg-green-500/20 px-2 py-1 rounded-lg text-sm">
          Online
        </span>
      </div>

      {/* SENSORES */}
      <div className="grid grid-cols-2 gap-3 text-sm">

        {/* Temperatura */}
        <div className="bg-[#020617] p-3 rounded-xl">
          🌡️ Temp
          {
            editando ? (
              <input
                type="number"
                value={tempInput}
                onChange={(e)=>setTempInput(Number(e.target.value))}
                className="w-full mt-1 bg-transparent border border-gray-600 rounded p-1"
              />
            ) : (
              <p className="text-blue-400 font-bold">{sensores.temperatura}°C</p>
            )
          }
        </div>

        {/* Umidade */}
        <div className="bg-[#020617] p-3 rounded-xl">
          💧 Umidade
          {
            editando ? (
              <input
                type="number"
                value={umidadeInput}
                onChange={(e)=>setUmidadeInput(Number(e.target.value))}
                className="w-full mt-1 bg-transparent border border-gray-600 rounded p-1"
              />
            ) : (
              <p className="text-blue-400 font-bold">{sensores.umidade}%</p>
            )
          }
        </div>

        {/* Pressão */}
        <div className="bg-[#020617] p-3 rounded-xl">
          ⚙️ Pressão
          {
            editando ? (
              <input
                type="number"
                value={pressaoInput}
                onChange={(e)=>setPressaoInput(Number(e.target.value))}
                className="w-full mt-1 bg-transparent border border-gray-600 rounded p-1"
              />
            ) : (
              <p className="text-blue-400 font-bold">{sensores.pressao} bar</p>
            )
          }
        </div>

        {/* Presença */}
        <div className="bg-[#020617] p-3 rounded-xl flex flex-col justify-between">
          🚶 Presença
          <p className={`font-bold ${sensores.presenca ? "text-green-400" : "text-red-400"}`}>
            {sensores.presenca ? "Detectado" : "Ausente"}
          </p>

          <button 
            onClick={togglePresenca}
            className="mt-2 text-xs bg-gray-700 hover:bg-gray-600 rounded p-1"
          >
            Alternar
          </button>
        </div>

      </div>

      {/* BOTÕES CRUD */}
      <div className="flex flex-col gap-2">

        {
          editando ? (
            <button 
              onClick={salvarSensores}
              className="bg-green-600 hover:bg-green-700 py-2 rounded-xl"
            >
              Salvar
            </button>
          ) : (
            <button 
              onClick={()=>setEditando(true)}
              className="bg-blue-600 hover:bg-blue-700 py-2 rounded-xl"
            >
              Editar Sensores
            </button>
          )
        }

        <button 
          onClick={resetarSensores}
          className="bg-red-600 hover:bg-red-700 py-2 rounded-xl"
        >
          Resetar Sensores
        </button>

      </div>

    </div>
  )
}