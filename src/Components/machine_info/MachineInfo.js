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
  // Hooks
  const dispatch = useDispatch();


  // Redux state
  const selectedMachineName = useSelector(state => state.appIndex).productionWindow.find(machine => machine.selected === true).name

  const selectedMachine = useSelector(state => state.machineList).find(machine => machine.name === selectedMachineName)

  const selectedProject = useSelector(state => state.projectList).find(project => project.ot === selectedMachine.currentProcess.projectOt)


  // Local component state
  const [currentProcess, setCurrentProcess]= useState(selectedMachine.currentProcess)

  const [dayProduction, setDayProduction]= useState({
    totalParts: 0
  })

  const [selectedPart, setSelectedPart] = useState("")

  const [processTiming, setProcessTiming] = useState(selectedMachine.processTiming)


  // Timmer hooks
  const [deathTime, setDeathTime] = useState();
  const [machineTime, setMachineTime] = useState();
  const [totalTime, setTotalTime] = useState();


  const progresPercentage = () => {
    if (currentProcess.finishedParts === 0) {
      return "0%"
    } else {
      return ((currentProcess.finishedParts * 100) / currentProcess.partsQuantity).toFixed(2) + '%'
    }
  }

  
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


  useEffect(() => {
    if (selectedProject){
      setSelectedPart({
        ...selectedProject.parts.find(part => part.id === currentProcess.partId)
      })
    }
  }, [selectedProject])


  // Current process timer
  useEffect(() => {
    let cronometer = null;
    let deathTime = currentProcess.deathTime;

    if (currentProcess.pinit){
      cronometer = setInterval(() => {
        setTotalTime(formaterMS(Date.now() - currentProcess.controlTime.startTime - deathTime))
      }, 1000/60);
    } else {
      setTotalTime(formaterMS(currentProcess.pauseTime - deathTime - currentProcess.startTime))
      clearInterval(cronometer);
    }
    return () => {
      clearInterval(cronometer)
    };
  }, [currentProcess.pinit, selectedMachineName])


  // Machine timer
  useEffect(() => {
    let cronometer = null;

    if (selectedMachine.machineStatus.running){
      cronometer = setInterval(() => {
        setMachineTime(formaterMS(Date.now() - selectedMachine.currentProcess.startTime))
      }, 1000/60);
    } else {
      setMachineTime(formaterMS(selectedMachine.currentProcess.pauseTime - selectedMachine.currentProcess.startTime))
      clearInterval(cronometer);
    }

    return () => clearInterval(cronometer);
  }, [selectedMachine.machineStatus.running, selectedMachineName])


  // Death time timer
  useEffect(() => {
    let cronometer = null;
    let lostTime = selectedMachine.currentProcess.deathTime;
    if (selectedMachine.machineStatus.pause){
      cronometer = setInterval(() => {
        setDeathTime(formaterMS(lostTime));
        lostTime += 100;
      }, 100);
    } else {
      setDeathTime(formaterMS(lostTime));
      clearInterval(cronometer);
    }

    return () => clearInterval(cronometer);
  }, [selectedMachineName, selectedMachine.machineStatus.pause])



  return (
    <div className="text-center w-5/12 pt-2 mt-1">

      {modalWindow}

      <label className="text-lg text-white font-semibold justify-center flex">
        {selectedMachineName}
      </label>

      <div className="flex w-full mb-1 gap-x-4">
        <div className="flex flex-col w-1/2">
          <label className="text-white">Tipo de maquina</label>
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
        <div className="flex flex-col w-7/12">
          <label className="text-white px-3">Proyecto</label>
          <label className="bg-white text-black px-1 font-semibold rounded-sm text-ellipsis whitespace-nowrap overflow-hidden">
            {
              selectedProject ?
              selectedProject.projectInfo.name :
              "N/A"
            }
          </label>
        </div>
        <div className="flex flex-col w-6/12">
          <label className="text-white">Cliente</label>
          <label className="bg-white text-black font-semibold rounded-sm">
          {
              selectedProject ?
              selectedProject.projectInfo.client :
              "N/A"
            }
          </label>
        </div>
      </div>

      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-2/12">
          <label className="text-white">O.T.</label>
          <label className="bg-white font-semibold rounded-sm">
            {selectedMachine.currentProcess.projectOt}
          </label>
        </div>
        <div className="flex flex-col w-7/12">
          <label className="text-white">Pieza en producción</label>
          <label className="bg-white font-semibold rounded-sm">
            {
              selectedPart === "" ?
              "N/A" :
              selectedPart.partInfo.name
            }
          </label>
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-white">Material</label>
          <label className="bg-white font-semibold rounded-sm">
          {
              selectedPart === "" ?
              "N/A" :
              selectedPart.partInfo.material
            }
          </label>
        </div>
      </div>

      <label 
        className="flex justify-center text-lg mt-3 font-semibold text-white"
      >
        Proceso actual
      </label>
      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-6/12">
          <label className="text-white">Cantidad</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.partsQuantity}
          </label>
        </div>
        <div className="flex flex-col w-7/12">
          <label className="text-white">Terminadas</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.finishedParts}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo estimado</label>
          <label className="bg-white font-semibold rounded-sm">
            {currentProcess.estimatedTime}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo real</label>
          <label className="bg-white font-semibold rounded-sm">
            {"N/A"}
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
            {selectedMachine.dayProduction.totalParts}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo</label>
          <label className="bg-white font-semibold rounded-sm">
            {"N/A"}
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo muerto</label>
          <label className="bg-white font-semibold rounded-sm">
            {processTiming.deathTime}
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
