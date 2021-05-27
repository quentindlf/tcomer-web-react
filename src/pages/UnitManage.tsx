import { useContext, useEffect, useState } from "react";
import {
  Context as UnitContext,
  UnitContextType,
} from "../context/unitContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/UnitManage.module.scss";
import { ListGroup } from "react-bootstrap";
import { useRouter } from "../hooks/useRouter";
import { UnitModel, UnitModelBase } from "../models/unit.model";

const UnitManage = () => {
  const { state, fetchUnits, addUnit } = useContext(
    UnitContext
  ) as UnitContextType;

  const [selectedUnit, setSelectedUnit] =
    useState<UnitModel | undefined>(undefined);
  const [name, setName] = useState(selectedUnit?.name || "");
  const [value, setValue] = useState(selectedUnit?.value || "");

  useEffect(() => {
    fetchUnits();
  }, []);

  const submitForm = () => {
    const unitRaw: UnitModelBase = { name, value };
    addUnit(unitRaw);
  };

  const selectUnit = (unit: UnitModel) => {
    setSelectedUnit(unit);
    setName(unit.name);
    setValue(unit.value);
  };

  const resetForm = () => {
    setSelectedUnit(undefined);
    setName("");
    setValue("");
  };

  return (
    <>
      <h1>Gestion des unités</h1>
      <Button variant="primary" onClick={resetForm}>
        Reset form
      </Button>
      <div className={styles["row-container"]}>
        <div className={styles["col-container"]}>
          <ListGroup>
            {state && state.length ? (
              state.map((unit) => (
                <div className={styles["row-container"]} key={unit._id}>
                  <ListGroup.Item
                    action
                    active={
                      selectedUnit ? selectedUnit._id === unit._id : false
                    }
                    onClick={() => selectUnit(unit)}
                  >
                    <h6>{unit.name}</h6>
                    <p>{unit.value}</p>
                  </ListGroup.Item>
                  {/* <Button onClick={() => deleteRecipe(recipe._id)}>Effacer</Button>
              <Button onClick={() => router.push(`/recipe-edit/${recipe._id}`)}>
                Editer
              </Button> */}
                </div>
              ))
            ) : (
              <p>No unit found</p>
            )}
          </ListGroup>
        </div>
        <div className={styles["col-container"]}>
          <Form>
            <Form.Group controlId="formUnit.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setName(ev.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formUnit.value">
              <Form.Label>Value</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Value"
                value={value}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setValue(ev.target.value)
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={submitForm}>
              {selectedUnit ? "Edit" : "Add"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UnitManage;
