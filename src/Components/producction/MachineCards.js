import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addMachineTab } from "../../features/machine_tabs/machineTabsSlice";
import { formaterMS } from "../../functions/timeFromater";

function MachineCards() {
  // Hooks
  const dispatch = useDispatch();
  const machines = useSelector(state => state.machineList);
  const productionList = useSelector(state => state.productionList);
  const windowStatus = useSelector(state => state.selectedWindow).production;


  // Double click function
  const openMachine = (machineName) => {
      dispatch(addMachineTab(machineName));
  };

  
  const [counter, setCounter] = useState(0);
  

  useEffect(() => {
    let cronometer = null;
    setCounter(0);
    if (windowStatus){
      cronometer = setInterval(() => {
        setCounter(1)
      }, 1000);
    }

    return () => {
      clearInterval(cronometer);
    };
  }, [counter, windowStatus])

  return (
    <div className="flex flex-wrap justify-between h-fit gap-y-3 w-fit">
      {machines.map((machine) => (
        <div
          key={machine.name}
          className="text-black p-2 mx-1 rounded-sm h-fit w-64 text-center bg-gray-800 hover:bg-gray-600 select-none"
          onDoubleClick={() => openMachine(machine.name)}
        >
          <label className="text-l text-white justify-center flex">
            <span className="h-5 px-2 rounded-sm">
              {(machine.name).toUpperCase()}
            </span>
          </label>
          <div
            className="flex flex-col"
          >
            <label className="text-white">Proyecto</label>
            <label
              className="bg-white text-black font-semibold pl-1 rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {productionList[machine.name] ? productionList[machine.name].find(part => part.index === 0).projectName : "Pendiente"}
            </label>
          </div>
          <div
            className="flex"
          >
            <div className="flex flex-col w-2/3">
              <label className="text-white">Pieza actual</label>
              <label
                className="bg-white mr-3 font-semibold rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {productionList[machine.name] ? productionList[machine.name].find(part => part.index === 0).part : "Pendiente"}
              </label>
            </div>
            <div className="flex flex-col w-1/3">
              <label className="text-white">Tiempo</label>
              <label
                className="bg-white font-semibold rounded-sm"
              >
                {
                  productionList[machine.name] ? (
                    productionList[machine.name].find(part => part.index === 0).controlTime.startTime ? 
                    formaterMS(Date.now() - productionList[machine.name].find(part => part.index === 0).controlTime.startTime - productionList[machine.name].find(part => part.index === 0).controlTime.deathTime)
                    : "00:00:00") : "00:00:00"
                }
              </label>
            </div>
          </div>

          <label 
            className="flex justify-center text-l mt-1 font-bold text-white"
          >
            Producción total
          </label>

          <div
            className="flex justify-between w-full gap-x-2"
          >
            <div className="flex flex-col w-7/12">
              <label className="text-white">Piezas</label>
              <label
                className="bg-white font-semibold rounded-sm "
              >
                {machine.operation.totalParts}
              </label>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-white">Tiempo</label>
              <label
                className="bg-white font-semibold rounded-sm"
              >
                {
                  machine.operation.startTime ? 
                  formaterMS(Date.now() - machine.operation.startTime) : 
                  "00:00:00"
                }
              </label>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-white">Muerto</label>
              <label
                className="bg-white font-semibold w-full rounded-sm"
              >
                {
                  machine.operation.deathTime ? 
                  formaterMS(machine.operation.deathTime) :
                  "00:00:00"
                }
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MachineCards;
