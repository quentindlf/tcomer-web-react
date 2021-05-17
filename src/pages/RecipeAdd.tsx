import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RecipeAdd = () => {
  const initialState = {
    ingredient: { name: "", number: 0, unit: "" },
    step: { description: "" },
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preparationLength, setPreparationLength] = useState("");
  const [ingredients, setIngredients] = useState([initialState.ingredient]);
  const [steps, setSteps] = useState([initialState.step]);

  const handleIngredients = (value: string, index: number, type: string) => {
    const ingredientsTemp = [...ingredients];
    const ingredientTemp: any = ingredientsTemp[index];
    ingredientTemp[type] = value;
    setIngredients(ingredientsTemp);
  };

  const handleSteps = (value: string, index: number, type: string) => {
    const stepsTemp = [...steps];
    const stepTemp: any = stepsTemp[index];
    stepTemp[type] = value;
    setSteps(stepsTemp);
  };

  const submitForm = () => {
    const newRecipe = {
      title,
      description,
      preparationLength,
      ingredients,
      steps,
    };
    console.log(newRecipe);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, initialState.ingredient]);
  };
  const addSteps = () => {
    setSteps([...steps, initialState.step]);
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
            placeholder="Enter description"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setDescription(ev.target.value)
            }
          />
        </Form.Group>
        <Form.Group controlId="formRecipe.preparationLength">
          <Form.Label>Temps de préparation total</Form.Label>
          <Form.Control
            required
            type="text"
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
                  placeholder="Enter number"
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    handleIngredients(ev.target.value, index, "number")
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter unit"
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    handleIngredients(ev.target.value, index, "unit")
                  }
                />
              </Col>
            </Row>
          ))}
        </Form.Group>
        <Form.Group controlId="formRecipe.steps">
          <Form.Label>Etapes</Form.Label>
          <Button onClick={addSteps}>Add</Button>
          {steps.map((step, index) => (
            <Form.Control
              key={index}
              required
              as="textarea"
              type="text"
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

export default RecipeAdd;
