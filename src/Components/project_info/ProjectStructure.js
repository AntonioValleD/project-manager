import ProjectInfo from "./ProjectInfo";
import PartsTable from "./PartsTable";

function ProjectStructure() {
  return (
    <div className="flex gap-x-4 mt-2">
      <ProjectInfo/>
      <PartsTable/>
    </div>
  )
}
  
export default ProjectStructure;