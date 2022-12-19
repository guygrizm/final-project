import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Favorites from "./LikeButton";

function getIdFromRecipe(recipe) {
    const id = new URL(recipe._links.self.href).pathname.split("/").pop();
    return id;
}

let timeOutId;

export default function Search() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (!query) {
            return;
        }
        (async () => {
            clearTimeout(timeOutId);
            timeOutId = setTimeout(async function () {
                const response = await fetch(`/api/search?q=${query}`);
                const data = await response.json();

                console.log(data);
                setRecipes(data);
            }, 500);
        })();
    }, [query]);

    function handleChange(event) {
        setQuery(event.target.value);
    }

    return (
        <div className="find-recipes">
            <h1 className="main-title">Welcome to Pantry!</h1>
            <h2 className="second-title">
                Here you can search for recipes according to products you have
                available to you
            </h2>
            <h2 className="third-title">
                Please use (",") between the products you would like to enter
            </h2>
            <div className="search-field">
                <h2>Find Recipes</h2>

                <input
                    className="search-recipe"
                    type="text"
                    placeholder="search recipe"
                    onChange={handleChange}
                />
            </div>

            {
                <ul className="recipe-list">
                    {recipes.map((recipe) => (
                        <li className="list-item" key={getIdFromRecipe(recipe)}>
                            <img
                                className="recipe-picture "
                                src={recipe.recipe.image}
                                alt={`label`}
                            />
                            <Link to={`/recipes/${getIdFromRecipe(recipe)}`}>
                                <div className="item-text">
                                    {recipe.recipe.label}
                                </div>
                            </Link>
                            <Favorites
                                recipe={recipe}
                                id={getIdFromRecipe(recipe)}
                            ></Favorites>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}
