"use client"
import { METHODS } from "http"
import {useState, useEffect, useRef, ChangeEvent} from "react"


export default function ListarDispositivo(){ 
    //Criar a lógica aqui.
    const [dispositivos, setDispositivos] = useState([{
        nome_dispositivo: "",
        id_dispositivo: 0,
    }])
    const [novoDispositivo, setNovoDispositivo] = useState({
        nome_dispositivo: "",
        id_dispositivo: 0,
    })

    const userId = useRef(0) //Variável Global

    const pegaInfoBackend = async () =>{
        //Responsável por fazer um GET no usuários backend.
        const url = "http://localhost:8080/dispositivos"
        try{
            //tentando até ter sucesso
            const resposta = await fetch(url)
            const resposta_json = await resposta.json()
            setDispositivos(resposta_json)
        }
        catch(erro){
            //pegar o erro (caso exista)
            console.log(erro)
        }
    }
    
    const deletaDispositivo = async (id:number)=>{
        const url = `http://localhost:8080/dispositivos/${id}`
        const config_request = {
            method: "DELETE"
        }
        try{
            const resposta = await fetch(url,config_request)
            const resposta_json = await resposta.json()
            
            alert(resposta_json.msg)
        }
        catch(erro){
            console.log(erro)
        }
    }

    const [modalAberto, setModalAberto] = useState(false)

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

    const editarDispositivo = async (id:number)=>{
        const url = `http://localhost:8080/dispositivos/${id}`
        const config_request = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(novoDispositivo)
        }
        try{
            const resposta = await fetch(url, config_request)
            const resposta_json = await resposta.json()
            alert(resposta_json.msg)
            setNovoDispositivo({
                nome_dispositivo: "",
                id_dispositivo: "",
            })
        }
        catch(erro){
            alert("Erro ao editar o dispositivo")
        }
    }

    useEffect(()=>{
        pegaInfoBackend()
    }, [])
    
    return(
        <div className="w-[40vw] max-h-[88vh] overflow-y-auto bg-white text-black rounded-xl flex flex-col gap-4 p-4">
            <h2 className="text-xl font-semibold">Lista de Dispositivos</h2>
                {dispositivos.map((indice, id)=>{
                    return(
                        <div key={id} className="bg-gray-200 border-2 border-black rounded-lg p-4 ">
                            <h2 className="text-lg font-semibold">Dispositivo {indice.id} </h2>
                            <div>
                                <p>{indice.nome_dispositivo}</p>
                            </div>
                            <div className="flex gap-4">
                                <p>Senha: {indice.id_dispositivo}</p>
                                <p className="font-black"></p>
                            </div>
                            <div className="flex w-full justify-end gap-4">
                                <input
                                type="button"
                                value="Editar"
                                onClick={()=>{setModalAberto(true); userId.current = indice.id}}
                                className="rounded-lg px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
                                />
                                <input
                                type="button"
                                value="Deletar"
                                onClick={()=>{deletaDispositivo(indice.id)}}
                                className="rounded-lg px-4 py-2 bg-red-400 hover:bg-red-500 text-white cursor-pointer"
                                />
                            </div>
                        </div>
                    )
                })}
                {modalAberto && 
                    <div className="w-screen h-screen inset-0 absolute bg-gray-700/50 flex justify-center items-center">
                        <div className="w-[50vw] h-fit rounded-2xl shadow-lg bg-white flex flex-col px-6 py-4 gap-8">
                            <h2 className="text-xl font-semibold">Editar Dispositivo {userId.current}</h2>
                            <div className="flex flex-col gap-4">
                                <input
                                type="text"
                                placeholder="Novo Nome"
                                value = {novoDispositivo.nome}
                                onChange={(e)=>{pegaInfo(e, "nome")}}
                                className="p-4 rounded-lg outline-2 outline-red-500 "
                                />
                                <input
                                type="email"
                                placeholder="Novo email"
                                value = {novoDispositivo.email}
                                onChange={(e)=>{pegaInfo(e, "email")}}
                                className="p-4 rounded-lg outline-2 outline-red-500 "
                                />
                                <input
                                type="password"
                                placeholder="Nova Senha"
                                value = {novoDispositivo.senha}
                                onChange={(e)=>{pegaInfo(e, "senha")}}
                                className="p-4 rounded-lg outline-2 outline-red-500 "
                                />

                                <div className="flex gap-8 justify-end w-full">
                                    <input
                                    type="button"
                                    value="Confirmar"
                                    onClick={()=>{editarDispositivo(userId.current);setModalAberto(false)}}
                                    className="rounded-lg px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
                                    />
                                    <input
                                    type="button"
                                    value="Cancelar"
                                    onClick={()=>{setModalAberto(false)}}
                                    className="rounded-lg px-4 py-2 bg-red-400 hover:bg-red-500 text-white cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
        </div>
    )
}