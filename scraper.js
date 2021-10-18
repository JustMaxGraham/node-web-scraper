const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const url3 = "https://www.allrecipes.com/recipe/219988/cajun-crab-cakes-no-breadcrumbs/"
const url2 = "https://www.allrecipes.com/recipe/236609/honey-garlic-slow-cooker-chicken-thighs/";
const url1 = "https://www.allrecipes.com/recipe/260540/chef-johns-sourdough-bread/"

async function scrapeData()  {
  try {
    const { data } = await axios.get(url2);

    const $ = cheerio.load(data);

    const ingredients = $(".ingredients-section__fieldset ul li");
    const instructions = $(".instructions-section__fieldset ul li");
    //console.log("Instruction section: ", instructions)

    const recipe = {
      ingredients: [],
      instructions: []
    };

    ingredients.each((index, element) => {
      ingredient = $(element).find('.ingredients-item-name').text();
      //console.log("Ingredient", ingredient)
      recipe.ingredients.push(ingredient);
    });

    instructions.each((index, element) => {
      instruction = $(element).find('.paragraph').text();
      //console.log("Instruction", instruction)
      recipe.instructions.push(instruction);
    });
    console.log("Recipe: ", recipe)
  } catch(error) {
    console.log(error)
  }
}

scrapeData();