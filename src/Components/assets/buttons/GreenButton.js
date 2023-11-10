function GreenButton(props) {
  // Accept function
  const acceptFunction = () => {
    if (props.btnAction){
      props.btnAction()
    } else {
      console.log("Green button")
    }

    if (props.closeModal){
      props.closeModal()
    }
  }

  return (
    <button 
      className="bg-green-900 hover:bg-green-700 text-white py-0.5 px-3 text-md rounded-sm"
      onClick={() => acceptFunction()}
    >
      {props.btnText ? props.btnText : "Button"}
    </button>
  )
}
  
export default GreenButton
  