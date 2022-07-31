import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../userCredentials/Login";
import Menu from "./Menu";
import Logo from "./Logo";

// import Logout from "./Logout";

function BaseLayout(props) {
  return (
    <div>
      <Logo />
      {/* {props.isAuthenticated ? <Menu /> : null} */}
      <Menu />
      {props.children}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(BaseLayout);
