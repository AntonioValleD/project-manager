// CSS documents
import "bootstrap/dist/css/bootstrap.min.css"

// React hooks
import { useState } from "react"

// Redux toolkit hooks
import { useSelector, useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"

// Components
import DataTable from "react-data-table-component"
import NewDeleteButton from "../assets/buttons/NewDelete"
import NewProductionPart from "../modals/NewProductionPart"


function ProductionTable() {
  // Hooks
  const dispatch = useDispatch()


  // Redux state
  const selectedMachine = useSelector(state => state.machineTabs)
    .find(machine => machine.selected === true).id

  const machineList = useSelector(state => state.machineList)

  const selectedMachineInfo = machineList.find(machine => machine.name === selectedMachine)

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
      selector: (row) => row.index,
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
      selector: (row) => row.id,
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


  const deleteBtn = () => {
    console.log("Delete production part")
    // if (!selectedPart){
    //   dispatch(changeModalStatus({
    //     modalName: "noProductionPartSelected",
    //     modalStatus: true,
    //   }))
    // } else {
    //   dispatch(changeModalStatus({
    //     modalName: "deleteProductionPart",
    //     modalStatus: true
    //   }))
    // }
  }


  // Modal window selector
  let modalWindow;
  const modalStatus = useSelector(state => state.modalStatus);
  if (modalStatus.noProductionPartSelected){
    // modalWindow = <NoItemSelected
    //   modalName="noProductionPartSelected"
    //   textTitle="Eliminar pieza"
    //   textDescription="No ha seleccionado ninguna pieza para eliminar"
    // />
  } else if (modalStatus.newProductionPart){
    modalWindow = <NewProductionPart
      textTitle="Añadir pieza"
    />
  }


  return (
    <div className="w-7/12 rounded-sm h-full pr-2">
      {modalWindow}

      <div className="my-2 w-full justify-end flex flex-col pr-2 gap-y-2">
        <label 
          className="text-lg w-full text-center font-semibold text-white"
        >
          Cola de producción
        </label>

        <div className="flex gap-x-2">
          <NewDeleteButton
            newBtn={newBtn}
            deleteBtn={deleteBtn}
          />
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
