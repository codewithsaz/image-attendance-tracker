const mongoose = require("mongoose");

mongoose.connect(process.env.mongoDBLocal);

const connection = mongoose.connection;

connection.on("open", () => {
  console.log("DB connected");
});

connection.on("error", (err) => {
  console.error("DB error:", err);
});

module.exports = connection;
