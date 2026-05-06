// 
"use client"
import { useState, useEffect, useRef, ChangeEvent } from "react"

type Dispositivo = {
    id_dispositivo: number
    nome_dispositivo: string
}

export default function ListarDispositivo() { 

    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])
    const [novoDispositivo, setNovoDispositivo] = useState<Dispositivo>({
        nome_dispositivo: "",
        id_dispositivo: 0,
    })

    const userId = useRef<number>(0)
    const [modalAberto, setModalAberto] = useState(false)

    const pegaInfoBackend = async () =>{
        try{
            const resposta = await fetch("http://localhost:8080/dispositivo")
            const data = await resposta.json()
            setDispositivos(data)
        }
        catch(erro){
            console.log(erro)
        }
    }

    const deletaDispositivo = async (id:number)=>{
        try{
            await fetch(`http://localhost:8080/dispositivo/${id}`, {
                method: "DELETE"
            })
            pegaInfoBackend() // 🔥 atualiza lista
        }
        catch(erro){
            console.log(erro)
        }
    }

    const pegaInfo = (e: ChangeEvent<HTMLInputElement>)=>{
        setNovoDispositivo({
            ...novoDispositivo,
            nome_dispositivo: e.target.value
        })
    }

    const editarDispositivo = async ()=>{
        try{
            await fetch(`http://localhost:8080/dispositivo/${userId.current}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(novoDispositivo)
            })

            setModalAberto(false)
            pegaInfoBackend() // 🔥 atualiza lista

        } catch {
            alert("Erro ao editar")
        }
    }

    const abrirModal = (dispositivo: Dispositivo) => {
        userId.current = dispositivo.id_dispositivo
        setNovoDispositivo(dispositivo)
        setModalAberto(true)
    }

    useEffect(()=>{
        pegaInfoBackend()
    }, [])

    return(
        <div className="w-[40vw] bg-white text-black rounded-xl flex flex-col gap-4 p-4">
            <h2 className="text-xl font-semibold">Lista de Dispositivos</h2>

            {dispositivos.map((d)=>(
                <div key={d.id_dispositivo} className="bg-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold">ID: {d.id_dispositivo}</h2>
                    <p>{d.nome_dispositivo}</p>

                    <div className="flex justify-end gap-4 mt-2">
                        <button
                            onClick={()=>abrirModal(d)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Editar
                        </button>

                        <button
                            onClick={()=>deletaDispositivo(d.id_dispositivo)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Deletar
                        </button>
                    </div>
                </div>
            ))}

            {modalAberto && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-[400px] flex flex-col gap-4">
                        <h2 className="text-lg font-semibold">
                            Editar Dispositivo {userId.current}
                        </h2>

                        <input
                            type="text"
                            value={novoDispositivo.nome_dispositivo}
                            onChange={pegaInfo}
                            placeholder="Nome do dispositivo"
                            className="border p-2 rounded"
                        />

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={editarDispositivo}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Salvar
                            </button>

                            <button
                                onClick={()=>setModalAberto(false)}
                                className="bg-gray-400 px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}