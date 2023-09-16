import { useSelector, useDispatch } from "react-redux";
import { changeSelectedWindow } from "../../features/selected_window/windowSilice";

function WindowSelector() {
  const dispatch = useDispatch();
  const windows = useSelector(state => state.selectedWindow);

  const selectWindow = (window) => {
    dispatch(changeSelectedWindow(window));
  };

  return (
    <div className="flex h-full gap-2">
      <button
        className={`flex ${windows.projects ? 'bg-purple-800' : 'bg-purple-950'} hover:bg-purple-800 rounded-sm h-8 py-2 px-2 items-center text-l font-normal text-white group-hover:text-black transition-all duration-75`}
        onClick={() => selectWindow('projects')}
      >
        Proyectos
      </button>
      <button 
        className={`flex ${windows.production ? 'bg-purple-800' : 'bg-purple-950'} hover:bg-purple-800 rounded-sm h-8 p-2 items-center text-l font-normal text-white transition-all duration-75`}
        onClick={() => selectWindow('production')}
      >
        Producción
      </button>
    </div>
  );
}

export default WindowSelector;
