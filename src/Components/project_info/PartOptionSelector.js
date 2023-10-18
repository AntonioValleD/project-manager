import { useSelector } from "react-redux"
import PartInfo from "./PartInfo"
import PartProcess from "./PartProcess"


function PartOptionSelector() {
  // Global redux state
  const partOptionsIndex = useSelector(state => state.appIndex).projectWindow.find(project => project.selected === true).partOptions.partActions


  // Option selector
  let content
  if (partOptionsIndex.processPath){
    content = <PartProcess/>
  } else {
    content = <PartInfo/>
  }


  return (
    <>
      {content}
    </>
  )
}
  
export default PartOptionSelector