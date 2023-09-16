function BlueButton(props) {
  return (
    <button 
      className="bg-blue-900 hover:bg-blue-700 text-white py-0.5 px-2 text-md rounded-sm "
      onClick={() => props.btnAction ? props.btnAction() : console.log("Blue button")}
    >
      {props.btnText ? props.btnText : "Button"}
    </button>
  );
}

export default BlueButton;
