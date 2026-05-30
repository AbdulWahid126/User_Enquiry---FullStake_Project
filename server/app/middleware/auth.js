const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ status: 0, message: "Access Denied: No Token Provided" });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'veloce_secret_key_2026_super_secure';
        const decoded = jwt.verify(token, secret);
        
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send({ status: 0, message: "Access Denied: Invalid or Expired Token", error: err.message });
    }
};

module.exports = auth;
