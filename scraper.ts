import axios from 'axios';
import cheerio from 'cheerio';
import readline from 'readline';

interface Recipe {
  title: string,
  author: string,
  ingredients: string[],
  instructions: string[]
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Please enter a valid URL from AllRecipies.com: ", (url: string) => {
  scrapeData(url);
  rl.close();
});

async function scrapeData(url: string) {
  try {
    console.log("Getting Data...")
    const { data } : any = await axios.get(url);

    const $ = cheerio.load(data);

    const title: string = $("h1.headline").text();
    const author: string = $("span.authorName").text();
    const ingredients = $(".ingredients-section__fieldset ul li");
    const instructions = $(".instructions-section__fieldset ul li");

    const recipe: Recipe = {
      title: title,
      author: author,
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
