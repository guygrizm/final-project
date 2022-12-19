import { useState, useEffect } from "react";
import Heart from "react-heart";

function getIdFromRecipe(recipe) {
    const id = new URL(recipe._links.self.href).pathname.split("/").pop();
    return id;
}

export default function Favorites({ id, recipe }) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        try {
            let favorites = window.localStorage.getItem("favorites");

            if (!favorites) {
                favorites = [];
            } else {
                favorites = JSON.parse(favorites);
            }

            const foundRecipe = favorites.find(
                (item) => getIdFromRecipe(item) === id
            );
            console.log(foundRecipe);
            if (foundRecipe) {
                setActive(true);
            } else {
                setActive(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    }, []);

    function handleFavorite(recipe_id) {
        let favorites = window.localStorage.getItem("favorites");

        if (!favorites) {
            favorites = [];
        } else {
            favorites = JSON.parse(favorites);
        }
        favorites.push(recipe);
        window.localStorage.setItem("favorites", JSON.stringify(favorites));

        /* console.log(recipe_id);
            window.localStorage.setItem(recipe_id, recipe_id); */
        setActive(true);
    }

    function handleUnFavorite(recipe_id) {
        let favorites = window.localStorage.getItem("favorites");

        if (!favorites) {
            favorites = [];
        } else {
            favorites = JSON.parse(favorites);
        }
        const filteredFavorites = favorites.filter((item) => {
            if (getIdFromRecipe(item) == recipe_id) {
                return false;
            } else {
                return true;
            }
        });
        window.localStorage.setItem(
            "favorites",
            JSON.stringify(filteredFavorites)
        );
        /* console.log(recipe_id);
            window.localStorage.removeItem(recipe_id); */
        setActive(false);
    }

    if (!active) {
        return (
            <div onClick={() => handleFavorite(id)}>
                <div style={{ width: "2rem" }}>
                    <Heart
                        isActive={active}
                        onClick={() => setActive(!active)}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div onClick={() => handleUnFavorite(id)}>
                <div style={{ width: "2rem" }}>
                    <Heart
                        isActive={active}
                        onClick={() => setActive(!active)}
                    />
                </div>
            </div>
        );
    }
}
