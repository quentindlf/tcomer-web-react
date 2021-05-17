import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import recipeApi from "../api/recipeApi";
import { RecipeModel } from "../models/recipe.model";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await recipeApi.get("/recipes");
    setRecipes(response.data);
  };

  return (
    <>
      <h1>Liste des recettes</h1>
      <ListGroup>
        {recipes.map((recipe) => (
          <ListGroup.Item action>
            <Link to="/recipe-details" className="nav-link">
              {recipe.title}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default RecipeList;
