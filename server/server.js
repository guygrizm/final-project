require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001, APP_ID, APP_KEY } = process.env;
const axios = require("axios");

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/api/search", async (req, res) => {
    const { q } = req.query;
    console.log(q);

    const urlReq = `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const { data } = await axios({
        method: "GET",
        url: urlReq,
        headers: { "accept-encoding": "*" },
    });
    const newData = data.hits;
    res.json(newData);
});

app.get("/api/recipes/:recipe_id", async (req, res) => {
    const urlReq = `https://api.edamam.com/api/recipes/v2/${req.params.recipe_id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const { data } = await axios({
        method: "GET",
        url: urlReq,
        headers: { "accept-encoding": "*" },
    });

    res.json({ data });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
