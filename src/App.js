import { useEffect, useState } from "react";
import Nav from "./Components/Nav/Nav";
import Post from "./Components/Posts/Post";
import CreateModal from "./Components/CreateModal/CreateModal";
import FormCreate from "./Components/FormCreate/FormCreate";
import { IoCreateOutline, IoReturnDownBack } from "react-icons/io5";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { PublicRoutes } from "./router/Router";
import { usePosts } from "./Components/sort/SearchAndSort";
import { useFetching } from "./api/useFeetching";
import BoardServer from "./api/BoardServer";



function App() {

  const [createModal, setCreateModal] = useState(false)
  const router = useLocation()

  const routerBack = useNavigate()
  function getBack() {
    routerBack(`/board/`)
  }



  return (
    <div>
      {router.pathname === "/board/" ?
        <div onClick={setCreateModal} className="buttonNav">
          <IoCreateOutline className="buttonNav--icon" size={25} />
          <button  >Новое обращение</button>
        </div>
        :
        <div onClick={getBack} className="buttonNav">
          <IoReturnDownBack className="buttonNav--icon" style={{ marginLeft: "20px" }} size={30} />
          <button>Назад</button>
        </div>
      }
      <CreateModal visible={createModal} setVisible={setCreateModal}>
        <FormCreate setVisible={setCreateModal} />
      </CreateModal>
      <Routes>
        {PublicRoutes.map(route =>
          <Route key={route.path} path={route.path} element={route.element} exact={route.exact} />
        )}
      </Routes>
    </div>
  );

}

export default App;
