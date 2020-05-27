const express = require("express");
const app = express();
const cors = require("cors");
const connectDb=require('./utils/db')

connectDb()
require("express-async-errors");
const auth = require("./middleware/auth");

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
  //Host Tạo Room
  socket.on("creat_room", (idRoom) => {
    socket.host = true;
    console.log("Host tạo room", idRoom);
    arrRoom.push({ idRoom: idRoom, nickNames: [] });

    socket.join(idRoom);
    socket.idRoom = idRoom;
    console.log("Host đang có", arrRoom);
  });
  //Player Tham gia vào Room
  socket.on("join_room", (idRoom) => {
    var isRightRoom = arrRoom.find((room) => idRoom === room.idRoom);

    if (isRightRoom) {
      socket.emit("is_join_room", true);
    } else {
      socket.emit("is_join_room", false);
    }
  });
  //Host Lưu nick name
  socket.on("nickName", function (data) {
    var memberNew = {
      id: socket.id,
      nickName: data,
      rightQuestion: 0,
      score: 0,
    };

    const room = arrRoom.find((room) => (socket.idRoom = room.idRoom));
    const index = arrRoom.indexOf(room);
    const idRoom = arrRoom[index].idRoom;
    //Kiểm tra nickName đã tồn tại trong room
    let nickName = arrRoom[index].nickNames.find((n) => n === data);
    if (!nickName) {
      arrRoom[index].nickNames.push(data);
      socket.emit("isRightNickName", true);
      io.sockets.in(socket.idRoom).emit("newMember", memberNew);
      io.sockets.in(socket.idRoom).emit("Number", 1);
      socket.nickName = data;
      socket.join(idRoom);
      socket.player = true;
      socket.idRoom = idRoom;

      console.log(socket.nickName + "Player join room: ", socket.idRoom);
    } else {
      socket.emit("isRightNickName", false);
    }
  });
  ///
  socket.on("leave_room", (id) => {
    io.sockets.in(id).emit("leave_room", true);
  });
  socket.on("exitRoom", (data) => {
    console.log("Rời");
    let room = arrRoom.find((room) => (socket.idRoom = room.idRoom));
    if (room) {
      let index = room.nickNames.indexOf(socket.nickName);
      if (index > -1) {
        room.nickNames.splice(index, 1);
        arrRoom[index] = room;
      }
    }
    
    console.log(socket.nickName + " player thoát");
    io.sockets.in(socket.idRoom).emit("memberExit", socket.nickName);
    socket.emit("hostExit", true);
    socket.leave(socket.idRoom);
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
      arrRoom = arrRoom.filter(function (room) {
        return room.idRoom !== socket.idRoom;
      });
      io.sockets.in(socket.idRoom).emit("hostExit", true);

      io.sockets.in(socket.idRoom).emit("numberCurrentQuestion", 0);
      console.log("host thoát");
      //Player thoát
    } else if (socket.player && !socket.host) {
      let room = arrRoom.find((room) => (socket.idRoom = room.idRoom));
      if (room) {
        let index = room.nickNames.indexOf(socket.nickName);
        if (index > -1) {
          room.nickNames.splice(index, 1);
          arrRoom[index] = room;
        }
      }

      console.log(socket.nickNames + " player thoát");
      io.sockets.in(socket.idRoom).emit("memberExit", socket.nickName);
    } else {
      console.log("Vãng lai thoát");
    }
  });
});

//router
app.get("/", function (req, res) {
  res.send("Hello!");
});

app.use("/api/questions", auth, require("./routes/questions.route"));
app.use("/api/account", require("./routes/accounts.route"));
app.use("/api/user", require("./routes/users.route"));
app.use("/api/quiz", require("./routes/quiz.route"));
//catch error
app.use((req, res, next) => {
  res.status(404).send("NOT FOUND");
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("View error log on console.");
});
