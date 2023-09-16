import { useSelector, useDispatch } from "react-redux";
import { deleteMeasure, selectQualityUnit } from "../../features/partsSlice.js/partsSlice";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import toast, { Toaster } from "react-hot-toast";
import DrawingViewer from "./DrawingViewer";
import QualityButtons from "./QualityButtons";
import QualityTable from "./QualityTable";
import NewDeleteButton from "../assets/buttons/NewDelete";
import BlueButton from "../assets/buttons/BlueButton";
import AddMeasureModal from "../modals/AddMeasureModal";
import NavegationButtons from "../assets/buttons/NavegationButtons";
import AddRealMeasure from "../modals/AddRealMeasure";
import SetUpQualityInspectionModal from "../modals/SetUpQualityInspectionModal";

function QualityWindow() {
  // Hooks
  const dispatch = useDispatch();


  // Redux selectors
  const selectedTabOt = useSelector(state => state.projectTabs).find(tab => tab.selected === true).id;

  const selectedPartId = useSelector(state => state.selectedPart).find(part => part.ot === selectedTabOt).partId;

  const selectedPartInfo = useSelector(state => state.partList).find(project => project.ot === selectedTabOt).parts.find(part => part.id === selectedPartId);

  const selectedPartUnit = selectedPartInfo.qualityTable.find(unit => unit.selected === true);

  const selectedMeasure = selectedPartUnit?.measures.find(measure => measure.selected === true);


  // Button functions
  const addMeasureItem = () => {
    dispatch(changeModalStatus(
      {
        modalName: "addMeasure",
        modalStatus: true,
      }
    ))
  };

  const deleteMeasureItem = () => {
    if (!selectedMeasure){
      toast.error("No ha seleccionado ninguna medida para eliminar");
    } else {
      dispatch(deleteMeasure(
        {
          ot: selectedTabOt,
          partId: selectedPartId,
        }
      ));
      toast.success("La medida se eliminó correctamente");
    }
  };

  const editMeasureItem = () => {
    dispatch(changeModalStatus({
      modalName: "updateMeasure",
      modalStatus: true,
    }))
  };


  // Navegation buttons functions
  const previousUnit = () => {
    let unitId;
    if (selectedPartUnit){
      if (parseInt(selectedPartUnit.unitId) <= 1){
        unitId = "1"
      } else {
        unitId = (parseInt(selectedPartUnit.unitId) - 1).toString();
      }
    } else {
      unitId = "1";
    }

    dispatch(selectQualityUnit({
      ot: selectedTabOt,
      partId: selectedPartId,
      unitId: unitId,
    }))
  }

  const nextUnit = () => {
    let unitId;
    if (selectedPartUnit){
      if (parseInt(selectedPartUnit.unitId) >= parseInt(selectedPartInfo.quantity)){
        unitId = selectedPartInfo.quantity;
      } else {
        unitId = (parseInt(selectedPartUnit.unitId) + 1).toString();
      }
    } else {
      unitId = "1";
    }

    dispatch(selectQualityUnit({
      ot: selectedTabOt,
      partId: selectedPartId,
      unitId: unitId,
    }))
  }


  const successNotify = (message) => {
    toast.success(message);
  };


  // Modal window selector
  const modalStatus = useSelector(state => state.modalStatus);
  let modalWindow;
  if (modalStatus.addMeasure){
    modalWindow = <AddMeasureModal
      textTitle="Nueva medida"
      successFn={successNotify}
    />
  } else if (modalStatus.addRealMeasure){
    modalWindow = <AddRealMeasure
      realMeasure={selectedPartUnit.measures.find(measure => measure.selected === true).measure}
      textTitle="Medición"
      successFn={successNotify}
    />
  } else if (modalStatus.updateMeasure){
    if (!selectedMeasure){
      toast.error("No ha seleccionado ninguna medida para editar");
      dispatch(changeModalStatus({
        modalName: "updateMeasure",
        modalStatus: false,
      }))
    } else {
      modalWindow = <AddMeasureModal
      textTitle="Nueva medida"
      successFn={successNotify}
      measureInfo={selectedMeasure}
    />
    }
  } else if (modalStatus.updateInspectionSettings){
    modalWindow = <SetUpQualityInspectionModal
      textTitle="Actualizar configuración"
      successFn={successNotify}
      inspectionSettings={selectedPartInfo.qualitySettings}
    />
  }


  return (
    <div className="pl-2 pr-4 flex w-full h-fit justify-between gap-x-2">
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
      <div className="h-fit items-center ">
        <DrawingViewer/>
      </div>
      <div className="flex flex-col justify-start gap-y-4 items-start w-full pt-2">
        <div className="w-full gap-y-2 flex flex-col">
          <div className="flex justify-center">
            <NavegationButtons
              textTitle={"Pieza"}
              unitId={selectedPartUnit ? selectedPartUnit.unitId : "0"}
              btnPreviousUnit={previousUnit}
              btnNextUnit={nextUnit}
            />
          </div>
          <div className="flex gap-x-2 justify-start">
            <NewDeleteButton
              newBtn={addMeasureItem}
              deleteBtn={deleteMeasureItem}
            />
            <BlueButton 
              btnText="Editar"
              btnAction={editMeasureItem}
            />
          </div>
          <QualityTable/>
        </div>
        <QualityButtons/>
      </div>
    </div>
  );
}
  
export default QualityWindow;
  