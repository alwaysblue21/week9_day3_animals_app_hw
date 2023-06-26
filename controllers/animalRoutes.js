const express = require("express");
const Animal= require("../models/animals")

const router = express.Router();

//--routes
router.get("/", (req, res) => {
    res.send("Hello World!")
});

//index
router.get("/animals", async (req, res) => {
    const allAnimals = await Animal.find({});

    res.render("index.ejs", { animals: allAnimals })
})

//new
router.get("/animals/new", (req, res) => {
    res.render("new.ejs")
})

//create
router.post("/animals", async (req, res) => {
    if(req.body.extinct === "on"){
        req.body.extinct = true;
    } else {
        req.body.extinct = false;
    }
    await Animal.create(req.body)
    res.redirect("/animals")
})


//show
router.get("/animals/:id", async (req, res) => {
    const foundAnimal = await Animal.findById(req.params.id)
    res.render("show.ejs", { animal: foundAnimal})
})

//delete
router.delete("/animals/:id", async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id)
    res.redirect("/animals")
})

//edit
router.get("/animals/:id/edit", async (req, res) => {
    const animal = await Animal.findById(req.params.id)
    res.render("edit.ejs", { animal })
})

//update
router.put("/animals/:id", async (req, res) => {
    if(req.body.extinct === "on") {
        req.body.extinct = true;
    } else {
        req.body.extinct = false;
    }

    await Animal.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/animals")
})

module.exports = router;