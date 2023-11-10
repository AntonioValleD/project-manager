import ProjectList from "./ProjectList"
import TabNav from "../main/TabNav"
import ProjectInfoWindow from "../project_info/ProjectInfoWindow"
import { useSelector, useDispatch } from "react-redux"
import { deleteProjectTab, editSelectedTab } from "../../features/project_tabs/projectTabSlice"
import { openProject, closeProject } from "../../features/appIndexSlice/appIndexStatusSlice"

function ProjectWindow() {
  const dispatch = useDispatch()
  const projectTabs = useSelector((state) => state.projectTabs)
  const selectedProject = projectTabs.find(project => project.selected === true)


  // TabNav functions
  const showTab = (id) => {
    dispatch(editSelectedTab(id))
    dispatch(openProject({
      ot: id
    }))
  }
  const closeTab = (id) => {
    dispatch(deleteProjectTab(id))
    dispatch(closeProject({
      ot: id
    }))
  }


  // Content selector
  let content
  if (selectedProject){
    content = <ProjectInfoWindow/>
  } else {
    content = <ProjectList/>
  }

  return (
    <div className="">
      <div
        className="absolute top-1 left-20 h-10 flex items-center"
      >
        <TabNav
          text="O.T."
          showTab={showTab}
          closeTab={closeTab}
          data={projectTabs}
        />
      </div>
      {content}
    </div>
  )
}
  
export default ProjectWindow