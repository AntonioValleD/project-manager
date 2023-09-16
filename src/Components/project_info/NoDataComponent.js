function NoDataComponent(props) {
  return (
    <label
      className="py-4 w-full text-center text-lg"
    >
      {`${props.textInfo ? props.textInfo : "No hay datos para mostrar"}`}
    </label>
  );
}
  
export default NoDataComponent;
  