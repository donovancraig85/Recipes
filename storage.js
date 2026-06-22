// LocalStorage version (works on GitHub Pages)
async function saveRecipe(recipe) {
  const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

async function loadAllRecipes() {
  return JSON.parse(localStorage.getItem("recipes") || "[]");
}
