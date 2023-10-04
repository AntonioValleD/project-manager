import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import RedButton from "../assets/buttons/RedButton";
import GreenButton from "../assets/buttons/GreenButton";

function DeleteProcessModal(props) {
  // Hooks
  const dispatch = useDispatch();

  /* Funtions */
  const aceptButton = () => {

    cancelButton();
  }
  const cancelButton = () => {
    dispatch(changeModalStatus({modalName: 'deleteProcess', modalStatus: false}));
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
          <label>Eliminar proceso</label>
        </div>

        <div className="flex justify-center text-lg font-regular">
          <label className="text-center">¿Esta seguro de que desea eliminar el proceso seleccionado?</label>
        </div>

        <div className="flex justify-center gap-x-4 mt-3">
          <GreenButton btnText="Aceptar" btnAction={aceptButton} />
          <RedButton btnText="Cancelar" btnAction={cancelButton} />
        </div>
      </div>
    </div>
  );
}

export default DeleteProcessModal;
