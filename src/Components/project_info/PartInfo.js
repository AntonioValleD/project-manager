import BlueButton from "../assets/buttons/BlueButton"
import RedButton from "../assets/buttons/RedButton"
import NewPartModal from "../modals/NewPartModal"
import RequestMaterialModal from "../modals/RequestMaterialModal"
import SetUpQualityInspectionModal from "../modals/SetUpQualityInspectionModal"
import { useSelector, useDispatch } from "react-redux"
import { closePart, changePartAction } from "../../features/appIndexSlice/appIndexStatusSlice"
import planoPdf from "../assets/documents/Plano.pdf"
import toast, { Toaster } from "react-hot-toast"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"


function PartInfo() {
  // Hooks
  const dispatch = useDispatch()


  // Redux toolkit states
  const projectIndex = useSelector(state => state.appIndex).projectWindow.find(project => project.selected === true)

  const selectedPartId = projectIndex.partOptions.selectedPart

  const selectedPart = useSelector(state => state.projectList).find(project => project.ot === projectIndex.ot).parts.find(part => part.id === selectedPartId)

  const partInfo = selectedPart.partInfo

  const partDimentions = selectedPart.dimentions

  const processList = selectedPart.processPath.processList

  const currentProcess = processList.find(process => process.status === "En proceso")


  // Close modal window function
  const closeSelectedPart = () => {
    dispatch(closePart({
      ot: projectIndex.ot
    }))
  }


  // Progres bar function
  const progresPercentage = () => {
    if (partInfo.finished === 0) {
      return "0%";
    } else if (partInfo.quantity === 0) {
      return "100%";
    } else {
      return ((partInfo.finished * 100) / partInfo.quantity).toFixed(2) + '%';
    }
  }


  // Process finder
  const previousProcess = () => {
    if (currentProcess){
      return processList[currentProcess.index - 1].name
    } else {
      return "N/A"
    }
  }

  const nextProcess = () => {
    if (currentProcess){
      let nextProcessInfo = processList[currentProcess.index + 1]
      if (nextProcessInfo){
        return nextProcessInfo.name
      } else {
        return "N/A"
      }
    } else {
      return "N/A"
    }
  }


  // Part option functions
  const openProcessPath = () => {
    dispatch(changePartAction({
      actionName: "processPath",
      actionStatus: true
    }))
  }

  const openInspectPart = () => {
    dispatch(changePartAction({
      actionName: "inspectPart",
      actionStatus: true
    }))
  }

  const openEditPart = () => {
    dispatch(changeModalStatus({
      modalName: "newPart",
      modalStatus: true
    }))
  }

  const openRequestMaterial = () => {
    dispatch(changeModalStatus({
      modalName: "requestMaterial",
      modalStatus: true
    }))
  }

  const openReworkRequest = () => {
    dispatch(changePartAction({
      actionName: "reeworkRequest",
      actionStatus: true
    }))
  }


  // Success notify function
  const successNotify = (message) => {
    toast.success(message)
  }


  // Modal window selector
  let modalWindow;
  const modalStatus = useSelector(state => state.modalStatus)

  if (modalStatus.newPart){
    modalWindow = <NewPartModal 
      textTitle="Editar pieza"
      partId={selectedPartId}
      partInfo={partInfo}
      partDimentions={partDimentions}
      successFn={successNotify}
      update={true}
    />
  } else if (modalStatus.requestMaterial){
    modalWindow = <RequestMaterialModal
      textTitle="Solicitar material"
      successFn={successNotify}
      partInfo={partInfo}
      partDimentions={partDimentions}
    />
  } else if (modalStatus.setUpQualityInspection){
    modalWindow = <SetUpQualityInspectionModal
      textTitle="Configurar inspección"
    />
  }


  // Component
  return (
    <div className="flex w-full h-fit items-center text-white ml-1">
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

      <div 
        className="pr-3 rounded-sm text-center h-full"
        style={{width: "39vw"}}
      >
        <label className="text-lg text-white font-semibold justify-center flex">
          Información de pieza
        </label>

        <div className="flex gap-x-4 mb-1">
          <div className="flex flex-col w-5/12">
            <label>No.</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {selectedPartId}
            </label>
          </div>
          <div className="flex flex-col w-6/12">
            <label>Pieza</label>
            <label 
              className="bg-white text-black font-semibold rounded-sm whitespace-nowrap text-ellipsis overflow-hidden px-1"
              title={partInfo.name}
            >
              {partInfo.name}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Ensamble</label>
            <label className="bg-white text-black font-semibold rounded-sm whitespace-nowrap text-ellipsis overflow-hidden">
              {partInfo.assembly}
            </label>
          </div>
        </div>

        <div className="flex gap-x-4 mb-1">
          <div className="flex flex-col w-7/12">
            <label>Tipo</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.type}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Ubicacion</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.location}
            </label>
          </div>
          <div className="flex flex-col w-9/12">
            <label>Calidad</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {selectedPart.qualityInfo.status}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Material</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {selectedPart.materialRequest.status}
            </label>
          </div>
        </div>

        <div className="flex gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label>Dimensiones generales</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partDimentions.generalDimentions}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Dimensiones del material</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partDimentions.materialDimentions}
            </label>
          </div>
          <div className="flex flex-col w-2/12">
            <label>Unidades</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partDimentions.units}
            </label>
          </div>
        </div>

        <label 
          className="flex justify-center text-lg mt-3 font-semibold text-white"
        >
          Proceso
        </label>

        <div className="flex gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label>Proceso anterior</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {previousProcess()}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Proceso actual</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {
                currentProcess ?
                currentProcess.name :
                "N/A"
              }
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Siguiente proceso</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {nextProcess()}
            </label>
          </div>
        </div>

        <div className="flex gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label>Cantidad</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.quantity}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Liberadas</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.finished}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Restantes</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.quantity - partInfo.finished}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Rechazadas</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.rejected}
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
              className="progress-bar progress-bar-striped bg- progress-bar-animated bg-success"
              role="progressbar"
              style={{width: progresPercentage()}}
            >
              {progresPercentage()}
            </div>
          </div>
        </div>

        <label 
          className="flex justify-center text-lg mt-3 mb-1 font-semibold text-white"
        >
          Opciones
        </label>

        <div className="flex flex-col mt-1 w-full gap-y-2">
          <div className="flex justify-start gap-x-2 gap-y-2 flex-wrap">
            <BlueButton
              btnText="Editar"
              btnAction={openEditPart}
            />
            <BlueButton
              btnText="Inspeccionar pieza"
              btnAction={openInspectPart}
            />
            <BlueButton
              btnText="Solicitar material"
              btnAction={openRequestMaterial}
            />
            <BlueButton
              btnText="Administrar procesos"
              btnAction={openProcessPath}
            />
            <BlueButton
              btnText="Solicitar retrabajo"
              btnAction={openReworkRequest}
            />
          </div>

          <div className="flex justify-end pt-3">
            <RedButton
              btnText="Regresar"
              btnAction={closeSelectedPart}
            />
          </div>
        </div>
      </div>
      <div className="h-fit items-center mt-1">
        <object
          aria-label="No se encontro el plano"
          type="application/pdf"
          data={planoPdf}
          style={{ height: "93vh", width: "60vw" }}
        />
      </div>
    </div>
  );
}

export default PartInfo;
