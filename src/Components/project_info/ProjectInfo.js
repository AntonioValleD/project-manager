// CSS documents
import "animate.css"

// Redux toolkit hooks
import { useSelector, useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeProjectOption } from "../../features/appIndexSlice/appIndexStatusSlice"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"

// Components
import { DateTime } from "luxon"
import toast, { Toaster } from "react-hot-toast"
import "bootstrap/dist/css/bootstrap.min.css"
import BlueButton from "../assets/buttons/BlueButton"
import GreenButton from "../assets/buttons/GreenButton"
import NewProjectModal from "../modals/NewProjectModal"


function ProjectInfo() {
  // Hooks
  const dispatch = useDispatch();


  // Global redux state
  const selectedProjectOt = useSelector((state) => state.appIndex).projectWindow
    .find((project) => project.selected === true).ot

  const selectedProject = useSelector((state) => state.projectList)
    .find((project) => project.ot === selectedProjectOt)

  const selectedProjectInfo = selectedProject.projectInfo


  const progresPercentage = () =>{
    if (parseInt(selectedProjectInfo.finishedParts) === 0) {
      return "0%"
    } else if (parseInt(selectedProjectInfo.partsQuantity) === 0) {
      return "100%"
    } else {
      return ((parseInt(selectedProjectInfo.finishedParts) * 100) / 
        parseInt(selectedProjectInfo.partsQuantity)).toFixed(2) + '%'
    }
  }


  // Button functions
  const editInfo = () => {
    dispatch(changeModalStatus({
      modalName: "newProject",
      modalStatus: true
    }))
  }

  const openWorkRequest = () => {
    dispatch(changeProjectOption({
      optionName: "workRequest",
      optionStatus: true
    }))
  }

  const openMaterialRequest = () => {
    dispatch(changeProjectOption({
      optionName: "materialRequest",
      optionStatus: true
    }))
  }

  const openReeworks = () => {
    dispatch(changeProjectOption({
      optionName: "reeworks",
      optionStatus: true
    }))
  }

  const openActivityReg = () => {
    dispatch(changeProjectOption({
      optionName: "activityReg",
      optionStatus: true
    }))
  }


  const successNotify = (message) => {
    toast.success(message);
  }


  // Modal window selector
  let modalWindow
  const modalStatus = useSelector(state => state.modalStatus)
  if (modalStatus.newProject){
    modalWindow = <NewProjectModal 
      textTitle="Editar proyecto"
      projectOt={selectedProjectOt}
      projectInfo={selectedProjectInfo}
      update={true}
      successFn={successNotify}
    />
  }


  return (
    <div 
      className="text-center text-white ml-px mt-1"
      style={{width: "37vw"}}
    >
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

      <label className="text-lg text-white font-semibold justify-center flex">
        Información del proyecto
      </label>

      <div className="flex flex-col w-full mb-1">
        <label>Proyecto</label>

        <label
          className="overflow-x-auto bg-white text-black font-semibold rounded-sm
            whitespace-nowrap text-ellipsis overflow-hidden px-2"
          title={selectedProjectInfo.name}
        >
          {selectedProjectInfo.name}
        </label>
      </div>


      <div className="flex gap-x-4 mb-1">
        <div className="flex flex-col">
          <label className="text-white px-3">O.T.</label>
          <label className="bg-white text-black font-semibold rounded-sm">
            {selectedProject.ot}
          </label>
        </div>

        <div className="flex flex-col">
          <label>Microsip</label>
          <label className="bg-white text-black font-semibold rounded-sm">
            {selectedProjectInfo.microsipOt}
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label>Cliente</label>
          <label className="bg-white text-black font-semibold rounded-sm">
            {selectedProjectInfo.client}
          </label>
        </div>
      </div>


      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-full">
          <label>Solicitante</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {selectedProjectInfo.clientUser}
          </label>
        </div>

        <div className="flex flex-col w-7/12">
          <label>O.C.</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {selectedProjectInfo.oc}
          </label>
        </div>

        <div className="flex flex-col w-5/12">
          <label>Estado</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {selectedProjectInfo.status}
          </label>
        </div>
      </div>


      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-full">
          <label>Fecha de inicio</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {DateTime.fromISO(selectedProjectInfo.startDate).toLocaleString(DateTime.DATETIME_MED)}
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label>Fecha estimada</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {DateTime.fromISO(selectedProjectInfo.estimatedFinishDate).toLocaleString(DateTime.DATE_MED)}
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label>Fecha de cierre</label>

          <label className="bg-white font-semibold rounded-sm text-black">
            {
              selectedProjectInfo.finishDate === "" ?
              "N/A":
              DateTime.fromISO(selectedProjectInfo.finishDate).toLocaleString(DateTime.DATETIME_MED)
            }
          </label>
        </div>
      </div>


      <label className="flex justify-center text-lg mt-3 font-semibold text-white">
        {"Piezas (cantidades)"}
      </label>


      <div className="flex gap-x-4 justify-between mb-1">
        <div className="flex flex-col w-full">
          <label>Piezas totales</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {selectedProjectInfo.totalPartUnits}
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label>Modelos</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {selectedProjectInfo.partsQuantity}
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label>Liberados</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {selectedProjectInfo.finishedParts}
          </label>
        </div>

        <div className="flex flex-col w-full">
          <label>Rechazadas</label>
          <label className="bg-white font-semibold rounded-sm text-black">
            {selectedProjectInfo.rejectedPartUnits}
          </label>
        </div>
      </div>


      <label className="flex justify-center text-lg mt-3 font-semibold text-white">
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
            className="progress-bar progress-bar-striped bg- progress-bar-animated bg-success"
            role="progressbar"
            style={{ width: progresPercentage() }}
          >
            {progresPercentage()}
          </div>
        </div>
      </div>


      <label className="flex justify-center text-lg mt-3 font-semibold text-white">
        Opciones
      </label>


      <div className="flex flex-col mt-1 w-full gap-y-2">
        <div className="flex justify-start gap-x-2">
          <BlueButton 
            btnText="Editar"
            btnAction={editInfo}
          />

          <BlueButton 
            btnText="Orden de trabajo"
            btnAction={openWorkRequest}
          />

          <BlueButton 
            btnText="Solicitudes de insumos"
            btnAction={openMaterialRequest}
          />

          <BlueButton 
            btnText="Retrabajos"
            btnAction={openReeworks}
          />
        </div>

        <div className="flex justify-between">
          <BlueButton 
            btnText="Registro de actividad"
            btnAction={openActivityReg}
          />

          <GreenButton
            btnText="Finalizar proyecto"
          />
        </div>
      </div>

    </div>
  );
}

export default ProjectInfo;
