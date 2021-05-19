import React, { useContext, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import {
  Context as RecipeContext,
  RecipeContextType,
} from "../context/recipeContext";

const RecipeList = () => {
  const { state, fetchRecipes } = useContext(
    RecipeContext
  ) as RecipeContextType;

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <h1>Liste des recettes</h1>
      <ListGroup>
        {state.map((recipe) => (
          <ListGroup.Item action key={recipe._id}>
            <Link to={`/recipe-details/${recipe._id}`} className="nav-link">
              {recipe.title}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default RecipeList;
