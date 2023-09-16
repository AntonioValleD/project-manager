import MachineStructure from "./MachineStructure";
import { useSelector } from "react-redux";

function MachineInfoWindow() {
  const selectedTabId = useSelector(state => state.machineTabs).find(tab => tab.selected === true).id;
  
  // Content selector
  let content;
  if (selectedTabId){
    content = <MachineStructure/>
  }


  return (
    <div className="w-screen h-fit flex justify-between items-center">
      {content}
    </div>
  );
}

export default MachineInfoWindow;
