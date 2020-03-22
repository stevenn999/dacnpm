const express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
const app = express();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000, () => {
  console.log("Listing port 8000");
});

const adapter = new FileSync("db.json");
const db = low(adapter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.engine(
  ".hbs",
  exphbs({
    layoutsDir: "./views/",
    defaultLayout: "index",
    extname: ".hbs"
  })
);

app.use(express.static("public"));
//Set view
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
var number = 0;
var numberQuestion = 0;
var numberMemberAnswer = 0;
io.on("connection", function(socket) {
  console.log("CÓ người kết nối");

  socket.on("start", function(start) {
    io.sockets.emit("startOk", start);
  });

  socket.on("next", function(data) {
    numberQuestion += 1;
    numberMemberAnswer = 0;
    io.sockets.emit("numberMemberAnswer", numberMemberAnswer);
    io.sockets.emit("numberQuestion", numberQuestion);
  });

  socket.on("nickName", function(data) {
    var memberNew = {
      id: socket.id,
      nickName: data,
      rightQuestion: 0,
      score: 0
    };

    socket.nickName = data;
    number++;
    io.sockets.emit("newMember", memberNew);
    io.sockets.emit("Number", number);
  });

  socket.on("memberAnswer", function(data) {
    numberMemberAnswer++;
    io.sockets.emit("numberMemberAnswer", numberMemberAnswer);
    io.sockets.emit("memberAnswer", {
      id: socket.id,
      isRight: data
    });
  });

  io.sockets.emit("numberQuestion", numberQuestion);

  socket.emit("Number", number);

  socket.on("disconnect", function() {
    io.sockets.emit("memberExit", socket.id);
    number--;
    if (number >= 0) {
      io.sockets.emit("Number", number);
    }

    numberQuestion = 0;
    numberMemberAnswer = 0;
    number = 0;
  });
});

app.get("/", function(req, res) {
  res.send("Hello");
});
app.get("/getdata", function(req, res) {
  res.send(db.get("questions"));
});
