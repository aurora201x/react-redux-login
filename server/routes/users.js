const express = require("express");
const isEmpty = require("lodash/isEmpty");
const validator = require("validator");

const sqlFn = require("../mysql");

const router = express.Router();

// 5个验证 user, email, password, passwordConfirmation, password = passwordConfirmation
const validatorInput = (data) => {
  let errors = {};
  if (validator.isEmpty(data.username)) {
    errors.username = "Please enter the valid username.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter the valid email.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Please enter the password.";
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Please confirm password.";
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation =
      "The two passwords are different. Please check and enter again.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

router.post("/", (req, res) => {
  //console.log(req.body);
  const { errors, isValid } = validatorInput(req.body);
  // 接受数据库语句
  var sql = "insert into user value (null,?,?,?,?)";
  var arr = [
    req.body.email,
    req.body.username,
    req.body.password,
    req.body.passwordConfirmation,
  ];
  if (isValid) {
    //res.send({ success: true }); // 这里只是用来测试，并没有真正连上数据库
    sqlFn(sql, arr, function (data) {
      if (data.affectedRows) {
        res.send({ success: true });
      } else {
        res.status(400).json({ error: "Fail to sign up." });
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

// 验证用户名是否已经存在
router.get("/:username", (req, res) => {
  var sql = "select * from user where `username`=?";
  var arr = [req.params.username];
  sqlFn(sql, arr, function (data) {
    if (data) {
      // 说明用户名已存在
      res.send(data);
    } else {
      res.send({});
    }
  });
});

module.exports = router;
