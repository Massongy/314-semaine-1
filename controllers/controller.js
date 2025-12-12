const {Users} = require("../models/index.js");

exports.helloWorld = (req, res) => {
    res.send('Hello Jacques')
};

exports.getUsers = async (req, res) => {
    const users = await Users.findAll()
    res.json(users)

 };