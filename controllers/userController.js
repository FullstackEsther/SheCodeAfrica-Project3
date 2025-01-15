const User = require('../models/User');
const jwt = require('jsonwebtoken');



const createUser = async (req, res) => {

    const {username, email, password, phone, address, userType} = req.body;

    try {
        if (!username || !email || !password || !phone || !address || !userType) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const newUser = new User({
            username,
            email,
            password,
            phone,
            address,
            userType
        });

        await newUser.save();

        return res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.log('Error creating user', error);
        return res.status(500).json({message: 'Error creating user'});
    }

}



const getUser = async (req, res) => {

    const userId = req.params.id;
    try {
       const user = await User.findById({_id: userId}, {password: 0, __v: 0, updatedAt: 0, createdAt: 0});
       return res.status(200).json(user);
    } catch (error) {
        console.log('Error getting user', error);
        return res.status(500).json({message: 'Error getting user'});
    }
}

const updateUser = async (req, res) => {

    const userId = req.params.id;

    try {
        await User.findByIdAndUpdate(userId, {
            $set: req.body
        })

    } catch(error) {
        console.log('Error updating user', error);
        return res.status(500).json({message: 'Error updating user'});
    }

}

deleteUser = async (req, res) => {

    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        return res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.log('Error deleting user', error);
        return res.status(500).json({message: 'Error deleting user'});
    }

}
module.exports = {createUser, getUser, updateUser, deleteUser};
