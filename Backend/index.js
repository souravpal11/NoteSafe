require("dotenv").config({
  path: __dirname + "/.env",
});

const connectToMongo = require("./db");
const app = require("./app");

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToMongo();

    app.listen(port, () => {
      console.log(`Backend running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();