// Redux toolkit hooks
import { useSelector, useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { 
  changeMaterialRequestStatus, 
  addMaterialRequest,
  changePartLocation
} from "../../features/projects/projectListSlice"

// React hooks
import { useState, useRef } from "react"

// Components
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from "luxon"
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"
import AlertInfoModal from "./AlertInfoModal"


function RequestMaterialModal(props) {
  // Hooks
  const dispatch = useDispatch()


  // Project info and part info
  const selectedProjectIndex = useSelector(state => state.appIndex).projectWindow
    .find(project => project.selected === true)

  const selectedOt = selectedProjectIndex.ot

  const partId = selectedProjectIndex.partOptions.selectedPart


  // Redux toolkit state
  const userInfo = useSelector(state => state.appConfig).userInfo


  // Local state
  const [closeBtn, setCloseBtn] = useState(false)

  const [error, setError] = useState({
    status: false,
    message: '',
  })

  const [materialRequest, setMaterialRequest] = useState({
    material: props.partInfo.material,
    generalDimetions: props.partDimentions.generalDimentions,
    materialDimentions: props.partDimentions.materialDimentions,
    units: props.partDimentions.units,
    quantity: props.partInfo.quantity,
  })


  // Input values
  const inputValues = (event) => {
    setMaterialRequest({
      ...materialRequest,
      [event.target.name]: event.target.value,
    })
  }


  // Close modal window 
  const closeModal = () => {
    if (closeBtn){
      dispatch(
        changeModalStatus({
          modalName: "requestMaterial",
          modalStatus: false,
        })
      )
    }
  }

  const closeWindow = () => {
    setCloseBtn(true)
  }


  // Submit new part info
  const checkRequestInfo = () => {
    if (materialRequest.material === "") {
      setError({
        status: true,
        message: "Ingrese el material de la pieza"
      })
      materialInputRef.current.focus()
      return false

    } else if (materialRequest.generalDimetions === "") {
      setError({
        status: true,
        message: "Ingrese las dimensiones generales de la pieza"
      })
      generalDimentionsInputRef.current.focus()
      return false

    } else if (materialRequest.materialDimentions === "") {
      setError({
        status: true,
        message: "Ingrese las dimensiones del material"
      })
      materialDimentionsInputRef.current.focus()
      return false

    } else if (materialRequest.units === "") {
      setError({
        status: true,
        message: "Ingrese las unidades del material"
      })
      unitsInputRef.current.focus()
      return false

    } else if (materialRequest.quantity === "") {
      setError({
        status: true,
        message: "Ingrese la cantidad a solicitar"
      })
      quantityInputRef.current.focus()
      return false

    } else {
      return true
    }
  }


  // Sumbit material request
  const submitNewRequest = () => {
    if (checkRequestInfo()){
      if (props.update){
        console.log("Actualizar")
      } else {
        addNewMaterialRequest()
      }
    }
  }


  // Add new material request
  const addNewMaterialRequest = () => {
    let materialRequestConstructor = {
      id: uuidv4(),
      userName: `${userInfo.name} ${userInfo.lastName}`,
      status: "Solicitado",
      userRequestDate: DateTime.local().toString(),
      warehouseRequestDate: "",
      warehouseArrivalDate: "",
      userDeliveryDate: "",
      ...materialRequest
    }

    dispatch(addMaterialRequest({
      ot: selectedOt,
      partId: partId,
      newMaterialRequest: materialRequestConstructor
    }))

    props.successFn("El material ha sido solicitado")

    setCloseBtn(true)
  }


  // Update part info function
  const updateRequest = () => {
    console.log("Update request")
  }


  // Input references
  const materialInputRef = useRef(null)
  const quantityInputRef = useRef(null)
  const unitsInputRef = useRef(null)
  const generalDimentionsInputRef = useRef(null)
  const materialDimentionsInputRef = useRef(null)


  // Error modal controller
  let errorInfo;
  if (error.status){
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
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
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-10/12">
            <label className="font-medium">Material</label>
            <input
              type="text"
              className="border-blue-950 border-2 px-1 font-regular rounded-sm text-center bg-gray-100"
              name="material"
              value={materialRequest.material}
              onChange={(event) => inputValues(event)}
              ref={materialInputRef}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Dimensiones generales</label>
            <input
              type="text"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm text-center bg-gray-100"
              name="generalDimentions"
              value={materialRequest.generalDimetions}
              onChange={(event) => inputValues(event)}
              ref={generalDimentionsInputRef}
            />
          </div>
        </div>

        <div className="flex gap-x-4 justify-between mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Dimensiones del material</label>
            <input
              type="text"
              value={materialRequest.materialDimentions}
              ref={materialDimentionsInputRef}
              name="materialDimentions"
              onChange={(event) => inputValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm text-center"
            />
          </div>
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Unidades</label>
            <select
              ref={unitsInputRef}
              value={materialRequest.units}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="units"
              onChange={(event) => inputValues(event)}
            >
              <option value={"empty"}></option>
              <option value={"in"}>in</option>
              <option value={"ft"}>ft</option>
              <option value={"mm"}>mm</option>
              <option value={"cm"}>cm</option>
              <option value={"m"}>m</option>
            </select>
          </div>
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Cantidad</label>
            <input
              ref={quantityInputRef}
              value={materialRequest.quantity}
              type="number"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm text-center"
              name="quantity"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Solicitar" btnAction={submitNewRequest} />
          <RedButton btnText="Cancelar" btnAction={closeWindow} />
        </div>
      </div>
    </div>
  );
}

export default RequestMaterialModal;