// Redux toolkit hooks
import { useSelector } from "react-redux"

// Components
import ProjectStructure from "./ProjectStructure"
import PartOptionSelector from "./PartOptionSelector"
import MaterialRequestList from "../warehouse/MaterialRequestList"


function ProjectInfoWindow() {
  // Global redux state
  const projectIndex = useSelector(state => state.appIndex).projectWindow
    .find(project => project.selected === true)


  // Content selector
  let content
  if (projectIndex && projectIndex.partOptions.selectedPart !== ""){
    content = <PartOptionSelector/>
  } else if (projectIndex && projectIndex.projectOptions.materialRequest){
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
  