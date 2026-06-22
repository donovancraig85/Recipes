// ai.js — Azure AI + Firebase integration

const AZURE_FUNCTION_URL =
  "recipe-ai-function-f0b8fpb2f3cxb0df.eastus-01.azurewebsites.net";

/**
 * Analyze a recipe file using Azure AI
 * @param {File} file
 * @returns {Promise<Object>}
 */
async function analyzeFileWithAI(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        const response = await fetch(AZURE_FUNCTION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            data: base64
          })
        });

        if (!response.ok) {
          reject(`AI service error: ${response.status}`);
          return;
        }

        const result = await response.json();
        resolve(result);

      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject("File reading failed.");
    reader.readAsDataURL(file);
  });
}
