import "animate.css"
import { useSelector, useDispatch } from "react-redux"
import { useState, useRef, useEffect } from "react"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { addNewPart, updatePartsQuantity } from "../../features/projects/projectListSlice"
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"
import AlertInfoModal from "./AlertInfoModal"


function NewPartModal(props) {
  // Hooks
  const dispatch = useDispatch()


  // Local component state
  const [error, setError] = useState({
    status: false,
    message: '',
  })

  const [closeBtn, setClosebtn] = useState(false)


  // New part info state
  const [newPartId, setNewPartId] = useState("")

  const [newPartInfo, setNewPartInfo] = useState({
    name: '',
    material: '',
    location: 'Sin material',
    quantity: '',
    finished: 0,
    rejected: 0,
    assembly: '',
    type: '',
  })

  const [newPartDimentions, setNewPartDimentions] = useState({
    units: '',
    generalDimentions: '',
    materialDimentions: '',
  })


  // Input values
  const newPartInfoValues = (event) => {
    setNewPartInfo({
      ...newPartInfo,
      [event.target.name]: event.target.value
    })
  }

  const newPartDimentionsValues = (event) => {
    setNewPartDimentions({
      ...newPartDimentions,
      [event.target.name]: event.target.value
    })
  }


  /* Funtions */
  const closeModal = () => {
    if (closeBtn){
      dispatch(
        changeModalStatus({
          modalName: "newPart",
          modalStatus: false,
        })
      )
    }
  }

  const closeWindow = () => {
    setClosebtn(true)
  }


  // Part info
  const selectedOt = useSelector(state => state.projectTabs).find(tab => tab.selected === true).id

  const selectedProject = useSelector(state => state.projectList).find(project => project.ot === selectedOt)

  const partList = selectedProject.parts

  const findPartById = (id) => {
    let foundPart = partList.find(part => part.id === id)
    if(foundPart){
      return true
    } else {
      return false
    }
  }


  // Input references
  const partNameInputRef = useRef(null)
  const idInputRef = useRef(null)
  const typeInputRef = useRef(null)
  const assemblyInputRef = useRef(null)
  const materialInputRef = useRef(null)
  const quantityInputRef = useRef(null)
  const unitsInputRef = useRef(null)
  const generalDimentionsInputRef = useRef(null)
  const materialDimentionsInputRef = useRef(null)


  // Submit new part info
  const checkPartInfo = () => {
    if (newPartId === "") {
      setError({
        status: true,
        message: "Ingrese el numero de pieza"
      })
      idInputRef.current.focus()
      return false

    } else if (findPartById(newPartId)) {
      setError({
        status: true,
        message: "El numero de pieza especificado ya existe"
      })
      idInputRef.current.focus()
      return false

    } else if (newPartInfo.name === "") {
      setError({
        status: true,
        message: "Ingrese el nombre de la pieza"
      })
      partNameInputRef.current.focus()
      return false

    } else if (newPartInfo.type === "") {
      setError({
        status: true,
        message: "Ingrese el tipo de pieza"
      })
      typeInputRef.current.focus()
      return false

    } else if (newPartInfo.assembly === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del ensamble"
      })
      assemblyInputRef.current.focus()
      return false

    } else if (newPartInfo.material === "") {
      setError({
        status: true,
        message: "Especifique el material de la pieza"
      })
      materialInputRef.current.focus()
      return false

    } else if (newPartInfo.quantity === "") {
      setError({
        status: true,
        message: "Ingrese la cantidad de piezas"
      })
      quantityInputRef.current.focus()
      return false

    } else if (newPartDimentions.units === "") {
      setError({
        status: true,
        message: "Especifique las unidades de la pieza"
      })
      unitsInputRef.current.focus()
      return false

    } else if (newPartDimentions.generalDimentions === "") {
      setError({
        status: true,
        message: "Ingrese las dimensiones generales de la pieza"
      })
      generalDimentionsInputRef.current.focus()
      return false

    } else if (newPartDimentions.materialDimentions === "") {
      setError({
        status: true,
        message: "Ingrese las dimensiones generales del material"
      })
      materialDimentionsInputRef.current.focus()
      return false
    } else {
      return true
    }
  }


  // Submit part info
  const submitPartInfo = () => {
    if (!checkPartInfo()){
      return
    } else {
      if (props.update){
        console.log(newPartInfo)
      } else {
        addPart()
      }
    }
  }


  // Add new part function
  const addPart = () => {
    let newPart = {
      id: newPartId,
      partInfo: newPartInfo,
      dimentions: newPartDimentions,
      processPath: {status: "", processList: []},
      qualityInfo: {status: "Sin revisar", unitList: []},
      materialRequest: {status: "Sin solicitar", requestList: []},
    }

    dispatch(addNewPart({
      ot: selectedOt,
      newPart: newPart
    }))

    dispatch(updatePartsQuantity({
      ot: selectedOt,
      partsQuantity: selectedProject.projectInfo.partsQuantity + 1,
      totalPartUnits: selectedProject.projectInfo.totalPartUnits + parseInt(newPartInfo.quantity)
    }))

    props.successFn("La pieza se guardó correctamente!")

    closeWindow()
  }


  // Update part info function
  // const updatePart = () => {
  //   let totalParts = 0
  //   partList.forEach((part) => {
  //       totalParts += parseInt(part.quantity)
  //   })
  //   totalParts += parseInt(newPart.quantity)
  //   totalParts -= parseInt(props.partInfo.quantity)
  //   dispatch(editProject({
  //     ot: selectedOt,
  //     project: {
  //       partsQuantity: totalParts.toString()
  //     }
  //   }))
  //   dispatch(updatePartInfo({
  //     ot: selectedOt,
  //     newPart: newPart,
  //   }))

  //   props.successFn("La información se actualizó correctamente!")
  //   dispatch(changeModalStatus({
  //     modalName: "newPart",
  //     modalStatus: false,
  //   }))
  // }


  // Error modal controller
  let errorInfo;
  if (error.status){
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
  }


  // Edit project info controller
  // useEffect(() => {
  //   if (props.partInfo){
  //     setNewPart({
  //       selected: false,
  //       id: props.partInfo.id,
  //       partName: props.partInfo.partName,
  //       material: props.partInfo.material,
  //       quantity: props.partInfo.quantity,
  //       assembly: props.partInfo.assembly,
  //       type: props.partInfo.type,
  //       dimentionUnits: props.partInfo.dimentionUnits,
  //       generalDimentions: props.partInfo.generalDimentions,
  //       materialDimentions: props.partInfo.materialDimentions,
  //     })
  //   }
  // },[props.partInfo])


  return (
    <div
      className={`${closeBtn ? 'bg-black/0' : 'bg-black/40'} fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left`}
    >
      <div
        style={{ width: "500px" }}
        className={`text-black h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700 animate__animated ${closeBtn ? 'animate__fadeOut' : 'animate__fadeIn'} animate__faster`}
        onAnimationEnd={() => closeModal()}
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex w-full gap-x-4 mb-1">
          <div className="flex flex-col w-6/12">
            <label className="font-medium">No.</label>
            <input
              ref={idInputRef}
              value={newPartId}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="id"
              type="number"
              onChange={(event) => setNewPartId(event.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Nombre</label>
            <input
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              ref={partNameInputRef}
              value={newPartInfo.name}
              name="name"
              type="text"
              onChange={(event) => newPartInfoValues(event)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-6/12">
            <label className="font-medium">Tipo</label>
            <input
              className="border-blue-950 border-2 px-1 font-regular rounded-sm w-full"
              ref={typeInputRef}
              value={newPartInfo.type}
              name="type"
              onChange={(event) => newPartInfoValues(event)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Ensamble</label>
            <input
              ref={assemblyInputRef}
              value={newPartInfo.assembly}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="assembly"
              onChange={(event) => newPartInfoValues(event)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-full">
            <label className="font-medium">Material</label>
            <input
              ref={materialInputRef}
              value={newPartInfo.material}
              className="border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="material"
              onChange={(event) => newPartInfoValues(event)}
            />
          </div>

          <div className="flex flex-col w-4/12">
            <label className="font-medium">Cantidad</label>
            <input
              ref={quantityInputRef}
              value={newPartInfo.quantity}
              type="number"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="quantity"
              onChange={(event) => newPartInfoValues(event)}
            />
          </div>

          <div className="flex flex-col w-4/12">
            <label className="font-medium">Unidades</label>
            <select
              ref={unitsInputRef}
              value={newPartDimentions.units}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="units"
              onChange={(event) => newPartDimentionsValues(event)}
            >
              <option value={"empty"}></option>
              <option value={"in"}>in</option>
              <option value={"ft"}>ft</option>
              <option value={"mm"}>mm</option>
              <option value={"cm"}>cm</option>
              <option value={"m"}>m</option>
            </select>
          </div>
        </div>

        <div className="flex gap-x-4 justify-between mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Dimensiones generales</label>
            <input
              type="text"
              value={newPartDimentions.generalDimentions}
              ref={generalDimentionsInputRef}
              name="generalDimentions"
              onChange={(event) => newPartDimentionsValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Dimensiones del material</label>
            <input
              type="text"
              value={newPartDimentions.materialDimentions}
              ref={materialDimentionsInputRef}
              name="materialDimentions"
              onChange={(event) => newPartDimentionsValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Guardar" btnAction={submitPartInfo} />
          <RedButton btnText="Cancelar" btnAction={closeWindow} />
        </div>
      </div>
    </div>
  );
}

export default NewPartModal;