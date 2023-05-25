const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`/recipe for creating recipes, /recipes for viewing all recipes`);
});

app.get("/recipe", (req, res) => {
  res.render("index");
});

// Create a Recipe model
const recipeSchema = new mongoose.Schema({
  receipeName: String,
  receipeTime: String,
  ingredients: [String],
  serves: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

app.post("/recipe", (req, res) => {
  const recipe = new Recipe({
    _id: new mongoose.Types.ObjectId(),
    receipeName: req.body.receipeName,
    receipeTime: req.body.receipeTime,
    ingredients: req.body.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim()),
    serves: req.body.serves,
  });

  recipe
    .save()
    .then((result) => {
      console.log(result);
      res.redirect(`/recipe/${result._id}`);
    })
    .catch((err) => {
      console.error(err);
      res.send("An error occurred while saving a new recipe.");
    });
});

app.get("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("recipe", { recipe });
  } catch (err) {
    console.error(err);
    res.send("An error occurred while retrieving the recipe.");
  }
});

app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.render("allRecipes", { recipes });
    })
    .catch((err) => {
      console.error(err);
      res.send("An error occurred while retrieving the recipes.");
    });
});

app.put("/recipe/:id", (req, res) => {
  const recipeId = req.params.id;
  const { receipeName, receipeTime, ingredients, serves } = req.body;

  const updateFields = {};
  if (receipeName) {
    updateFields.receipeName = receipeName;
  }
  if (receipeTime) {
    updateFields.receipeTime = receipeTime;
  }
  if (ingredients) {
    updateFields.ingredients = ingredients;
  }
  if (serves) {
    updateFields.serves = serves;
  }

  Recipe.findByIdAndUpdate(recipeId, updateFields, { new: true })
    .then((updatedRecipe) => {
      res.render("recipe", { recipe: updatedRecipe });
    })
    .catch((err) => {
      console.error(err);
      res.send("An error occurred while updating the recipe.");
    });
});

app.delete("/recipe/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findByIdAndDelete(recipeId)
    .then(() => {
      res.send("Recipe deleted successfully.");
    })
    .catch((err) => {
      console.error(err);
      res.send("An error occurred while deleting the recipe.");
    });
});

app.listen(port, () => {
  mongoose
    .connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Connected to database!");
      console.log(`App listening on port ${port}`);
    })
    .catch((error) => {
      console.log("Connection failed!", error);
    });
});
