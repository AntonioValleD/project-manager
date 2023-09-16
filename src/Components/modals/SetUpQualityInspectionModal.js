import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import { selectOption } from "../../features/partOptionSlice/partOptionSlice";
import { updateInspectionSettings } from "../../features/partsSlice.js/partsSlice";
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";
import AlertInfoModal from "./AlertInfoModal";


function SetUpQualityInspectionModal(props) {
  // Project info and part info
  const selectedOt = useSelector(state => state.projectTabs).find(tab => tab.selected === true).id;

  const partId = useSelector((state) => state.selectedPart).find(part => part.ot === selectedOt).partId;


  // Hooks
  const dispatch = useDispatch();


  // Local state
  const [error, setError] = useState({
    status: false,
    message: '',
  }); 

  const [inspectionSettings, setInspectionSettings] = useState({
    userName: "Josue Clemente Perdomo",
    units: "",
    moreTolerance: 0,
    lessTolerance: 0,
    equipment: "",
    visualInspection: false,
    dimentionalInspection: false,
  });


  // Input values
  const inputValues = (event) => {
    setInspectionSettings({
      ...inspectionSettings,
      [event.target.name]: (event.target.value).toString(),
    });
  };

  const inputCheckBox = (inputName) => {
    if (inspectionSettings[inputName]){
      setInspectionSettings({
        ...inspectionSettings,
        [inputName]: false,
      })
    } else {
      setInspectionSettings({
        ...inspectionSettings,
        [inputName]: true,
      })
    }
  };


  // Close modal window 
  const closeModal = () => {
    if (props.inspectionSettings){
      dispatch(changeModalStatus({
        modalName: "updateInspectionSettings",
        modalStatus: false,
      }))
    } else {
      dispatch(changeModalStatus({
        modalName: "setUpQualityInspection",
        modalStatus: false,
      }))
    }
  };


  // Submit new part info
  const submitNewRequest = () => {
    if (inspectionSettings.units === "") {
      setError({
        status: true,
        message: "Especifique la unidad de medida"
      });
      unitsInputRef.current.focus();
      return;
    } else if (inspectionSettings.equipment === "") {
      setError({
        status: true,
        message: "Especifique el equipo a utilizar"
      });
      equipmentInputRef.current.focus();
      return;
    } else if (!inspectionSettings.visualInspection && !inspectionSettings.dimentionalInspection){
      setError({
        status: true,
        message: "Seleccione al menos un tipo de inspección"
      });
      return;
    }

    if (!props.inspectionSettings){
      saveInspectionSettings();
    } else {
      updateInspectionStettings();
    }
  };


  // Sumbit material request
  const saveInspectionSettings = () => {
    dispatch(updateInspectionSettings({
      ot: selectedOt,
      partId: partId,
      inspectionSettings: inspectionSettings,
    }))

    dispatch(selectOption(
      {
        ot: selectedOt,
        option: 'quality',
      }
    ))
    
    closeModal();
  };


  // Update part info function
  const updateInspectionStettings = () => {
    dispatch(updateInspectionSettings({
      ot: selectedOt,
      partId: partId,
      inspectionSettings: inspectionSettings,
    }))

    props.successFn("La configuración se actualizó correctamente");

    closeModal();
  };


  // Input references
  const moreToleranceInputRef = useRef(null);
  const lessToleranceInputRef = useRef(null);
  const unitsInputRef = useRef(null);
  const equipmentInputRef = useRef(null);


  // Error modal controller
  let errorInfo;
  if (error.status){
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
  }


  useEffect(() => {
    if (props.inspectionSettings){
      setInspectionSettings({
        ...props.inspectionSettings,
      })
    }
  }, [props.inspectionSettings])


  return (
    <div
      title="Overlay"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
      className="fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left"
    >
      <div
        title="Modal Container"
        style={{ width: "500px" }}
        className="text-black h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700 text-center"
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 


        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-10/12">
            <label className="font-medium">Nombre del inspector</label>
            <label
              className="border-blue-950 border-2 px-1 font-regular rounded-sm text-center bg-gray-200"
              name="userName"
            >
              {inspectionSettings.userName}
            </label>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium text-center">Tolerancia general</label>
            <div className="flex">
              <label className="text-xl text-center pr-1">+</label>
              <input
                className="w-full border-blue-950 border-2 px-1 font-regular  rounded-sm"
                ref={moreToleranceInputRef}
                value={inspectionSettings.moreTolerance}
                name="moreTolerance"
                type="number"
                onChange={(event) => inputValues(event)}
              />
              <label className="text-xl pr-1 pl-2">-</label>
              <input
                className="w-full border-blue-950 border-2 px-1 font-regular  rounded-sm"
                ref={lessToleranceInputRef}
                value={inspectionSettings.lessTolerance}
                name="lessTolerance"
                type="number"
                onChange={(event) => inputValues(event)}
              />
            </div>
          </div>
        </div>


        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Unidades</label>
            <select
              ref={unitsInputRef}
              value={inspectionSettings.units}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="units"
              onChange={(event) => inputValues(event)}
            >
              <option value={"empty"}></option>
              <option value={"in"}>in</option>
              <option value={"ft"}>ft</option>
              <option value={"mm"}>mm</option>
              <option value={"cm"}>cm</option>
              <option value={"m"}>m</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Equipo de medición</label>
            <select
              ref={equipmentInputRef}
              value={inspectionSettings.equipment}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="equipment"
              onChange={(event) => inputValues(event)}
            >
              <option value={"empty"}></option>
              <option value={"vernier"}>Vernier</option>
              <option value={"micrometro"}>Micrómetro</option>
              <option value={"faro"}>Brazo Faro</option>
              <option value={"optical"}>Comparador óptico</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Tipo de inspección</label>

            <div className="flex items-center justify-center gap-x-2">
              <div className="flex items-center gap-x-1">
                <input
                  className="w-full border-blue-950 border-2 px-1 font-regular  rounded-sm h-4"
                  name="visualInspection"
                  type="checkbox"
                  checked={inspectionSettings.visualInspection}
                  onChange={() => inputCheckBox("visualInspection")}
                />
                  Visual
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  className="w-full border-blue-950 border-2 px-1 font-regular  rounded-sm h-4"
                  name="dimentionalInspection"
                  type="checkbox"
                  checked={inspectionSettings.dimentionalInspection}
                  onChange={() => inputCheckBox("dimentionalInspection")}
                />
                  Dimensional
              </div>
            </div>
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-2">
          <GreenButton btnText="Guardar" btnAction={submitNewRequest} />
          <RedButton btnText="Cancelar" btnAction={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default SetUpQualityInspectionModal;