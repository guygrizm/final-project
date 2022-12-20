import Favorites from "./LikeButton";
import { useState, useEffect } from "react";
import { getIdFromRecipe } from "./Search";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getArray = JSON.parse(localStorage.getItem("favorites"));
        setFavorites(getArray);
    }, []);

    return (
        <div>
            <ul>
                {favorites.map((recipe) => (
                    <li
                        className="list-item-favorites"
                        key={getIdFromRecipe(recipe)}
                    >
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
                        {/* <Favorites
                            recipe={recipe}
                            id={getIdFromRecipe(recipe)}
                        ></Favorites> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
