
// Images
import lupaImg from '../assets/img/Lupa.png';
import filterImg from '../assets/img/Filtros.png';

function SeacrhBar(props) {
    // Seacrh bar input text
    //const [filter, setFilter] = useState({input: ''});
    
    return (
      <div 
        className="flex w-1/2 bg-white rounded-sm shadow-xl shadow-gray-800 items-center h-9 border-gray-900 border-2"
      >
        <img 
          alt="filters"
          className="h-5 bg-white px-2 cursor-pointer border-r-2 border-gray-600"
          src={filterImg}
        />
        <input
          className="w-full rounded-sm h-full outline-0 pl-2"
          placeholder="buscar por OT, nombre de proyecto, cliente, OC . . ."
          onChange={event => props.inputText(event.target)}
        />
        <img 
          alt="lupa"
          className="h-5 bg-white m-1 pl-2 cursor-pointer border-l-2 border-gray-600"
          src={lupaImg}
        />
      </div>
    );
  }
  
  export default SeacrhBar;