import axios from 'axios';
import cheerio from 'cheerio';
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Please enter a valid URL from AllRecipies.com: ", (url) => {
  scrapeData(url);
  rl.close();
});

async function scrapeData(url) {
  try {
    console.log("Getting Data...")
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const ingredients = $(".ingredients-section__fieldset ul li");
    const instructions = $(".instructions-section__fieldset ul li");

    const recipe = {
      ingredients: [],
      instructions: []
    };

    ingredients.each((index, element) => {
      let ingredient = $(element).find('span.ingredients-item-name').text();
      recipe.ingredients.push(ingredient);
    });

    instructions.each((index, element) => {
      let instruction = $(element).find('.paragraph').text();
      recipe.instructions.push(instruction);
    });
    console.log("Recipe: ", recipe)
  } catch(error) {
    console.log(error)
  }
}
