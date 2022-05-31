const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const JWT_Secret = process.env.JWT_Secret
module.exports = (req, res, next) => {
    const { authorization } = req.headers
    // console.log(authorization)

    if (!authorization)
       return res.status(401).json({ error: "not logged in" })

    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_Secret, (err, payload) => {

        if (err)
            return res.status(401).json({ "error": "please login" })

        const { _id } = payload;
        User.findById(_id).then((user) => {
            req.user = user
            // console.log("user printing"+req.user)
            return req.user
        })
        next();
    })
}
