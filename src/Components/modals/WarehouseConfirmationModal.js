import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import GreenButton from "../assets/buttons/GreenButton";
import RedButton from "../assets/buttons/RedButton";

function WarehouseConfirmationModal(props) {
  // Hooks
  const dispatch = useDispatch();


  /* Funtions */
  const acceptFn = () => {
    props.acceptFn(props.action);
    cancelFn();
  };

  const cancelFn = () => {
    dispatch(changeModalStatus({
      modalName: "warehouseConfirmation",
      modalStatus: false
    }));
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
          <label>{props.textTitle}</label>
        </div>

        <div className="flex justify-center text-lg font-regular">
          <label className="text-center">
            {props.textDescription}
          </label>
        </div>

        <div className="flex justify-center gap-x-4 mt-3">
          <GreenButton
            btnText="Aceptar"
            btnAction={acceptFn}
          />
          <RedButton btnText="Cerrar" btnAction={cancelFn} />
        </div>
      </div>
    </div>
  );
}

export default WarehouseConfirmationModal;
