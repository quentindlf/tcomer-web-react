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

  const defaultTypes = ["mass", "volume", "base"];
  const defaultSystems = ["metric", "imperial", "US", "base"];

  const [selectedUnit, setSelectedUnit] =
    useState<UnitModel | undefined>(undefined);
  const [name, setName] = useState(selectedUnit?.name || "");
  const [value, setValue] = useState(selectedUnit?.value || "");
  const [system, setSystem] = useState(selectedUnit?.system || "");
  const [type, setType] = useState(selectedUnit?.type || "");

  useEffect(() => {
    fetchUnits();
  }, []);

  const submitForm = () => {
    if (name && value && system && type) {
      const unitRaw: UnitModelBase = { name, value, system, type };
      addUnit(unitRaw);
    }
  };

  const selectUnit = (unit: UnitModel) => {
    setSelectedUnit(unit);
    setName(unit.name);
    setValue(unit.value);
    setSystem(unit.system);
    setType(unit.type);
  };

  const resetForm = () => {
    setSelectedUnit(undefined);
    setName("");
    setValue("");
    setSystem("");
    setType("");
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
            <Form.Group controlId="formUnit.system">
              <Form.Label>System</Form.Label>
              <Form.Control
                as="select"
                required
                value={system}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setSystem(ev.target.value)
                }
              >
                <option key="blank" disabled value="">
                  Select system
                </option>
                {defaultSystems.map((system, index) => (
                  <option value={system} key={index}>
                    {system}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUnit.type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                required
                value={type}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setType(ev.target.value)
                }
              >
                <option key="blank" disabled value="">
                  Select type
                </option>
                {defaultTypes.map((type, index) => (
                  <option value={type} key={index}>
                    {type}
                  </option>
                ))}
              </Form.Control>
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
