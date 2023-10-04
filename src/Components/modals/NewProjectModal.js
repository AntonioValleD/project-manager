import "animate.css"
import { useSelector, useDispatch } from "react-redux"
import { useState, useRef, useEffect } from "react"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { updateProjectTab } from "../../features/project_tabs/projectTabSlice"
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"
import { addProject, editProject } from "../../features/projects/projectListSlice"
import { updateProjectOt } from "../../features/selectedPartSlice/appIndexStatusSlice"
import AlertInfoModal from "./AlertInfoModal"
import { DateTime } from "luxon"


function NewProjectModal(props) {
  // Hooks
  const dispatch = useDispatch()


  // Local component state
  const [error, setError] = useState({
    status: false,
    message: ''
  })
  
  const [closeBtn, setCloseBtn] = useState(false)


  // Prject information variables
  const [newProjectOt, setNewProjectOt] = useState(props.projectOt ? props.projectOt : "")

  const [newProjectInfo, setNewProjectInfo] = useState({
    microsipOt: "",
    name: "",
    status: "Registrado",
    client: "",
    clientUser: "",
    estimatedFinishDate: "",
    finishDate: "",
    oc: "",
    partsQuantity: 0,
    totalPartUnits: 0, 
    finishedParts: 0,
    totalfinishedPartUnits: 0,
    rejectedPartUnits: 0,
    materialStatus: "Sin solicitar"
  })


  // Input values
  const inputValues = (event) => {
    setNewProjectInfo({
      ...newProjectInfo,
      [event.target.name]: event.target.value,
    })
  }


  /* Funtions */
  const closeModal = () => {
    setCloseBtn(true)
  }


  const closeWindow = () => {
    if (closeBtn){
      dispatch(
        changeModalStatus({
          modalName: "newProject",
          modalStatus: false,
        })
      )
    }
  }


  /* Input references */
  const projectNameInputRef = useRef(null)
  const otInputRef = useRef(null)
  const microsipInputRef = useRef(null)
  const ocInputRef = useRef(null)
  const clientInputRef = useRef(null)
  const userInputRef = useRef(null)
  const finishDateInputRef = useRef(null)


  // Check if project ot already exists
  const checkOt = useSelector((state) => state.projectList).find((project) => project.ot === newProjectOt)
  const findProjectIfExists = () => {
    if (props.update){
      if (newProjectOt === props.projectOt){
        return false
      } else {
        if (checkOt){
          return true
        } else {
          return false
        }
      }
    } else {
      if (checkOt){
        return true
      } else {
        return false
      }
    }
  }


  // Check if project info is correct
  const checkProjectInfo = () => {
    if (newProjectInfo.name === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del proyecto"
      })
      projectNameInputRef.current.focus()
      return false

    } else if (newProjectOt.length !== 4) {
      setError({
        status: true,
        message: "La O.T. debe contener 4 dígitos"
      })
      otInputRef.current.focus()
      return false

    } else if (findProjectIfExists()) {
      setError({
        status: true,
        message: "La O.T. ingresada ya existe"
      });
      otInputRef.current.focus()
      return false

    } else if (newProjectInfo.microsipOt.length !== 4) {
      setError({
        status: true,
        message: "Microsip debe contener 4 dígitos"
      });
      microsipInputRef.current.focus()
      return false

    } else if (newProjectInfo.oc === "") {
      setError({
        status: true,
        message: "Ingrese la orden de trabajo"
      })
      ocInputRef.current.focus()
      return false

    } else if (newProjectInfo.client === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del cliente"
      })
      clientInputRef.current.focus()
      return false

    } else if (newProjectInfo.clientUser === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del solicitante"
      });
      userInputRef.current.focus()
      return false

    } else if (newProjectInfo.estimatedFinishDate === "") {
      setError({
        status: true,
        message: "Defina una fecha estimada de cierre"
      })
      finishDateInputRef.current.focus()
      return false

    } else {
      return true
    }
  }


  // Submit project information
  const submitProjectInfo = () => {
    if (checkProjectInfo()){
      if (props.update){
        updateProject()
      } else {
        addNewProject()
      }
    }
  }

  const addNewProject = () => {
    let newProjectDoc = {
      ot: newProjectOt,
      projectInfo: {
        ...newProjectInfo,
        startDate: DateTime.local().toString()
      },
      parts: []
    }

    dispatch(addProject(newProjectDoc))

    dispatch(
      changeModalStatus({
        modalName: "newProject",
        modalStatus: false,
      })
    )

    props.successFn("El proyecto se guardó correctamente!")
  }

  const updateProject = () => {
    dispatch(editProject({
      oldOt: props.projectOt,
      newOt: newProjectOt,
      projectInfo: newProjectInfo,
    }))

    dispatch(updateProjectTab(newProjectOt))

    dispatch(updateProjectOt({
      ot: newProjectOt
    }))

    props.successFn("El proyecto se actualizó correctamente!")

    dispatch(changeModalStatus({
      modalName: "newProject",
      modalStatus: false,
    }))
  }


  // Missing data controller
  let errorInfo
  if (error.status){
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
  }


  // Edit project info controller
  useEffect(() => {
    if (props.projectInfo){
      setNewProjectInfo({
        ...props.projectInfo
      })
    }
  },[props.projectInfo])


  return (
    <div
      className={`${closeBtn ? 'bg-black/0' : 'bg-black/40'} fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left`}
    >
      <div
        style={{ width: "500px" }}
        className={`h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700 text-black animate__animated ${closeBtn ? 'animate__fadeOut' : 'animate__fadeIn'} animate__faster`}
        onAnimationEnd={() => closeWindow()}
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex flex-col w-full mb-1">
          <label className="font-medium">Nombre del proyecto</label>
          <input
            ref={projectNameInputRef}
            value={newProjectInfo.name}
            name="name"
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
              value={newProjectOt}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="ot"
              type="number"
              onChange={(event) => setNewProjectOt(event.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Microsip</label>
            <input
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              ref={microsipInputRef}
              value={newProjectInfo.microsipOt}
              name="microsipOt"
              type="number"
              onChange={(event) => inputValues(event)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">O.C.</label>
            <input
              ref={ocInputRef}
              value={newProjectInfo.oc}
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
              value={newProjectInfo.client}
              name="client"
              onChange={(event) => inputValues(event)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Solicitante</label>
            <input
              ref={userInputRef}
              value={newProjectInfo.clientUser}
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
              value={newProjectInfo.estimatedFinishDate}
              ref={finishDateInputRef}
              name="estimatedFinishDate"
              onChange={(event) => inputValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-2">
          <GreenButton btnText="Guardar" btnAction={submitProjectInfo} />
          <RedButton btnText="Cancelar" btnAction={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default NewProjectModal;