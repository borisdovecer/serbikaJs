const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const userModel = require('../models/userModel');

exports.getLogin = (req, res) => res.render('login');
exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next);
};
exports.postLogout = (req, res) => {
    req.logout();
    res.redirect('/login');
};
exports.getRegister = (req, res) => {
    res.render('register')
};

exports.getList = async (req, res) => {
    const users = await userModel.find({}, data => data)
    res.render('backend/user_list', {
        title: 'title',
        description: 'users',
        user: req.user,
        data: users
    })
};
exports.create = async (req, res) => {
    const { username, password } = req.body;
    const usr = await userModel.findOne({ username });
    if (usr) {
        return res.redirect('/');
    }
    const newUser = new userModel({
        username,
        password,
        role: "user"
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(() => {
                    res.redirect('/login');
                })
                .catch(err => console.log(err));
        });
    });
};
exports.update = async (req, res) => {
    console.log('post user');
};
exports.remove = (req, res) => {
    console.log('remove user')
};
