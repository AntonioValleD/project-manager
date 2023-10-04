import "animate.css"
import { useSelector, useDispatch } from "react-redux"
import { useState, useRef } from "react"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { addMachine } from "../../features/machines/machineSlice"
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"
import AlertInfoModal from "./AlertInfoModal"


function NewMachineModal(props) {
  // Hooks
  const dispatch = useDispatch()


  // Local component state
  const [error, setError] = useState({
    status: false,
    message: '',
  })

  const [closeBtn, setClosebtn] = useState(false)


  // New machine information state
  const [machineName, setMachineName] = useState("")

  const [machineInfo, setMachineInfo] = useState({
    brand: "",
    model: "",
    machiningType: "",
    technology: "",
    operatorName: "",
    registerDate: "",
  })

  // Input values
  const machineInfoValues = (event) => {
    setMachineInfo({
      ...machineInfo,
      [event.target.name]: event.target.value
    })
  }


  /* Funtions */
  const closeModal = () => {
    if (closeBtn){
      dispatch(changeModalStatus({
        modalName: "newMachine",
        modalStatus: false,
      }))
    }
  }

  const closeWindow = () => {
    setClosebtn(true)
  }


  // Machine list information
  const machineList = useSelector(state => state.machineList)

  const checkMachineIfExists = () => {
    const foundMachine = machineList.find(machine => machine.name === machineName)
    if (foundMachine){
      return true
    } else {
      return false
    }
  }


  // Input references
  const nameInputRef = useRef(null)
  const brandInputRef = useRef(null)
  const modelInputRef = useRef(null)
  const machinignTypeInputRef = useRef(null)
  const technologyInputRef = useRef(null)
  const operatorNameInputRef = useRef(null)


  // Submit new part info
  const checkMachineInfo = () => {
    if (machineName === "") {
      setError({
        status: true,
        message: "Ingrese el nombre de la máquina"
      })
      nameInputRef.current.focus()
      return false

    } else if (machineInfo.brand === "") {
      setError({
        status: true,
        message: "Ingrese la marca de la máquina"
      })
      brandInputRef.current.focus()
      return false

    } else if (machineInfo.model === "") {
      setError({
        status: true,
        message: "Ingrese el modelo de la máquina"
      })
      modelInputRef.current.focus()
      return false

    } else if (checkMachineIfExists()) {
      setError({
        status: true,
        message: "El nombre de máquina ingresado ya existe"
      })
      nameInputRef.current.focus()
      return false

    } else if (machineInfo.machiningType === "") {
      setError({
        status: true,
        message: "Especifique el tipo de máquina"
      })
      machinignTypeInputRef.current.focus()
      return false

    } else if (machineInfo.technology === "") {
      setError({
        status: true,
        message: "Especifique la tecnologia de la máquina"
      })
      technologyInputRef.current.focus()
      return false

    } else if (machineInfo.operatorName === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del operario de la máquia"
      })
      operatorNameInputRef.current.focus()
      return false

    } else {
      return true
    }
  }


  // Submit part info
  const submitMachineInfo = () => {
    if (!checkMachineInfo()){
      return
    } else {
      if (props.update){
        console.log("Actualizar maquina")
      } else {
        addNewMachine()
      }
    }
  }


  // Add new part function
  const addNewMachine = () => {
    let newMachine = {
      name: machineName,
      machineInfo: {...machineInfo},
      machineStatus: {
        running: false
      },
      productionInfo: {},
      productionTiming: {status: "Sin revisar", unitList: []},
      materialRequest: {status: "Sin solicitar", requestList: []},
    }

    dispatch(addMachine({
      newMachine: newMachine
    }))

    props.successFn("La pieza se guardó correctamente!")

    closeWindow()
  }


  // Update part info function
  // const updatePart = () => {
  //   let totalParts = 0
  //   partList.forEach((part) => {
  //       totalParts += parseInt(part.quantity)
  //   })
  //   totalParts += parseInt(newPart.quantity)
  //   totalParts -= parseInt(props.partInfo.quantity)
  //   dispatch(editProject({
  //     ot: selectedOt,
  //     project: {
  //       partsQuantity: totalParts.toString()
  //     }
  //   }))
  //   dispatch(updatePartInfo({
  //     ot: selectedOt,
  //     newPart: newPart,
  //   }))

  //   props.successFn("La información se actualizó correctamente!")
  //   dispatch(changeModalStatus({
  //     modalName: "newPart",
  //     modalStatus: false,
  //   }))
  // }


  // Error modal controller
  let errorInfo;
  if (error.status){
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
  }


  // Edit project info controller
  // useEffect(() => {
  //   if (props.partInfo){
  //     setNewPart({
  //       selected: false,
  //       id: props.partInfo.id,
  //       partName: props.partInfo.partName,
  //       material: props.partInfo.material,
  //       quantity: props.partInfo.quantity,
  //       assembly: props.partInfo.assembly,
  //       type: props.partInfo.type,
  //       dimentionUnits: props.partInfo.dimentionUnits,
  //       generalDimentions: props.partInfo.generalDimentions,
  //       materialDimentions: props.partInfo.materialDimentions,
  //     })
  //   }
  // },[props.partInfo])


  return (
    <div
      className={`${closeBtn ? 'bg-black/0' : 'bg-black/40'} fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left`}
    >
      <div
        style={{ width: "500px" }}
        className={`text-black h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700 animate__animated ${closeBtn ? 'animate__fadeOut' : 'animate__fadeIn'} animate__faster`}
        onAnimationEnd={() => closeModal()}
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex w-full gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Nombre</label>
            <input
              ref={nameInputRef}
              value={machineName}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              type="text"
              onChange={(event) => setMachineName(event.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Tipo</label>
            <input
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              ref={machinignTypeInputRef}
              value={machineInfo.machiningType}
              name="machiningType"
              type="text"
              onChange={(event) => machineInfoValues(event)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-full">
            <label className="font-medium">Marca</label>
            <input
              type="text"
              value={machineInfo.brand}
              ref={brandInputRef}
              name="brand"
              onChange={(event) => machineInfoValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Modelo</label>
            <input
              type="text"
              value={machineInfo.model}
              ref={modelInputRef}
              name="model"
              onChange={(event) => machineInfoValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
          </div>
          <div className="flex flex-col w-11/12">
            <label className="font-medium">Tecnología</label>
            <select
              ref={technologyInputRef}
              value={machineInfo.technology}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="technology"
              onChange={(event) => machineInfoValues(event)}
            >
              <option value={"empty"}></option>
              <option value={"in"}>Convencional</option>
              <option value={"ft"}>CNC</option>
            </select>
          </div>
        </div>

        <div className="flex gap-x-4 justify-between mb-1">
          <div className="flex flex-col w-3/4">
            <label className="font-medium">Nombre del operario</label>
            <input
              type="text"
              value={machineInfo.operatorName}
              ref={operatorNameInputRef}
              name="operatorName"
              onChange={(event) => machineInfoValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Guardar" btnAction={submitMachineInfo} />
          <RedButton btnText="Cancelar" btnAction={closeWindow} />
        </div>
      </div>
    </div>
  );
}

export default NewMachineModal;