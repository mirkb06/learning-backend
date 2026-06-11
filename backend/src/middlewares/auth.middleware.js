const { verifyToken } = require(
    "../utils/jwt.js"
);

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing"
        });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token missing"
        });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}
module.exports = {
    authenticate
}
