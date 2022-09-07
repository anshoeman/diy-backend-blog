const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/Admin');
const authToken = require("../../middleware/auth.token");
/*GET API*/
const jwt = require('jsonwebtoken');
const jwtsecret = "mysecrettoken"
/*GET all users*/
/*Private Route*/
router.get('/', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
})
/*POST API*/
/*admin data post*/
router.post(
    "/",
    [
        check("email", "Email is Required").isEmail(),
        check("password", "Password is Required").exists(), //returns a Boolean
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user)
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User Doesnt Exists" }] });
             const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(404).json({ errors: [{ msg: "Password incorrect" }] });
            }

            const payload = {
                user: {
                    id: user.id, //With mongoose we can do .id rather than _id
                },
            };
            jwt.sign(
                payload,
                jwtsecret,
                {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
);
module.exports = router;