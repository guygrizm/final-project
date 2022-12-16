import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
    const params = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        async function getRecipe() {
            const response = await fetch(`/api/recipes/${params.id}`);
            const data = await response.json();
            setRecipe(data.data.recipe);
        }
        getRecipe();
    }, [params.id]);
    console.log(recipe);

    return (
        <div className="recipe-details">
            <img className="recipe-picture " src={recipe.image} alt={`label`} />
            <h1>{recipe.label}</h1>
            <h3>Preparation Time (Minutes): {recipe.totalTime}</h3>
            <h3> Ingredients: {recipe.ingredientLines}</h3>
            <ul className="details-list"></ul>
            <h3>
                The Full Recipe: <a href={recipe.url}>{recipe.url}</a>
            </h3>
        </div>
    );
}
