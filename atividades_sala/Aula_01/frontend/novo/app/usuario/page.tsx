import CriarUsuario from "../components/CriarUsuario"
import ListarUsuario from "../components/ListarUsuario"
import Sidebar from "../components/SideBar"

export default function PageUsuario(){
  return(
    <div>
      <div className="flex gap-6 p-4">
        <Sidebar/>
        <CriarUsuario/>
        <ListarUsuario/>
      </div>
    </div>
  )
}