// Redux toolkit hooks
import { useSelector, useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { updatePartsQuantity, deletePart } from "../../features/projects/projectListSlice"
import { openPart } from "../../features/appIndexSlice/appIndexStatusSlice"

// React hooks
import { useState } from "react"

// CSS documents
import "bootstrap/dist/css/bootstrap.min.css"

// Components
import DataTable from "react-data-table-component"
import NewDeleteButton from "../assets/buttons/NewDelete"
import BlueButton from "../assets/buttons/BlueButton"
import NoDataComponent from "./NoDataComponent"
import NewPartModal from "../modals/NewPartModal"
import DeletePartModal from "../modals/DeletePartModal"
import toast, { Toaster } from "react-hot-toast"


function PartsTable() {
  // Hooks
  const dispatch = useDispatch()


  // Redux state
  const selectedOt = useSelector(state => state.projectTabs)
    .find(project => project.selected === true).id
  const selectedProject = useSelector((state) => state.projectList)
    .find(project => project.ot === selectedOt)
  const partList = selectedProject.parts


  // Local state
  const [windowResolution, setWindowResolution] = useState({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight
  })
  const [nextUpdate, setNextUpdate] = useState(true)

  const [selectedPart, setSelectedPart] = useState("")


  // Auto re-size table
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


  // Material request status light
  const getMaterialRequestStatus = (materialRequestList) => {
    if (materialRequestList.length === 0){
      return "Sin solicitar"
    } else if (materialRequestList.find(materialRequest => materialRequest.status === "Solicitado")){
      return "Solicitado"
    } else if (materialRequestList.find(materialRequest => materialRequest.status === "Comprado")){
      return "Comprado"
    } else if (materialRequestList.find(materialRequest => materialRequest.status === "Habilitado")){
      return "Habilitado"
    } else if (materialRequestList.find(materialRequest => materialRequest.status === "Entregado")){
      return "Entregado"
    }
  }


  const columns = [
    {
      name: "No.",
      selector: (row) => row.id,
      sortable: true,
      width: "7%",
      center: true,
    },
    {
      name: "Pieza",
      selector: (row) => row.partInfo.name,
      sortable: true,
      width: "18%",
      center: true
    },
    {
      name: "Material",
      selector: (row) => row.partInfo.material,
      with: '15%',
      center: true,
      wrap: true,
      conditionalCellStyles: [
        {
          when: row => getMaterialRequestStatus(row.materialRequest.requestList) === "Sin solicitar",
          style: {
            color: 'white',
            backgroundColor: 'red',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => getMaterialRequestStatus(row.materialRequest.requestList) === "Solicitado",
          style: {
            color: 'black',
            backgroundColor: 'orange',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => getMaterialRequestStatus(row.materialRequest.requestList) === "Comprado",
          style: {
            color: 'black',
            backgroundColor: 'yellow',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => getMaterialRequestStatus(row.materialRequest.requestList) === "Habilitado",
          style: {
            color: 'white',
            backgroundColor: 'blue',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => getMaterialRequestStatus(row.materialRequest.requestList) === "Entregado",
          style: {
            color: 'white',
            backgroundColor: 'green',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
      ],
    },
    {
      name: "Proceso actual",
      selector: (row) => {
        let currentProcess = row.processPath.processList.find(process => process.status === "En proceso")

        if (currentProcess){
          return currentProcess.name
        } else {
          return "N/A"
        }
      },
      with: '15%',
      center: true,
      wrap: true
    },
    {
      name: "Ubicación",
      selector: (row) => row.partInfo.location,
      width: '15%',
      center: true
    },
    {
      name: "Cantidad",
      selector: (row) => row.partInfo.quantity,
      sortable: true,
      width: '10%',
      center: true
    },
    {
      name: "Liberadas",
      selector: (row) => row.partInfo.finished,
      width: "10%",
      center: true
    },
    {
      name: "Acabado",
      selector: (row) => row.partInfo.partFinishing,
      width: "16%",
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
        textAlign: 'center'
      }
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingRight: "0px",
        paddingLeft: "0px",
        textAlign: 'center',
        userSelect: 'none',
      },
    },
    table: {
      style: {
        height: `${parseInt(windowResolution.height - 160)}px`,
        width: "61vw"
      }
    }
  }
  
  // Conditional row styles
  let conditionalRowStyles = [
    {
      when: row => row.id % 2 === 0,
      style: {
        backgroundColor: '#d0d0d0',
        color: 'black',
      }
    },
    {
      when: row => row.id % 2 !== 0,
      style: {
        backgroundColor: '#fafafa',
        color: 'black',
      }
    },
    {
      when: row => row.id === selectedPart,
      style: {
        backgroundColor: 'rgb(21 128 61',
        color: 'white',
      }
    }
  ]

  // Double Click row function
  const openPartInfo = () => {
    if (selectedPart === ""){
      toast.error("No hay ninguna pieza seleccionada")
      return 
    } else {
      dispatch(openPart({
        ot: selectedOt,
        partId: selectedPart
      }))
    }
  }

  // NewDeleteButton functions
  const newBtn = () => {
    dispatch(changeModalStatus({
      modalName: 'newPart',
      modalStatus: true,
    }))
  }

  const deleteBtn = () => {
    if (selectedPart === ""){
      toast.error("No ha seleccionado ninguna pieza")
    } else {
      deletePartsQuantity()

      dispatch(deletePart({
        ot: selectedOt,
        partId: selectedPart
      }))

      toast.success("La pieza se eliminó correctamente")
    }
  }


  // Update parts quantity
  const deletePartsQuantity = () => {
    const projectInfo = selectedProject.projectInfo

    let unitQuantity = parseInt(partList.find(part => part.id === selectedPart).partInfo.quantity)
    dispatch(updatePartsQuantity({
      ot: selectedOt,
      partsQuantity: projectInfo.partsQuantity - 1,
      totalPartUnits: projectInfo.totalPartUnits - unitQuantity
    }))
  }


  const successNotify = (message) => {
    toast.success(message)
  }


  // Modal window selector
  const modals = useSelector(state => state.modalStatus);
  let modalWindow;
  if (modals.deletePart){
    modalWindow = <DeletePartModal
      successFn={successNotify}
    />
  } else if (modals.newPart){
    modalWindow = <NewPartModal 
      textTitle="Nueva pieza"
      successFn={successNotify}
    />
  } else if (modals.noPartSelected){
    toast.error("No ha seleccionado ninguna pieza para eliminar");
    dispatch(changeModalStatus({
      modalName: "noPartSelected",
      modalStatus: false,
    }))
  }


  return (
    <div className="w-8/12">
      {modalWindow}
      <div className="mb-2 w-full justify-end flex flex-col">
        <label className="text-lg w-full text-center font-semibold text-white">Piezas</label>
        <NewDeleteButton
          newBtn={newBtn}
          deleteBtn={deleteBtn}
        />
      </div>

      <div>
        <DataTable
          columns={columns}
          data={partList}
          responsive
          striped
          highlightOnHover
          fixedHeader
          customStyles={customStyles}
          onRowClicked={row => setSelectedPart(row.id)}
          onRowDoubleClicked={() => openPartInfo()}
          conditionalRowStyles={conditionalRowStyles}
          persistTableHead
          noDataComponent={<NoDataComponent/>}
        />
      </div>

      <div className="my-2 w-full flex justify-start pr-2 text-white gap-x-2">
        <BlueButton
          btnText="Plano 2D"
        />
        <BlueButton
          btnText="Modelo 3D"
        />
        <BlueButton
          btnText="Ensamble"
        />
        <BlueButton
          btnText="Programa CNC"
        />
        <BlueButton
          btnText="Reporte dimensional"
        />
        <BlueButton
          btnText="Hoja de proceso"
        />
        <BlueButton
          btnText="Registro"
        />
      </div>
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
    </div>
  )
}

export default PartsTable;