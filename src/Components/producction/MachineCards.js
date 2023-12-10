// Hook import
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

// Redux toolkit reducer import
import { addMachineTab } from "../../features/machine_tabs/machineTabsSlice"
import { openMachine } from "../../features/appIndexSlice/appIndexStatusSlice"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"

// React icons import
import { AiFillEdit } from "react-icons/ai"
import { AiFillDelete } from "react-icons/ai"

// Component import
import toast, { Toaster } from 'react-hot-toast'
import NewMachineModal from "../modals/NewMachineModal"
import DeleteMachineModal from "../modals/DeleteMachineModal"


function MachineCards() {
  // Hooks
  const dispatch = useDispatch()
  const machineList = useSelector(state => state.machineList)

  const windowStatus = useSelector(state => state.selectedWindow).production

  
  // Local component state
  const [counter, setCounter] = useState(0)

  const [hoverMachineName, setHoverMachineName] = useState("")

  const [hoverMachineInfo, setHoverMachineInfo] = useState({})

  const [selectedMachineName, setSelectedMachineName] = useState("")

  const [deleteName, setDeleteName] = useState("")


  const [windowResolution, setWindowResolution] = useState({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight
  })

  const [cardSize, setCardSize] = useState({
    width: ""
  })


  // Double click function
  const openNewMachine = (machineName) => {
    dispatch(addMachineTab(machineName))

    dispatch(openMachine({
      machineName: machineName
    }))
  }


  // Add new machine
  const addNewMachine = () => {
    dispatch(changeModalStatus({
      modalName: "newMachine",
      modalStatus: true,
    }))
  }


  // Resize event listener
  const handleResize = () => {
    setWindowResolution({
      width: window.document.documentElement.clientWidth,
      height: window.document.documentElement.clientHeight
    })

    setCardSize({
      ...cardSize,
      width: `${cardWidthCalc()}px`,
    })
  }


  // Success function
  const successMessage = (message) => {
    toast.success(message)
  }


  // Edit machine info
  const editMachineInfo = (mName) => {
    const selectedMachineInfo = machineList.find(machine => machine.name === hoverMachineName).machineInfo

    setSelectedMachineName(mName)

    setHoverMachineInfo({
      ...selectedMachineInfo
    })

    dispatch(changeModalStatus({
      modalName: "editMachineInfo",
      modalStatus: true
    }))
  }


  // Delete machine function
  const deleteMachine = (machineName) => {
    setDeleteName(machineName)
    dispatch(changeModalStatus({
      modalName: "deleteMachine",
      modalStatus: true,
    }))
  }


  // Cards width calculator
  const cardWidthCalc = () => {
    let cardColumns = parseInt(windowResolution.width / 265)
    const realCardSize = (windowResolution.width - ((cardColumns - 1) * 8) - 20) / cardColumns

    const roundedCardSize = parseInt(realCardSize)

    return roundedCardSize
  }


  // Modal window selector
  let modalWindow
  const modalStatus = useSelector(state => state.modalStatus)
  if (modalStatus.newMachine){
    modalWindow = <NewMachineModal
      textTitle="Nueva máquina"
      successFn={successMessage}
    />
  } else if (modalStatus.deleteMachine){
    modalWindow = <DeleteMachineModal
      successFn={successMessage}
      machineName={deleteName}
    />
  } else if (modalStatus.editMachineInfo){
    modalWindow = <NewMachineModal
      update={true}
      textTitle="Editar máquina"
      successFn={successMessage}
      machineName={selectedMachineName}
      machineInfo={hoverMachineInfo}
    />
  }
  

  // useEffect(() => {
  //   let cronometer = null
  //   setCounter(0)
  //   if (windowStatus){
  //     cronometer = setInterval(() => {
  //       setCounter(1)
  //     }, 1000)
  //   }

  //   return () => {
  //     clearInterval(cronometer)
  //   }
  // }, [counter, windowStatus])


  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth])

  


  return (
    <div className="flex flex-wrap justify-start gap-x-2 gap-y-2 mt-1">
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

      {modalWindow}

      <label
        title="Nueva máquina"
        className="fixed bottom-10 right-10 flex items-center justify-center text-white
          text-3xl rounded-full bg-green-900 h-12 w-12 pb-1 hover:bg-green-600 cursor-pointer"
        onClick={() => addNewMachine()}
      >
        +
      </label>

      {machineList.map((machine) => (
        <div
          key={machine.name}
          className="text-black p-2 rounded-sm h-fit text-center bg-gray-800 hover:bg-gray-600
            select-none transition-all duration-75"
          onDoubleClick={() => openNewMachine(machine.name)}
          onMouseEnter={() => setHoverMachineName(machine.name)}
          onMouseLeave={() => setHoverMachineName("")}
          style={{ width: cardSize.width }}
        >
          <div
            className="flex items-center text-l text-white justify-center"
          >
            <label className="h-5 flex justify-end">
              {(machine.name).toUpperCase()}
            </label>
            {
              machine.name === hoverMachineName ?
              <div
                className="flex justify-end items-center gap-x-1 absolute"
                style={{marginLeft: `${parseInt(parseInt(cardSize.width) / 1.24)}px`}}
              >
                <label
                  title="Editar información de máquina"
                  className="hover:text-yellow-200 cursor-pointer"
                  onClick={() => editMachineInfo(machine.name)}
                >
                  <AiFillEdit/>
                </label>
                <label
                  title="Eliminar máquina"
                  className="hover:text-red-300 cursor-pointer"
                  onClick={() => deleteMachine(machine.name)}
                >
                  <AiFillDelete/>
                </label>
              </div> :
              ""
            }
          </div>

          <div
            className="flex mt-px gap-x-2"
          >
            <div 
              className="flex flex-col w-full"
            >
              <label className="text-white">Pieza actual</label>
              <label
                className="bg-white font-semibold rounded-sm whitespace-nowrap
                  overflow-hidden text-ellipsis"
              >
                {machine.parts.find(part => part.status === "En proceso") ? 
                  machine.parts.find(part => part.status === "En proceso").name : "N/A"}
              </label>
            </div>

            <div className="flex flex-col w-5/12">
              <label className="text-white">O.T.</label>
              <label
                className="bg-white text-black font-semibold pl-1 rounded-sm
                  whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {machine.parts.find(part => part.status === "En proceso") ? 
                  machine.parts.find(part => part.status === "En proceso").ot : "N/A"}
              </label>
            </div>

          </div>

          <div
            className="flex gap-x-2"
          >
            <div 
              className="flex flex-col w-5/12"
            >
              <label className="text-white">Cantidad</label>
              <label
                className="bg-white font-semibold rounded-sm whitespace-nowrap
                  overflow-hidden text-ellipsis"
              >
                {machine.parts.find(part => part.status === "En proceso") ? 
                  machine.parts.find(part => part.status === "En proceso").quantity : "N/A"}
              </label>
            </div>

            <div 
              className="flex flex-col w-5/12"
            >
              <label className="text-white">Terminadas</label>
              <label
                className="bg-white font-semibold rounded-sm whitespace-nowrap
                  overflow-hidden text-ellipsis"
              >
                {machine.parts.find(part => part.status === "En proceso") ? 
                  machine.parts.find(part => part.status === "En proceso").finishedParts : "N/A"}
              </label>
            </div>

            <div 
              className="flex flex-col w-full"
            >
              <label className="text-white">Tiempo</label>
              <label
                className="bg-white font-semibold rounded-sm"
              >
                {"00:00:00"}
              </label>
            </div>
          </div>

          <label 
            className="flex justify-center text-l mt-1 font-bold text-white"
          >
            Producción total
          </label>

          <div
            className="flex justify-between w-full gap-x-2"
          >
            <div className="flex flex-col w-7/12">
              <label className="text-white">Piezas</label>
              <label
                className="bg-white font-semibold rounded-sm "
              >
                {10}
              </label>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-white">Tiempo</label>
              <label
                className="bg-white font-semibold rounded-sm"
              >
                { 
                  "00:00:00"
                }
              </label>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-white">Muerto</label>
              <label
                className="bg-white font-semibold w-full rounded-sm"
              >
                {
                  "00:00:00"
                }
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MachineCards;
