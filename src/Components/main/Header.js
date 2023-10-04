import WindowSelector from "./WindowSelector"
import LateralMenu from "./LateralMenu"
import { unselectProjectTab } from "../../features/project_tabs/projectTabSlice"
import { unselectMachineTab } from "../../features/machine_tabs/machineTabsSlice"
import { useDispatch } from "react-redux"
import { IoMdNotifications } from "react-icons/io"


function Header() {
  const dispatch = useDispatch()


  const goHome = () => {
    dispatch(unselectProjectTab())
    dispatch(unselectMachineTab())
  }


  return (
    <div 
      className="flex justify-between items-center"
    >
      <button 
        className={`flex bg-purple-800 rounded-sm h-7 py-2 px-3 items-center text-l font-normal text-white`}
        onClick={() => goHome()}
      >
        Inicio
      </button>

      <div
        className="flex items-center gap-x-6"
      >
        <WindowSelector />

        <label
          className="text-yellow-50 hover:text-yellow-300 flex justify-center items-center text-3xl cursor-pointer"
        >
          <IoMdNotifications/>
        </label>

        <LateralMenu />
      </div>
    </div>
  );
}

export default Header
