// CSS documents
import "./index.css"

// React hooks
import { useState } from "react"

// Redux toolkit hooks
import { useSelector, useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { 
  changeMachiningStatus,
  changePartStatus,
  deleteProductionPart
} from "../../features/machines/machineSlice"

// Components
import toast, { Toaster } from 'react-hot-toast'
import DataTable from "react-data-table-component"
import NewDeleteButton from "../assets/buttons/NewDelete"
import NewProductionPart from "../modals/NewProductionPart"
import ConfirmationModal from "../modals/ConfirmationModal"

// React icons
import { FaRegCirclePlay } from "react-icons/fa6"
import { MdOutlineNotStarted } from "react-icons/md"
import { FaRegCirclePause } from "react-icons/fa6"
import { FaRegCircleStop } from "react-icons/fa6"


function ProductionTable() {
  // Hooks
  const dispatch = useDispatch()


  // Redux state
  const selectedMachine = useSelector(state => state.machineTabs)
    .find(machine => machine.selected === true).id

  const machineList = useSelector(state => state.machineList)

  const selectedMachineInfo = machineList.find(machine => machine.name === selectedMachine)

  const machiningStatus = selectedMachineInfo.machiningStatus

  const totalParts = selectedMachineInfo.parts.length

  // Local state
  const [selectedPartIndex, setSelectedPartIndex] = useState("")

  const [nextUpdate, setNextUpdate] = useState(false)

  const [windowResolution, setWindowResolution] = useState({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight
  })

  window.addEventListener('resize', () => {
    if (nextUpdate){
      setWindowResolution({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight
      })
      setNextUpdate(false)
      setTimeout(() => {
        setNextUpdate(true)
      }, 2000)
    }
  })


  const columns = [
    {
      id: "main",
      name: "Indice",
      selector: (row) => row.index + 1,
      sortable: true,
      width: "9%",
      center: true,
    },
    {
      name: "O.T.",
      selector: (row) => row.ot,
      width: '8%',
      center: true
    },
    {
      name: "Pieza",
      selector: (row) => row.name,
      sortable: true,
      width: "15%",
      center: true
    },
    {
      name: "No.",
      selector: (row) => row.partId,
      sortable: true,
      width: "7%",
      center: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.quantity,
      sortable: true,
      width: '11%',
      center: true
    },
    {
      name: "Material",
      selector: (row) => row.material,
      with: '15%',
      center: true,
      wrap: true
    },
    {
      name: "Cliente",
      selector: (row) => row.client,
      width: "14%",
      center: true
    },
    {
      name: "Tiempo estimado",
      selector: (row) => {
        return `${row.estimatedTime.hours} hrs ${row.estimatedTime.minutes} min`
      },
      width: "18%",
      center: true
    },
  ]

  // Custom styles
  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
      }
    },
    headCells: {
      style: {
        borderBottom: "1px solid black",
        backgroundColor: 'rgb(59 7 100)',
        color: 'white',
        paddingLeft: "8px",
        paddingRight: "0px",
        fontSize: "14px",
      }
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingRight: "0px",
        paddingLeft: "3px",
        textAlign: 'center',
        userSelect: 'none',
      },
    }, 
    table: {
      style: {
        height: `${parseInt(windowResolution.height - 125)}px`
      }
    }
  }
  
  // Conditional row styles
  let conditionalRowStyles = [
    {
      when: row => row.index % 2 === 0,
      style: {
        backgroundColor: '#d0d0d0',
        color: 'black',
      }
    },
    {
      when: row => row.index % 2 !== 0,
      style: {
        backgroundColor: '#fafafa',
        color: 'black',
      }
    },
    {
      when: row => row.status === "Siguiente",
      style: {
        backgroundColor: 'blue',
        color: 'white',
      }
    },
    {
      when: row => row.status === "En proceso",
      style: {
        backgroundColor: 'green',
        color: 'white',
      }
    },
    {
      when: row => row.status === "Finalizado",
      style: {
        backgroundColor: "rgb(82 82 91)",
        color: 'white',
      }
    },
    {
      when: row => row.index === selectedPartIndex,
      style: {
        backgroundColor: "rgb(22 163 74)",
        color: 'white',
      }
    },
  ]


  // Button functions
  const newBtn = () => {
    dispatch(changeModalStatus({
      modalName: "newProductionPart",
      modalStatus: true,
    }))
  }


  // Production control functions
  const startProduction = () => {
    let nextPartIndex = selectedMachineInfo.parts
      .findIndex(part => part.status === "Siguiente")

    if (nextPartIndex === -1){
      toast.error("No hay piezas en cola de producción")
    } else {
      dispatch(changeMachiningStatus({
        machineName: selectedMachine,
        statusName: "startedStatus",
        statusValue: true,
      }))
  
      dispatch(changePartStatus({
        machineName: selectedMachine,
        partIndex: nextPartIndex,
        statusValue: "En proceso",
      }))
    }
  }

  const stopProduction = () => {
    let currentPartIndex = selectedMachineInfo.parts
      .findIndex(part => part.status === "En proceso")

    if (currentPartIndex !== totalParts - 1){
      dispatch(changePartStatus({
        machineName: selectedMachine,
        partIndex: currentPartIndex + 1,
        statusValue: "Siguiente",
      }))
    } 
    
    dispatch(changePartStatus({
      machineName: selectedMachine,
      partIndex: currentPartIndex,
      statusValue: "Finalizado",
    }))

    dispatch(changeMachiningStatus({
      machineName: selectedMachine,
      statusName: "startedStatus",
      statusValue: false,
    }))
  }

  const playProduction = () => {
    dispatch(changeMachiningStatus({
      machineName: selectedMachine,
      statusName: "pausedStatus",
      statusValue: false,
    }))
  }

  const pauseProduction = () => {
    dispatch(changeMachiningStatus({
      machineName: selectedMachine,
      statusName: "pausedStatus",
      statusValue: true,
    }))
  }


  // Delete production part functions
  const deleteBtnConfirmation = () => {
    if (selectedPartIndex === ""){
      toast.error("No ha seleccionado ninguna pieza para eliminar")
    } else {
      let selectedPart = selectedMachineInfo.parts[selectedPartIndex]

      if (selectedPart.status === "En proceso"){
        toast.error("No se puede eliminar una pieza en proceso")

      } else if (selectedPart.status === "Finalizado"){
        toast.error("No se puede eliminar una pieza finalizada")

      } else {
        dispatch(changeModalStatus({
          modalName: "confirmationModal",
          modalStatus: true,
        }))
      }
    }
  }

  const deleteSelectedProductionPart = () => {
    let selectedPart = selectedMachineInfo.parts[selectedPartIndex]

    if (selectedPart.status === "Siguiente" && selectedPartIndex < totalParts - 1){
      dispatch(changePartStatus({
        machineName: selectedMachine,
        partIndex: selectedPartIndex + 1,
        statusValue: "Siguiente",
      }))
    }

    dispatch(deleteProductionPart({
      machineName: selectedMachine,
      partIndex: selectedPartIndex,
    }))

    setSelectedPartIndex("")

    toast.success("Pieza eliminada con éxito")
  }


  // Success notification
  const successFn =  (message) => {
    toast.success(message)
  }


  // Modal window selector
  let modalWindow;
  const modalStatus = useSelector(state => state.modalStatus);
  if (modalStatus.confirmationModal){
    modalWindow = <ConfirmationModal
      textTitle="Eliminar pieza de producción"
      textDescription="¿Está seguro que desea eliminar la pieza seleccionada?"
      confirmFn={deleteSelectedProductionPart}
    />
  } else if (modalStatus.newProductionPart){
    modalWindow = <NewProductionPart
      successFn={successFn}
    />
  }


  return (
    <div className="w-7/12 rounded-sm h-full pr-2">
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

      <div className="my-1 w-full justify-end flex flex-col pr-2">
        <label 
          className="text-lg w-full text-center font-semibold text-white mb-1"
        >
          Cola de producción
        </label>

        <div className="flex gap-x-6 items-center h-8">
          <NewDeleteButton
            newBtn={newBtn}
            deleteBtn={deleteBtnConfirmation}
          />

          {
            machiningStatus.startedStatus ?
              <label
                className="text-3xl cursor-pointer ml-1"
                id="stopBtn"
                title="Finalizar producción de pieza"
                onClick={() => stopProduction()}
              >
                <FaRegCircleStop />
              </label> :
              <label
                className="text-4xl cursor-pointer"
                id="startBtn"
                title="Iniciar producción de pieza"
                onClick={() => startProduction()}
              >
                <MdOutlineNotStarted />
              </label>
          }

          {
            machiningStatus.pausedStatus && machiningStatus.startedStatus ?
              <label
                className="text-3xl cursor-pointer"
                id="playBtn"
                title="Reanudar producción de pieza"
                onClick={() => playProduction()}
              >
                <FaRegCirclePlay />
              </label> : !machiningStatus.pausedStatus && machiningStatus.startedStatus ?
              <label
                className="text-3xl cursor-pointer"
                id="pauseBtn"
                title="Pausar producción de pieza"
                onClick={() => pauseProduction()}
              >
                <FaRegCirclePause />
              </label> :
              null
          }
        </div>
      </div>

      <DataTable
        columns={columns}
        data={selectedMachineInfo.parts}
        responsive
        striped
        highlightOnHover
        fixedHeader
        persistTableHead
        customStyles={customStyles}
        onRowClicked={(row, event) => setSelectedPartIndex(row.index)}
        conditionalRowStyles={conditionalRowStyles}
        defaultSortFieldId={'main'}
        defaultSortAsc={true}
      />
    </div>
  );
}

export default ProductionTable;
