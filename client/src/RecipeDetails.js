import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
    const params = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function getRecipe() {
            const response = await fetch(`/api/recipes/${params.id}`);
            const data = await response.json();
            setRecipe(data.data.recipe);
        }
        getRecipe();
    }, [params.id]);
    console.log(recipe);
    if (!recipe) {
        return null;
    }

    return (
        <div className="recipe-details">
            <div className="recipe-organize">
                <img
                    className="recipe-picture "
                    src={recipe.image}
                    alt={`label`}
                />

                <h1>{recipe.label}</h1>
                <h3>Preparation Time (Minutes): {recipe.totalTime}</h3>
                <h3> Ingredients: {recipe.ingredientLines.join(", ")}</h3>
                <ul className="details-list"></ul>
                <h3>
                    See the full recipe here:{" "}
                    <a href={recipe.url}>{recipe.url}</a>
                </h3>
            </div>
        </div>
    );
}
