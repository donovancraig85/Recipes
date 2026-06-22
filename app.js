const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const output = document.getElementById("output");
const statusEl = document.getElementById("status");
const saveBtn = document.getElementById("saveBtn");

let lastAIRecipe = null;

if (uploadBtn) {
  uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      statusEl.textContent = "Please select a file first.";
      return;
    }

    statusEl.textContent = "Analyzing with AI...";

    try {
      const result = await analyzeFileWithAI(file);

      output.textContent = result.recipe;
      lastAIRecipe = result.recipe;

      statusEl.textContent = "AI analysis complete.";
      saveBtn.style.display = "inline-block";

    } catch (err) {
      statusEl.textContent = "Error: " + err;
    }
  });
}

if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    if (!lastAIRecipe) return;

    const recipeObj = {
      title: lastAIRecipe.title || "Untitled Recipe",
      ingredients: lastAIRecipe.ingredients || "",
      directions: lastAIRecipe.directions || ""
    };

    await saveRecipe(recipeObj);

    statusEl.textContent = "Recipe saved!";
  });
}
