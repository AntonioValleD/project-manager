
function AlertInfoModal(props) {

  return (
    <div>
      <label className={`text-center w-full ${props.textColor === 'red' ? 'text-red-700' : 'text-green-700'}`}>{props.message}</label>
    </div>
  );
}

export default AlertInfoModal;
