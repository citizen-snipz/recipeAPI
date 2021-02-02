//Example fetch using pokemonapi.co
const btn = document.querySelector("button");

btn.addEventListener("click", getFetch);

function createRecipe(recipe) {
  const ingredientList =
    recipe.ingredientLines.reduce((acc, item) => {
      return acc + `<li>${item}</li>`;
    }, "<ul>") + "</ul>";
  return `
			<div class="card">
				<h2>${recipe.label}</h2>
        <img src="${recipe.image}" alt="${recipe.label}">
        <h3 class="ingredients">${ingredientList}</h3>
        <h3 class="recipeSrc">Recipe retrieved from "${recipe.source}"</h3>
        <h4>See full recipe <a href=${recipe.url}>here</a></h4>
      </div>
      `;
}

function getFetch() {
  const choice = document.querySelector("input").value;
  const url = `https://api.edamam.com/search?q=${choice}&app_id=e323dcc5&app_key=88ccbaff55a7994f2188c963f8229566&to=10`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      document.querySelector(".recipeBody").innerHTML = "";
      //create recipe html for each entry
      for (let i = 0; i < data.hits.length; i++) {
        document
          .querySelector(".recipeBody")
          .insertAdjacentHTML("afterbegin", createRecipe(data.hits[i].recipe));
      }

      console.log(data.hits);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
