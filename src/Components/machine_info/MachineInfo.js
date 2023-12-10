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
  const selectedMachineName = useSelector(state => state.appIndex).productionWindow
    .find(machine => machine.selected === true).name

  const selectedMachine = useSelector(state => state.machineList)
    .find(machine => machine.name === selectedMachineName)

  const partInProcess = selectedMachine.parts.find(part => part.status === "En proceso")


  // Local component state
  const [processTiming, setProcessTiming] = useState(selectedMachine.processTiming)

  // Progress percentage bar calculator
  const progressPrecentage = () => {
    if (partInProcess === undefined){
      return "0%"
    } else {
      let totalParts = partInProcess.quantity
      let finishedParts = partInProcess.finishedParts

      let progress = (parseInt(finishedParts) / parseInt(totalParts)) * 100

      return `${progress.toFixed(1)}%`
    }
  }

  
  // Button functions
  const finishParts = () => {
    console.log("finish parts")
  }


  // Modal window selector
  let modalWindow
  const modalStatus = useSelector(state => state.modalStatus)


  return (
    <div className="text-center w-5/12 mt-2">

      {modalWindow}

      <label className="text-lg text-white font-semibold justify-center flex">
        {selectedMachineName}
      </label>

      <div 
        className="flex w-full mb-1 gap-x-4"
      >
        <div 
          className="flex flex-col w-1/2"
        >
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


      <label 
        className="flex justify-center text-lg mt-3 font-semibold text-white"
      >
        Proceso actual
      </label>

      <div className="flex gap-x-4 mb-1">
        <div className="flex flex-col w-7/12">
          <label className="text-white px-3">Proyecto</label>
          <label
            title={partInProcess ? partInProcess.project : "N/A"}
            className="bg-white text-black px-1 font-semibold rounded-sm
              text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {
              partInProcess ?
              partInProcess.project :
              "N/A"
            }
          </label>
        </div>

        <div className="flex flex-col w-6/12">
          <label className="text-white">Cliente</label>
          <label 
            className="bg-white text-black font-semibold rounded-sm"
          >
            {
              partInProcess ?
              partInProcess.client :
              "N/A"
            }
          </label>
        </div>
      </div>

      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-2/12">
          <label className="text-white">O.T.</label>
          <label 
            className="bg-white font-semibold rounded-sm"
          >
            {
              partInProcess ?
              partInProcess.ot :
              "N/A"
            }
          </label>
        </div>

        <div className="flex flex-col w-7/12">
          <label className="text-white">Pieza en producción</label>
          <label 
            className="bg-white font-semibold rounded-sm"
          >
            {
              partInProcess ?
              partInProcess.name :
              "N/A"
            }
          </label>
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-white">Material</label>
          <label 
            className="bg-white font-semibold rounded-sm"
          >
            {
              partInProcess ?
              partInProcess.material :
              "N/A"
            }
          </label>
        </div>
      </div>

      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-6/12">
          <label className="text-white">Cantidad</label>
          <label 
            className="bg-white font-semibold rounded-sm"
          >
            {
              partInProcess ?
              partInProcess.quantity :
              "N/A"
            }
          </label>
        </div>

        <div className="flex flex-col w-7/12">
          <label className="text-white">Terminadas</label>
          <label 
            className="bg-white font-semibold rounded-sm"
          >
            {
              partInProcess ?
              partInProcess.finishedParts :
              "N/A"
            }
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo estimado</label>
          <label 
            className="bg-white font-semibold rounded-sm"
          >
            {
              partInProcess ?
              `${partInProcess.estimatedTime.hours} hrs ${partInProcess.estimatedTime.minutes} min` :
              "N/A"
            }
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-white">Tiempo real</label>
          <label 
            className="bg-white font-semibold rounded-sm"
          >
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
            style={{ width: progressPrecentage()}}
          >
            {progressPrecentage()}
          </div>
        </div>
      </div>

      <label 
        className="flex justify-center text-lg mt-3 font-semibold text-white"
      >
        Producción diaria
      </label>

      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-full">
          <label className="text-white">Piezas</label>
          <label 
            className="bg-white font-semibold rounded-sm"
          >
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
