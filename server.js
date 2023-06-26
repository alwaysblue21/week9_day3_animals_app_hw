require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Animal = require("./models/animals")
const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World!")
});

app.get("/animals", async (req, res) => {
    const allAnimals = await Animal.find({});

    res.render("index.ejs", { animals: allAnimals })
})


app.get("/animals/new", (req, res) => {
    res.render("new.ejs")
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});
