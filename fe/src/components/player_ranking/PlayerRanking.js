import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./PlayerRanking.css";

class PlayerRanking extends Component {
  render() {
    const members = this.props.location.state.members;

    const showRanking = () => {
      return members.map((member, i) => {
        return (
          <tbody key={i}>
            <tr>
              <th scope="row">{(i += 1)}</th>
              <td>{member.nickName}</td>
              <td>{member.numberRightQuestion}</td>
              <td>{member.score}</td>
            </tr>
          </tbody>
        );
      });
    };
    return (
      <div className="ranking">
        <button className="btn btn-success btnDownload">
          <i class="fa fa-download" aria-hidden="true">
            Tải dữ liệu
          </i>
        </button>
        <div className="labelRanking">Bảng xếp hạng</div>
        <div className="playerRanking1">
          <img
            alt="top 1"
            src="https://images.vexels.com/media/users/3/127647/isolated/preview/2e42210587bfc22de5e8cf9dc461b3c4-first-rank-badge-olympic-by-vexels.png"
            className="imgNumber1"
          ></img>
          <h1 className="playName1">{members[0].nickName}</h1>
        </div>

        <table className="table table-hover table-dark playerRanking">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Nick Name</th>
              <th scope="col">Số câu trả lời đúng</th>
              <th scope="col">Điểm số</th>
            </tr>
          </thead>
          {showRanking()}
        </table>
      </div>
    );
  }
}
export default withRouter(PlayerRanking);
