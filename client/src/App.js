import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./Search";
import RecipeDetails from "./RecipeDetails";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <Link to="/">
                        <img
                            className="app-logo"
                            src="/pantry-logo.png"
                            alt="logo"
                        />
                    </Link>
                    <nav className="menu"></nav>
                </header>
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
