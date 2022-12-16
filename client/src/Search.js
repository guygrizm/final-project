import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

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
            <div className="search-field">
                <h1>Find Recipes</h1>
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
                        <li key={nanoid()}>
                            <img
                                className="recipe-picture "
                                src={recipe.recipe.image}
                                alt={`label`}
                            />
                            <Link to={`/recipes/${getIdFromRecipe(recipe)}`}>
                                {recipe.recipe.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}
