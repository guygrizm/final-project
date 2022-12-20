import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Favorites from "./LikeButton";

export function getIdFromRecipe(recipe) {
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
    function onSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="find-recipes">
            <div className="search-header">
                <h1 className="main-title">Welcome to Pantry!</h1>

                <div className="search-field">
                    <div id="cover">
                        <form onSubmit={onSubmit}>
                            <div className="tb">
                                <div className="td">
                                    <input
                                        className="search-recipe"
                                        type="text"
                                        placeholder="find recipe"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="td" id="s-cover">
                                    <button type="submit">
                                        <div id="s-circle"></div>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="recipe-wrapper">
                <ul className="recipe-list">
                    {recipes.map((recipe) => (
                        <li className="list-item" key={getIdFromRecipe(recipe)}>
                            <img
                                className="recipe-picture "
                                src={recipe.recipe.image}
                                alt={`label`}
                            />
                            <Link
                                className="list-item-link"
                                to={`/recipes/${getIdFromRecipe(recipe)}`}
                            >
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
            </div>
        </div>
    );
}
