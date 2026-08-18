const app = require("../backend/app");
const connectToMongo = require("../backend/db");

module.exports = async (req, res) => {
  try {
    await connectToMongo();

    return app(req, res);
  } catch (error) {
    console.error("Database error:", error);

    return res.status(500).json({
      error: "Database connection failed",
    });
  }
};