const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const sqlFn = require("../mysql");
const config = require("../config");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  const sql = "select * from user where `username`=? AND `password`=?";
  const arr = [username, password];
  sqlFn(sql, arr, function (data) {
    if (data.length > 0) {
      //res.json({ success: true });
      const token = jwt.sign(
        {
          id: data[0].id,
          username: data[0].username,
        },
        config.jwtSecret // 只有服务器知道的密钥
      );
      res.send(token); // Check in Network
    } else {
      res.status(401).json({
        errors: { form: "The username or the password is wrong. Try again." },
      });
    }
  });
});

module.exports = router;
