// storage.js — Firebase Firestore storage for Recipe AI

/**
 * Save a structured recipe object to Firestore
 * @param {Object} recipe - { title, ingredients, directions }
 * @returns {Promise<string>} - Firestore document ID
 */
async function saveRecipe(recipe) {
  try {
    const docRef = await db.collection("recipes").add({
      title: recipe.title || "Untitled Recipe",
      ingredients: recipe.ingredients || "",
      directions: recipe.directions || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return docRef.id;
  } catch (err) {
    console.error("Error saving recipe:", err);
    throw err;
  }
}

/**
 * Load all recipes from Firestore, ordered by newest first
 * @returns {Promise<Array>} - Array of recipe objects
 */
async function loadAllRecipes() {
  try {
    const snapshot = await db
      .collection("recipes")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error("Error loading recipes:", err);
    throw err;
  }
}

/**
 * Optional: Load a single recipe by ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
async function loadRecipeById(id) {
  try {
    const doc = await db.collection("recipes").doc(id).get();
    if (!doc.exists) throw new Error("Recipe not found");
    return { id: doc.id, ...doc.data() };
  } catch (err) {
    console.error("Error loading recipe:", err);
    throw err;
  }
}

/**
 * Optional: Delete a recipe
 * @param {string} id
 * @returns {Promise<void>}
 */
async function deleteRecipe(id) {
  try {
    await db.collection("recipes").doc(id).delete();
  } catch (err) {
    console.error("Error deleting recipe:", err);
    throw err;
  }
}
