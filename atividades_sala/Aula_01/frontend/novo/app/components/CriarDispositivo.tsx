"use client"
import {useState, ChangeEvent} from "react"
import SideBar from "./SideBar"

export default function CriarDispositivo(){
    const [novoDispositivo, setNovoDispositivo] = useState({
        nome_sensor: "",
        id_sensor: "",
        status_sensor: ""
    })

    const pegaInfo = (e: ChangeEvent<HTMLInputElement>, where: string)=>{
         const value = e.target.value

        if (where === "nome") {
            setNovoDispositivo({
                ...novoDispositivo,
                nome_sensor: value
            })
        }
        else if (where === "id") {
            setNovoDispositivo({
                ...novoDispositivo,
                id_sensor: value
            })
        }
        else {
            setNovoDispositivo({
                ...novoDispositivo,
                status_sensor: value
            })
        }
    }

    const criarDispositivo = async ()=>{
        //Promise -> Promessa
        const url = 'http://localhost:8080/novoSensor'
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
        
        <div>
            <SideBar/>
            <div className="w-[40vw] flex flex-col gap-4 rounded-xl max-h-fit bg-white text-black p-4">
            
                <h2 className="text-lg font-semibold">Criar Novo Dispositivo</h2>

                <input
                type="text"
                placeholder="Nome do Dispositivo"
                value = {novoDispositivo.nome_sensor}
                onChange={(e)=>{pegaInfo(e, "nome")}}
                className="p-4 rounded-lg outline-2 outline-red-500 "
                />
                <input
                type="text"
                placeholder="ID do Dispositivo"
                value = {novoDispositivo.id_sensor}
                onChange={(e)=>{pegaInfo(e, "id")}}
                className="p-4 rounded-lg outline-2 outline-red-500 "
                />
                <input
                type="text"
                placeholder="Status do Dispositivo"
                value = {novoDispositivo.status_sensor}
                onChange={(e)=>{pegaInfo(e, "status")}}
                className="p-4 rounded-lg outline-2 outline-red-500 "
                />

                <input
                type="submit"
                value="Enviar"
                onClick={criarDispositivo}
                className="py-2 px-4 text-white rounded-lg hover:bg-red-500 bg-red-400"
                />
            </div>
        </div>
        
    )
}