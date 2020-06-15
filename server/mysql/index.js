const mysql = require("mysql");

// 四个参数：主机地址，用户名，密码，库
var client = mysql.createConnection({
  host: "localhost",
  user: "root", // 默认
  password: "",
  database: "userlogintest",
});

function sqlFn(sql, arr, callback) {
  client.query(sql, arr, function (error, result) {
    if (error) {
      console.log(new Error(error));
      return;
    }
    callback(result);
  });
}

module.exports = sqlFn;
