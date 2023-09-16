import { useSelector } from "react-redux";
import ProjectStructure from "./ProjectStructure";
import PartInfo from "./PartInfo";
import PartProcesses from "./PartProcesses";
import QualityWindow from "../quality/QualityWindow";
import MaterialRequestList from "../warehouse/MaterialRequestList";

function ProjectInfoWindow() {
  // Global redux state
  const selectedTabOt = useSelector(state => state.projectTabs).find(tab => tab.selected === true).id;

  const selectedPart = useSelector(state => state.selectedPart).find(part => part.ot === selectedTabOt);

  const selectedPartOption = useSelector(state => state.selectedPartOption)[selectedTabOt];

  const selectedProjectOption = useSelector(state => state.projectOption);

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
  } else if (selectedProjectOption.materialRequest.find(ot => ot === selectedTabOt)){
    content = <MaterialRequestList/>
  } else {
    content = <ProjectStructure/>
  }

  return (
    <div className="w-full h-fit">
      {content}
    </div>
  );
}
  
export default ProjectInfoWindow;
  