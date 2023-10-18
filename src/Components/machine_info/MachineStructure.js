import MachineInfo from "./MachineInfo"
import ProductionTable from "./ProductionTable"

function MachineStructure() {
  return (
    <div className="flex justify-between gap-x-4">
      <MachineInfo/>
      <ProductionTable/>
    </div>
  )
}

export default MachineStructure