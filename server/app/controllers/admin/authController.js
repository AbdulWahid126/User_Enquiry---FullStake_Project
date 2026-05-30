const userModel = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ status: 0, message: "Please fill in all fields" });
        }

        // Check if user already exists
        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ status: 0, message: "User with this email already exists" });
        }

        // Hash Password
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).send({ status: 1, message: "User Registered Successfully" });
    } catch (err) {
        res.status(500).send({ status: 0, message: "Error registering user", error: err.message });
    }
};

let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ status: 0, message: "Please fill in all fields" });
        }

        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ status: 0, message: "Invalid email or password" });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ status: 0, message: "Invalid email or password" });
        }

        // Generate JWT Token
        const secret = process.env.JWT_SECRET || 'veloce_secret_key_2026_super_secure';
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, secret, { expiresIn: '24h' });

        res.send({
            status: 1,
            message: "Logged In Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).send({ status: 0, message: "Error logging in", error: err.message });
    }
};

let getMe = async (req, res) => {
    try {
        let user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).send({ status: 0, message: "User not found" });
        }
        res.send({ status: 1, user });
    } catch (err) {
        res.status(500).send({ status: 0, message: "Error fetching user info", error: err.message });
    }
};

module.exports = { register, login, getMe };
