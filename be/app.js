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

var start = 0;
io.on("connection", function(socket) {
  socket.on("start", function(data) {
    start = parseInt(data);
    io.sockets.emit("startOk", start);
  });
 
});

app.get("/", function(req, res) {
  res.render("index");
});
app.get("/getdata", function(req, res) {
  res.send(db.get("questions").value());
});
