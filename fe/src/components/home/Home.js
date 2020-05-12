import React, { Component } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { urlVerifyToken } from "../../constants/endPoint";
import jwtDecode from "jwt-decode";
import "./Home.css";

class Home extends Component {
  UNSAFE_componentWillMount() {
    this.checkToken();
  }

  checkToken = async () => {
    let token = localStorage.getItem("token");
    const ret = await axios.post(urlVerifyToken, { token: token });
    if (!ret.data) {
      localStorage.removeItem("token");
      this.props.history.push("/login");
      window.location.reload();
    }
  };

  sigOut = () => {
    localStorage.removeItem("token");
  };
  render() {
    const token = localStorage.getItem("token");
    if (token === null) {
      return <Redirect to="/login" />;
    }
    const tokenDecode = jwtDecode(token);
    const userName = tokenDecode.fullName;
    return (
      <div>
        <div className="menu">
          <Link to="/home">
            <i
              className="fa fa-home fa-2x mt-2 ml-5 button-menu "
              aria-hidden="true"
            >
              Home
            </i>
          </Link>
          <Link to="/create" >
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
                <h5 className=" text-danger ">{userName}</h5>
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
        <div className="container">
          <div className="mt-5">
            <div className="storeQuiz">
              <img
                className="img-storeQuiz"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                alt="img"
              />
              <div className="box-store">
                <h2 className="mt-2 ml-5">Game1</h2>
                <div className="menu-button">
                  <button className="btn btn-warning ">
                    <i className="fa fa-pencil " aria-hidden="true">
                      Chỉnh sửa
                    </i>
                  </button>
                  <button className="btn btn-danger ">
                    <i className="fa fa-trash" aria-hidden="true">
                      Xóa
                    </i>
                  </button>
                  <Link to="/option_play" target="_blank">
                    <button className="btn btn-success ">
                      <i className="fa fa-play" aria-hidden="true">
                        Chơi game
                      </i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
