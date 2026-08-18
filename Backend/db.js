const mongoose = require("mongoose");

const connectToMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to MongoDB Atlas");
};

module.exports = connectToMongo;