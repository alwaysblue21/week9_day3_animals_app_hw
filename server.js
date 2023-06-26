require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override")
const Animal = require("./models/animals")
const app = express();


//middle
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//routes
app.get("/", (req, res) => {
    res.send("Hello World!")
});

//index
app.get("/animals", async (req, res) => {
    const allAnimals = await Animal.find({});

    res.render("index.ejs", { animals: allAnimals })
})

//new
app.get("/animals/new", (req, res) => {
    res.render("new.ejs")
})

//create?
app.post("/animals", async (req, res) => {
    if(req.body.extinct === "on"){
        req.body.extinct = true;
    } else {
        req.body.extinct = false;
    }
    await Animal.create(req.body)
    res.redirect("/animals")
})


//show
app.get("/animals/:id", async (req, res) => {
    const foundAnimal = await Animal.findById(req.params.id)
    res.render("show.ejs", { animal: foundAnimal})
})

//delete
app.delete("/animals/:id", async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id)
    res.redirect("/animals")
})

//listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});
