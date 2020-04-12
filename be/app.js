const express = require("express");
const app = express();
const cors = require('cors');
require("express-async-errors");
const auth=require("./middleware/auth")

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 8000, () => {
  console.log("Listing port 8000");
});


app.use(cors());
app.use(express.json());

var arrRoom = [];
//socket io
io.on("connection", function (socket) {
  console.log("CÓ người kết nối");
  //Host Tạo Room
  socket.on("creat_room", (idRoom) => {
    socket.host = true;
    console.log("Host tạo room", idRoom);
    arrRoom.push(idRoom);
    socket.join(idRoom);
    socket.idRoom = idRoom;
    console.log("Host đang có", arrRoom);
  });
  //Player Tham gia vào Room
  socket.on("join_room", (idRoom) => {
    socket.player = true;
    var isRightRoom = arrRoom.find((room) => idRoom === room);
    if (isRightRoom) {
      socket.join(idRoom);
      socket.idRoom = idRoom;
      socket.emit("is_join_room", true);
      console.log("Player join room: ", socket.idRoom);
    } else {
      socket.emit("is_join_room", false);
    }
  });
  //Host bắt đầu
  socket.on("start", function (start) {
    socket.start = true;
    socket.numberCurrentQuestion = 0;
    io.sockets.in(socket.idRoom).emit("startOk", true);
  });

  //Host Gửi bộ cậu hỏi cho players
  socket.on("questions", (questions) => {
    socket.questions = questions;
    io.sockets.in(socket.idRoom).emit("questions", questions);
  });

  //Host Chuyển câu hỏi
  socket.on("next", function (data) {
    socket.numberCurrentQuestion += 1;
    io.sockets.in(socket.idRoom).emit("startOk", true);
    io.sockets.in(socket.idRoom).emit("questions", socket.questions);
    io.sockets
      .in(socket.idRoom)
      .emit("numberCurrentQuestion", socket.numberCurrentQuestion);
  });
  //Host Lưu nick name
  socket.on("nickName", function (data) {
    var memberNew = {
      id: socket.id,
      nickName: data,
      rightQuestion: 0,
      score: 0,
    };
    socket.nickName = data;
    io.sockets.in(socket.idRoom).emit("newMember", memberNew);
    io.sockets.in(socket.idRoom).emit("Number", 1);
  });
  //Player đưa câu trả lời lên host
  socket.on("memberAnswer", function (data) {
    io.sockets.in(socket.idRoom).emit("memberAnswer", {
      id: socket.id,
      isRight: data,
    });
  });

  socket.on("disconnect", function () {
    //Host thoát
    if (socket.host && !socket.player) {
      const index = arrRoom.indexOf(socket.idRoom);
      console.log("host thoát");
      start = false;
      io.sockets.in(socket.idRoom).emit("is_join_room", false);
      io.sockets.in(socket.idRoom).emit("startOk", false);
      if (index > -1) {
        arrRoom.splice(index, 1);
      }
      io.sockets.in(socket.idRoom).emit("numberCurrentQuestion", 0);
      //Player thoát
    } else if (socket.player && !socket.host) {
      console.log("player thoát");
      io.sockets.in(socket.idRoom).emit("memberExit", socket.id);
    } else {
      console.log("Vãng lai thoát");
    }
  });
});

//router
app.get("/", function (req, res) {
  res.send("Hello!");
});

app.use('/api/questions',auth,require('./routes/questions.route'))
app.use('/api/account',require('./routes/accounts.route'))
//catch error
app.use((req, res, next) => {
  res.status(404).send("NOT FOUND");
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("View error log on console.");
});
