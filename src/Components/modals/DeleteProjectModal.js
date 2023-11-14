// React hooks
import { useState } from "react"

// Redux toolkit hooks
import { useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { deleteProject } from "../../features/projects/projectListSlice"

// CSS documents
import "animate.css"

// Components
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"


function DeleteProjectModal(props) {
  // Hooks
  const dispatch = useDispatch()


  // Local component state
  const [closeBtn, setCloseBtn] = useState(false)


  /* Funtions */
  const aceptButton = () => {
    dispatch(deleteProject(props.ot))

    props.successFn("El proyecto se ha eliminado correctamente!")

    closeWindow()
  }

  const closeModal = () => {
    if (closeBtn) {
      dispatch(changeModalStatus({
        modalName: 'deleteProject', 
        modalStatus: false
      }))
    }
  }


  const closeWindow = () => {
    setCloseBtn(true)
  }


  return (
    <div
      className={`${closeBtn ? 'bg-black/0' : 'bg-black/40'} fixed w-screen h-screen
        top-0 right-0 z-10 flex items-center justify-center text-left`}
    >
      <div
        style={{ width: "500px" }}
        className={`h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700
        text-black animate__animated ${closeBtn ? 'animate__fadeOut' : 'animate__fadeIn'} animate__faster`}
        onAnimationEnd={() => closeModal()}
      >
        <div className="flex justify-center text-xl font-semibold mb-2">
          <label>Eliminar proyecto</label>
        </div>

        <div className="flex justify-center text-lg font-regular">
          <label className="text-center">¿Esta seguro de que desea eliminar el proyecto seleccionado?</label>
        </div>

        <div className="flex justify-center gap-x-4 mt-3">
          <GreenButton btnText="Aceptar" btnAction={aceptButton} />
          <RedButton btnText="Cancelar" btnAction={closeWindow} />
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
