import { useSelector, useDispatch } from "react-redux"
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { deleteProject } from "../../features/projects/projectListSlice"
import RedButton from "../assets/buttons/RedButton"
import GreenButton from "../assets/buttons/GreenButton"

function DeleteProjectModal(props) {
  // Hooks
  const dispatch = useDispatch()
  const selectedProjectOt = useSelector(state => state.selectedProject).selected

  /* Funtions */
  const aceptButton = () => {
    dispatch(deleteProject(selectedProjectOt))
    props.successFn("El proyecto se ha eliminado correctamente!");
    cancelButton();
  }
  const cancelButton = () => {
    dispatch(changeModalStatus({modalName: 'delete', modalStatus: false}))
  };

  return (
    <div
      title="Overlay"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
      className="fixed w-screen h-screen top-0 right-0 z-10 flex items-center justify-center"
    >
      <div
        title="Modal Container"
        style={{ width: "500px" }}
        className="h-fit relative rounded-sm p-4 bg-white shadow-xl shadow-gray-700"
      >
        <div className="flex justify-center text-xl font-semibold mb-2">
          <label>Eliminar proyecto</label>
        </div>

        <div className="flex justify-center text-lg font-regular">
          <label className="text-center">¿Esta seguro de que desea eliminar este proyecto?</label>
        </div>

        <div className="flex justify-center gap-x-4 mt-3">
          <GreenButton btnText="Aceptar" btnAction={aceptButton} />
          <RedButton btnText="Cancelar" btnAction={cancelButton} />
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
