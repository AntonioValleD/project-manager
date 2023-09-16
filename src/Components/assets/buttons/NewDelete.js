import newImg from '../img/New-w.png';
import deleteImg from '../img/Eliminar-w.png';

function NewDeleteButton(props) {

  return (
    <div className="flex h-full gap-2">
      <button
        className='flex bg-green-900 hover:bg-green-700 rounded-sm h-7 p-2 items-center text-l font-normal text-white transition-all duration-75'
        onClick={() => props.newBtn ? props.newBtn() : console.log("New button")}
      >
        <img 
          alt='new'
          src={newImg}
          className='h-4 pr-2 mr-2 border-r-2 border-white'
        />
        Nuevo
      </button>
      <button 
        className='flex bg-red-900 hover:bg-red-700 rounded-sm h-7 p-2 items-center text-l font-normal text-white transition-all duration-75'
        onClick={() => props.deleteBtn ? props.deleteBtn() : console.log("Delete button")}
      >
        <img 
          alt='delete'
          src={deleteImg}
          className='h-4 pr-2 mr-2 border-r-2 border-white'
        />
        Eliminar
      </button>
    </div>
  );
}

export default NewDeleteButton;
