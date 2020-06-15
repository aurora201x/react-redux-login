const express = require("express");
const app = express();
const debug = require("debug")("my-application");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const auth = require("./routes/auth");

app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(3030, (req, res) => {
  debug("Server runs on the localhost:3030 port");
});
