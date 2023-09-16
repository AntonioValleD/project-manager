import WindowSelector from "./WindowSelector";
import LateralMenu from "./LateralMenu";
import Notificacions from "./Notifications";

function Header() {
  return (
    <div className="flex items-center gap-3">
        <WindowSelector/>
        <Notificacions/>
        <LateralMenu/>
    </div>
  );
}

export default Header;