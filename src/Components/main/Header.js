// Components
import WindowSelector from "./WindowSelector"
import UserInfo from "../user/UserInfo"

// Redux toolkit reducers
import { unselectProjectTab } from "../../features/project_tabs/projectTabSlice"
import { unselectMachineTab } from "../../features/machine_tabs/machineTabsSlice"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"

// Redux toolkit hooks
import { useSelector, useDispatch } from "react-redux"

// React icons
import { IoMdNotifications } from "react-icons/io"


function Header() {
  const dispatch = useDispatch()


  // Redux state
  const modalStatus = useSelector(state => state.modalStatus)
  const userInfo = useSelector(state => state.appConfig).userInfo


  const goHome = () => {
    dispatch(unselectProjectTab())
    dispatch(unselectMachineTab())
  }


  const openUserInfo = () => {
    dispatch(changeModalStatus({
      modalName: "userInfo",
      modalStatus: true
    }))
  }


  // Modal window selector
  let modalWindow
  if (modalStatus.userInfo){
    modalWindow = <UserInfo/>
  }


  return (
    <div 
      className="flex justify-between items-center h-10"
    >

      {modalWindow}

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
          className="text-yellow-50 hover:text-yellow-300 flex justify-center
            items-center text-3xl cursor-pointer"
        >
          <IoMdNotifications/>
        </label>

        <div
          title='Usuario'
          className='rounded-full bg-purple-900 hover:bg-purple-700 h-10 w-10 flex
            justify-center items-center cursor-pointer'
          onClick={() => openUserInfo()}
        >
          {
            !userInfo.profileImageUrl || userInfo.profileImageUrl === "" ?
            <label
              className='cursor-pointer text-white'
            >
              {userInfo.shortName}
            </label> :
            <img
              className='w-10 h-10 rounded-full cursor-pointer'
              alt={userInfo.profileImageUrl}
              src={userInfo.profileImageUrl}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default Header
