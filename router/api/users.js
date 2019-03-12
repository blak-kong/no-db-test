// login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")

const User = require("../../models/User")

// $route   GET api/users/test
// @desc    返回的请求的json数据
// @access  public
router.get("/test", (req, res) => {
    res.json({msg: "login works"})
})

// $route   POST api/users/register
// @desc    返回的请求的json数据
// @access  public
router.post("/register", (req, res) => {
    // 1  console.log(req.body) 打印了传入的key/value
    // 2  查询数据库是否存在传入的邮箱
    // console.log(req.body)
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                return res.status(400).json({email: "邮箱已被注册!"})
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                // 加密密码
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Store hash in your password DB
                        if (err) throw err;
                        newUser.password = hash;
                        // 保存数据
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// 暴露给根目录
module.exports = router;