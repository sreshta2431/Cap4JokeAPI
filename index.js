const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (optional, for CSS or images)
app.use(express.static("public"));

// GET route - render the form page
app.get("/", (req, res) => {
  console.log("GET / - rendering index.ejs");
  res.render("index");
});

// POST route - fetch a joke and display it
app.post("/joke", async (req, res) => {
  const name = req.body.name || "Friend";
  console.log(`POST /joke - Received name: ${name}`);

  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    let joke = response.data.joke;

    // Replace "Chuck Norris" with user's name
    joke = joke.replace(/Chuck Norris/gi, name);

    console.log("Fetched joke:", joke);
    res.render("joke", { name, joke });
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res.send("Oops! Couldn't fetch a joke. Try again later.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
