const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const url = "https://www.allrecipes.com/recipe/236609/honey-garlic-slow-cooker-chicken-thighs/";

async function scrapeData()  {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const ingredients = $(".ingredients-section__fieldset ul li")
    //console.log(ingredients)
    const recipe = {
      ingredients: []
    };

    ingredients.each((index, element) => {
      ingredient = $(element).find(".ingredients-item-name").text()
      console.log("element", $(element).find(".ingredients-item-name").text())
      recipe.ingredients.push(ingredient);

    });
    console.log("Recipe: ", recipe)
  } catch(error) {
    console.log(error)
  }
}

scrapeData();