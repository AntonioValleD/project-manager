import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { unselectOption } from "../../features/partOptionSlice/partOptionSlice";
import rightArrowImg from '../assets/img/Flecha-w.webp';
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import RedButton from "../assets/buttons/RedButton";
import NewDeleteButton from "../assets/buttons/NewDelete";
import GreenButton from "../assets/buttons/GreenButton";
import AddPartProcess from "../modals/AddPartProcess";
import DeleteProcessModal from "../modals/DeleteProcessModal";

function PartProcesses() {
  // Hooks
  const dispatch = useDispatch();
  const [processIndex, setProcessIndex] = useState(0);

  // Reducer states
  const processModal = useSelector(state => state.modalStatus);

  const selectedTabOt = useSelector((state) => state.projectTabs).find((tab) => tab.selected === true).id;

  const selectedPartId = useSelector((state) => state.selectedPart).find((part) => part.ot === selectedTabOt).partId;

  const partProcesses = useSelector(state => state.partList).find(project => project.ot === selectedTabOt).parts.find(part => part.id === selectedPartId).processes;

  const partocesses = useSelector(state => state.partList).find(project => project.ot === selectedTabOt).parts.find(part => part.selected === true).processes;


  // Button functions
  const closeProcesses = () => {
    dispatch(unselectOption(selectedTabOt));
  };

  const addPartProcess = () => {
    dispatch(changeModalStatus({
      modalName: "newProcess",
      modalStatus: true,
    }))
  };

  const editPartProcess = () => {
    if (processIndex === 0){
      dispatch(changeModalStatus({
        modalName: "noProcessSelected",
        modalStatus: true,
      }))
    } else {
      dispatch(changeModalStatus({
        modalName: "editProcess",
        modalStatus: true
      }))
    }
  };

  const deletePartProcesses = () => {
    setProcessIndex(0);
    dispatch(changeModalStatus({
      modalName: "deleteProcess",
      modalStatus: true,
    }))
  };

  const selectProcess = (index) => {
    setProcessIndex(index);
  };


  // Modal window selector
  let modalWindow;
  if (processModal.newProcess){ 
    modalWindow = <AddPartProcess/>
  } else if (processModal.deleteProcess){
    modalWindow = <DeleteProcessModal
      ot={selectedTabOt}
      index={processIndex}
    />
  } else if (processModal.editProcess){
    modalWindow = <AddPartProcess
      processInfo={partProcesses.find(process => process.index === processIndex)}
    />
  } else if (processModal.noProcessSelected){
    // modalWindow = <NoItemSelected
    //   modalName="noProcessSelected"
    //   textTitle="Editar/Eliminar proceso"
    //   textDescription="Seleccione un proceso para editar o eliminar"
    // />
  }


  return (
    <div className="flex flex-col gap-y-5 w-full pl-2 pt-3">
      {modalWindow}
      <div className="flex gap-x-3 items-center">
        <NewDeleteButton
          newBtn={addPartProcess}
          deleteBtn={deletePartProcesses}
        />
        <GreenButton
          btnText="Editar"
          btnAction={editPartProcess}
        />
        <RedButton
          btnText="Cerrar"
          btnAction={closeProcesses}
        />
      </div>
      <div className="flex flex-wrap gap-y-5 justify-start items-center">
        <label 
          className="h-28 w-28 bg-purple-800 text-white text-xl rounded-full flex justify-center items-center"
        >
          Inicio
        </label>
        {partProcesses.map(process => (
          <div
            key={process.index}
            className="flex justify-start items-center"
          >
            <img
              alt="arrow"
              className="h-5"
              src={rightArrowImg}
            />
            <div 
              className={`flex flex-col ${processIndex === process.index ? 'bg-purple-800' : process.status === 'finished' ? 'bg-blue-700': process.status === 'current' ? 'bg-green-700': 'bg-gray-700' } gap-y-1 p-2 rounded-xl cursor-pointer text-white`}
              onClick={() => selectProcess(process.index)}
            >
              <label
                className="h-fit bg-transparent text-center cursor-pointer"
              >
                {process.processName}
              </label>
              <label
                className="h-fit bg-transparent text-center cursor-pointer"
              >
                {process.department}
              </label>
              <label
                className="h-fit bg-transparent text-center cursor-pointer"
              >
                {`Inicio: ${process.startDate}`}
              </label>
              <label
                className="h-fit bg-transparent text-center cursor-pointer"
              >
                {`Fin: ${process.finishDate}`}
              </label>
            </div>
          </div>
        ))}
        <img
          alt="arrow"
          className="h-5"
          src={rightArrowImg}
        />
        <label 
          className="h-28 w-28 bg-gray-700 text-white text-xl rounded-full flex justify-center items-center"
        >
          Fin
        </label>
      </div>
    </div>
  );
}

export default PartProcesses;
