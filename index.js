const express = require("express");
const fs = require("fs");
const app = express();

app.use("/img", express.static("./img"));
app.use("/js", express.static("./js"));

// 첫 페이지 (로그인)
app.get("/", (req, res) => {
  fs.readFile("./MainLogin.html", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

// 회원가입 페이지
app.get("/signup", (req, res) => {
  fs.readFile("./sign_up.html", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

// 홈
app.get("/home/:id", (req, res) => {
  fs.readFile("./home.html", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      console.log(req.params);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

// 먹킷리스트
app.get("/mukitlist/:id", (req, res) => {
  fs.readFile("./mukit_list.html", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

app.listen(8080, function () {
  console.log("서버 시작");
});
