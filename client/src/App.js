import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./Search";
import RecipeDetails from "./RecipeDetails";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <nav className="menu">
                        <ul>
                            <li>
                                <Link to="/">
                                    <img
                                        className="app-logo"
                                        src="/pantry-logo.png"
                                        alt="logo"
                                    />
                                </Link>
                            </li>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <Link to="/favorites">Favorites</Link>
                            </li>
                            <li>
                                <a href="#">Services</a>
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
                </Routes>
            </div>
        </BrowserRouter>
    );
}
