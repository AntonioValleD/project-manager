import MachineInfo from "./MachineInfo"
import ProductionTable from "./ProductionTable"

function MachineStructure() {
  return (
    <div className="flex justify-between w-full ml-2 mr-4">
      <MachineInfo/>
      <ProductionTable/>
    </div>
  )
}

export default MachineStructure