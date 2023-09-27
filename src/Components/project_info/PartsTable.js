import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import DataTable from "react-data-table-component"
import NewDeleteButton from "../assets/buttons/NewDelete"
import BlueButton from "../assets/buttons/BlueButton"
import NoDataComponent from "./NoDataComponent"
import NewPartModal from "../modals/NewPartModal"
import DeletePartModal from "../modals/DeletePartModal"
import { editSelectedPart } from "../../features/partsSlice.js/partsSlice"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import toast, { Toaster } from "react-hot-toast"

function PartsTable() {
  const dispatch = useDispatch()

  const selectedOt = useSelector(state => state.projectTabs).find(project => project.selected === true).id

  const partListProject = (useSelector((state) => state.partList)).find(project => project.ot === selectedOt)


  // Local state
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

  let partList
  if (partListProject){
    partList = partListProject.parts;
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
      selector: (row) => row.partName,
      sortable: true,
      width: "15%",
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
      name: "Estado",
      selector: (row) => {
        let partInfo;
        if (partList){
          partInfo = partList.find(part => part.id === row.id);
        }
        if (partInfo){
          if (partInfo.materialRequest){
            let totalRequests = partInfo.materialRequest.length;
            let status = partInfo.materialRequest[(totalRequests - 1)].status;
            return status;
          } else {
            return "Sin solicitar";
          }
        } else {
          return "Sin solicitar";
        }
      },
      with: '15%',
      center: true,
      wrap: true
    },
    {
      name: "Ubicación",
      selector: (row) => row.location,
      width: '15%',
      center: true
    },
    {
      name: "Cantidad",
      selector: (row) => row.quantity,
      sortable: true,
      width: '11%',
      center: true
    },
    {
      name: "Fabricadas",
      selector: (row) => row.finished,
      width: "10%",
      center: true
    },
    {
      name: "Calidad",
      selector: (row) => row.qualityProcess,
      width: "16%",
      center: true
    },
  ];

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
        height: `${parseInt(windowResolution.height - 210)}px`
      }
    }
  };
  
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
      when: row => row.selected === true,
      style: {
        backgroundColor: 'rgb(21 128 61',
        color: 'white',
      }
    }
  ];

  // Click row function
  const openPart = (partId) => {
  }
  
  const selectRow = (partId) => {
    dispatch(editSelectedPart(
      {
        partOt: selectedOt,
        partId: partId
      }
    ))
  };

  // NewDeleteButton functions
  const newBtn = () => {
    dispatch(changeModalStatus({
      modalName: 'newPart',
      modalStatus: true,
    }))
  };

  const findPartList = useSelector(state => state.partList).find(project => project.ot === selectedOt);
  const deleteBtn = () => {
    if (findPartList){
      const findSelectedPart = findPartList.parts.find(part => part.selected === true)
      if (findSelectedPart){
        dispatch(changeModalStatus({
          modalName: "deletePart",
          modalStatus: true,
        }))
      } else {
        dispatch(changeModalStatus({
          modalName: "noPartSelected",
          modalStatus: true,
        }))
      }
    } else {
      dispatch(changeModalStatus({
        modalName: "noPartSelected",
        modalStatus: true,
      }))
    }

  };


  const successNotify = (message) => {
    toast.success(message);
  };


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
          pagination
          customStyles={customStyles}
          onRowClicked={row => selectRow(row.id)}
          onRowDoubleClicked={(row, event) => openPart(row.id)}
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
  );
}

export default PartsTable;
