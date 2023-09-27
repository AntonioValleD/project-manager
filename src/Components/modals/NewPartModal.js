import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import { addPart, unselectPart, updatePartInfo } from "../../features/partsSlice.js/partsSlice";
import { editProject, updateModelsQuantity } from "../../features/projects/projectListSlice";
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";
import AlertInfoModal from "./AlertInfoModal";


function NewPartModal(props) {
  // Hooks
  const dispatch = useDispatch();

  const [error, setError] = useState({
    status: false,
    message: '',
  }); 

  const [newPart, setNewPart] = useState({
    selected: true,
    id: '',
    partName: '',
    material: '',
    location: 'Pendiente',
    quantity: '',
    finished: '0',
    rejected: '0',
    assembly: '',
    qualityProcess: 'Pendiente',
    type: '',
    dimentionUnits: '',
    generalDimentions: '',
    materialDimentions: '',
    currentProcess: 'Pendiente',
    previousProcess: 'Pendiente',
    nextProcess: 'pendiente',
    qualityTable: [],
    processes: [],
  });


  // Input values
  const inputValues = (event) => {
    setNewPart({
      ...newPart,
      [event.target.name]: (event.target.value).toString(),
    });
  };


  /* Funtions */
  const closeModal = () => {
    dispatch(
      changeModalStatus({
        modalName: "newPart",
        modalStatus: false,
      })
    );
  };

  // Part info
  const selectedOt = useSelector(state => state.projectTabs).find(tab => tab.selected === true).id;

  const findProject = useSelector((state) => state.partList).find(project => project.ot === selectedOt);

  let partList;

  let partIfExists;

  if (findProject){
    partList = findProject.parts;
    if (partList){
      partIfExists = partList.find(part => part.id === newPart.id);
    }
  }


  // Submit new part info
  const submitNewPart = () => {
    if (newPart.id === "") {
      setError({
        status: true,
        message: "Ingrese el numero de pieza"
      });
      idInputRef.current.focus();
      return;
    } else if (partIfExists) {
      if (!props.partInfo){
        setError({
          status: true,
          message: "El numero de pieza especificado ya existe"
        });
        idInputRef.current.focus();
        return;
      } else {
        if (props.partInfo.id !== newPart.id){
          setError({
            status: true,
            message: "El numero de pieza especificado ya existe"
          });
          idInputRef.current.focus();
          return;
        }
      }
    } else if (newPart.partName === "") {
      setError({
        status: true,
        message: "Ingrese el nombre de la pieza"
      });
      partNameInputRef.current.focus();
      return;
    } else if (newPart.type === "") {
      setError({
        status: true,
        message: "Ingrese el tipo de pieza"
      });
      typeInputRef.current.focus();
      return;
    } else if (newPart.assembly === "") {
      setError({
        status: true,
        message: "Ingrese el nombre del ensamble"
      });
      assemblyInputRef.current.focus();
      return;
    } else if (newPart.material === "") {
      setError({
        status: true,
        message: "Especifique el material de la pieza"
      });
      materialInputRef.current.focus();
      return;
    } else if (newPart.quantity === "") {
      setError({
        status: true,
        message: "Ingrese la cantidad de piezas"
      });
      quantityInputRef.current.focus();
      return;
    } else if (newPart.dimentionUnits === "") {
      setError({
        status: true,
        message: "Especifique las unidades de la pieza"
      });
      unitsInputRef.current.focus();
      return;
    } else if (newPart.generalDimentions === "") {
      setError({
        status: true,
        message: "Ingrese las dimensiones generales de la pieza"
      });
      generalDimentionsInputRef.current.focus();
      return;
    } else if (newPart.materialDimentions === "") {
      setError({
        status: true,
        message: "Ingrese las dimensiones generales del material"
      });
      materialDimentionsInputRef.current.focus();
      return;
    }

    if (!props.partInfo){
      addNewPart();
    } else {
      updatePart();
    }
  };


  // Add new part function
  const addNewPart = () => {
    dispatch(addPart({
      newPart: newPart,
      partOt: selectedOt
    }));
    let totalParts = 0;
    if (partList){
      partList.forEach((part) => {
        totalParts += parseInt(part.quantity);
      })
      totalParts += parseInt(newPart.quantity);
    } else {
      totalParts = parseInt(newPart.quantity);
    }
    dispatch(editProject({
      ot: selectedOt,
      project: {
        partsQuantity: totalParts.toString()
      }
    }))
    dispatch(updateModelsQuantity({
      ot: selectedOt,
      modelsQuantity: partList.length + 1,
    }))
    props.successFn("La pieza se guardó correctamente!");
    dispatch(
      changeModalStatus({
        modalName: "newPart",
        modalStatus: false,
      })
    );
  };


  // Update part info function
  const updatePart = () => {
    let totalParts = 0;
    partList.forEach((part) => {
        totalParts += parseInt(part.quantity);
    })
    totalParts += parseInt(newPart.quantity);
    totalParts -= parseInt(props.partInfo.quantity)
    dispatch(editProject({
      ot: selectedOt,
      project: {
        partsQuantity: totalParts.toString()
      }
    }))
    dispatch(updatePartInfo({
      ot: selectedOt,
      newPart: newPart,
    }))

    props.successFn("La información se actualizó correctamente!");
    dispatch(changeModalStatus({
      modalName: "newPart",
      modalStatus: false,
    }));
  };


  // Input references
  const partNameInputRef = useRef(null);
  const idInputRef = useRef(null);
  const typeInputRef = useRef(null);
  const assemblyInputRef = useRef(null);
  const materialInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const unitsInputRef = useRef(null);
  const generalDimentionsInputRef = useRef(null);
  const materialDimentionsInputRef = useRef(null);


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
    if (props.partInfo){
      setNewPart({
        selected: false,
        id: props.partInfo.id,
        partName: props.partInfo.partName,
        material: props.partInfo.material,
        quantity: props.partInfo.quantity,
        assembly: props.partInfo.assembly,
        type: props.partInfo.type,
        dimentionUnits: props.partInfo.dimentionUnits,
        generalDimentions: props.partInfo.generalDimentions,
        materialDimentions: props.partInfo.materialDimentions,
      })
    }
  },[props.partInfo])


  return (
    <div
      title="Overlay"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
      className="fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center text-left"
    >
      <div
        title="Modal Container"
        style={{ width: "500px" }}
        className="text-black h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700"
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex w-full gap-x-4 mb-1">
          <div className="flex flex-col w-6/12">
            <label className="font-medium">No.</label>
            <input
              ref={idInputRef}
              value={newPart.id}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="id"
              type="number"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Nombre</label>
            <input
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              ref={partNameInputRef}
              value={newPart.partName}
              name="partName"
              type="text"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-6/12">
            <label className="font-medium">Tipo</label>
            <input
              className="border-blue-950 border-2 px-1 font-regular rounded-sm w-full"
              ref={typeInputRef}
              value={newPart.type}
              name="type"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Ensamble</label>
            <input
              ref={assemblyInputRef}
              value={newPart.assembly}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="assembly"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-full">
            <label className="font-medium">Material</label>
            <input
              ref={materialInputRef}
              value={newPart.material}
              className="border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="material"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Cantidad</label>
            <input
              ref={quantityInputRef}
              value={newPart.quantity}
              type="number"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="quantity"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Unidades</label>
            <select
              ref={unitsInputRef}
              value={newPart.dimentionUnits}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="dimentionUnits"
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
        </div>

        <div className="flex gap-x-4 justify-between mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Dimensiones generales</label>
            <input
              type="text"
              value={newPart.generalDimentions}
              ref={generalDimentionsInputRef}
              name="generalDimentions"
              onChange={(event) => inputValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Dimensiones del material</label>
            <input
              type="text"
              value={newPart.materialDimentions}
              ref={materialDimentionsInputRef}
              name="materialDimentions"
              onChange={(event) => inputValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
            />
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

export default NewPartModal;