import recipes from "./recipes.json";

export default function Search() {
  const results = getRecipesByIngredient("aubergine");
  console.log(results);
  return (
    <div className="search">
      <h1>Search</h1>
    </div>
  );
}

function getRecipesByIngredient(ing) {}
