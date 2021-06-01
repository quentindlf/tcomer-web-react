import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { RecipeModel, StepModel } from "../models/recipe.model";
import {
  IngredientListModelTEMPInit,
  IngredientListModelTEMPRaw,
  RecipeFormModelRaw,
} from "../models/recipe-helpers.model";
import {
  Context as UnitContext,
  UnitContextType,
} from "../context/unitContext";
import { UnitModel } from "../models/unit.model";

interface RecipeFormProps {
  recipe?: RecipeModel;
  onSubmit: (recipe: RecipeFormModelRaw) => void;
}

const RecipeForm = ({ recipe, onSubmit }: RecipeFormProps) => {
  const { state: unitState, fetchUnits } = useContext(
    UnitContext
  ) as UnitContextType;

  useEffect(() => {
    if (!unitState || (unitState && !unitState.length)) {
      fetchUnits();
    }
  }, []);

  const defaultStep = { description: "" };
  const defaultIngredient = { name: "", number: 0, unit: undefined };

  const initialState = {
    title: recipe?.title ?? "",
    description: recipe?.description ?? "",
    preparationLength: recipe?.preparationLength ?? "",
    ingredients: recipe?.ingredients
      ? recipe?.ingredients.reduce(
          (ingredientList: IngredientListModelTEMPInit[], ingredient) => {
            const ingredientForm: IngredientListModelTEMPInit = {
              name: ingredient.ingredient.name,
              number: ingredient.number,
              unit: ingredient.unit,
            };
            return [...ingredientList, ingredientForm];
          },
          []
        )
      : [defaultIngredient],
    steps: recipe?.steps
      ? recipe?.steps.reduce((steps: StepModel[], step) => {
          return [...steps, { ...step }];
        }, [])
      : [defaultStep],
    links: recipe?.links
      ? recipe?.links.reduce((links: string[], link) => {
          return [...links, link];
        }, [])
      : [""],
  };

  console.log("new Render Form");

  const [title, setTitle] = useState(initialState.title);
  const [description, setDescription] = useState(initialState.description);
  const [preparationLength, setPreparationLength] = useState(
    initialState.preparationLength
  );
  const [ingredients, setIngredients] = useState(initialState.ingredients);
  const [steps, setSteps] = useState(initialState.steps);
  const [links, setLinks] = useState(initialState.links);

  const handleIngredients = (
    value: string | UnitModel,
    index: number,
    type: string
  ) => {
    const ingredientsTemp = [...ingredients];
    const ingredientTemp: any = ingredientsTemp[index];
    if (type === "unit") {
      ingredientTemp[type] = unitState.find((unit) => unit._id === value);
    } else {
      ingredientTemp[type] = value;
    }
    console.log(ingredientsTemp);
    setIngredients(ingredientsTemp);
  };

  const handleSteps = (value: string, index: number, type: string) => {
    const stepsTemp = [...steps];
    const stepTemp: any = stepsTemp[index];
    stepTemp[type] = value;
    setSteps(stepsTemp);
  };

  const handleLinks = (value: string, index: number) => {
    const linksTemp = [...links];
    linksTemp[index] = value;
    setLinks(linksTemp);
  };

  const submitForm = () => {
    console.log(ingredients);
    if (title && description && preparationLength && ingredients && steps) {
      const ingredientsRaw = [...ingredients] as IngredientListModelTEMPRaw[];
      const recipeFormRaw = {
        title,
        description,
        preparationLength,
        ingredients: ingredientsRaw,
        steps,
      };
      onSubmit(recipeFormRaw);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, defaultIngredient]);
  };
  const addStep = () => {
    setSteps([...steps, defaultStep]);
  };
  const addLink = () => {
    setLinks([...links, ""]);
  };

  return (
    <>
      <h1>Ajoute ta recette</h1>
      <Form>
        <Form.Group controlId="formRecipe.title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setTitle(ev.target.value)
            }
          />
        </Form.Group>

        <Form.Group controlId="formRecipe.description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            value={description}
            placeholder="Enter description"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setDescription(ev.target.value)
            }
          />
        </Form.Group>
        <Form.Group controlId="formRecipe.links">
          <Form.Label>Liens</Form.Label>
          <Button onClick={addLink}>Add</Button>
          {links.map((link, index) => (
            <Form.Control
              key={index}
              type="url"
              value={link}
              placeholder="Ajoute un lien"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                handleLinks(ev.target.value, index)
              }
            />
          ))}
        </Form.Group>
        <Form.Group controlId="formRecipe.preparationLength">
          <Form.Label>Temps de préparation total</Form.Label>
          <Form.Control
            required
            type="text"
            value={preparationLength}
            placeholder="Enter time"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setPreparationLength(ev.target.value)
            }
          />
        </Form.Group>
        <Form.Group controlId="formRecipe.ingredients">
          <Form.Label>Ingredients</Form.Label>
          <Button onClick={addIngredient}>Add</Button>
          {ingredients.map((ing, index) => (
            <Row key={index}>
              <Col>
                <Form.Control
                  required
                  type="text"
                  value={ing.name}
                  placeholder="Enter name"
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    handleIngredients(ev.target.value, index, "name")
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  required
                  type="text"
                  value={ing.number}
                  placeholder="Enter number"
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    handleIngredients(ev.target.value, index, "number")
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  custom
                  required
                  value={ing.unit?._id || ""}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    handleIngredients(ev.target.value, index, "unit")
                  }
                >
                  <option key="blank" disabled value="">
                    Select unit
                  </option>
                  {unitState.map((unit) => (
                    <option value={unit._id} title={unit.value} key={unit._id}>
                      {unit.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          ))}
        </Form.Group>
        <Form.Group controlId="formRecipe.steps">
          <Form.Label>Etapes</Form.Label>
          <Button onClick={addStep}>Add</Button>
          {steps.map((step, index) => (
            <Form.Control
              key={index}
              required
              as="textarea"
              type="text"
              value={step.description}
              placeholder="Describe your step"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                handleSteps(ev.target.value, index, "description")
              }
            />
          ))}
        </Form.Group>
        <Button variant="primary" onClick={submitForm}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RecipeForm;
