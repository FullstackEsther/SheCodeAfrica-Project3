const User = require('../models/User.js')
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const {v4: uuidv4} = require('uuid');


module.exports = {

    // Register a new user
    createUser: async (req, res) => {

        // information stored on the request body

        const {username, email, password, phone, address, userType} = req.body;

        // Validate required fileds
        if (!username || !email || !password || !phone || !address || !userType) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const hash = await bcrypt.hash(password, 10);


        try {

            const newUser = new User({
                username,
                uid: uuidv4(),
                email,
                password: hash,
                phone,
                address,
                userType
            });

            // save the user to the database

            await newUser.save();

            // return a success message

            return res.status(201).json({message: 'User created successfully'});


        } catch (error) {
            console.log('Error creating user', error);
            return res.status(500).json({message: 'Error creating user'});
        }


    },


    loginUser: async (req, res) => {

        try {
            const user = await User.findOne({email: req.body.email}, {__v: 0, createdAt: 0, updatedAt: 0, email: 0});


            if (!user) {
                return res.status(401).json({message: 'Wrong credentials'});
            }

            // compare password
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json({message: 'Wrong credentials'});
            }

            // generate JWT token
            const userToken = jwt.sign({
                id: user._id,
                userType: user.userType,
                email: user.email,

            }, process.env.JWT_SECRET, {expiresIn: '21d'});

            return res.status(200).json({
                message: 'Login successful', token: userToken, userType: user.userType,
                email: user.email, id: user._id
            });
        } catch (error) {
            console.log('Error logging in user', error);
            return res.status(500).json({message: 'Error logging in user'});


        }

    }

}


