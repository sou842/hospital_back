const express = require('express');
const { userModel } = require('../model/usermodel.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            res.status(200).json({ msg: 'user already present, please login' })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ error: err.massage })
                } else {
                    const newUser = new userModel({ email, password: hash })
                    await newUser.save()
                    res.status(200).json({ msg: 'new user register', data: req.body })
                }
            })
        }
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {

            bcrypt.compare(password, user.password, async (err, result) => {

                if (result) {
                    var token = jwt.sign({ greet: 'hello' }, 'masai')
                    res.status(200).json({ msg: 'login successful', token: token })
                } else{
                    res.status(400).json({ error: err.massage })
                }
            })

        } else {
            res.status(200).json({ msg: 'user not found, please Register' })

        }
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})



module.exports = { userRouter }
