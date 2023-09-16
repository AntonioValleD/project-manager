import Header from "./Components/main/Header";
import ProjectWindow from "./Components/projects/ProjectWindow";
import ProductionWindow from './Components/producction/ProductionWindow';
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "./features/projects/projectListSlice";
import getAllProjects from "./features/projects/projectListDatabase";


function App() {
  // hooks
  const dispatch = useDispatch();
  const windows = useSelector(state => state.selectedWindow);

  const allProjects = getAllProjects();
  allProjects.forEach((project) => {
    project["modelsQuantity"] = "0";
    dispatch(addProject(project));
  })


  // Main window selector
  let content;
  if ( windows.projects){
    content = <ProjectWindow/>
  } else if (windows.production){
    content = <ProductionWindow/>
  }

  return (
    <div className="h-screen bg-gray-900 mt-0 w-screen">
      <div className="absolute right-4 top-3">
        <Header/>
      </div>
      <div className="flex h-full">
        {content}
      </div>
    </div>
  );
}

export default App;
