async function analyzeFileWithAI(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        const response = await fetch("https://YOUR-FUNCTION.azurewebsites.net/api/readFile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            data: base64
          })
        });

        if (!response.ok) {
          reject("AI service error: " + response.status);
          return;
        }

        const result = await response.json();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsDataURL(file);
  });
}
