import { useDispatch, useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"
import AlertInfoModal from "./AlertInfoModal"


function AddMeasureModal(props) {
  // Hooks
  const dispatch = useDispatch()


  // Part info and measure info
  const projectOt = useSelector(state => state.projectTabs).find(project => project.selected === true).id

  const partId = useSelector(state => state.selectedPart).find(part => part.ot === projectOt).partId


  // State managment
  const [error, setError] = useState({
    status: false,
    message: '',
  })

  const [newMeasure, setNewMeasure] = useState({
    measureId: '',
    cota: '',
    moreTolerance: 0,
    lessTolerance: 0,
    tolerance: '',
    measure: '',
  })


  // Input values
  const inputValues = (event) => {
    setNewMeasure({
      ...newMeasure,
      [event.target.name]: event.target.value,
    })
  }


  /* Funtions */
  const closeModal = () => {
    if (!props.measureInfo){
      dispatch(
        changeModalStatus({
          modalName: "addMeasure",
          modalStatus: false,
        })
      )

    } else {
      dispatch(changeModalStatus({
        modalName: "updateMeasure",
        modalStatus: false,
      }))
    }
  }


  // Submit new measure
  const submitNewPart = () => {
    if (newMeasure.cota === null || newMeasure.cota === "" || newMeasure.cota === "0") {
      setError({
        status: true,
        message: "Ingrese el valor de la cota"
      });
      cotaInputRef.current.focus();
      return;
    }

    if (!props.measureInfo){
      addNewMeasure();
    } else {
      updateMeasure();
    }
  };


  // Add new part function
  const addNewMeasure = () => {

    props.successFn("La medida se guradó correctamente!");
    dispatch(
      changeModalStatus({
        modalName: "addMeasure",
        modalStatus: false,
      })
    );
  };


  // Update part info function
  const updateMeasure = () => {
    console.log("Actualizando...");
    dispatch(updateMeasure({
      ot: projectOt,
      partId: partId,
      measureId: props.measureInfo.measureId,
      newMeasure: newMeasure,
    }))

    props.successFn("La medida se actualizó correctamente!");

    dispatch(
      changeModalStatus({
        modalName: "updateMeasure",
        modalStatus: false,
      })
    );
  };


  // Input references
  const cotaInputRef = useRef(null);
  const moreToleranceInputRef = useRef(null);
  const lessToleranceInputRef = useRef(null);


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
    if (props.measureInfo){
      setNewMeasure({
        cota: props.measureInfo.cota,
        moreTolerance: props.measureInfo.moreTolerance,
        lessTolerance: props.measureInfo.lessTolerance,
      })
    }
  },[props.measureInfo])


  return (
    <div
      title="Overlay"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
      className="fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left"
    >
      <div
        title="Modal Container"
        style={{ width: "500px" }}
        className="h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700"
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex w-full gap-x-4 mb-1">
          <div className="flex flex-col w-6/12">
            <label className="font-medium">Cota</label>
            <input
              ref={cotaInputRef}
              value={newMeasure.cota}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="cota"
              type="number"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium text-center">Tolerancia</label>
            <div className="flex">
              <label className="text-xl text-center pr-1">+</label>
              <input
                className="w-full border-blue-950 border-2 px-1 font-regular  rounded-sm"
                ref={moreToleranceInputRef}
                value={newMeasure.moreTolerance}
                name="moreTolerance"
                type="number"
                onChange={(event) => inputValues(event)}
              />
              <label className="text-xl pr-1 pl-2">-</label>
              <input
                className="w-full border-blue-950 border-2 px-1 font-regular  rounded-sm"
                ref={lessToleranceInputRef}
                value={newMeasure.lessTolerance}
                name="lessTolerance"
                type="number"
                onChange={(event) => inputValues(event)}
              />
            </div>
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Guardar" btnAction={submitNewPart} />
          <RedButton btnText="Cancelar" btnAction={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default AddMeasureModal;