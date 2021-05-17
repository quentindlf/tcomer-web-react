import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { mockRecipe } from "../mocks/recipe.mock";

const RecipeList = () => {
  const recipes = [mockRecipe, mockRecipe];

  return (
    <>
      <h1>Liste des recettes</h1>
      <ListGroup>
        {recipes.map((recipe) => (
          <ListGroup.Item action>
            <Link to="/recipe-details" className="nav-link">{recipe.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default RecipeList;
