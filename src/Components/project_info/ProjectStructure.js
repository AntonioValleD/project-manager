import ProjectInfo from "./ProjectInfo";
import PartsTable from "./PartsTable";

function ProjectStructure() {
  return (
    <div className="flex px-2 h-full items-center w-full">
        <ProjectInfo/>
        <PartsTable/>
    </div>
  );
}
  
export default ProjectStructure;