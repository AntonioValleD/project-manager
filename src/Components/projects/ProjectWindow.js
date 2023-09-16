import ProjectList from "./ProjectList";
import TabNav from "../main/TabNav";
import ProjectInfoWindow from "../project_info/ProjectInfoWindow";
import { useSelector, useDispatch } from "react-redux";
import { deleteProjectTab, editSelectedTab, unselectProjectTab } from "../../features/project_tabs/projectTabSlice";

function ProjectWindow() {
  const dispatch = useDispatch();
  const projectTabs = useSelector((state) => state.projectTabs);
  const selectedProject = projectTabs.find(project => project.selected === true);

  // TabNav functions
  const showTab = (id) => {
    dispatch(editSelectedTab(id));
  };
  const closeTab = (id) => {
    dispatch(deleteProjectTab(id));
    //dispatch(unselectPart({partOt: selectedProject.id}));
  };
  const goHome = () => {
    dispatch(unselectProjectTab());
  };

  // Content selector
  let content;
  if (selectedProject){
    content = <ProjectInfoWindow/>;
  } else {
    content = <ProjectList/>;
  }

  return (
    <div className="w-screen">
      <div className="flex items-center h-fit gap-4 mt-3 mb-2 ml-2">
        <TabNav
          text="O.T."
          showTab={showTab}
          closeTab={closeTab}
          goHome={goHome}
          data={projectTabs}
        />
      </div>
      <div className="flex bg-gry-400 w-full h-fit flex-col">
        {content}
      </div>
    </div>
  );
}
  
export default ProjectWindow;