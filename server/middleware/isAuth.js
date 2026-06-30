import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Token not found, unauthorized",
      });
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth middleware error",
      error: error.message,
    });
  }
};

export default isAuth;
