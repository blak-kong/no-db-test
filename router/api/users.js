// login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const keys = require("../../config/keys")

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
                var avatar = gravatar.url(req.body.email , {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
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

// $route   GET api/users/test
// @desc    返回token jwt passport
// @access  public

router.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(404).json({email: "用户不存在！"});
            }

            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {id:user.id, name: user.name};
                        // jwt.sign("规则","加密名字","过期时间","箭头函数")
                        jwt.sign(rule, keys.secretOrKey, {expiresIn:3600}, (err,token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: "lzw_" + token
                            });
                        })
                        // res.json({mas: "success"});
                    } else {
                        return res.status(400).json({password:"密码错误"})
                    }
                })
        }) 
})

// 暴露给根目录
module.exports = router;