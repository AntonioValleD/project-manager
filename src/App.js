import Header from "./Components/main/Header";
import ProjectWindow from "./Components/projects/ProjectWindow";
import ProductionWindow from './Components/producction/ProductionWindow';
import { useSelector } from "react-redux";


function App() {
  // hooks
  const windows = useSelector(state => state.selectedWindow);


  // Main window selector
  let content;
  if ( windows.projects){
    content = <ProjectWindow/>
  } else if (windows.production){
    content = <ProductionWindow/>
  }

  return (
    <div 
      className="bg-gray-900 h-screen p-1"
    >
      <Header/>

      {content}
    </div>
  );
}

export default App;
