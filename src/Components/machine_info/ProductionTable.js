import { useSelector, useDispatch } from "react-redux";
import { selectMachinePart } from "../../features/productionListSlice/productionListSlice";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import NewDeleteButton from "../assets/buttons/NewDelete";
import BlueButton from "../assets/buttons/BlueButton";
import DeleteMachinePart from "../modals/DeleteMachinePart";
import NewProductionPart from "../modals/NewProductionPart";
import StartMachining from "../modals/StartMachining";
import StopMachining from "../modals/StopMachining";
import StartProduction from "../modals/StartProduction";
import { pauseProductionPart, continueProductionPart } from "../../features/productionListSlice/productionListSlice";
import { stopProductionMachine, pauseMachineDeathTime, continueMachiningDeathTime } from "../../features/machines/machineSlice";

function ProductionTable() {
  // Hooks
  const dispatch = useDispatch();

  const selectedMachine = useSelector(state => state.machineTabs).find(machine => machine.selected === true).id;

  const productionList = (useSelector((state) => state.productionList))[selectedMachine];

  const machineInfo = useSelector((state) => state.machineList).find(machine => machine.name === selectedMachine);

  let productionPart;
  let currentProcess;
  if (productionList && productionList.length !== 0){
    currentProcess = productionList.find(part => part.index === 0);
    productionPart = productionList.find(part => part.index === 0).part;
  }


  const columns = [
    {
      id: "main",
      name: "Orden",
      selector: (row) => row.index,
      sortable: true,
      width: "9%",
      center: true,
    },
    {
      name: "No.",
      selector: (row) => row.partId,
      sortable: true,
      width: "8%",
      center: true,
    },
    {
      name: "O.T.",
      selector: (row) => row.projectOt,
      width: '10%',
      center: true
    },
    {
      name: "Pieza",
      selector: (row) => row.part,
      sortable: true,
      width: "15%",
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
      name: "Material",
      selector: (row) => row.material,
      with: '17%',
      center: true,
      wrap: true
    },
    {
      name: "Cliente",
      selector: (row) => row.client,
      width: "11%",
      center: true
    },
    {
      name: "Tiempo estimado",
      selector: (row) => row.time.estimatedTime,
      width: "18%",
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
        minHeight: "557px"
      }
    }
  };
  
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
      when: row => row.index === 0,
      style: {
        backgroundColor: 'rgb(30 58 138)',
        color: 'white',
      }
    },
    {
      when: row => row.selected === true,
      style: {
        backgroundColor: 'green',
        color: 'white',
      }
    },
    {
      when: row => row.pinit === true,
      style: {
        backgroundColor: 'rgb(113 63 18)',
        color: 'white',
      }
    },
  ];

  // Click row function
  const selectPart = (index) => {
    dispatch(selectMachinePart({
      machine: selectedMachine,
      partId: index,
    }))
  };


  // Button functions
  const newBtn = () => {
    dispatch(changeModalStatus({
      modalName: "newProductionPart",
      modalStatus: true,
    }))
  };

  const deleteBtn = () => {
    const selectedPart = productionList.find(part => part.selected === true);
    if (!selectedPart){
      dispatch(changeModalStatus({
        modalName: "noProductionPartSelected",
        modalStatus: true,
      }))
    } else {
      dispatch(changeModalStatus({
        modalName: "deleteProductionPart",
        modalStatus: true
      }))
    }
  };

  // Machining button functions
  const startMachining = () => {
    dispatch(changeModalStatus({
      modalName: "startMachining",
      modalStatus: true,
    }))
  };

  const pauseMachining = () => {
    dispatch(pauseProductionPart({
      machine: selectedMachine,
    }))
    dispatch(pauseMachineDeathTime({
      machine: selectedMachine,
    }))
  };

  const continueMachining = () => {
    if (!machineInfo.operation.running){
      startProduction();
    }
    dispatch(continueProductionPart({
      machine: selectedMachine,
    }))
    dispatch(continueMachiningDeathTime({
      machine: selectedMachine,
    }))
  };

  const stopMachining = () => {
    dispatch(changeModalStatus({
      modalName: "stopMachining",
      modalStatus: true,
    }))
  };

  // Production button functions
  const startProduction = () => {
    dispatch(changeModalStatus({
      modalName: "startProduction",
      modalStatus: true,
    }))
  };

  const pauseProduction = () => {
    if (currentProcess){
      if (currentProcess.pinit){
        pauseMachining();
      }
    }
    dispatch(stopProductionMachine({
      machine: selectedMachine,
    }))
  };


  // Machining button action selector
  let bntMachiningFunction = startMachining;
  let btnMachiningText = "Iniciar maquinado";

  if (currentProcess){
    if (currentProcess.controlTime.startTime === ''){
      btnMachiningText = "Iniciar maquinado";
      bntMachiningFunction = startMachining;
    } else {
      if (currentProcess.pinit){
        btnMachiningText = "Pausar maquinado";
        bntMachiningFunction = pauseMachining;
      } else {
        if (currentProcess.quantity !== currentProcess.finished){
          btnMachiningText = "Reanudar maquinado";
          bntMachiningFunction = continueMachining;
        } else {
          btnMachiningText = "Finalizar maquinado";
          bntMachiningFunction = stopMachining;
        }
      }
    }
  }

  // Production button action selector
  let bntProductionFunction = startProduction;
  let btnProductionText = "Iniciar producción";
  let machineTime = machineInfo.operation;

  if (machineTime){
    if (!machineTime.running){
      btnProductionText = "Iniciar producción";
      bntProductionFunction = startProduction;
    } else {
      btnProductionText = "Detener producción";
      bntProductionFunction = pauseProduction;
    }
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
  } else if (modalStatus.deleteProductionPart){
    modalWindow = <DeleteMachinePart/>
  } else if (modalStatus.newProductionPart){
    modalWindow = <NewProductionPart
      textTitle="Añadir pieza"
    />
  } else if (modalStatus.startMachining){
    if (!productionList || productionList.length === 0){
      // modalWindow = <NoItemSelected
      //   modalName="startMachining"
      //   textTitle="Iniciar maquinado"
      //   textDescription="No hay piezas para maquinar"
      // />
    } else {
      modalWindow = <StartMachining
        partName={productionPart}
        machine={selectedMachine}
      />
    }
  } else if (modalStatus.stopMachining){
    modalWindow = <StopMachining
      partName={productionPart}
      machine={selectedMachine}
    />
  } else if (modalStatus.startProduction){
    modalWindow = <StartProduction
      machine={selectedMachine}
    />
  }


  return (
    <div className="w-7/12 rounded-sm h-full pl-2">
      {modalWindow}
      <div className="my-2 w-full justify-end flex flex-col pr-2 gap-y-2">
        <label className="text-lg w-full text-center font-semibold text-white">Cola de producción</label>
        <div className="flex gap-x-2">
          <NewDeleteButton
            newBtn={newBtn}
            deleteBtn={deleteBtn}
          />
          <BlueButton
            btnText={btnMachiningText}
            btnAction={bntMachiningFunction}
          />
          <BlueButton
            btnText={btnProductionText}
            btnAction={bntProductionFunction}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={productionList}
        responsive
        striped
        highlightOnHover
        fixedHeader
        persistTableHead
        fixedHeaderScrollHeight="557px"
        customStyles={customStyles}
        onRowClicked={(row, event) => selectPart(row.index)}
        conditionalRowStyles={conditionalRowStyles}
        defaultSortFieldId={'main'}
        defaultSortAsc={true}
      />
    </div>
  );
}

export default ProductionTable;
