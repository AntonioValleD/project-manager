import RedButton from "../assets/buttons/RedButton";

function ProjectAlreadyExists(props) {
  // Hooks
  const dispatch = useDispatch();

  /* Funtions */
  const closeButton = () => {
    dispatch(changeModalStatus({modalName: 'noProjectSelected', modalStatus: false}));
  }

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
          <label className="text-center">No ha seleccionado ningun proyecto para eliminar</label>
        </div>

        <div className="flex justify-center gap-x-4 mt-3">
          <RedButton btnText="Cerrar" btnAction={closeButton} />
        </div>
      </div>
    </div>
  );
}

export default ProjectAlreadyExists;
