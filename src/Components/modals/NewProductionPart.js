import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import { addProductionPart } from "../../features/productionListSlice/productionListSlice";
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";
import BlueButton from "../assets/buttons/BlueButton";
import AlertInfoModal from "./AlertInfoModal";


function NewProductionPart(props) {
  // Hooks
  const dispatch = useDispatch();

  const [error, setError] = useState({
    status: false,
    message: '',
  }); 

  const [success, setSuccess] = useState({
    status: false,
    message: '',
  })

  const [partInfoStatus, setPartInfoStatus] = useState(false)

  const [newPart, setNewPart] = useState({
    index: '',
    partId: '',
    projectName: '',
    projectOt: '',
    part: '',
    quantity: '',
    finished: '0',
    material: '',
    client: '',
    controlTime: {
      startTime: '',
      pauseTime: '',
      restartTime: '',
      finishTime: '',
      deathTime: 0,
    },
    time: {
      hours: '',
      minuts: '',
      estimatedTime: '',
      realTime: '00:00:00',
      lostTime: '00:00:00',
    },
    pinit: false
  });


  // Input values
  const inputValues = (event) => {
    setNewPart({
      ...newPart,
      [event.target.name]: (event.target.value).toString(),
    });
  };

  // Time values
  const timeValues = (event) => {
    setNewPart({
      ...newPart,
      time: {
        ...newPart.time,
        [event.target.name]: (event.target.value).toString(),
      }
    });
  };


  // Part info controller
  const projectInfo = useSelector(state => state.projectList);
  const partList = useSelector(state => state.partList);

  const resetState = (state) => {
    if (state === "newPart"){
      setNewPart({
        ...newPart,
        client: '',
        part: '',
        material: '',
        quantity: '',
      })
    }
    if (state === "error"){
      setError({
        status: false,
      })
    }
    if (state === "success"){
      setSuccess({
        status: false
      })
    }
  }

  const findPart = () => {
    if (newPart.projectOt.length !== 4){
      setError({
        status: true,
        message: "La O.T. ingesada es incorrecta"
      });
      resetState("success");
      resetState("newPart");
      projectOtInputRef.current.focus();
      return; 
    } else if (newPart.partId === ''){
      setError({
        status: true,
        message: "El numero de pieza ingresado es incorrecto"
      });
      resetState("success");
      resetState("newPart");
      idInputRef.current.focus();
      return;
    }

    const specifiedProject = partList.find(project => project.ot === newPart.projectOt)

    if (!specifiedProject){
      setError({
        status: true,
        message: "No se encontró la O.T. especificada"
      });
      resetState("success");
      resetState("newPart");
      projectOtInputRef.current.focus();
      return;
    } else {
        const specifiedPart = specifiedProject.parts.find(part => part.id === newPart.partId);
        if (!specifiedPart){
          setError({
            status: true,
            message: "No se encontró la pieza especificada"
          });
          resetState("success");
          resetState("newPart");
          projectOtInputRef.current.focus();
          return;
        } else {
          resetState("error");

          setSuccess({
            status: true,
            message: "¡Pieza encontrada!"
          })
          
          setPartInfoStatus(true)

          // Loading part info
          const selectedProject = projectInfo.find(project => project.ot === newPart.projectOt);
          setNewPart({
            ...newPart,
            client: selectedProject.client,
            projectName: selectedProject.projectName,
            part: specifiedPart.partName,
            material: specifiedPart.material,
            quantity: specifiedPart.quantity,
          })
        }
    }
  }

  const selectedMachine = useSelector(state => state.machineTabs).find(tab => tab.selected === true).id;


  // Submit new part info
  const submitNewPart = () => {
    if (!partInfoStatus){
      setError({
        status: true,
        message: "No se encontró ninguna pieza para guardar"
      });
      projectOtInputRef.current.focus();
      return;
    }
    if (newPart.hours === "") {
      setError({
        status: true,
        message: "Especifique el tiempo estimado de producción"
      });
      hoursInputRef.current.focus();
      return;
    } else if (newPart.minuts === "") {
      setError({
        status: true,
        message: "Especifique el tiempo estimado de producción"
      });
      minutsInputRef.current.focus();
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
    dispatch(addProductionPart({
      part: newPart,
      machine: selectedMachine,
    }))
    closeModal();
  };


  // Update part info function
  const updatePart = () => {
    console.log('update');
  };


  // Close window function
  const closeModal = () => {
    dispatch(
      changeModalStatus({
        modalName: "newProductionPart",
        modalStatus: false,
      })
    );
  };


  // Input references
  const partInputRef = useRef(null);
  const idInputRef = useRef(null);
  const indexInputRef = useRef(null);
  const projectOtInputRef = useRef(null);
  const clientInputRef = useRef(null);
  const materialInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const hoursInputRef = useRef(null);
  const minutsInputRef = useRef(null);


  // Error modal controller
  let errorInfo;
  let messageInfo;
  if (error.status){
    errorInfo = <AlertInfoModal
      message={error.message}
      textColor="red"
    />
  } 
  if (success.status){
    messageInfo = <AlertInfoModal
      message={success.message}
      textColor="green"
    />
  }


  // Edit project info controller
  useEffect(() => {
    if (props.partInfo){
      setNewPart({
        id: props.partInfo.id,
        estimatedTime: props.partInfo.estimatedTime,
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
        className="h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700"
      >
        <div className="flex justify-center text-xl font-semibold pb-2">
          <label>{props.textTitle}</label>
        </div> 

        <div className="flex w-full justify-between mb-1 items-end">
          <div className="flex flex-col w-3/12">
            <label className="font-medium">O.T.</label>
            <input
              className="border-blue-950 border-2 px-1 font-regular rounded-sm"
              ref={projectOtInputRef}
              value={newPart.projectOt}
              name="projectOt"
              type="number"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">No. de parte</label>
            <input
              ref={idInputRef}
              value={newPart.partId}
              className="border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="partId"
              type="number"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex h-fit w-fit">
            <BlueButton
              btnText="Buscar pieza"
              btnAction={findPart}
            />
          </div>
        </div>

        <div className="flex justify-center text-xl font-semibold pt-2">
          <label>Información de la pieza</label>
        </div> 

        <div className="flex gap-x-4 mb-1 w-full items-end">
          <div className="flex flex-col w-full">
            <label 
              className="font-medium w-full text-center"
            >
              Tiempo estimado
            </label>
            <div className="flex gap-x-4">
              <div>
                <label className="font-medium">Horas</label>
                <input
                ref={hoursInputRef}
                value={newPart.hours}
                type="text"
                className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
                name="hours"
                onChange={(event) => timeValues(event)}
                />
              </div>
              <div>
                <label className="font-medium">Minutos</label>
                <input
                ref={minutsInputRef}
                value={newPart.minuts}
                type="text"
                className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
                name="minuts"
                onChange={(event) => timeValues(event)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Nivel</label>
            <input
              ref={indexInputRef}
              value={newPart.index}
              type="number"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm"
              name="index"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Cliente</label>
            <input
              ref={clientInputRef}
              value={newPart.client}
              type="text"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm bg-gray-200"
              name="client"
              disabled
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-full">
            <label className="font-medium">Nombre</label>
            <input
              disabled
              className="border-blue-950 border-2 px-1 font-regular rounded-sm w-full bg-gray-200"
              ref={partInputRef}
              value={newPart.part}
              name="part"
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Material</label>
            <input
              ref={materialInputRef}
              value={newPart.material}
              className="border-blue-950 border-2 px-1 font-regular rounded-sm bg-gray-200"
              name="material"
              disabled
              onChange={(event) => inputValues(event)}
            />
          </div>
          <div className="flex flex-col w-6/12">
            <label className="font-medium">Cantidad</label>
            <input
              ref={quantityInputRef}
              value={newPart.quantity}
              disabled
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm bg-gray-200"
              name="quantity"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        {messageInfo}
        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Guardar" btnAction={submitNewPart} />
          <RedButton btnText="Cancelar" btnAction={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default NewProductionPart;