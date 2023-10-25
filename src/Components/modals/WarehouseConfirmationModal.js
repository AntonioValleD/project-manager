// Redux toolkit hooks
import { useDispatch } from "react-redux"

// React hooks 
import { useState } from "react"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { setRequestDate, cancelMaterialRequest } from "../../features/projects/projectListSlice"

// Components
import GreenButton from "../assets/buttons/GreenButton"
import RedButton from "../assets/buttons/RedButton"


function WarehouseConfirmationModal(props) {
  // Hooks
  const dispatch = useDispatch()


  // Local component state
  const [closeBtn, setCloseBtn] = useState(false)


  /* Funtions */
  const acceptFn = () => {
    if (props.requestDate !== "cancelRequest"){
      dispatch(setRequestDate({
        ot: props.ot,
        partId: props.partId,
        requestId: props.requestId,
        requestDate: props.requestDate,
        requestStatus: props.requestStatus,
      }))
    } else {
      dispatch(cancelMaterialRequest({
        ot: props.ot,
        partId: props.partId,
        requestId: props.requestId,
      }))
    }

    props.successFn(props.successMessage)

    closeWindow()
  }

  const closeModal = () => {
    if (closeBtn){
      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
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
        className={`text-black h-fit relative rounded-sm p-4 bg-white shadow-xl
          shadow-gray-700 animate__animated animate__faster
          ${closeBtn ? 'animate__fadeOut' : 'animate__fadeIn'}`}
        onAnimationEnd={() => closeModal()}
      >
        <div className="flex justify-center text-xl font-semibold mb-2">
          <label>{props.textTitle}</label>
        </div>

        <div className="flex justify-center text-lg font-regular">
          <label className="text-center">
            {props.textDescription}
          </label>
        </div>

        <div className="flex justify-center gap-x-4 mt-3">
          <GreenButton
            btnText="Aceptar"
            btnAction={acceptFn}
          />
          <RedButton btnText="Cerrar" btnAction={closeWindow} />
        </div>
      </div>
    </div>
  );
}

export default WarehouseConfirmationModal;
