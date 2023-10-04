import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";
import AlertInfoModal from "./AlertInfoModal";
import { getDateNow } from "../../functions/dateConverter";

function AddPartProcess(props) {
  // Hooks
  const dispatch = useDispatch();

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [newProcess, setNewProcess] = useState({
    selected: false,
    index: 0,
    processName: "",
    department: "",
    startDate: "",
    startTime: "",
    finishDate: "Pendiente",
    finishTime: "Pendiente",
    totalTime: "Pendiente",
  });

  // Input values
  const inputValues = (event) => {
    setNewProcess({
      ...newProcess,
      [event.target.name]: event.target.value.toString(),

    });
  };

  /* Funtions */
  const closeModal = () => {
    if (props.processInfo){
      dispatch(
        changeModalStatus({
          modalName: "editProcess",
          modalStatus: false,
        })
      );
    } else {
      dispatch(
        changeModalStatus({
          modalName: "newProcess",
          modalStatus: false,
        })
      );
    }
  };

  // Process info
  const selectedOt = useSelector((state) => state.projectTabs).find(
    (tab) => tab.selected === true
  ).id;
  const selectedPartId = useSelector((state) => state.selectedPart).find(part => part.ot === selectedOt).partId;

  // Submit new process info
  const submitNewProcess = () => {
    if (newProcess.processName === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del proceso",
      });
      processNameInputRef.current.focus();
      return;
    } else if (newProcess.department === "") {
      setError({
        status: true,
        message: "Ingrese el departamento",
      });
      departmentInputRef.current.focus();
      return;
    } 

    if (!props.processInfo) {
      addNewProcess();
    } else {
      updateProcess();
    }
  };

  // Add new process function
  const addNewProcess = () => {

    dispatch(
      changeModalStatus({
        modalName: "newProcess",
        modalStatus: false,
      })
    );
  };

  // Update process info function
  const updateProcess = () => {

    dispatch(
      changeModalStatus({
        modalName: "editProcess",
        modalStatus: false,
      })
    );
  };

  // Input references
  const processNameInputRef = useRef(null);
  const departmentInputRef = useRef(null);

  // Error modal controller
  let errorInfo;
  if (error.status) {
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />;
  }

  // Edit project info controller
  useEffect(() => {
    if (props.processInfo) {
      setNewProcess({
        processName: props.processInfo.processName,
        department: props.processInfo.department,
      });
    } else {
      let dateNow = new Date();
      setNewProcess({
        ...newProcess,
        startDate: getDateNow(),
        startTime: dateNow.toLocaleTimeString(),
      })
    }
  }, [props.processInfo]);

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
          <label>Nuevo proceso</label>
        </div>

        <div className="flex w-full gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Nombre</label>
            <input
              ref={processNameInputRef}
              value={newProcess.processName}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="processName"
              type="text"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-6/12">
            <label className="font-medium">Departamento</label>
            <input
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              ref={departmentInputRef}
              value={newProcess.department}
              name="department"
              type="text"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Guardar" btnAction={submitNewProcess} />
          <RedButton btnText="Cancelar" btnAction={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default AddPartProcess;
