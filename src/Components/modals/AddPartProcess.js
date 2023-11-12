// CSS documents
import "animate.css"

// Redux toolkit hooks
import { useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { addNewPartProcess, deletePartProcess } from "../../features/projects/projectListSlice"

// React hooks
import { useState, useRef, useEffect } from "react"

// Components
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"
import AlertInfoModal from "./AlertInfoModal"


function AddPartProcess(props) {
  // Hooks
  const dispatch = useDispatch()


  // Local component state
  const [closeBtn, setCloseBtn] = useState(false)

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [newProcess, setNewProcess] = useState({
    name: "",
    department: "",
  })

  const [newProcessIndex, setNewProcessIndex] = useState(props.newProcessIndex + 2)

  const [estimatedTime, setEstimatedTime] = useState({
    days: 0,
    hours: 0,
    minuts: 0,
  })


  // Input values
  const newProcessValues = (event) => {
    setNewProcess({
      ...newProcess,
      [event.target.name]: event.target.value
    })
  }

  const estimatedTimeValues = (event) => {
    let value = Number(event.target.value)
    if (value < 0){
      value = 0
    }
    setEstimatedTime({
      ...estimatedTime,
      [event.target.name]: parseFloat(value).toFixed(0)
    })
  }

  
  // Close modal window
  const closeModal = () => {
    if (closeBtn){
      if (props.update){
        dispatch(changeModalStatus({
          modalName: "editProcess",
          modalStatus: false
        }))
      } else {
        dispatch(changeModalStatus({
          modalName: "newProcess",
          modalStatus: false
        }))
      }
    }
  }

  const closeWindow = () => {
    setCloseBtn(true)
  }


  // Input references
  const nameInputRef = useRef(null)
  const departmentInputRef = useRef(null)
  const daysInputRef = useRef(null)


  // Submit new process info
  const checkProcessInfo = () => {
    if (newProcess.name === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del proceso",
      })
      nameInputRef.current.focus()
      return false

    } else if (newProcess.department === "") {
      setError({
        status: true,
        message: "Ingrese el departamento encargado",
      })
      departmentInputRef.current.focus()
      return false

    } else if (
      estimatedTime.days < 1 &&
      estimatedTime.hours < 1 &&
      estimatedTime.minuts < 1
    ){
      setError({
        status: true,
        message: "Ingrese el tiempo estimado",
      })
      daysInputRef.current.focus()
      return false
    } else {
      return true
    }
  }


  // Add new process function
  const addNewProcess = () => {
    let newProcessConsturctor = {
      index: parseInt(newProcessIndex) - 1,
      ...newProcess,
      startDate: "",
      estimatedTime: {
        days: parseInt(estimatedTime.days),
        hours: parseInt(estimatedTime.hours),
        minuts: parseInt(estimatedTime.minuts)
      },
      finishDate: "",
      status: "Pendiente"
    }

    dispatch(addNewPartProcess({
      ot: props.ot,
      partId: props.partId,
      newProcess: newProcessConsturctor
    }))

    props.successFn("El proceso se agregó correctamente")

    setCloseBtn(true)
  }


  // Update process info function
  const updateProcess = () => {
    dispatch(deletePartProcess({
      ot: props.ot,
      partId: props.partId,
      processIndex: props.processInfo.index
    }))

    addNewProcess()
  }


  // Submit process information
  const submitProcessInfo = () => {
    if (!checkProcessInfo()){
      return
    }

    if (props.update) {
      updateProcess()
    } else {
      addNewProcess()
    }
  }


  // Calculate index array 
  const indexArray = () => {
    let indexArray = []

    if (props.currentProcessIndex === -1){
      for (let i = props.lastFinishedProcessIndex; i <= props.newProcessIndex; i ++){
        indexArray.push(`${i + 2}`)
      }
    } else {
      for (let i = props.currentProcessIndex; i <= props.newProcessIndex; i ++){
        indexArray.push(`${i + 2}`)
      }
    }
 
    return indexArray.reverse()
  }


  // Error modal controller
  let errorInfo;
  if (error.status) {
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
  }


  useEffect(() => {
    if (props.update){
      setNewProcessIndex(props.processInfo.index + 1)

      setNewProcess({
        name: props.processInfo.name,
        department: props.processInfo.department,
      })

      setEstimatedTime({
        days: props.processInfo.estimatedTime.days,
        hours: props.processInfo.estimatedTime.hours,
        minuts: props.processInfo.estimatedTime.minuts,
      })
    }
  }, [])


  return (
    <div
      className={`${closeBtn ? 'bg-black/0' : 'bg-black/40'} fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left`}
    >
      <div
        style={{ width: "450px" }}
        className={`text-black h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700 animate__animated ${closeBtn ? 'animate__fadeOut' : 'animate__fadeIn'} animate__faster`}
        onAnimationEnd={() => closeModal()}
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div>

        <div className="flex w-full gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Nombre del proceso</label>
            <input
              ref={nameInputRef}
              value={newProcess.name}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="name"
              type="text"
              onChange={(event) => newProcessValues(event)}
            />
          </div>

          <div className="flex flex-col w-10/12">
            <label className="font-medium">Departamento</label>
            <select
              ref={departmentInputRef}
              value={newProcess.department}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="department"
              onChange={(event) => newProcessValues(event)}
            >
              <option value={""}></option>
              <option value={"projectArea"}>Proyectos</option>
              <option value={"productionArea"}>Producción</option>
              <option value={"qualityControlArea"}>Control de calidad</option>
              <option value={"warehouseArea"}>Almacén</option>
            </select>
          </div>

          <div className="flex flex-col w-5/12">
            <label className="font-medium">Posición</label>
            <select
              value={newProcessIndex}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="department"
              onChange={(event) => setNewProcessIndex(event.target.value)}
            >
              {
                indexArray().map((processIndex) => (
                  <option
                    key={processIndex}
                    value={processIndex}
                  >
                    {processIndex}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        <label className="font-medium text-center w-full mt-1">Tiempo estimado</label>

        <div className="flex w-full gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Días</label>
            <input
              ref={daysInputRef}
              value={estimatedTime.days}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="days"
              type="number"
              onChange={(event) => estimatedTimeValues(event)}
            />
          </div>
          
          <div className="flex flex-col w-full">
            <label className="font-medium">Horas</label>
            <input
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              value={estimatedTime.hours}
              name="hours"
              type="number"
              onChange={(event) => estimatedTimeValues(event)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Minutos</label>
            <input
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              value={estimatedTime.minuts}
              name="minuts"
              type="number"
              onChange={(event) => estimatedTimeValues(event)}
            />
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Guardar" btnAction={submitProcessInfo} />
          <RedButton btnText="Cancelar" btnAction={closeWindow} />
        </div>
      </div>
    </div>
  );
}

export default AddPartProcess;
