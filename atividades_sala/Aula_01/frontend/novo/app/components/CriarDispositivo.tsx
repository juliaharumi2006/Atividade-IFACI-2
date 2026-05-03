"use client"
import {useState, ChangeEvent} from "react"
import SideBar from "./SideBar"

export default function CriarDispositivo(){
    const [novoDispositivo, setNovoDispositivo] = useState({
        nome_completo: "",
        email: "",
        senha: ""
    })

    const pegaInfo = (e: ChangeEvent<HTMLInputElement>, where: string)=>{
         const value = e.target.value

        if (where === "nome") {
            setNovoDispositivo({
                ...novoDispositivo,
                nome_completo: value
            })
        }
        else if (where === "email") {
            setNovoDispositivo({
                ...novoDispositivo,
                email: value
            })
        }
        else {
            setNovoDispositivo({
                ...novoDispositivo,
                senha: value
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
        
        <div>
            <SideBar/>
            <div className="w-[40vw] ml-[15vw] flex flex-col gap-4 rounded-xl max-h-fit bg-white text-black p-4">
            
                <h2 className="text-lg font-semibold">Criar Novo Dispositivo</h2>

                <input
                type="text"
                placeholder="Nome Completo"
                value = {novoDispositivo.nome_completo}
                onChange={(e)=>{pegaInfo(e, "nome")}}
                className="p-4 rounded-lg outline-2 outline-red-500 "
                />
                <input
                type="email"
                placeholder="email@email.com"
                value = {novoDispositivo.email}
                onChange={(e)=>{pegaInfo(e, "email")}}
                className="p-4 rounded-lg outline-2 outline-red-500 "
                />
                <input
                type="password"
                placeholder="Crie uma senha"
                value = {novoDispositivo.senha}
                onChange={(e)=>{pegaInfo(e, "senha")}}
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