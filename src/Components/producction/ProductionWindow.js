import MachineCards from "./MachineCards"
import TabNav from "../main/TabNav"
import MachineStructure from "../machine_info/MachineStructure"
import { useSelector, useDispatch } from "react-redux"
import { deleteMachineTab, unselectMachineTab, editMachineTab } from "../../features/machine_tabs/machineTabsSlice"
import { selectMachinePart } from "../../features/productionListSlice/productionListSlice"

function ProductionWindow() {
  const dispatch = useDispatch()


  // TabNav functions
  const machineTabs = useSelector((state) => state.machineTabs)
  const selectedMachine = machineTabs.find(machine => machine.selected === true)


  const showTab = (id) => {
    dispatch(editMachineTab(id));
  }
  const closeTab = (id) => {
    dispatch(selectMachinePart({
      machine: id,
    }))
    dispatch(deleteMachineTab(id))
  }
  const goHome = () => {
    dispatch(unselectMachineTab())
  }

  // Content selector
  let content;
  if (selectedMachine){
    content = <MachineStructure/>
  } else {
    content = <MachineCards/>
  }

  return (
    <div className="">
      <div className="absolute top-1 h-8 left-20 flex items-center">
        <TabNav
          showTab={showTab}
          closeTab={closeTab}
          goHome={goHome}
          data={machineTabs}
        />
      </div>
      <div className="bg-gray-900 absolute left-0 pl-1">
        {content}
      </div>
    </div>
  )
}

export default ProductionWindow
