import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Search";
import RecipeDetails from "./RecipeDetails";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Search />}></Route>
                    <Route
                        path="/recipes/:id"
                        element={<RecipeDetails />}
                    ></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
