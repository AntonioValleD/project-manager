// Redux hooks
import { useSelector, useDispatch } from "react-redux"

// Redux reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { changePartAction } from "../../features/appIndexSlice/appIndexStatusSlice"
import { 
  deletePartProcess,
  setProcessStatus,
  setProcessDate
} from "../../features/projects/projectListSlice"

// React hooks
import { useState } from "react"

// React icons import
import { AiFillEdit } from "react-icons/ai"
import { AiFillDelete } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import { IoMdCheckboxOutline } from "react-icons/io"

// Components
import { DateTime } from "luxon"
import toast, { Toaster } from 'react-hot-toast'
import rightArrowImg from '../assets/img/Flecha-w.webp'
import RedButton from "../assets/buttons/RedButton"
import AddPartProcess from "../modals/AddPartProcess"
import ConfirmationModal from "../modals/ConfirmationModal"


function PartProcess() {
  // Hooks
  const dispatch = useDispatch();

  
  // Local component state
  const [hoverProcessIndex, setHoverProcessIndex] = useState("")

  const [processToUpdate, setProcessToUpdate] = useState({})

  const [confirmationInfo, setConfirmationInfo] = useState({})


  // Reducer state
  const appIndex = useSelector(state => state.appIndex).projectWindow.find(project => project.selected === true)

  const selectedProject = useSelector(state => state.projectList).find(project => project.ot === appIndex.ot)

  const selectedPartId = appIndex.partOptions.selectedPart

  const processPath = selectedProject.parts.find(part => part.id === selectedPartId).processPath

  const currentProcess = processPath.processList.find(process => process.status === "En proceso")


  // Button functions
  const closePartProcess = () => {
    dispatch(changePartAction({
      actionName: "processPath",
      actionStatus: false
    }))
  }


  // Add new process
  const addProcess = () => {
    dispatch(changeModalStatus({
      modalName: "newProcess",
      modalStatus: true
    }))
  }


  // Edit selected process
  const editProcess = (index) => {
    setHoverProcessIndex(index)

    const selectedProcessInfo = processPath.processList.find(process => process.index === index)

    setProcessToUpdate(selectedProcessInfo)

    dispatch(changeModalStatus({
      modalName: "editProcess",
      modalStatus: true
    }))
  }


  // Delete selected process
  const deleteProcess = (processIndex) => {
    let currentProcess = processPath.processList.find(process => process.status === "En proceso")

    if (currentProcess && currentProcess.index >= processIndex){
      toast.error("Este proceso no puede ser eliminado")
      return

    } else {
      dispatch(deletePartProcess({
        ot: appIndex.ot,
        partId: selectedPartId,
        processIndex: processIndex
      }))
      toast.success("El proceso se eliminó correctamente")
    }
  }


  // Set confirmation modal window status
  const setConfirmationModal = (status) => {
    dispatch(changeModalStatus({
      modalName: "confirmationModal",
      modalStatus: status
    }))
  }


  // Start selected process
  const setStartProcess = (selectedIndex) => {
    setConfirmationInfo({
      processIndex: selectedIndex,
      textTitle: "Iniciar proceso",
      textDescription: `¿Está seguro de iniciar el proceso "${
        processPath.processList.find(process => process.index === selectedIndex).name
      }"?`,
      acceptFn: startSelectedProcess,
    })

    setConfirmationModal(true)
  }

  const startSelectedProcess = (confirmationIndex) => {
    dispatch(setProcessStatus({
      ot: appIndex.ot,
      partId: selectedPartId,
      processIndex: confirmationIndex,
      processStatus: "En proceso"
    }))

    dispatch(setProcessDate({
      ot: appIndex.ot,
      partId: selectedPartId,
      processIndex: confirmationIndex,
      processDate: "startDate"
    }))

    //setConfirmationInfo({})

    toast.success("El proceso se ha iniciado")
  }


  // Finish selected process
  const setFinishProcess = (selectedIndex) => {
    setConfirmationInfo({
      processIndex: selectedIndex,
      textTitle: "Finalizar proceso",
      textDescription: `¿Está seguro de finalizar el proceso "${
        processPath.processList.find(process => process.index === selectedIndex).name
      }"?`,
      acceptFn: finishSelectedProcess
    })

    setConfirmationModal(true)
  }

  const finishSelectedProcess = (confirmationIndex) => {
    dispatch(setProcessStatus({
      ot: appIndex.ot,
      partId: selectedPartId,
      processIndex: confirmationIndex,
      processStatus: "Finalizado"
    }))

    dispatch(setProcessDate({
      ot: appIndex.ot,
      partId: selectedPartId,
      processIndex: confirmationIndex,
      processDate: "finishDate"
    }))

    //setConfirmationInfo({})

    toast.success("El proceso se ha finalizado")
  }


  // Date object formater
  const formatDateObject = (date) => {
    let days = ""
    let hours = ""
    let minuts = ""

    if (date.days > 0){
      days = `${date.days} días `
    }

    if (date.hours > 0){
      hours = `${date.hours} horas `
    }

    if (date.minuts > 0){
      minuts = `${date.minuts} minutos`
    }

    return days + hours + minuts
  }


  // Success notification
  const successFn = (message) => {
    toast.success(message)
  }


  // Obtain current process index
  const currentProcessIndex = () => {
    if (currentProcess){
      return currentProcess.index
    } else {
      return -1
    }
  }


  // Obtain current process index
  const lastFinishedProcessIndex = () => {
    let index = -1

    processPath.processList.forEach((process) => {
      if (process.status === "Finalizado"){
        index ++
      }
    })

    return index
  }


  // Modal window selector
  const modalStatus = useSelector(state => state.modalStatus)
  let modalWindow

  if (modalStatus.newProcess){
    modalWindow = <AddPartProcess
      textTitle="Añadir proceso"
      successFn={successFn}
      newProcessIndex={processPath.processList.length - 1}
      currentProcessIndex={currentProcessIndex()}
      lastFinishedProcessIndex={lastFinishedProcessIndex()}
      ot={appIndex.ot}
      partId={selectedPartId}
    />

  } else if (modalStatus.editProcess){
    modalWindow = <AddPartProcess
      textTitle="Editar proceso"
      successFn={successFn}
      newProcessIndex={processPath.processList.length - 2}
      currentProcessIndex={currentProcessIndex()}
      lastFinishedProcessIndex={lastFinishedProcessIndex()}
      ot={appIndex.ot}
      partId={selectedPartId}
      update={true}
      processInfo={processToUpdate}
    />

  } else if (modalStatus.confirmationModal){
    modalWindow = <ConfirmationModal
      processIndex={confirmationInfo.processIndex}
      textTitle={confirmationInfo.textTitle}
      textDescription={confirmationInfo.textDescription}
      acceptFn={confirmationInfo.acceptFn}
    />
  }


  return (
    <div className="flex flex-col gap-y-5 w-full pt-2">

      {modalWindow}

      <Toaster
        toastOptions={{
          position: "top-center",
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '2px',
          },
        }}
      />

      <button
        title="Añadir proceso"
        className="fixed bottom-10 right-10 flex items-center justify-center text-white text-3xl rounded-full bg-green-900 h-12 w-12 pb-1 hover:bg-green-700 cursor-pointer"
        onClick={() => addProcess()}
      >
        +
      </button>

      <div className="absolute left-1 top-10 mt-1">
        <RedButton
          btnText="Regresar"
          btnAction={closePartProcess}
        />
      </div>

      <div 
        className="flex flex-wrap gap-y-5 justify-start items-center"
        style={{minHeight: "272px"}}
      >
        <label 
          className="h-28 w-28 bg-purple-800 text-white text-xl rounded-full flex justify-center items-center"
        >
          Inicio
        </label>

        {processPath.processList.map(process => (
          <div
            key={process.index}
            className="flex justify-start items-center"
          >
            <img
              alt="arrow"
              className="h-5"
              src={rightArrowImg}
            />

            <div 
              className={`flex flex-col ${process.status === "Pendiente" ? 'bg-gray-700 hover:bg-gray-600' : process.status === "En proceso" ? 'bg-green-700 hover:bg-green-600' : process.status === 'Finalizado' ? 'bg-purple-800 hover:bg-purple-700': 'bg-gray-700 hover:bg-gray-600'} gap-y-1 p-2 rounded text-white`}
              style={{maxWidth: "260px", minWidth: "190px"}}
              onMouseEnter={() => setHoverProcessIndex(process.index)}
              onMouseLeave={() => setHoverProcessIndex("")}
            >
              <div
                className="flex flex-col"
              >
                <label
                  className="px-2 flex justify-between"
                >
                  {`Proceso ${process.index + 1}:`}
                  {
                    process.index === hoverProcessIndex ?
                    <div
                      className="flex gap-x-1"
                    >
                      {
                        currentProcessIndex() === process.index ?
                        <label
                          title="Finalizar proceso"
                          className="hover:text-green-300 cursor-pointer"
                          onClick={() => setFinishProcess(process.index)}
                        >
                          <IoMdCheckboxOutline/>
                        </label> : lastFinishedProcessIndex() < process.index ?
                        <>
                          {
                            currentProcessIndex() < process.index - 1 ?
                            <label
                              title="Iniciar proceso"
                              className="hover:text-green-300 cursor-pointer"
                              onClick={() => setStartProcess(process.index)}
                            >
                              <BsFillPlayFill/>
                            </label> :
                            ""
                          }
                        </> :
                        ""
                      }
                      {
                        lastFinishedProcessIndex() < process.index ?
                        <>
                          {
                            currentProcessIndex() < process.index ?
                            <label
                              title="Editar proceso"
                              className="hover:text-yellow-300 cursor-pointer"
                              onClick={() => editProcess(process.index)}
                            > 
                              <AiFillEdit/>
                            </label> :
                            ""
                          }
                        </> :
                        ""
                      }
                      {
                        lastFinishedProcessIndex() < process.index ?
                        <>
                          {
                            currentProcessIndex() < process.index ?
                            <label
                              title="Eliminar proceso"
                              className="hover:text-red-400 cursor-pointer"
                              onClick={() => deleteProcess(process.index)}
                            >
                              <AiFillDelete/>
                            </label> :
                            ""
                          }
                        </> :
                        ""
                      }
                    </div> :
                    ""
                  }
                </label>
                <label
                  className="bg-gray-800/50 text-center px-3 rounded whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {process.name}
                </label>
              </div>

              <div
                className="flex flex-col"
              >
                <label
                  className="px-2"
                >
                  Departamento:
                </label>
                <label
                  className="bg-gray-800/50 text-center px-3 rounded"
                >
                  {
                    process.department === "projectArea" ? "Proyectos":
                    process.department === "productionArea" ? "Producción":
                    process.department === "qualityControlArea" ? "Control de calidad":
                    process.department === "warehouseArea" ? "Almacén":
                    ""
                  }
                </label>
              </div>

              <div
                className="flex flex-col"
              >
                <label
                  className="px-2"
                >
                  Tiempo estimado:
                </label>
                <label
                  className="bg-gray-800/50 text-center px-3 rounded"
                >
                  {formatDateObject(process.estimatedTime)}
                </label>
              </div>

              <div
                className="flex flex-col"
              >
                <label
                  className="px-2"
                >
                  Fecha de inicio:
                </label>
                <label
                  className="bg-gray-800/50 text-center px-3 rounded"
                >
                  {
                    process.startDate === "" ?
                    "N/A" :
                    DateTime.fromISO(process.startDate).toLocaleString(DateTime.DATETIME_MED)
                  }
                </label>
              </div>

              <div
                className="flex flex-col"
              >
                <label
                  className="px-2"
                >
                  Fecha de fin:
                </label>
                <label
                  className="bg-gray-800/50 text-center px-3 rounded"
                >
                  {
                    process.finishDate === "" ?
                    "N/A" :
                    DateTime.fromISO(process.finishDate).toLocaleString(DateTime.DATETIME_MED)
                  }
                </label>
              </div>
            </div>
          </div>
        ))}
        <img
          alt="arrow"
          className="h-5"
          src={rightArrowImg}
        />
        <label 
          className="h-28 w-28 bg-gray-700 text-white text-xl rounded-full flex justify-center items-center"
        >
          Fin
        </label>
      </div>
    </div>
  );
}

export default PartProcess;
