import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import { updateProjectTab } from "../../features/project_tabs/projectTabSlice";
import { updatePartsOt } from "../../features/partsSlice.js/partsSlice";
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";
import { dateToShort, getDateNow, shortToDate } from "../../functions/dateConverter";
import { addProject, editProject } from "../../features/projects/projectListSlice";
import { updateSelectedProject } from "../../features/projects/selectedProjectSlice";
import { addPartsArray } from "../../features/partsSlice.js/partsSlice";
import AlertInfoModal from "./AlertInfoModal";
import { DateTime } from "luxon";


function NewProjectModal(props) {
  // Hooks
  const dispatch = useDispatch();

  const [error, setError] = useState({
    status: false,
    message: '',
  }); 

  const [newProject, setNewProject] = useState({
    ot: "",
    microsipOt: "",
    projectName: "",
    status: "En proceso",
    client: "",
    clientUser: "",
    estimatedFinishDate: "",
    finishDate: "",
    oc: "",
    partsQuantity: "0",
    partModelsQuantity: "0", 
    finishedParts: "0",
    rejectedParts: '0',
    materialStatus: "Sin solicitar",
    selected: false,
  });


  // Input values
  const dateValue = (event) => {
    console.log(event.target.name, DateTime.fromISO(event.target.value));
    setNewProject({
      ...newProject,
      [event.target.name]: event.target.value,
    });
  };

  const inputValues = (event) => {
    setNewProject({
      ...newProject,
      [event.target.name]: event.target.value,
    });
  };


  /* Funtions */
  const closeModal = () => {
    dispatch(
      changeModalStatus({
        modalName: "newProject",
        modalStatus: false,
      })
    );
  };

  const findProjectIfExists = useSelector((state) => state.projectList).find(
    (project) => project.ot === newProject.ot
  );

  const submitNewProject = () => {
    if (newProject.projectName === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del proyecto"
      });
      projectNameFocus();
      return;
    } else if (newProject.ot.length !== 4) {
      console.log('aquino');
      setError({
        status: true,
        message: "La O.T. debe contener 4 dígitos"
      });
      otFocus();
      return;
    } else if (findProjectIfExists) {
      if (!props.projectInfo){
        setError({
          status: true,
          message: "La O.T. ingresada ya existe"
        });
        otFocus();
        return;
      } else {
        if (props.projectInfo.ot !== newProject.ot){
          setError({
            status: true,
            message: "La O.T. ingresada ya existe"
          });
          otFocus();
          return;
        }
      }
    } else if (newProject.microsipOt.length !== 4) {
      setError({
        status: true,
        message: "Microsip debe contener 4 dígitos"
      });
      microsipFocus();
      return;
    } else if (newProject.oc === "") {
      setError({
        status: true,
        message: "Ingrese la orden de trabajo"
      });
      ocFocus();
      return;
    } else if (newProject.client === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del cliente"
      });
      clientFocus();
      return;
    } else if (newProject.clientUser === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del solicitante"
      });
      userFocus();
      return;
    } else if (newProject.estimatedFinishDate === "") {
      setError({
        status: true,
        message: "Defina una fecha estimada de cierre"
      });
      finishDateFocus();
      return;
    }

    if (!props.projectInfo){
      addNewProject();
    } else {
      updateProject();
    }
  };

  const addNewProject = () => {
    const estimatedDate = dateToShort(newProject.estimatedFinishDate);
    setNewProject({
      ...newProject,
      estimatedFinishDate: estimatedDate,
    })
    dispatch(updateSelectedProject(newProject.ot));
    dispatch(addProject(newProject));
    dispatch(
      changeModalStatus({
        modalName: "newProject",
        modalStatus: false,
      })
    );
    dispatch(addPartsArray(newProject.ot));
    props.successFn("El proyecto se guardó correctamente!");
  };

  const updateProject = () => {
    const projectOt = props.projectInfo.ot;
    let updatedProject = {...props.projectInfo};
    updatedProject.ot = newProject.ot;
    updatedProject.projectName = newProject.projectName;
    updatedProject.microsipOt = newProject.microsipOt;
    updatedProject.oc = newProject.oc;
    updatedProject.client = newProject.client;
    updatedProject.clientUser = newProject.clientUser;
    updatedProject.estimatedFinishDate = newProject.estimatedFinishDate;

    dispatch(editProject({
      ot: projectOt,
      project: updatedProject,
    }));

    dispatch(updateProjectTab(newProject.ot));
    dispatch(updatePartsOt({
      oldOt: props.projectInfo.ot,
      newOt: newProject.ot
    }));
    props.successFn("El proyecto se actualizó correctamente!");
    dispatch(changeModalStatus({
      modalName: "newProject",
      modalStatus: false,
    }));
  };


  // Missing data controller
  /* Input references */
  const projectNameInputRef = useRef(null);
  const otInputRef = useRef(null);
  const microsipInputRef = useRef(null);
  const ocInputRef = useRef(null);
  const clientInputRef = useRef(null);
  const userInputRef = useRef(null);
  const finishDateInputRef = useRef(null);

  /* Focus functions */
  const projectNameFocus = () => {
    projectNameInputRef.current.focus();
  };
  const otFocus = () => {
    otInputRef.current.focus();
  };
  const microsipFocus = () => {
    microsipInputRef.current.focus();
  };
  const ocFocus = () => {
    ocInputRef.current.focus();
  };
  const clientFocus = () => {
    clientInputRef.current.focus();
  };
  const userFocus = () => {
    userInputRef.current.focus();
  };
  const finishDateFocus = () => {
    finishDateInputRef.current.focus();
  };
  let errorInfo;
  if (error.status){
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
  }


  // Edit project info controller
  useEffect(() => {
    if (props.projectInfo){
      setNewProject({
        ot: props.projectInfo.ot,
        microsipOt: props.projectInfo.microsipOt,
        projectName: props.projectInfo.projectName,
        oc: props.projectInfo.oc,
        client: props.projectInfo.client,
        clientUser: props.projectInfo.clientUser,
        status: "En proceso",
        startDate: "",
        estimatedFinishDate: DateTime.fromISO(props.projectInfo.estimatedFinishDate).toISODate(),
        finishDate: "Pendiente",
        partsQuantity: "0",
        finishedParts: "0",
        rejectedParts: '0',
        selected: true
      })
    }
  },[props.projectInfo])


  return (
    <div
      title="Overlay"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
      className="fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left"
    >
      <div
        title="Modal Container"
        style={{ width: "500px" }}
        className="h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700 text-black"
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex flex-col w-full mb-1">
          <label className="font-medium">Nombre del proyecto</label>
          <input
            ref={projectNameInputRef}
            value={newProject.projectName}
            name="projectName"
            autoFocus
            className="border-blue-950 border-2 px-1 font-regular rounded-sm"
            onChange={(event) => inputValues(event)}
          />
        </div>

        <div className="flex w-full gap-x-4 mb-1">
          <div className="flex flex-col">
            <label className="font-medium">O.T.</label>
            <input
              ref={otInputRef}
              value={newProject.ot}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="ot"
              type="number"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Microsip</label>
            <input
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              ref={microsipInputRef}
              value={newProject.microsipOt}
              name="microsipOt"
              type="number"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">O.C.</label>
            <input
              ref={ocInputRef}
              value={newProject.oc}
              className="border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="oc"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Cliente</label>
            <input
              className="border-blue-950 border-2 px-1 font-regular rounded-sm w-full"
              ref={clientInputRef}
              value={newProject.client}
              name="client"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Solicitante</label>
            <input
              ref={userInputRef}
              value={newProject.clientUser}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="clientUser"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 justify-between mb-1">
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Fecha estimada</label>
            <input
              type="date"
              value={newProject.estimatedFinishDate}
              ref={finishDateInputRef}
              name="estimatedFinishDate"
              onChange={(event) => dateValue(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-2">
          <GreenButton btnText="Guardar" btnAction={submitNewProject} />
          <RedButton btnText="Cancelar" btnAction={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default NewProjectModal;