import "animate.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { deleteMachine } from "../../features/machines/machineSlice"
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"


function DeleteMachineModal(props) {
  // Hooks
  const dispatch = useDispatch()


  // Local component state
  const [closeBtn, setClosebtn] = useState(false)


  /* Funtions */
  const aceptButton = () => {
    dispatch(deleteMachine({
      machineName: props.machineName
    }))

    props.successFn("La máquina se eliminó correctamente")
    setClosebtn(true)
  }

  const cancelDelete = () => {
    setClosebtn(true)
  }


  const closeModalWindow = () => {
    if (closeBtn){
      dispatch(changeModalStatus({
        modalName: 'deleteMachine',
        modalStatus: false
      }))
    }
  }


  return (
    <div
      title="Overlay"
      className={`${closeBtn ? 'bg-black/0' : 'bg-black/30'} fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center`}
    >
      <div
        title="Modal Container"
        style={{ width: "500px" }}
        className={`h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700 animate__animated animate__faster ${closeBtn ? 'animate__fadeOut' : 'animate__fadeIn'}`}
        onAnimationEnd={() => closeModalWindow()}
      >
        <div className="flex justify-center text-xl font-semibold mb-2">
          <label>Eliminar máquina</label>
        </div>

        <div className="flex justify-center text-lg font-regular">
          <label className="text-center">¿Esta seguro de que desea eliminar la máquia seleccionada?</label>
        </div>

        <div className="flex justify-center gap-x-4 mt-3">
          <GreenButton btnText="Aceptar" btnAction={aceptButton} />
          <RedButton btnText="Cancelar" btnAction={cancelDelete} />
        </div>
      </div>
    </div>
  );
}

export default DeleteMachineModal
