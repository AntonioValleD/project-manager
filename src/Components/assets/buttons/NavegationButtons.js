import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"


function NavegationButtons(props) {
  // Hooks
  const dispatch = useDispatch()


  // Project info
  const selectedProjectOt = useSelector(state => state.projectTabs).find(project => project.selected === true).id;

  const selectedPartId = useSelector(state => state.selectedPart).find(part => part.ot === selectedProjectOt).partId;

  const selectedUnit = useSelector(state => state.partList).find(project => project.ot === selectedProjectOt).parts.find(part => part.id === selectedPartId).qualityTable.find(unit => unit.selected === true);


  // States
  const [unitInputStatus, setUnitInputStatus] = useState(false);

  const [unitId, setUnitId] = useState('');


  // Updating state values
  const inputValues = (event) => {
    setUnitId(event.target.value)
  };


  // Enterkey handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter"){

      //ipcRenderer.send('message', ["Hola"])
      setUnitInputStatus(false);
    }
  };


  useEffect(() => {
    if (selectedUnit){
      setUnitId(selectedUnit.unitId);
    }
  }, [unitInputStatus])


  return (
    <div className="text-white w-full flex justify-center items-center">
      <button
        className="hover:bg-gray-500 text-white py-0.5 px-2 text-md rounded-full"
        onClick={() => props.btnPreviousUnit ? props.btnPreviousUnit() : console.log("Previous")}
      >
        {"<"}
      </button>

      {unitInputStatus ? 
        <input
          autoFocus
          value={unitId}
          className="border-blue-950 border-2 px-1 font-regular rounded-sm text-black text-center w-3/12"
          name="cota"
          type="number"
          onChange={(event) => inputValues(event)}
          onBlur={() => setUnitInputStatus(false)}
          onKeyDown={(e) => handleKeyDown(e)}
        /> :
        <label 
          className="px-2 cursor-pointer"
          onClick={() => setUnitInputStatus(true)}
        >
          {`${props.textTitle ? props.textTitle : "Titulo"} ${props.unitId ? props.unitId : "0"}`}
        </label>
      }

      <button
        className="hover:bg-gray-500 text-white py-0.5 px-2 text-md rounded-full"
        onClick={() => props.btnNextUnit ? props.btnNextUnit() : console.log("Next")}
      >
        {">"}
      </button>
    </div>
  );
}

export default NavegationButtons;
