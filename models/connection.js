require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection
    .on("open", () => console.log("connected to mongoose"))
    .on("closed", () => console.log("disconnected from mongoose"))
    .on("error", (error) => console.log(error))

module.exports = mongoose;