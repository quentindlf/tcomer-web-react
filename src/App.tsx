import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeAdd from "./pages/RecipeAdd";
import { Provider as RecipeProvider } from "./context/recipeContext";
import { Provider as UnitProvider } from "./context/unitContext";
import RecipeEdit from "./pages/RecipeEdit";
import UnitManage from "./pages/UnitManage";

function App() {
  return (
    <UnitProvider>
      <RecipeProvider>
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
                <li>
                  <Link to="/unit-manage">Gestion des unités</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/recipe-list">
                <RecipeList />
              </Route>
              <Route path="/recipe-details/:id">
                <RecipeDetails />
              </Route>
              <Route path="/recipe-add">
                <RecipeAdd />
              </Route>
              <Route path="/recipe-edit/:id">
                <RecipeEdit />
              </Route>
              <Route path="/unit-manage">
                <UnitManage />
              </Route>
            </Switch>
          </div>
        </Router>
      </RecipeProvider>
    </UnitProvider>
  );
}

export default App;
