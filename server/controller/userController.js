const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        let user = new userModel(req.body)
        await user.save()
        user = user.toObject()
        delete user.password
        return res.status(201).send({
            success: true,
            message: 'user saved successfully',
            user
        })
    } catch (error) {
        console.log(`Error in registerController api`, error)

    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email && password) {
            let user = await userModel.findOne(req.body).select("-password")
            const token = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" })
            res.send({
                user,
                token
            })
        } else {
            res.send({ result: "No User found" })
        }
    } catch (error) {
        console.log(`Error in registerController api`, error)

    }
}

module.exports = { registerController, loginController }