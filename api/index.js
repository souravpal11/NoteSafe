const app = require("../Backend/app");
const connectToMongo = require("../Backend/db");

module.exports = async (req, res) => {
  try {
    await connectToMongo();
    return app(req, res);
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};