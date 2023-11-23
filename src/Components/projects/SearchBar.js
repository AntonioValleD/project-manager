// Images
import lupaImg from '../assets/img/Lupa.png'
import filterImg from '../assets/img/Filtros.png'

// React hooks
import { useState, useEffect } from 'react'

// Redux toolkit hooks
import { useSelector } from 'react-redux'


function SeacrhBar(props) {
  // Redux state
  const selectedProject = useSelector(state => state.appIndex).projectWindow
    .find(project => project.selected === true)


  // Local component state
  const [inputText, setInputText] = useState("")


  // Input text handler
  const handleInputText = (event) => {
    setInputText(event.target.value)

    props.inputText(event.target)
  }

  // Reset input text
  useEffect(() => {
    setInputText("")
  }, [selectedProject])

    
  return (
    <div 
      className="flex w-1/2 bg-white rounded-sm shadow-xl shadow-gray-800 items-center h-9
        border-gray-900 border-2"
    >
      <img 
        alt="filters"
        className="h-5 bg-white px-2 cursor-pointer border-r-2 border-gray-600"
        src={filterImg}
      />
      <input
        className="w-full rounded-sm h-full outline-0 pl-2"
        placeholder="buscar por OT, nombre de proyecto, cliente, OC . . ."
        value={inputText}
        onChange={event => handleInputText(event)}
      />
      <img 
        alt="lupa"
        className="h-5 bg-white m-1 pl-2 cursor-pointer border-l-2 border-gray-600"
        src={lupaImg}
      />
    </div>
  )
}
  
export default SeacrhBar