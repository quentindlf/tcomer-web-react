import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import {
  Context as RecipeContext,
  RecipeContextType,
} from "../context/recipeContext";
import styles from "../styles/RecipeList.module.scss";

const RecipeList = () => {
  const { state, fetchRecipes, deleteRecipe } = useContext(
    RecipeContext
  ) as RecipeContextType;

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <h1>Liste des recettes</h1>
      <ListGroup>
        {state && state.length ? (
          state.map((recipe) => (
            <div className={styles["row-container"]} key={recipe._id}>
              <ListGroup.Item action>
                <Link to={`/recipe-details/${recipe._id}`} className="nav-link">
                  {recipe.title}
                </Link>
              </ListGroup.Item>
              <Button onClick={() => deleteRecipe(recipe._id)}>Effacer</Button>
            </div>
          ))
        ) : (
          <p>No recette found</p>
        )}
      </ListGroup>
    </>
  );
};

export default RecipeList;
