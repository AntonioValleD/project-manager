// CSS import
import "bootstrap/dist/css/bootstrap.min.css"

// Component import
import BlueButton from "../assets/buttons/BlueButton"
import GreenButton from "../assets/buttons/GreenButton"
import FinishProductionPart from "../modals/FinishProductionParts"

// Redux toolkit reducer import
import { changeModalStatus } from "../../features/modalSlice/modalSlice"

// Hook import
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { formaterMS } from "../../functions/timeFromater"


function MachineInfo() {
  const dispatch = useDispatch();

  const selectedMachineName = useSelector(state => state.appIndex).productionWindow.find(machine => machine.selected === true).name

  const selectedMachine = useSelector(state => state.machineList).find(machine => machine.name === selectedMachineName)

  const process = useSelector((state) => state.productionList)[selectedMachineName];

  
  let currentProcess;
  if (!process || process.length === 0){
    currentProcess = {
      projectName: 'Pendiente',
      client: 'Pendiente',
      ot: 'Pendiente',
      part: 'Pendiente',
      index: 0,
      partId: 'Pendiente',
      projectOt: 'Pendiente',
      quantity: '0',
      finished: '0',
      material: 'Pendiente',
      time: {
        estimatedTime: "0 hrs 0 min",
        lostTime: '00:00:00',
        realTime: '00:00:00',
      },
      controlTime: {
        deathTime: 0,
        startTime: '',
        pauseTime: '',
      },
      pinit: false
    }
  } else if (process) {
    currentProcess = process.find(part => part.index === 0);
  }


  // Timmer hooks
  const [deathTime, setDeathTime] = useState();
  const [machineTime, setMachineTime] = useState();
  const [totalTime, setTotalTime] = useState();


  const progresPercentage = () => {
    if (currentProcess.finished == "0") {
      return "0%";
    } else if (currentProcess.quantity == "0") {
      return "100%";
    } else {
      return ((currentProcess.finished * 100) / currentProcess.quantity).toFixed(2) + '%';
    }
  };

  
  // Button functions
  const finishParts = () => {
    dispatch(changeModalStatus({
      modalName: "finishParts",
      modalStatus: true,
    }))
  }


  // Modal window selector
  let modalWindow;
  const modalStatus = useSelector(state => state.modalStatus);
  if (modalStatus.finishParts){
    if (currentProcess.pinit){
      modalWindow = <FinishProductionPart
        partName={currentProcess.part}
        partsQuantity={currentProcess.quantity}
        finishedParts={currentProcess.finished}
        machine={selectedMachineName}
      />
    } else {
      // modalWindow = <NoItemSelected
      //   modalName="finishParts"
      //   textTitle="Finalizar piezas"
      //   textDescription="No hay ninguna pieza en producción"
      // />
    }
  }


  // Current process timer
  useEffect(() => {
    let cronometer = null;
    let deathTime = currentProcess.controlTime.deathTime;

    if (currentProcess.pinit){
      cronometer = setInterval(() => {
        setTotalTime(formaterMS(Date.now() - currentProcess.controlTime.startTime - deathTime));
      }, 1000/60);
    } else {
      setTotalTime(formaterMS(currentProcess.controlTime.pauseTime - deathTime - currentProcess.controlTime.startTime));
      clearInterval(cronometer);
    }
    return () => {
      clearInterval(cronometer)
    };
  }, [currentProcess.pinit, selectedMachineName])


  // Machine timer
  useEffect(() => {
    let cronometer = null;

    if (selectedMachine.productionInfo.running){
      cronometer = setInterval(() => {
        setMachineTime(formaterMS(Date.now() - selectedMachine.productionInfo.startTime));
      }, 1000/60);
    } else {
      setMachineTime(formaterMS(selectedMachine.productionInfo.pauseTime - selectedMachine.productionInfo.startTime));
      clearInterval(cronometer);
    }

    return () => clearInterval(cronometer);
  }, [selectedMachine.productionInfo.running, selectedMachineName])


  // Death time timer
  useEffect(() => {
    let cronometer = null;
    let lostTime = selectedMachine.productionInfo.deathTime;
    if (selectedMachine.productionInfo.pause){
      cronometer = setInterval(() => {
        setDeathTime(formaterMS(lostTime));
        lostTime += 100;
      }, 100);
    } else {
      setDeathTime(formaterMS(lostTime));
      clearInterval(cronometer);
    }

    return () => clearInterval(cronometer);
  }, [selectedMachineName, selectedMachine.productionInfo.pause])



  return (
    <div className="w-5/12 pr-5 pt-1 rounded-sm text-center self-center h-full ">
      {modalWindow}
      <label className="text-lg text-white font-semibold justify-center flex">
        {selectedMachineName}
      </label>

      <div className="flex w-full mb-1 gap-x-4">
        <div className="flex flex-col w-1/2">
          <label className="text-white">Tipo</label>
          <label className="bg-white text-black font-semibold rounded-sm">
            {selectedMachine.machineInfo.machiningType}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Operario</label>
          <label className="bg-white text-black font-semibold rounded-sm">
            {selectedMachine.machineInfo.operatorName}
          </label>
        </div>
      </div>

      <div className="flex gap-x-4 mb-1">
        <div className="flex flex-col w-full">
          <label className="text-white px-3">Proyecto</label>
          <label className="bg-white text-black font-semibold rounded-sm">
            {currentProcess.projectName}
          </label>
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-white">Cliente</label>
          <label className="bg-white text-black font-semibold rounded-sm">
            {currentProcess.client}
          </label>
        </div>
      </div>

      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-2/12">
          <label className="text-white">O.T.</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.projectOt}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Pieza en producción</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.part}
          </label>
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-white">Material</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.material}
          </label>
        </div>
      </div>

      <label 
        className="flex justify-center text-lg mt-3 font-semibold text-white"
      >
        Producción actual
      </label>
      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-6/12">
          <label className="text-white">Cantidad</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.quantity}
          </label>
        </div>
        <div className="flex flex-col w-7/12">
          <label className="text-white">Fabricadas</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.finished}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo estimado</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.time.estimatedTime}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo real</label>
          <label className="bg-white font-semibold rounded-sm">
            {totalTime}
          </label>
        </div>
      </div>

      <label 
        className="flex justify-center text-lg mt-3 font-semibold text-white"
      >
        Progreso
      </label>
      <div className="mt-1 h-fit">
        <div
          className="progress"
          style={{
            height: "26px",
            fontSize: "16px",
            fontWeight: "400",
            backgroundColor: "white",
          }}
        >
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-success"
            role="progressbar"
            style={{ width: progresPercentage() }}
          >
            {progresPercentage()}
          </div>
        </div>
      </div>

      <label 
        className="flex justify-center text-lg mt-3 font-semibold text-white"
      >
        Producción total
      </label>
      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-full">
          <label className="text-white">Piezas</label>
          <label className="bg-white font-semibold rounded-sm">
            {selectedMachine.productionInfo.totalParts}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo</label>
          <label className="bg-white font-semibold rounded-sm">
            {machineTime}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo muerto</label>
          <label className="bg-white font-semibold rounded-sm">
            {deathTime}
          </label>
        </div>
      </div>

      <label 
        className="flex justify-center text-lg mt-3 font-semibold text-white"
      >
        Opciones
      </label>

      <div title="buttons" className="flex flex-col mt-1 w-full gap-y-2">
        <div className="flex justify-start gap-x-2">
          <BlueButton
            btnText="Dibujo 2D"
          />
          <BlueButton
            btnText="Modelo 3D"
          />
          <BlueButton
            btnText="Programa CNC"
          />
          <BlueButton
            btnText="Registro"
          />
          <GreenButton
            btnText="Finalizar piezas"
            btnAction={finishParts}
          />
        </div>
      </div>

    </div>
  );
}

export default MachineInfo;
