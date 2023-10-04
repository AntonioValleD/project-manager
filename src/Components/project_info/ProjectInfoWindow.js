import { useSelector } from "react-redux"
import ProjectStructure from "./ProjectStructure"
import PartInfo from "./PartInfo"
import MaterialRequestList from "../warehouse/MaterialRequestList"


function ProjectInfoWindow() {
  // Global redux state
  const projectIndex = useSelector(state => state.appIndex).projectWindow.find(project => project.selected === true)


  // Content selector
  let content;
  if (projectIndex.partOptions.selectedPart !== ""){
    content = <PartInfo/>
  //} else if (projectIndex.projectOptions.materialRequest){
    //content = <MaterialRequestList/>
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
  