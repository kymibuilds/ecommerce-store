import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, msg: "Not authorized" });
    }

    // Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request for controller access
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    // Return proper 401 instead of generic success=false
    return res
      .status(401)
      .json({ success: false, msg: "Invalid or expired token" });
  }
};

export default authUser;
