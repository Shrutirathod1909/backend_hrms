const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("\n--- [authMiddleware] Process Started ---");

  try {
    const authHeader = req.headers.authorization;

    // Check authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token found in request");
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    console.log("✅ Token Found");

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      company: decoded.company,
      branch: decoded.branch,
    };

    console.log("✅ User authenticated");

    next();
  } catch (error) {
    console.log("❌ JWT Error:", error.message);

    // Token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    // Invalid token
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
