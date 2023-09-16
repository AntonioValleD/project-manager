import RedButton from "../assets/buttons/RedButton";
import BlueButton from "../assets/buttons/BlueButton";
import { useSelector, useDispatch } from "react-redux";
import { unselectOption } from "../../features/partOptionSlice/partOptionSlice";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";

function QualityButtons() {
  // Hooks
  const dispatch = useDispatch();


  // Redux state
  const selectedTabOt = useSelector((state) => state.projectTabs).find(
    (tab) => tab.selected === true
  ).id;


  // Button functions
  const openSettings = () => {
    dispatch(changeModalStatus({
      modalName: "updateInspectionSettings",
      modalStatus: true,
    }))
  }

  const closeProcesses = () => {
    dispatch(unselectOption(selectedTabOt));
  };


  return (
    <div className="flex gap-x-2 justify-start w-full">
      <BlueButton
        btnText="Ver reporte"
      />
      <BlueButton
        btnText="Configuración"
        btnAction={openSettings}
      />
      <RedButton 
        btnText="Cerrar" 
        btnAction={closeProcesses}
      />
    </div>
  );
}

export default QualityButtons;
