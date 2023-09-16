import notificationIcon from '../assets/img/Notificacion-w.png';

function Notificacions() {
    return (
      <div className=" h-full cursor-pointer">
          <img
            alt='notifications'
            src={notificationIcon}
            className='h-6'
          />
      </div>
    );
  }
  
  export default Notificacions;