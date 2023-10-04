import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { addMachineTab } from "../../features/machine_tabs/machineTabsSlice"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { formaterMS } from "../../functions/timeFromater"
import { AiFillEdit } from "react-icons/ai"
import { AiFillDelete } from "react-icons/ai"
import toast, { Toaster } from 'react-hot-toast'
import NewMachineModal from "../modals/NewMachineModal"
import DeleteMachineModal from "../modals/DeleteMachineModal"


function MachineCards() {
  // Hooks
  const dispatch = useDispatch()
  const machines = useSelector(state => state.machineList)
  const productionList = useSelector(state => state.productionList)
  const windowStatus = useSelector(state => state.selectedWindow).production


  // Double click function
  const openMachine = (machineName) => {
      dispatch(addMachineTab(machineName))
  }


  // Add new machine
  const addNewMachine = () => {
    dispatch(changeModalStatus({
      modalName: "newMachine",
      modalStatus: true,
    }))
  }

  
  // Local component state
  const [counter, setCounter] = useState(0)

  const [hoverMachineName, setHoverMachineName] = useState("")

  const [deleteName, setDeleteName] = useState("")

  const [nextUpdate, setNextUpdate] = useState(true)

  const [windowResolution, setWindowResolution] = useState({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight
  })

  const [cardGrid, setCardGrid] = useState({
    columns: 5,
    gap: 8,
    ofset: 5.
  })

  const [cardSize, setCardSize] = useState({
    width: ""
  })


  // Resize event listener
  const handleResize = () => {
    const windowWidth = window.document.documentElement.clientWidth
    console.log(cardGrid.columns);
    let cardColumns
    if (windowWidth > 1500 && windowWidth < 1800){
        cardColumns = 6
    } else if (windowWidth > 1280 && windowWidth < 1499){
        cardColumns = 5
    } else if (windowWidth > 1060 && windowWidth < 1279){
        cardColumns = 4
    } else if (windowWidth > 840 && windowWidth < 1059){
        cardColumns = 3
    } else if (windowWidth > 620 && windowWidth < 839){
        cardColumns = 2
    } else if (windowWidth > 400 && windowWidth < 619){
        cardColumns = 1
    }

    setWindowResolution({
      width: window.document.documentElement.clientWidth,
      height: window.document.documentElement.clientHeight
    })
    setCardSize({
      ...cardSize,
      width: `${cardWidthCalc(cardColumns)}px`,
    })
  }


  // Success function
  const successMessage = (message) => {
    toast.success(message)
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
  const cardWidthCalc = (columns) => {
    const realCardSize = (window.document.documentElement.clientWidth - ((columns - 1) * cardGrid.gap)) / columns

    const roundedCardSize = parseInt(realCardSize) - cardGrid.ofset

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
  }, [])


  return (
    <div className="flex flex-wrap justify-start gap-x-2 gap-y-2 mt-2">
      <Toaster
        toastOptions={{
          position: "top-center",
          duration: 3000,
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
        className="fixed bottom-10 right-10 flex items-center justify-center text-white text-3xl rounded-full bg-green-900 h-12 w-12 pb-1 hover:bg-green-700 cursor-pointer"
        onClick={() => addNewMachine()}
      >
        +
      </label>

      {machines.map((machine) => (
        <div
          key={machine.name}
          className="text-black p-2 rounded-sm h-fit text-center bg-gray-800 hover:bg-gray-600 select-none transition-all duration-75"
          onDoubleClick={() => openMachine(machine.name)}
          onMouseEnter={() => setHoverMachineName(machine.name)}
          onMouseLeave={() => setHoverMachineName("")}
          style={{ width: cardSize.width }}
        >
          <div
            className="flex items-center text-l text-white justify-start ml-4"
          >
            <label className="h-5 w-2/3 flex justify-end">
              {(machine.name).toUpperCase()}
            </label>
            {
              machine.name === hoverMachineName ?
              <div
                className="w-1/3 flex justify-end items-center gap-x-1"
              >
                <label
                  title="Editar información de máquina"
                  className="hover:text-yellow-200 cursor-pointer"
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
            className="flex flex-col mt-px"
          >
            <label className="text-white">Proyecto</label>
            <label
              className="bg-white text-black font-semibold pl-1 rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {productionList[machine.name] ? productionList[machine.name].find(part => part.index === 0).projectName : cardSize.width}
            </label>
          </div>
          <div
            className="flex"
          >
            <div className="flex flex-col w-2/3">
              <label className="text-white">Pieza actual</label>
              <label
                className="bg-white mr-3 font-semibold rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {productionList[machine.name] ? productionList[machine.name].find(part => part.index === 0).part : "Pendiente"}
              </label>
            </div>
            <div className="flex flex-col w-1/3">
              <label className="text-white">Tiempo</label>
              <label
                className="bg-white font-semibold rounded-sm"
              >
                {
                  productionList[machine.name] ? (
                    productionList[machine.name].find(part => part.index === 0).controlTime.startTime ? 
                    formaterMS(Date.now() - productionList[machine.name].find(part => part.index === 0).controlTime.startTime - productionList[machine.name].find(part => part.index === 0).controlTime.deathTime)
                    : "00:00:00") : "00:00:00"
                }
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
