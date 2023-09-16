import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import { requestMaterial } from "../../features/partsSlice.js/partsSlice";
import { increaseRequestMaterialValue } from "../../features/projects/projectListSlice";
import { v4 as uuidv4 } from 'uuid';
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";
import AlertInfoModal from "./AlertInfoModal";


function RequestMaterialModal(props) {
  // Project info and part info
  const selectedOt = useSelector(state => state.projectTabs).find(tab => tab.selected === true).id;

  const partId = useSelector((state) => state.selectedPart).find(part => part.ot === selectedOt).partId;

  const partList = useSelector(state => state.partList).find(project => project.ot === selectedOt).parts;

  const partInfo = partList.find(part => part.id === partId);


  // Hooks
  const dispatch = useDispatch();


  // Local state
  const [error, setError] = useState({
    status: false,
    message: '',
  }); 

  const [materialRequest, setMaterialRequest] = useState({
    requestId: '',
    requestNo: uuidv4(),
    partId: partId,
    status: 'Solicitado',
    userName: 'Jose Roberto Martinez Rojas',
    userRequestDate: '',
    warehouseRequestDate: '',
    warehouseArrivalDate: '',
    userDeliveryDate: '',
    material: partInfo.material,
    generalDimetions: partInfo.generalDimentions,
    materialDimentions: partInfo.materialDimentions,
    units: partInfo.dimentionUnits,
    quantity: partInfo.quantity,
  });


  // Input values
  const inputValues = (event) => {
    setMaterialRequest({
      ...materialRequest,
      [event.target.name]: (event.target.value).toString(),
    });
  };


  // Close modal window 
  const closeModal = () => {
    dispatch(
      changeModalStatus({
        modalName: "requestMaterial",
        modalStatus: false,
      })
    );
  };


  // Submit new part info
  const submitNewRequest = () => {
    if (materialRequest.material === "") {
      setError({
        status: true,
        message: "Ingrese el material de la pieza"
      });
      materialInputRef.current.focus();
      return;
    } else if (materialRequest.generalDimetions === "") {
      setError({
        status: true,
        message: "Ingrese las dimensiones generales de la pieza"
      });
      generalDimentionsInputRef.current.focus();
      return;
    } else if (materialRequest.materialDimentions === "") {
      setError({
        status: true,
        message: "Ingrese las dimensiones del material"
      });
      materialDimentionsInputRef.current.focus();
      return;
    } else if (materialRequest.units === "") {
      setError({
        status: true,
        message: "Ingrese las unidades del material"
      });
      unitsInputRef.current.focus();
      return;
    } else if (materialRequest.quantity === "") {
      setError({
        status: true,
        message: "Ingrese la cantidad a solicitar"
      });
      quantityInputRef.current.focus();
      return;
    }

    if (!props.partInfo){
      submitRequest();
    } else {
      updateRequest();
    }
  };


  // Sumbit material request
  const submitRequest = () => {
    dispatch(requestMaterial({
      ot: selectedOt,
      partId: partId,
      request: materialRequest,
    }))

    dispatch(increaseRequestMaterialValue({
      ot: selectedOt,
      modelsQuantity: partList.length,
    }))

    props.successFn("Material solicitado correctamente!");
    
    closeModal();
  };


  // Update part info function
  const updateRequest = () => {
    console.log("Update request");
  };


  // Input references
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
            <label className="font-medium">Material</label>
            <label
              className="border-blue-950 border-2 px-1 font-regular rounded-sm text-center bg-gray-100"
              name="material"
            >
              {materialRequest.material}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Dimensiones generales</label>
            <label
              type="text"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm text-center bg-gray-100"
            >
              {materialRequest.generalDimetions}
            </label>
          </div>
        </div>

        <div className="flex gap-x-4 justify-between mb-1">
          <div className="flex flex-col w-full">
            <label className="font-medium">Dimensiones del material</label>
            <input
              type="text"
              value={materialRequest.materialDimentions}
              ref={materialDimentionsInputRef}
              name="materialDimentions"
              onChange={(event) => inputValues(event)}
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm text-center"
            />
          </div>
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Unidades</label>
            <select
              ref={unitsInputRef}
              value={materialRequest.units}
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
          <div className="flex flex-col w-4/12">
            <label className="font-medium">Cantidad</label>
            <input
              ref={quantityInputRef}
              value={materialRequest.quantity}
              type="number"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm text-center"
              name="quantity"
              onChange={(event) => inputValues(event)}
            />
          </div>
        </div>

        {errorInfo}

        <div className="flex justify-end gap-x-4 mt-3">
          <GreenButton btnText="Solicitar" btnAction={submitNewRequest} />
          <RedButton btnText="Cancelar" btnAction={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default RequestMaterialModal;