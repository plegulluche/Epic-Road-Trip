const express = require("express");

module.exports.sayHello = async (req, res) => {
    return res.send("Hello");
    }