import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeAdd from "./pages/RecipeAdd";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/recipe-list">Liste des recettes</Link>
            </li>
            <li>
              <Link to="/plan">Plan de la semaine</Link>
            </li>
            <li>
              <Link to="/convert">Convertisseur unités</Link>
            </li>
            <li>
              <Link to="/recipe-add">Ajouter une recette</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/recipe-list">
            <RecipeList />
          </Route>
          <Route path="/recipe-details">
            <RecipeDetails />
          </Route>
          <Route path="/recipe-add">
            <RecipeAdd />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
