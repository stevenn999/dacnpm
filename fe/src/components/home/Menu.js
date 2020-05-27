import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Menu extends Component {
  sigOut = () => {
    localStorage.removeItem("token");
  };
  render() {
    return (
      <div className="menu">
        <Link to="/home">
          <i
            className="fa fa-home fa-2x mt-2 ml-5 button-menu "
            aria-hidden="true"
          >
            Home
          </i>
        </Link>
        <Link to="/create">
          <i
            className="fa fa-plus fa-2x mt-2 button-menu-add  button-menu"
            aria-hidden="true"
          >
            Thêm mới
          </i>
        </Link>
        <div className=" dropdown userDropdown button-menu ">
          <div
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="dropdown-item ">
              <h5 className=" text-danger ">{this.props.home.info.userName}</h5>
            </div>

            <div className=" dropdown-item ">
              <Link
                className="d-block "
                to="./login"
                onClick={() => this.sigOut()}
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i>Đăng xuất
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    home: state.home,
  };
};

export default connect(mapStatetoProps, null)(Menu);
