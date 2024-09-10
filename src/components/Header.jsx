import "../assets/styles/root.css";
import "../assets/styles/common.css";
import MenuIcon from "./icons/MenuIcon";
function Header() {
  return (
    <header>
      <div className="left-section">
        <div className="menu-icon">
          <MenuIcon />
        </div>
        <div className="site_name">IMAGOWORK</div>

        <div className="right-section">
          <img className="avatar" src={"/images/user_null.png"} alt="Avatar" />
        </div>
      </div>
    </header>
  );
}
export default Header;
