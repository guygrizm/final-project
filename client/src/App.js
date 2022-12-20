import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./Search";
import RecipeDetails from "./RecipeDetails";
import FavoritesPage from "./FavoritesPage";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <nav className="menu">
                        <ul>
                            <li>
                                <Link className="app-logo" to="/">
                                    <img src="/pantry-logo.png" alt="logo" />
                                </Link>
                            </li>

                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <Link to="/favorites">Favorites</Link>
                            </li>

                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Search />}></Route>
                    <Route
                        path="/recipes/:id"
                        element={<RecipeDetails />}
                    ></Route>
                    <Route
                        path="/favorites"
                        element={<FavoritesPage />}
                    ></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
