const express = require("express");
const path = require("path");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

const passport = require("passport");
// const passportLocal = require("./config/passportLocals");
const passportJwt = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

const app = express();
const port = 8000;

// setup the chating settion to use socket.io
const chatServer = require("http").Server(app);
const chatSocket = require("./config/chat_sockets").chatSockets(chatServer);
// chatServer.listen(5000);

// the path that you provide to the express.static function is
//relative to the directory from where you launch your node process.
//If you run the express app from another directory, it’s safer to
//use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, "assets")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const fs = require("fs");
// fs.unlink('/uploads/users/avatars/avatar-1626454735020', function(err){
//     if(err) console.log("error",err)
//     console.log('file is delted')
// })

// url encoder to encode the data.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  // only print the requested urls.
  console.log(
    `************* method is: ${req.method}  requesting to:  ${req.url}`
  );
  next();
});

app.use(passport.initialize());
app.use(passport.setAuthenticatedUser);

// this makes the possible to allow this rsoursee to allow to all origins.
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(require("./routes"));

app.listen(port, function (err) {
  console.log(err || "server up and running " + port);
});
