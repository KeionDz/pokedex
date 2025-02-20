const express = require("express");
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const API_URL = process.env.API_URL;
router.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}?limit=20`);

        return res.render("pages/home",{pokemonList: response.data.results});
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

router.get("/pokemon/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`${API_URL}/${name}`);
        const pokemon = response.data;

        // Define function to get background color based on type
        function getTypeColor(type) {
            const colors = {
                fire: "#F08030",
                water: "#6890F0",
                grass: "#78C850",
                electric: "#F8D030",
                ice: "#98D8D8",
                fighting: "#C03028",
                poison: "#A040A0",
                ground: "#E0C068",
                flying: "#A890F0",
                psychic: "#F85888",
                bug: "#A8B820",
                rock: "#B8A038",
                ghost: "#705898",
                dragon: "#7038F8",
                dark: "#705848",
                steel: "#B8B8D0",
                fairy: "#EE99AC",
                normal: "#A8A878"
            };
            return colors[type] || "#68A090"; // Default color if type is unknown
        }

        return res.render("pages/details", { pokemon, getTypeColor });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


router.get("/search", async(req, res) => {
    try {
        const {name} = req.query;
        if (!name) return res.redirect("/");
        const response = await axios.get(`${API_URL}/${name.toLowerCase()}`);
        return res.render("pages/details", {pokemon: response.data});
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
module.exports = router;