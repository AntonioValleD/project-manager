// Redux toolkit hooks
import { useSelector, useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { changeProjectOption } from "../../features/appIndexSlice/appIndexStatusSlice"
import { changeMaterialRequestStatus } from "../../features/projects/projectListSlice"

// React hooks
import { useEffect, useState } from "react"

// CSS documents
import "bootstrap/dist/css/bootstrap.min.css"

// Components
import { DateTime } from "luxon"
import toast, { Toaster } from 'react-hot-toast'
import DataTable from "react-data-table-component"
import SeacrhBar from "../projects/SearchBar"
import RedButton from "../assets/buttons/RedButton"
import BlueButton from "../assets/buttons/BlueButton"
import WarehouseConfirmationModal from "../modals/WarehouseConfirmationModal"
import NoDataComponent from "../project_info/NoDataComponent"


function MaterialRequestList(props) {
  // Hooks
  const dispatch = useDispatch()


  // Redux state
  const projectIndex = useSelector(state => state.appIndex).projectWindow
    .find(project => project.selected === true)

  const selectedProjectOt = projectIndex.ot

  const partList = useSelector(state => state.projectList)
    .find(project => project.ot === selectedProjectOt).parts


  // Local component state
  const [materialRequestList, setMaterialRequestList] = useState([])

  const [selectedPartId, setSelectedPartId] = useState("")

  const [selectedRow, setSelectedRow] = useState('')

  const [confirmationInfo, setConfirmationInfo] = useState({})

  const [filteredRequestList, filterRequestList] = useState(materialRequestList)

  const [filteringStatus, setFilteringStatus] = useState(false)

  const [windowResolution, setWindowResolution] = useState({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight
  })

  const [nextUpdate, setNextUpdate] = useState(true)

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

  
  // Table columns definition
  const columns = [
    {
      id: 'main',
      name: "No",
      selector: (row) => materialRequestList.indexOf(row) + 1,
      sortable: true,
      width: "5%",
      center: true,
    },
    {
      name: "Pieza",
      selector: (row) => row.partId,
      sortable: true,
      width: "5%",
      center: true
    },
    {
      name: "Material",
      selector: (row) => row.material,
      sortable: false,
      width: '11%',
      center: true
    },
    {
      name: "Cantidad",
      selector: (row) => row.quantity,
      sortable: false,
      width: '5%',
      center: true
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: false,
      conditionalCellStyles: [
        {
          when: row => row.status === "Entregado",
          style: {
            color: 'white',
            backgroundColor: 'green',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => row.status === "Cancelado",
          style: {
            color: 'white',
            backgroundColor: 'Red',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
      ],
      width: '8%',
      center: true
    },
    {
      name: "Solicitante",
      selector: (row) => row.userName,
      sortable: false,
      width: '18%',
      center: true
    },
    {
      name: "Fecha de solicitud",
      selector: (row) => {
        if (row.userRequestDat !== ''){
          return DateTime.fromISO(row.userRequestDate).toLocaleString(DateTime.DATETIME_MED);
        } else {
          return "Pendiente";
        }
      },
      sortable: false,
      width: "12%",
      center: true
    },
    {
      name: "Fecha de compra",
      selector: (row) => {
        if (row.status === "Cancelado"){
          return "N/A"
        } else if (row.warehouseRequestDate !== ''){
          return DateTime.fromISO(row.warehouseRequestDate).toLocaleString(DateTime.DATETIME_MED);
        } else {
          return "Pendiente"
        }
      },
      sortable: true,
      center: true,
      width: "12%"
    },
    {
      name: "Fecha de llegada",
      selector: (row) => {
        if (row.status === "Cancelado"){
          return "N/A"
        } else if (row.warehouseArrivalDate !== ''){
          return DateTime.fromISO(row.warehouseArrivalDate).toLocaleString(DateTime.DATETIME_MED);
        } else {
          return "Pendiente";
        }
      },
      sortable: false,
      width: "12%",
      center: true
    },
    {
      name: "Fecha de entrega",
      selector: (row) => {
        if (row.status === "Cancelado"){
          return "N/A"
        } else if (row.userDeliveryDate !== ''){
          return DateTime.fromISO(row.userDeliveryDate).toLocaleString(DateTime.DATETIME_MED);
        } else {
          return "Pendiente";
        }
      },
      sortable: false,
      width: "12%",
      center: true
    },
  ]


  // Table custom styles
  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
      }
    },
    headCells: {
      style: {
        borderBottom: "1px solid black",
        backgroundColor: 'rgb(23 37 84)',
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
        height: `${materialRequestList.length === 0 ? 
          parseInt(windowResolution.height - 100) :
        filteringStatus ?
          `${filteredRequestList.length === 0 ?
            parseInt(windowResolution.height - 100) :
            parseInt(windowResolution.height - 155)
          }` : 
          parseInt(windowResolution.height - 155)}px`
      }
    },
  }


  // Conditional table row styles
  let conditionalRowStyles = [
    {
      when: row => row.id === selectedRow,
      style: {
        backgroundColor: 'rgb(22 163 74)',
        color: 'white',
      }
    },
  ]


  // Pagination config
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }


  // Close material request window function
  const closeMaterialRequestWindow = () => {
    dispatch(changeProjectOption({
      optionName: "materialRequest",
      optionStatus: false
    }))
  }


  // Select row
  const selectRow = (requestId) => {
    setSelectedRow(requestId)
    setSelectedPartId(materialRequestList.find(request => request.id === requestId).partId)
  }


  const selectedRequest = {}
  // Button functions
  const requestMaterial = () => {
    if (selectedRow === ''){
      toast.error("No hay ninguna solicitud seleccionada")
      return
    } 

    const requestStatus = materialRequestList
      .find(request => request.id === selectedRow).status
    
    if (requestStatus === "Cancelado"){
      toast.error("La solicitud ha sido cancelada")

    } else if (requestStatus !== "Solicitado"){
      toast.error("El material ya ha sido comprado")

    } else {
      setConfirmationInfo({
        title: "Comprar material",
        description: "¿Esta seguro de que desea comprar el material seleccionado?",
        requestDate: "warehouseRequestDate",
        requestStatus: "Comprado",
        successMessage: "La solicitud se ha registrado como comprada"
      })

      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
        modalStatus: true,
      }))
    }
  }


  const enableMaterial = () => {
    if (selectedRow === ''){
      toast.error("No hay ninguna solicitud seleccionada")
      return
    } 

    const requestStatus = materialRequestList
      .find(request => request.id === selectedRow).status
    
    if (requestStatus === "Cancelado"){
      toast.error("La solicitud ha sido cancelada")

    } else if (requestStatus !== "Comprado"){
      toast.error("El material no se ha comprado ó ya ha sido habilitado")

    } else {
      setConfirmationInfo({
        title: "Habilitar material",
        description: "¿Esta seguro de que desea habilitar el material seleccionado?",
        requestDate: "warehouseArrivalDate",
        requestStatus: "Habilitado",
        successMessage: "El material se ha registrado como habilitado"
      })

      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
        modalStatus: true,
      }))
    }
  }


  const deliveryMaterial = () => {
    if (selectedRow === ''){
      toast.error("No hay ninguna solicitud seleccionada")
      return
    } 

    const requestStatus = materialRequestList
      .find(request => request.id === selectedRow).status
    
    if (requestStatus === "Cancelado"){
      toast.error("La solicitud ha sido cancelada")

    } else if (requestStatus !== "Habilitado"){
      toast.error("El material ya ha sido entregado ó aún no ha sido habilitado")

    } else {
      setConfirmationInfo({
        title: "Entregar material",
        description: "¿Esta seguro de que desea entregar el material seleccionado?",
        requestDate: "userDeliveryDate",
        requestStatus: "Entregado",
        successMessage: "El material se ha registrado como entregado"
      })

      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
        modalStatus: true,
      }))
    }
  }


  const cancelRequest = () => {
    if (selectedRow === ''){
      toast.error("No hay ninguna solicitud seleccionada")
      return
    } 

    const requestStatus = materialRequestList
      .find(request => request.id === selectedRow).status
    
    if (requestStatus === "Cancelado"){
      toast.error("La solicitud ya ha sido cancelada")

    } else if (requestStatus !== "Solicitado"){
      toast.error("Esta solicitud no puede ser cancelada")

    } else {
      setConfirmationInfo({
        title: "Cancelar solicitud",
        description: "¿Esta seguro de que desea cancelar la solicitud seleccionada?",
        requestDate: "cancelRequest",
        successMessage: "La solicitud ha sido cancelada"
      })

      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
        modalStatus: true,
      }))
    }
  }



  const generateRequestDocument = () => {
    console.log("Generar solicitud (documento de excel)")
  }


  // Success notification function
  const successFn = (message) => {
    toast.success(message)
  }


  // List filter function
  const searchInput = (input) => {
    if (input.value.length < 1){
      setFilteringStatus(false)
    } else {
      setFilteringStatus(true)
    }

    let search = materialRequestList.filter((request) => {
      if (
        request.material.toLowerCase().includes(input.value.toLowerCase()) || 
        request.partId.includes(input.value) || 
        parseInt(request.quantity) === parseInt(input.value) || 
        request.status.toLowerCase().includes(input.value.toLowerCase()) || 
        request.userName.toLowerCase().includes(input.value.toLowerCase()) || 
        DateTime.fromISO(request.userRequestDate).toLocaleString(DateTime.DATETIME_MED)
          .includes(input.value.toLowerCase()) ||
        DateTime.fromISO(request.warehouseRequestDate).toLocaleString(DateTime.DATETIME_MED)
          .includes(input.value.toLowerCase()) ||
        DateTime.fromISO(request.warehouseArrivalDate).toLocaleString(DateTime.DATETIME_MED)
          .includes(input.value.toLowerCase()) ||
        DateTime.fromISO(request.userDeliveryDate).toLocaleString(DateTime.DATETIME_MED)
          .includes(input.value.toLowerCase()) ||
        (request.userRequestDate === '' && "pendiente".includes(input.value.toLowerCase())) ||
        (request.warehouseRequestDate === '' && "pendiente".includes(input.value.toLowerCase())) ||
        (request.warehouseArrivalDate === '' && "pendiente".includes(input.value.toLowerCase())) ||
        (request.userDeliveryDate === '' && "pendiente".includes(input.value.toLowerCase()))
      ){
        return request
      }
    })
    filterRequestList([...search])
  }


  // Modal window selector
  const modalStatus = useSelector(state => state.modalStatus)
  let modalWindow
  if (modalStatus.warehouseConfirmation){
    modalWindow = <WarehouseConfirmationModal
      textTitle={confirmationInfo.title}
      textDescription={confirmationInfo.description}
      requestDate={confirmationInfo.requestDate}
      requestStatus={confirmationInfo.requestStatus}
      successMessage={confirmationInfo.successMessage}
      ot={selectedProjectOt}
      partId={selectedPartId}
      requestId={selectedRow}
      successFn={successFn}
    />
  }


  useEffect(() => {
    let requestList = []

    partList.forEach((part) => {
      let materialStatus = true

      part.materialRequest.requestList.forEach((request) => {
        if (request.status !== "Entregado" && request.status !== "Cancelado"){
          materialStatus = false
        }

        let newRequest = {
          partId: part.id,
          ...request
        }

        requestList.push(newRequest)
      })
    })

    setMaterialRequestList(requestList)

    filterRequestList(requestList)
  }, [partList])
  

  return (
    <div className="w-full pt-2 rounded-sm">
      <div className="mb-2 flex items-center gap-x-6 w-full">
        <SeacrhBar
          inputText={searchInput}
        />
        <div className="flex justify-between w-6/12">
          <div className="flex gap-2">
            <BlueButton
              btnText="Comprar"
              btnAction={requestMaterial}
            />
            <BlueButton
              btnText="Habilitar"
              btnAction={enableMaterial}
            />
            <BlueButton
              btnText="Entregar"
              btnAction={deliveryMaterial}
            />
            <BlueButton
              btnText="Ver documento"
              btnAction={generateRequestDocument}
            />
            <RedButton
              btnText="Cancelar"
              btnAction={cancelRequest}
            />
          </div>
          
          <RedButton
            btnText="Regresar"
            btnAction={closeMaterialRequestWindow}
          />
        </div>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredRequestList}
          responsive
          striped
          selectableRowsHighlight
          highlightOnHover
          fixedHeader
          persistTableHead
          customStyles={customStyles}
          onRowClicked={row => selectRow(row.id)}
          conditionalRowStyles={conditionalRowStyles}
          defaultSortFieldId={'main'}
          defaultSortAsc={true}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          paginationPerPage={15}
          noDataComponent={<NoDataComponent
            textInfo="No se ha solicitado material para este proyecto"
          />}
        />
      </div>
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
    </div>
  );
}

export default MaterialRequestList;
