const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var app = Express();
app.use(BodyParser.json());
Mongoose.connect("mongodb://localhost:27017/shopping");

const PersonModel = Mongoose.model("products", {
	imagePath:String,
    title: String,
    description: String,
    price: Number

});

app.get("/get", async (request, response) => {
        var result = await PersonModel.find().exec();
        response.send(result);
});


app.post("/personCreate",  (request, response) => {
        var person = new PersonModel(request.body);
        var result = person.save();
        response.send(result);
});	

app.delete("/delete/:id", async (request, response) => {
        var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
});

app.put("/update/:id", async (request, response) => {
        var person = await PersonModel.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
});

app.listen(3000, () => {
    console.log("Listening at port 3000");
});