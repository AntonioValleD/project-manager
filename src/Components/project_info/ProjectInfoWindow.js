import { useSelector } from "react-redux"
import ProjectStructure from "./ProjectStructure"
import PartInfo from "./PartInfo"
import PartProcesses from "./PartProcesses"
import QualityWindow from "../quality/QualityWindow"
import MaterialRequestList from "../warehouse/MaterialRequestList"


function ProjectInfoWindow() {
  // Global redux state
  const selectedTabOt = useSelector(state => state.appIndex).projectWindow.find(project => project.selected === true).ot

  const selectedPartOption = ""

  const selectedProjectOption = ""

  const selectedPart = false


  // Content selector
  let content;
  if (selectedPart){
    content = <PartInfo/>
    if (selectedPartOption){
      if (selectedPartOption === 'processes'){
        content = <PartProcesses/>
      } else if (selectedPartOption === 'quality'){
        content = <QualityWindow/>
      }
    }
  } else if (selectedProjectOption){
    content = <MaterialRequestList/>
  } else {
    content = <ProjectStructure/>
  }

  return (
    <>
      {content}
    </>
  )
}
  
export default ProjectInfoWindow
  