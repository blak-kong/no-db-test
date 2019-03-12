const express = require("express");
const mongoose = require("mongoose") // mongo
const bodyParser = require("body-parser")
const app = express(); // 实例化

// 引入users.js
const users = require("./router/api/users")

// DB config
const db = require("./config/keys").mongoURI;

// 使用Body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(db, {useNewUrlParser: true})
        .then(() => console.log("MongoDB Connected lzw❤qhr❤❤❤❤"))
        .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.send("hello world!")
})

// 使用routes
app.use("/api/users", users)

const port = process.env.PORT || 5000; // 端口号

app.listen(port, () => { // 监听
    console.log(`Server running on port ${port}`);
})