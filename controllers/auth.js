const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    doRegister(req, res){
        db.users.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        }).then(user=>{
            return res.status(201).json({
                user,
                message:"User was registered succesfully"
            });
        }).catch(error =>{
            return res.status(500).json({ error: error.message })
        })
    },
    doLogin (req, res) {
        db.users.findOne({ 
            where:{ 
                email: req.body.email ,
            }
        }).then(user=>{
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
        
            if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
            }
        
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // 24 hours
            });
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        }).catch(error=>{
            res.status(500).json({ error: error.message })
        })
    }
}