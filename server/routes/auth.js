const express = require("express");

const router = express.Router();

const sqlFn = require("../mysql");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  const sql = "select * from user where `username`=? AND `password`=?";
  const arr = [username, password];
  sqlFn(sql, arr, function (data) {
    if (data.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({
        errors: { form: "The username or the password is wrong. Try again." },
      });
    }
  });
});

module.exports = router;
