import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import { updateRealMeasure } from "../../features/partsSlice.js/partsSlice";
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";
import AlertInfoModal from "./AlertInfoModal";


function AddRealMeasure(props) {
  // Hooks
  const dispatch = useDispatch();


  // Part info and measure info
  const projectOt = useSelector(state => state.projectTabs).find(project => project.selected === true).id;

  const partId = useSelector(state => state.selectedPart).find(part => part.ot === projectOt).partId;


  // State managment
  const [error, setError] = useState({
    status: false,
    message: '',
  }); 

  const [realMeasure, setRealMeasure] = useState('');


  // Input values
  const inputValues = (event) => {
    setRealMeasure(event.target.value);
  };


  /* Funtions */
  const closeModal = () => {
    dispatch(
      changeModalStatus({
        modalName: "addRealMeasure",
        modalStatus: false,
      })
    );
  };


  // Submit new measure
  const submitNewPart = () => {
    if (realMeasure === 0 || realMeasure === "" || realMeasure === "0") {
      setError({
        status: true,
        message: "Ingrese la medición"
      });
      realMeasureInputRef.current.focus();
      return;
    }

    updateMeasure();
  };


  // Add new part function
  const updateMeasure = () => {
    dispatch(updateRealMeasure({
        ot: projectOt,
        partId: partId,
        realMeasure: realMeasure,
    }))
    props.successFn("Medición actualizada!")
    dispatch(
      changeModalStatus({
        modalName: "addRealMeasure",
        modalStatus: false,
      })
    );
  };


  // Input references
  const realMeasureInputRef = useRef(null);


  // Error modal controller
  let errorInfo;
  if (error.status){
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
  }


  // Edit project info controller
  useEffect(() => {
    if (props.realMeasure){
      setRealMeasure(props.realMeasure);
    }
  },[props.realMeasure])


  return (
    <div
      title="Overlay"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
      className="fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left"
    >
      <div
        title="Modal Container"
        style={{ width: "245px" }}
        className="h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700"
      >
        <div className="flex justify-center text-xl font-semibold">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex w-full gap-x-4 pb-2">
          <div className="flex flex-col w-full">
            <label className="font-medium">Medida real</label>
            <input
              ref={realMeasureInputRef}
              value={realMeasure}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="measure"
              type="number"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>
        {errorInfo}
        <div className="flex justify-end gap-x-4 pt-2">
          <GreenButton btnText="Guardar" btnAction={submitNewPart} />
          <RedButton btnText="Cancelar" btnAction={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default AddRealMeasure;