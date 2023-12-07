// CSS documents
import "animate.css"

// React hooks
import { useState, useRef, useEffect } from "react"

// Redux toolkit hooks
import { useSelector, useDispatch } from "react-redux"

// Redux toolkit reducers
import { changeModalStatus } from "../../features/modalSlice/modalSlice"

// Components
import toast, { Toaster } from 'react-hot-toast'
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"


function NewProductionPart() {
  // Hooks
  const dispatch = useDispatch()


  // Redux state
  const projectList = useSelector(state => state.projectList)


  // Local component state
  const [closeBtn, setCloseBtn] = useState(false)

  const [newPart, setNewPart] = useState({})

  const [estimatedTime, setEstimatedTime] = useState({
    hours: 0,
    minuts: 0,
  })

  const [productionProjectList, setProductionProjectList] = useState([
    {
      ot: "0001",
      partList: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]
    },
  ])

  const [selectedProject, setSelectedProject] = useState("")

  const [hoverProject, setHoverProject] = useState("")

  const [selectedPart, setSelectedPart] = useState("")

  const [hoverPart, setHoverPart] = useState("")

  const [selectedPartInfo, setSelectedPartInfo] = useState({
    partName: "",
    material: "",
    quantity: 0,
    client: "",
  })


  // Input values
  const inputValues = (event) => {
    setNewPart({
      ...newPart,
      [event.target.name]: (event.target.value).toString(),
    })
  }


  // Estimated time values
  const estimatedTimeValues = (event) => {
    let value = Number(event.target.value)
    if (value < 0){
      value = 0
    }

    if (event.target.name === "minuts" && value > 59){
      value = 59
    }

    setEstimatedTime({
      ...estimatedTime,
      [event.target.name]: parseFloat(value).toFixed(0)
    })
  }


  // Submit new part info
  const submitNewPart = () => {
    if (selectedProject === ""){
      toast.error("Seleccione una O.T.")
    } else if (selectedPart === ""){
      toast.error("Seleccione una pieza")
    }
  }

  
  // Close window function
  const closeModal = () => {
    if (closeBtn){
      dispatch(changeModalStatus({
        modalName: "newProductionPart",
        modalStatus: false,
      }))
    }
  }

  const closeWindow = () => {
    setCloseBtn(true)
  }


  // Input references
  const indexInputRef = useRef(null)
  const hoursInputRef = useRef(null)
  const minutsInputRef = useRef(null)


  // Load production project list
  useEffect(() => {
    let availableProductionParts = []

    projectList.forEach((project) => {
      if (project.projectInfo.status === "En proceso"){
        let partList = []

        project.parts.forEach((part) => {
          let foundProcess = part.processPath.processList
            .find(process => process.status === "Pendiente" && process.arrowStatus === "Aprobado")
          
          if (foundProcess){
            partList.push(part.id)
          }
        })

        if (partList.length > 0){
          availableProductionParts.push({
            ot: project.ot,
            partList: [...partList],
          })
        }
      }
    })

    setProductionProjectList([...availableProductionParts])
  }, [projectList])


  // Load selected part info
  useEffect(() => {
    if (selectedPart !== ""){
      let currentProject = projectList.find(project => project.ot === selectedProject)
      let currentPartInfo = currentProject.parts.find(part => part.id === selectedPart).partInfo

      setSelectedPartInfo({
        partName: currentPartInfo.name,
        material: currentPartInfo.material,
        quantity: currentPartInfo.quantity,
        client: currentProject.projectInfo.client,
      })
    }
  }, [selectedPart])


  return (
    <div
      className={`${closeBtn ? 'bg-black/0' : 'bg-black/40'} fixed w-screen h-screen
        top-0 right-0 z-10 flex items-center justify-center text-left`}
    >
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
        style={{ width: "570px" }}
        className={`text-black h-fit relative rounded-sm p-4 bg-white shadow-xl
          shadow-gray-700 flex flex-col items-center animate__animated animate__faster
          ${closeBtn ? 'animate__fadeOut' : 'animate__fadeIn'}`}
        onAnimationEnd={() => closeModal()}
      >

        <label
          className="text-xl font-semibold mb-2"
        >
          Añadir pieza
        </label>

        <div
          className="flex justify-center gap-x-4 w-full"
        >
          <div className="flex w-full justify-between pr-4">
            <div className="flex flex-col w-20">
              <label className="font-medium text-center mb-px pr-4">
                O.T.
              </label>
              <div
                className={`flex flex-col items-center overflow-y-scroll h-48`}
              >
                {
                  productionProjectList.map((project) => (
                    <label
                      key={project.ot}
                      className={`cursor-pointer ${project.ot === selectedProject ? 'bg-purple-900 text-white' :
                        hoverProject === project.ot ? 'bg-purple-600 text-white' :
                        'bg-white text-black'} px-2 py-px rounded-sm mb-px`}
                      onClick={() => setSelectedProject(project.ot)}
                      onMouseEnter={() => setHoverProject(project.ot)}
                      onMouseLeave={() => setHoverProject("")}
                    >
                      {project.ot}
                    </label>
                  ))
                }
              </div>
            </div>

            <div className="flex flex-col w-24">
              <label className="font-medium text-center pr-2 mb-px">
                Pieza
              </label>
              <div
                className={`flex flex-col items-center overflow-y-scroll h-48`}
              >
                {
                  selectedProject !== "" &&
                  productionProjectList.find(project => project.ot === selectedProject).partList.map((part) => (
                    <label
                      key={part}
                      className={`${part === selectedPart ? 'bg-blue-900 text-white' :
                        hoverPart === part ? 'bg-blue-600 text-white' :
                        'bg-white text-black'} px-2 py-px rounded-sm mx-2 mb-px`}
                      onClick={() => setSelectedPart(part)}
                      onMouseEnter={() => setHoverPart(part)}
                      onMouseLeave={() => setHoverPart("")}
                    >
                      {part}
                    </label>
                  ))
                }
              </div>
            </div>
          </div>

          <div 
            className="flex flex-col w-7/12"
          >
            <label
              className="text-lg text-center font-semibold"
            >
              Información de pieza
            </label>

            <div
              className="flex gap-x-2 w-full"
            >
              <div className="flex flex-col w-8/12">
                <label className="font-medium">Nombre de pieza</label>
                <input
                  disabled
                  className="border-blue-950 border-2 px-1 font-regular rounded-sm bg-gray-200"
                  value={selectedPartInfo.partName}
                  onChange={(event) => inputValues(event)}
                />
              </div>

              <div className="flex flex-col w-4/12">
                <label className="font-medium">Material</label>
                <input
                  value={selectedPartInfo.material}
                  className="border-blue-950 border-2 px-1 font-regular rounded-sm bg-gray-200"
                  disabled
                  onChange={(event) => inputValues(event)}
                />
              </div>
            </div>

            <div
              className="flex gap-x-2 w-full"
            >
              <div
                className="flex flex-col w-4/12"
              >
                <label className="font-medium">Cantidad</label>
                <input
                  value={selectedPartInfo.quantity}
                  type="number"
                  disabled
                  className="border-blue-950 border-2 px-1 font-regular rounded-sm bg-gray-200"
                  onChange={(event) => inputValues(event)}
                />
              </div>

              <div 
                className="flex flex-col w-8/12"
              >
                <label className="font-medium">Cliente</label>
                <input
                  value={selectedPartInfo.client}
                  type="text"
                  className="border-blue-950 border-2 px-1 font-regular rounded-sm bg-gray-200"
                  disabled
                  onChange={(event) => inputValues(event)}
                />
              </div>
            </div>

            <label 
              className="font-semibold text-lg text-center mt-2"
            >
              Tiempo estimado
            </label>

            <div 
              className="flex gap-x-2 w-full"
            >
              <div
                className="w-10/12"
              >
                <label className="font-medium">Horas</label>
                <input
                  ref={hoursInputRef}
                  value={estimatedTime.hours}
                  type="number"
                  className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
                  name="hours"
                  onChange={(event) => estimatedTimeValues(event)}
                />
              </div>

              <div
                className="w-10/12">
                <label className="font-medium">Minutos</label>
                <input
                  ref={minutsInputRef}
                  value={estimatedTime.minuts}
                  type="number"
                  className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
                  name="minuts"
                  onChange={(event) => estimatedTimeValues(event)}
                />
              </div>

              <div
                className="w-8/12"
              >
                <label className="font-medium">Posición</label>
                <input
                  ref={indexInputRef}
                  value={newPart.index}
                  type="number"
                  className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
                  name="index"
                  onChange={(event) => inputValues(event)}
                />
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Guardar" btnAction={submitNewPart} />
          <RedButton btnText="Cancelar" btnAction={closeWindow} />
        </div>
      </div>
    </div>
  );
}

export default NewProductionPart;