function RedButton(props) {
  return (
    <button
      className="bg-red-900 hover:bg-red-700 text-white py-0.5 px-3 text-md rounded-sm"
      onClick={() => props.btnAction ? props.btnAction() : console.log("Red button")}
    >
      {props.btnText ? props.btnText : "Button"}
    </button>
  );
}

export default RedButton;
