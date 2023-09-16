import { useSelector, useDispatch } from "react-redux";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";
import { useState } from "react";
import { updateFinishedParts } from "../../features/productionListSlice/productionListSlice";
import { updateTotalParts } from "../../features/machines/machineSlice";

function FinishProductionPart(props) {
  // Hooks
  const machineParts = useSelector(state => state.machineList).find(machine => machine.name === props.machine).operation.totalParts;

  const dispatch = useDispatch();
  const [updateQuantity, setUpdateQuantity] = useState(0);


  /* Funtions */
  const aceptButton = () => {
    let partsQuantity = parseInt(props.partsQuantity);
    let finishedParts = parseInt(props.finishedParts);
    let totalFinishedParts = parseInt(finishedParts) + parseInt(updateQuantity);

    let difference = 0;
    if (totalFinishedParts >= partsQuantity){
      difference = totalFinishedParts - partsQuantity;
      totalFinishedParts = partsQuantity;
    }

    let machineQuantity = parseInt(machineParts) + parseInt(updateQuantity) - difference;

    dispatch(updateTotalParts({
      machine: props.machine,
      totalParts: machineQuantity.toString(),
    }))

    dispatch(updateFinishedParts({
      totalFinishedParts: totalFinishedParts.toString(),
      machine: props.machine,
    }))
    
    cancelButton();
  }
  const cancelButton = () => {
    dispatch(changeModalStatus({modalName: 'finishParts', modalStatus: false}));
  };

  // Input value 
  const inputValue = (event) => {
    setUpdateQuantity(
        event.target.value
    );
  };


  return (
    <div
      title="Overlay"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
      className="fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center"
    >
      <div
        title="Modal Container"
        style={{ width: "400px" }}
        className="h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700"
      >
        <div className="flex justify-center text-xl font-semibold mb-2">
          <label>Finalizar piezas</label>
        </div>

        <div className="flex gap-x-4 mb-1 w-full">
          <div className="flex flex-col w-full">
            <label className="font-medium">Pieza</label>
            <label
              className="border-blue-950 border-2 px-1 font-regular rounded-sm"
            >
              {props.partName}
            </label>
          </div>
          <div className="flex flex-col w-5/12">
            <label className="font-medium">Cantidad</label>
            <input
              value={updateQuantity}
              type="number"
              className="w-full border-blue-950 border-2 px-1 font-regular rounded-sm text-center"
              name="quantity"
              onChange={(event) => inputValue(event)}
            />
          </div>
        </div>

        <div className="flex justify-center gap-x-4 mt-3">
          <GreenButton btnText="Aceptar" btnAction={aceptButton} />
          <RedButton btnText="Cancelar" btnAction={cancelButton} />
        </div>
      </div>
    </div>
  );
}

export default FinishProductionPart;
