import BlueButton from "../assets/buttons/BlueButton";
import RedButton from "../assets/buttons/RedButton";
import NewPartModal from "../modals/NewPartModal";
import RequestMaterialModal from "../modals/RequestMaterialModal";
import SetUpQualityInspectionModal from "../modals/SetUpQualityInspectionModal";
import { useSelector, useDispatch } from "react-redux";
import { deleteSelectedPart } from "../../features/selectedPartSlice/selectedPartSlice";
import { selectOption } from "../../features/partOptionSlice/partOptionSlice";
import planoPdf from "../assets/documents/Plano.pdf";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import toast, { Toaster } from "react-hot-toast";


function PartInfo() {
  // Hooks
  const dispatch = useDispatch();


  // Redux toolkit states
  const selectedTabOt = useSelector((state) => state.projectTabs).find(tab => tab.selected === true).id;

  const selectedPartId = useSelector((state) => state.selectedPart).find(part => part.ot === selectedTabOt).partId;

  const partInfo = useSelector((state) => state.partList).find(project => project.ot === selectedTabOt).parts.find((part) => part.id === selectedPartId);


  // Close modal window function
  const closePart = () => {
    dispatch(deleteSelectedPart(selectedTabOt));
  };


  // Progres bar function
  const progresPercentage = () => {
    if (partInfo.finished === "0") {
      return "0%";
    } else if (partInfo.quantity === "0") {
      return "100%";
    } else {
      return ((partInfo.finished * 100) / partInfo.quantity).toFixed(2) + '%';
    }
  };


  // Part option functions
  const openPartProcesses = () => {
    dispatch(selectOption(
      {
        ot: selectedTabOt,
        option: 'processes',
      }
    ))
  };

  const openQualityPanel = () => {
    if (partInfo.qualitySettings){
      dispatch(selectOption(
        {
          ot: selectedTabOt,
          option: 'quality',
        }
      ))
    } else {
      dispatch(changeModalStatus({
        modalName: "setUpQualityInspection",
        modalStatus: true,
      }))
    }
  };

  const editPartInfo = () => {
    dispatch(changeModalStatus({
      modalName: "newPart",
      modalStatus: "true"
    }))
  };

  const requestMaterialAction = () => {
    dispatch(changeModalStatus({
      modalName: "requestMaterial",
      modalStatus: true,
    }))
  };

  const reworkRequest = () => {
    console.log("ReworkRequest");
  };


  // Success notify function
  const successNotify = (message) => {
    toast.success(message);
  }


  // Modal window selector
  let modalWindow;
  const modalStatus = useSelector(state => state.modalStatus);

  if (modalStatus.newPart){
    modalWindow = <NewPartModal 
      textTitle="Editar pieza"
      partInfo={partInfo}
      successFn={successNotify}
    />
  } else if (modalStatus.requestMaterial){
    modalWindow = <RequestMaterialModal
      textTitle="Solicitar material"
      successFn={successNotify}
    />
  } else if (modalStatus.setUpQualityInspection){
    modalWindow = <SetUpQualityInspectionModal
      textTitle="Configurar inspección"
    />
  }


  // Component
  return (
    <div className="flex w-full h-fit items-center text-white">
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

      <div className="w-5/12 pl-2 pr-3 rounded-sm text-center h-full">
        <label className="text-lg text-white font-semibold justify-center flex">
          Información de pieza
        </label>

        <div className="flex gap-x-4 mb-1">
          <div className="flex flex-col w-4/12">
            <label>No.</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.id}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Nombre</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.partName}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Ensamble</label>
            <label className="bg-white text-black font-semibold rounded-sm">
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
              {partInfo.qualityProcess}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Material</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.material}
            </label>
          </div>
        </div>

        <div className="flex gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label>Dimensiones generales</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.generalDimentions}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Dimensiones del material</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.materialDimentions}
            </label>
          </div>
          <div className="flex flex-col w-2/12">
            <label>Unidades</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.dimentionUnits}
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
              {partInfo.previousProcess}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Proceso actual</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.currentProcess}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label>Siguiente proceso</label>
            <label className="bg-white text-black font-semibold rounded-sm">
              {partInfo.nextProcess}
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

        <div title="buttons" className="flex flex-col mt-1 w-full gap-y-2">
          <div className="flex justify-start gap-x-2">
            <BlueButton
              btnText="Editar"
              btnAction={editPartInfo}
            />
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
              btnText="Inspeccionar pieza"
              btnAction={openQualityPanel}
            />
          </div>
          
          <div className="flex justify-start gap-x-2">
            <BlueButton
              btnText="Solicitar material"
              btnAction={requestMaterialAction}
            />
            <BlueButton
              btnText="Ruta de procesos"
              btnAction={openPartProcesses}
            />
            <BlueButton
              btnText="Solicitar retrabajo"
              btnAction={reworkRequest}
            />
          </div>

          <div className="flex justify-end pt-3">
            <RedButton
              btnText="Regresar"
              btnAction={closePart}
            />
          </div>

        </div>
      </div>
      <div className="h-fit items-center ">
        <object
          aria-label="No se encontro el plano"
          type="application/pdf"
          data={planoPdf}
          style={{ height: "90vh", width: "60vw" }}
        />
      </div>
    </div>
  );
}

export default PartInfo;
