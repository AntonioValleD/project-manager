import { DateTime } from "luxon"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import "bootstrap/dist/css/bootstrap.min.css"
import toast, { Toaster } from 'react-hot-toast'
import DataTable from "react-data-table-component"
import SeacrhBar from "../projects/SearchBar"
import RedButton from "../assets/buttons/RedButton"
import BlueButton from "../assets/buttons/BlueButton"
import WarehouseConfirmationModal from "../modals/WarehouseConfirmationModal"
import { changeProjectOption } from "../../features/selectedPartSlice/appIndexStatusSlice"


function MaterialRequestList() {
  // Hooks
  const dispatch = useDispatch()


  // Redux state
  const projectIndex = useSelector(state => state.appIndex).find(project => project.selected === true)

  const selectedProjectOt = projectIndex.ot

  const partList = useSelector(state => state.projectList).find(project => project.ot === selectedProjectOt).parts


  // Material request list constructor
  let materialRequestList = []
  partList.forEach((part) => {
    if (part.materialRequest) {
      part.materialRequest.forEach((request) => {
        materialRequestList.push(request)
      })
    }
  })


  // Local component states
  const [selectedRow, setSelectedRow] = useState('')

  const [confirmationInfo, setConfirmationInfo] = useState({})

  const [filteredRequestList, filterRequestList] = useState(materialRequestList)

  const selectedRequest = materialRequestList.find(request => request.requestNo === selectedRow)

  
  // Table columns definition
  const columns = [
    {
      id: 'main',
      name: "Pieza",
      selector: (row) => row.partId,
      sortable: true,
      width: "8%",
      center: true,
    },
    {
      name: "No.",
      selector: (row) => row.requestId,
      sortable: true,
      width: "4%",
      center: true
    },
    {
      name: "Material",
      selector: (row) => row.material,
      sortable: false,
      width: '10%',
      center: true
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: false,
      width: '10%',
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
      name: "Solicitante",
      selector: (row) => row.userName,
      sortable: false,
      width: '15%',
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
        if (row.warehouseRequestDate !== ''){
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
        if (row.warehouseArrivalDate !== ''){
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
        if (row.userDeliveryDate !== ''){
          return DateTime.fromISO(row.userDeliveryDate).toLocaleString(DateTime.DATETIME_MED);
        } else {
          return "Pendiente";
        }
      },
      sortable: false,
      width: "12%",
      center: true
    },
    {
      name: "Selected row",
      selector: (row) => row.selected,
      sortable: false,
      omit: true,
    },
  ];

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
        minHeight: "575px"
      }
    },
  }

  // Conditional table row styles
  let conditionalRowStyles = [
    {
      when: row => row.requestNo === selectedRow,
      style: {
        backgroundColor: 'rgb(21 128 61)',
        color: 'white',
      }
    },
  ]

  // Select table row function
  const selectRow = async (requestNo) => {
    setSelectedRow(requestNo)
  }

  // Close material request window function
  const closeMaterialRequestWindow = () => {
    dispatch(changeProjectOption({
      optionName: "materialRequest",
      optionStatus: false
    }))
  }


  // Button functions
  const requestMaterial = () => {
    if (selectedRow === ''){
      toast.error("No hay ninguna solicitud seleccionada");
    } else if (selectedRequest.status === "Cancelado"){
      toast.error("La solicitud ha sido cancelada");
    } else if (selectedRequest.warehouseRequestDate !== ''){
      toast.error("El material ya ha sido comprado");
    } else {
      setConfirmationInfo({
        title: "Comprar material",
        description: "¿Esta seguro de que desea comprar el material seleccionado?",
        action: "materialRequest",
      });
      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
        modalStatus: true,
      }))
    }
  };

  const enableMaterial = () => {
    if (selectedRow === ''){
      toast.error("No hay ninguna solicitud seleccionada");
    } else if (selectedRequest.status === "Cancelado"){
      toast.error("La solicitud ha sido cancelada");
    } else if (selectedRequest.warehouseRequestDate === ''){
      toast.error("El material aún no se ha comprado");
    } else if (selectedRequest.warehouseArrivalDate !== ''){
      toast.error("El material ya ha sido habilitao");
    } else {
      setConfirmationInfo({
        title: "Habilitar material",
        description: "¿Esta seguro de que desea habilitar el material seleccionado?",
        action: "materialEnable"
      });
      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
        modalStatus: true,
      }))
    }
  };

  const deliveryMaterial = () => {
    if (selectedRow === ''){
      toast.error("No hay ninguna solicitud seleccionada");
    } else if (selectedRequest.status === "Cancelado"){
      toast.error("La solicitud ha sido cancelada");
    } else if (selectedRequest.warehouseRequestDate === ''){
      toast.error("El material aún no se ha comprado");
    } else if (selectedRequest.warehouseArrivalDate === ''){
      toast.error("El material aún no ha sido habilitado");
    } else if (selectedRequest.userDeliveryDate !== ''){
      toast.error("El material ya ha sido entregado");
    } else {
      setConfirmationInfo({
        title: "Entregar material",
        description: "¿Esta seguro de que desea entregar el material seleccionado?",
        action: "materialDelivery"
      });
      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
        modalStatus: true,
      }))
    }
  };

  const cancelRequest = () => {
    if (selectedRow === ''){
      toast.error("No hay ninguna solicitud seleccionada");
    } else if (selectedRequest.status === "Cancelado"){
      toast.error("La solicitud ya ha sido cancelada");
    } else if (selectedRequest.status === "Entregado"){
      toast.error("El material ya ha sido entregado");
    } else {
      setConfirmationInfo({
        title: "Cancelar solicitud",
        description: "¿Esta seguro de que desea cancelar la solicitud seleccionada?",
        action: "cancelRequest"
      });
      dispatch(changeModalStatus({
        modalName: "warehouseConfirmation",
        modalStatus: true,
      }))
    }
  };

  const confirmationSuccess = (action) => {

    if (action === "materialRequest"){
      successNotify("El material se compró correctamente");
    } else if (action === "materialEnable"){
      successNotify("El material se habilitó correctamente");
    } else if (action === "materialDelivery"){
      successNotify("El material se entregó correctamente");
    } else if (action === "cancelRequest"){
      successNotify("La solicitud seleccionada ha sido cancelada");
    }
  };

  const generateRequestDocument = () => {
    console.log("Generar solicitud (documento de excel)");
  };


  // Success notification function
  const successNotify = (message) => {
    toast.success(message);
  };


  // List filter function
  const searchInput = (input) => {
    let inputValue = input.value.toLowerCase();
    let search = materialRequestList.filter((request) => {
      if (request.partId.includes(inputValue) || 
        request.requestId.includes(inputValue) || 
        request.material.toLowerCase().includes(inputValue) || 
        request.status.toLowerCase().includes(inputValue) || 
        request.userName.toLowerCase().includes(inputValue) || 
        request.quantity.toLowerCase().includes(inputValue) ||
        DateTime.fromISO(request.userRequestDate).toLocaleString(DateTime.DATETIME_MED).includes(inputValue) ||
        DateTime.fromISO(request.warehouseRequestDate).toLocaleString(DateTime.DATETIME_MED).includes(inputValue) ||
        DateTime.fromISO(request.warehouseArrivalDate).toLocaleString(DateTime.DATETIME_MED).includes(inputValue) ||
        DateTime.fromISO(request.userDeliveryDate).toLocaleString(DateTime.DATETIME_MED).includes(inputValue)
      ){
        return request;
      }
    });
    filterRequestList([...search])
  };


  // Modal window selector
  const modalStatus = useSelector(state => state.modalStatus);
  let modalWindow;
  if (modalStatus.warehouseConfirmation){
    modalWindow = <WarehouseConfirmationModal
      textTitle={confirmationInfo.title}
      textDescription={confirmationInfo.description}
      action={confirmationInfo.action}
      acceptFn={confirmationSuccess}
    />
  }


  useEffect(() => {
    filterRequestList(materialRequestList)
  },[selectedRequest])
  

  return (
    <div className="w-full px-2 pt-2 rounded-sm">
      <div className="mb-4 flex items-center gap-x-6 w-full">
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
          fixedHeaderScrollHeight="575px"
          customStyles={customStyles}
          onRowClicked={row => selectRow(row.requestNo)}
          conditionalRowStyles={conditionalRowStyles}
          defaultSortFieldId={'main'}
          defaultSortAsc={true}
        />
      </div>
      {modalWindow}
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
  );
}

export default MaterialRequestList;
