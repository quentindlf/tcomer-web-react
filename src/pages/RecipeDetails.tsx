import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router";
import useFetchRecipe from "../hooks/useFetchRecipe";
import styles from "../styles/RecipeDetail.module.scss";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();

  const recipe = useFetchRecipe(id);

  return recipe ? (
    <>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Temps de préparation : {recipe.preparationLength}</p>
      <div>
        Ingrédients :
        <ListGroup horizontal className={styles["list-container"]}>
          {recipe.ingredients.map((ingredient) => (
            <ListGroup.Item key={ingredient._id}>
              <div>
                <p>
                  {ingredient.number} {ingredient.unit.name}
                </p>
                <p>
                  {ingredient.ingredient.name}{" "}
                  {ingredient.ingredient.type
                    ? `- ${ingredient.ingredient.type}`
                    : null}
                </p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div>
        Etapes :
        <ol>
          {recipe.steps.map((step) => (
            <li key={step._id}>{step.description}</li>
          ))}
        </ol>
      </div>
    </>
  ) : (
    <p>No recipe found</p>
  );
};

export default RecipeDetails;
