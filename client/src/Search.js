import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
let timeOutId;

export default function Search() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            clearTimeout(timeOutId);
            timeOutId = setTimeout(async function () {
                const response = await fetch(`/api/search?q=${query}`);
                const data = await response.json();
                console.log("data", data);
                setRecipes(data.newData);
            }, 500);
        })();
    }, [query]);

    function handleChange(event) {
        setQuery(event.target.value);
    }

    return (
        <div className="find-recipes">
            <h1>Find Recipes</h1>
            <input
                className="search-recipe"
                type="text"
                placeholder="search recipe"
                onChange={handleChange}
            />

            {
                <ul className="recipe-list">
                    {recipes.map((recipe) => (
                        <li key={nanoid()}>{recipe.recipe.label}</li>
                    ))}
                </ul>
            }
        </div>
    );
}
