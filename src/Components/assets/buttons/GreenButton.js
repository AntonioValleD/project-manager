function GreenButton(props) {
  return (
    <button 
      className="bg-green-900 hover:bg-green-700 text-white py-0.5 px-3 text-md rounded-sm"
      onClick={() => props.btnAction ? props.btnAction() : "Green button"}
    >
      {props.btnText ? props.btnText : "Button"}
    </button>
  )
}
  
export default GreenButton
  